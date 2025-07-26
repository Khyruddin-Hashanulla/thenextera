const express = require("express");
const router = express.Router();
const Course = require("../Models/Course");
const User = require("../Models/User");
const mongoose = require("mongoose");
const multer = require('multer');
const { requireAuth, requireTeacher, requireInstructor } = require("../Middleware/auth");
const { requireHybridAuth, requireRole: hybridRequireRole, requireTeacher: hybridRequireTeacher } = require("../Middleware/jwt-auth");

// Import Cloudinary directly
const { cloudinary } = require('../config/cloudinary');

// Use memory storage instead of CloudinaryStorage to avoid connection issues
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB limit
  },
  fileFilter: (req, file, cb) => {
    console.log(' File upload attempt:', {
      originalname: file.originalname,
      mimetype: file.mimetype,
      fieldname: file.fieldname
    });
    
    // Allow images and videos
    if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image and video files are allowed'), false);
    }
  }
});

// Alternative upload method using direct buffer upload (fallback for EPIPE errors)
const uploadToCloudinaryDirect = async (buffer, options) => {
  try {
    console.log(' Trying direct Cloudinary upload (fallback method)...');
    
    // Convert buffer to base64 data URI
    const base64Buffer = `data:${options.resource_type === 'video' ? 'video/mp4' : 'image/png'};base64,${buffer.toString('base64')}`;
    
    const result = await cloudinary.uploader.upload(base64Buffer, {
      ...options,
      // Simpler options for direct upload
      timeout: 300000, // 5 minutes
      resource_type: options.resource_type || 'image'
    });
    
    console.log(' Direct Cloudinary upload successful:', {
      public_id: result.public_id,
      secure_url: result.secure_url
    });
    
    return result;
  } catch (error) {
    console.error(' Direct Cloudinary upload failed:', error.message);
    throw error;
  }
};

// Helper function to upload buffer to Cloudinary with retry and better error handling
const uploadToCloudinary = async (buffer, options, maxRetries = 3) => {
  // Detect iPhone Safari for mobile-optimized settings
  const isIPhoneSafari = options.userAgent && 
    /iPhone/.test(options.userAgent) && 
    /Safari/.test(options.userAgent) && 
    !/Chrome/.test(options.userAgent);
  
  let lastError;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(` Cloudinary upload attempt ${attempt}/${maxRetries}${isIPhoneSafari ? ' (iPhone Safari)' : ''}`);
      
      // Mobile-optimized options for iPhone Safari
      const uploadOptions = {
        ...options,
        timeout: isIPhoneSafari ? 600000 : 300000, // 10 minutes for iPhone Safari, 5 for others
        chunk_size: isIPhoneSafari ? 2000000 : 6000000, // 2MB chunks for iPhone Safari, 6MB for others
        eager_async: true, // Process transformations asynchronously
        use_filename: false, // Let Cloudinary generate filename
        unique_filename: true,
        // Enhanced connection options to prevent EPIPE errors
        connection_timeout: 120000, // 2 minutes connection timeout
        read_timeout: 300000, // 5 minutes read timeout
        write_timeout: 300000, // 5 minutes write timeout
        // iPhone Safari specific optimizations
        ...(isIPhoneSafari && {
          quality: 'auto:low', // Lower quality for faster upload on mobile
          fetch_format: 'auto', // Let Cloudinary choose optimal format
          flags: 'progressive', // Progressive loading for images
        })
      };
      
      const result = await new Promise((resolve, reject) => {
        let uploadStream;
        let uploadTimeout;
        let streamClosed = false;
        
        try {
          uploadStream = cloudinary.uploader.upload_stream(
            uploadOptions,
            (error, result) => {
              if (streamClosed) return; // Prevent multiple callbacks
              streamClosed = true;
              
              if (uploadTimeout) {
                clearTimeout(uploadTimeout);
              }
              
              if (error) {
                console.error(` Cloudinary upload error (attempt ${attempt}):`, {
                  message: error.message,
                  http_code: error.http_code,
                  error_code: error.error?.code,
                  isIPhoneSafari,
                  isNetworkError: error.code === 'EPIPE' || error.code === 'ECONNRESET' || error.code === 'ETIMEDOUT'
                });
                reject(error);
              } else {
                console.log(` Cloudinary upload successful (attempt ${attempt}):`, {
                  public_id: result.public_id,
                  secure_url: result.secure_url,
                  isIPhoneSafari
                });
                resolve(result);
              }
            }
          );
          
          // Enhanced error handling for the upload stream
          uploadStream.on('error', (streamError) => {
            if (streamClosed) return;
            streamClosed = true;
            
            if (uploadTimeout) {
              clearTimeout(uploadTimeout);
            }
            
            console.error(` Upload stream error on attempt ${attempt}:`, {
              message: streamError.message,
              code: streamError.code,
              isNetworkError: streamError.code === 'EPIPE' || streamError.code === 'ECONNRESET'
            });
            reject(streamError);
          });
          
          // Set up timeout for the upload stream to prevent hanging
          uploadTimeout = setTimeout(() => {
            if (streamClosed) return;
            streamClosed = true;
            
            console.error(` Upload timeout on attempt ${attempt} after ${uploadOptions.timeout}ms`);
            if (uploadStream && typeof uploadStream.destroy === 'function') {
              uploadStream.destroy();
            }
            reject(new Error('Upload timeout - connection took too long'));
          }, uploadOptions.timeout);
          
          // Clear timeout on completion
          uploadStream.on('finish', () => {
            if (uploadTimeout) {
              clearTimeout(uploadTimeout);
            }
          });
          
          uploadStream.on('close', () => {
            if (uploadTimeout) {
              clearTimeout(uploadTimeout);
            }
          });
          
          // Write buffer to stream with error handling
          if (buffer && buffer.length > 0) {
            uploadStream.end(buffer);
          } else {
            if (uploadTimeout) {
              clearTimeout(uploadTimeout);
            }
            reject(new Error('Invalid buffer provided for upload'));
          }
          
        } catch (streamCreationError) {
          if (uploadTimeout) {
            clearTimeout(uploadTimeout);
          }
          console.error(` Stream creation error on attempt ${attempt}:`, streamCreationError);
          reject(streamCreationError);
        }
      });
      
      // If we get here, the upload was successful
      return result;
      
    } catch (error) {
      lastError = error;
      
      console.error(` Upload attempt ${attempt} failed:`, {
        message: error.message,
        code: error.code,
        isIPhoneSafari,
        isNetworkError: error.code === 'EPIPE' || error.code === 'ECONNRESET' || error.code === 'ETIMEDOUT'
      });
      
      // If this was the last attempt, throw the error
      if (attempt === maxRetries) {
        // Try direct upload as fallback
        if (error.code === 'EPIPE' || error.code === 'ECONNRESET' || error.code === 'ETIMEDOUT') {
          console.log(' Trying direct upload as fallback...');
          return uploadToCloudinaryDirect(buffer, options);
        }
        throw new Error(`Upload failed after ${maxRetries} attempts: ${error.message}`);
      }
      
      // Progressive backoff with longer delays for network errors
      const isNetworkError = error.code === 'EPIPE' || error.code === 'ECONNRESET' || error.code === 'ETIMEDOUT';
      const baseDelay = isIPhoneSafari ? 3000 : 1000;
      const networkErrorMultiplier = isNetworkError ? 2 : 1;
      const delay = baseDelay * attempt * networkErrorMultiplier;
      
      console.log(` Waiting ${delay}ms before retry (network error: ${isNetworkError})...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  // This should never be reached, but just in case
  throw lastError || new Error('Upload failed for unknown reason');
};

// Helper function to upload from URL to Cloudinary
const uploadFromUrl = async (url, options, maxRetries = 3) => {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(` URL upload attempt ${attempt}/${maxRetries} for: ${url}`);
      
      const result = await cloudinary.uploader.upload(url, {
        ...options,
        timeout: 120000,
      });
      
      console.log(` URL upload attempt ${attempt} successful:`, {
        public_id: result.public_id,
        secure_url: result.secure_url,
        bytes: result.bytes
      });
      
      return result;
    } catch (error) {
      console.error(` URL upload attempt ${attempt} failed:`, {
        message: error.message,
        code: error.code
      });
      
      if (attempt === maxRetries) {
        throw error;
      }
      
      // Wait before retry
      await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
    }
  }
};

// Utility function to extract YouTube video ID
const extractYouTubeId = (url) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

// Utility function to get YouTube thumbnail
const getYouTubeThumbnail = (videoId) => {
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
};

// Utility function to validate image URL
const validateImageUrl = async (url) => {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    const contentType = response.headers.get('content-type');
    return response.ok && contentType && contentType.startsWith('image/');
  } catch {
    return false;
  }
};

// Utility function to validate video URL
const validateVideoUrl = async (url) => {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    const contentType = response.headers.get('content-type');
    return response.ok && contentType && contentType.startsWith('video/');
  } catch {
    return false;
  }
};

// Upload thumbnail from file - Instructor only
router.post('/upload/thumbnail', requireHybridAuth, requireInstructor, upload.single('thumbnail'), async (req, res) => {
  try {
    console.log(' Thumbnail upload route hit');
    
    // iPhone Safari detection and enhanced logging
    const userAgent = req.headers['user-agent'] || '';
    const isIPhoneSafari = /iPhone/.test(userAgent) && /Safari/.test(userAgent) && !/Chrome/.test(userAgent);
    
    console.log(' Upload request details:', {
      hasFile: !!req.file,
      userAgent: userAgent.substring(0, 100) + '...',
      isIPhoneSafari,
      fileSize: req.file?.size,
      fileName: req.file?.originalname,
      mimeType: req.file?.mimetype
    });

    if (!req.file) {
      console.error(' No file provided in thumbnail upload');
      return res.status(400).json({ 
        error: 'No file provided',
        message: isIPhoneSafari ? 'Please select an image file to upload' : 'No thumbnail file received'
      });
    }

    console.log(' File details:', {
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      bufferLength: req.file.buffer?.length
    });

    // Validate file type
    if (!req.file.mimetype.startsWith('image/')) {
      return res.status(400).json({ 
        error: 'Invalid file type. Please upload an image.',
        message: 'Only image files (JPG, PNG, GIF, WebP) are allowed for thumbnails'
      });
    }

    // Check file size (10MB limit, but smaller for iPhone Safari)
    const maxSize = isIPhoneSafari ? 5 * 1024 * 1024 : 10 * 1024 * 1024; // 5MB for iPhone Safari, 10MB for others
    if (req.file.size > maxSize) {
      const maxSizeMB = Math.round(maxSize / (1024 * 1024));
      return res.status(400).json({ 
        error: `File too large. Maximum size is ${maxSizeMB}MB`,
        message: isIPhoneSafari ? 
          `Please choose a smaller image (max ${maxSizeMB}MB for mobile)` : 
          `File size exceeds ${maxSizeMB}MB limit`
      });
    }

    console.log(' Starting Cloudinary upload...');
    
    // Debug Cloudinary configuration
    console.log(' Cloudinary config check:', {
      hasCloudName: !!process.env.CLOUDINARY_CLOUD_NAME,
      hasApiKey: !!process.env.CLOUDINARY_API_KEY,
      hasApiSecret: !!process.env.CLOUDINARY_API_SECRET,
      bufferSize: req.file.buffer?.length,
      bufferValid: Buffer.isBuffer(req.file.buffer)
    });
    
    // Upload to Cloudinary with iPhone Safari optimizations
    const result = await uploadToCloudinary(req.file.buffer, {
      folder: 'course-thumbnails',
      resource_type: 'image',
      transformation: [
        { width: 800, height: 450, crop: 'fill', quality: isIPhoneSafari ? 'auto:low' : 'auto' }
      ],
      userAgent // Pass user agent for iPhone Safari detection
    });

    console.log(' Thumbnail upload successful:', {
      public_id: result.public_id,
      secure_url: result.secure_url,
      isIPhoneSafari
    });

    res.json({
      message: 'Thumbnail uploaded successfully',
      url: result.secure_url,
      public_id: result.public_id,
      optimizedForMobile: isIPhoneSafari
    });

  } catch (error) {
    console.error(' Thumbnail upload failed completely:', {
      message: error.message,
      stack: error.stack,
      name: error.name,
      code: error.code,
      userAgent: req.headers['user-agent']?.substring(0, 100)
    });

    // iPhone Safari specific error messages
    const userAgent = req.headers['user-agent'] || '';
    const isIPhoneSafari = /iPhone/.test(userAgent) && /Safari/.test(userAgent) && !/Chrome/.test(userAgent);
    
    let errorMessage = 'Failed to upload thumbnail';
    if (isIPhoneSafari) {
      if (error.message.includes('timeout') || error.message.includes('network')) {
        errorMessage = 'Upload timeout on mobile. Please try with a smaller image or check your connection.';
      } else if (error.message.includes('size') || error.message.includes('large')) {
        errorMessage = 'Image too large for mobile upload. Please compress the image and try again.';
      } else {
        errorMessage = 'Mobile upload failed. Please try again or use a different image.';
      }
    }

    res.status(500).json({
      error: errorMessage,
      details: process.env.NODE_ENV === 'development' ? error.message : undefined,
      isMobile: isIPhoneSafari
    });
  }
});

// Upload thumbnail from URL - Instructor only
router.post('/upload/thumbnail-url', requireHybridAuth, requireInstructor, async (req, res) => {
  try {
    console.log('Thumbnail URL upload request:', {
      hasSession: !!req.session,
      isAuthenticated: req.session?.isAuthenticated,
      userId: req.session?.userId || req.user?.id,
      userRole: req.session?.userRole || req.user?.role,
      url: req.body.url,
      sessionId: req.session?.id
    });

    const { url } = req.body;
    
    if (!url) {
      return res.status(400).json({ error: 'No URL provided' });
    }

    // Check if it's a YouTube URL
    const youtubeId = extractYouTubeId(url);
    let thumbnailUrl;
    
    if (youtubeId) {
      // Use YouTube thumbnail
      thumbnailUrl = getYouTubeThumbnail(youtubeId);
      
      // Upload YouTube thumbnail to Cloudinary for consistency
      try {
        const cloudinaryUrl = await uploadFromUrl(thumbnailUrl, {
          public_id: `youtube-thumbnails/${youtubeId}`,
          resource_type: 'image',
          type: 'upload',
          source: 'url',
          url: thumbnailUrl
        });
        thumbnailUrl = cloudinaryUrl.secure_url;
      } catch (error) {
        console.warn('Failed to upload YouTube thumbnail to Cloudinary, using direct URL:', error);
      }
    } else {
      // Validate if it's a direct image URL
      const isValidImage = await validateImageUrl(url);
      if (!isValidImage) {
        return res.status(400).json({ error: 'Invalid image URL provided' });
      }
      
      // Upload to Cloudinary
      const result = await uploadFromUrl(url, {
        public_id: `course-thumbnails/${Date.now()}`,
        resource_type: 'image',
        type: 'upload',
        source: 'url',
        url: url
      });
      thumbnailUrl = result.secure_url;
    }

    res.json({
      success: true,
      url: thumbnailUrl,
      isYouTube: !!youtubeId
    });
  } catch (error) {
    console.error('Thumbnail URL upload error:', {
      message: error.message,
      stack: error.stack,
      name: error.name,
      code: error.code
    });
    res.status(500).json({ 
      error: 'Failed to upload thumbnail from URL',
      details: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Upload video from file - Instructor only
router.post('/upload/video', requireHybridAuth, requireInstructor, upload.single('video'), async (req, res) => {
  try {
    console.log(' Video upload route hit');
    
    // iPhone Safari detection and enhanced logging
    const userAgent = req.headers['user-agent'] || '';
    const isIPhoneSafari = /iPhone/.test(userAgent) && /Safari/.test(userAgent) && !/Chrome/.test(userAgent);
    
    console.log(' Video upload request details:', {
      hasFile: !!req.file,
      userAgent: userAgent.substring(0, 100) + '...',
      isIPhoneSafari,
      fileSize: req.file?.size,
      fileName: req.file?.originalname,
      mimeType: req.file?.mimetype
    });

    if (!req.file) {
      console.error(' No video file provided');
      return res.status(400).json({ 
        error: 'No video file provided',
        message: isIPhoneSafari ? 'Please select a video file to upload' : 'No video file received'
      });
    }

    // Validate file type
    if (!req.file.mimetype.startsWith('video/')) {
      return res.status(400).json({ 
        error: 'Invalid file type. Please upload a video.',
        message: 'Only video files (MP4, MOV, AVI, WebM) are allowed'
      });
    }

    // Check file size (more restrictive for iPhone Safari)
    const maxSize = isIPhoneSafari ? 25 * 1024 * 1024 : 50 * 1024 * 1024; // 25MB for iPhone Safari, 50MB for others
    if (req.file.size > maxSize) {
      const maxSizeMB = Math.round(maxSize / (1024 * 1024));
      return res.status(400).json({ 
        error: `Video file too large. Maximum size is ${maxSizeMB}MB`,
        message: isIPhoneSafari ? 
          `Please compress your video to under ${maxSizeMB}MB for mobile upload` : 
          `Video file exceeds ${maxSizeMB}MB limit`
      });
    }

    console.log(' Starting video upload to Cloudinary...');
    
    // Debug Cloudinary configuration
    console.log(' Cloudinary config check:', {
      hasCloudName: !!process.env.CLOUDINARY_CLOUD_NAME,
      hasApiKey: !!process.env.CLOUDINARY_API_KEY,
      hasApiSecret: !!process.env.CLOUDINARY_API_SECRET,
      bufferSize: req.file.buffer?.length,
      bufferValid: Buffer.isBuffer(req.file.buffer)
    });
    
    // Upload to Cloudinary with iPhone Safari optimizations
    const result = await uploadToCloudinary(req.file.buffer, {
      folder: 'course-videos',
      resource_type: 'video',
      transformation: isIPhoneSafari ? [
        { quality: 'auto:low', format: 'mp4' } // Lower quality for iPhone Safari
      ] : [
        { quality: 'auto', format: 'mp4' }
      ],
      userAgent // Pass user agent for iPhone Safari detection
    });

    console.log(' Video upload successful:', {
      public_id: result.public_id,
      secure_url: result.secure_url,
      duration: result.duration,
      isIPhoneSafari
    });

    res.json({
      message: 'Video uploaded successfully',
      url: result.secure_url,
      public_id: result.public_id,
      duration: result.duration,
      optimizedForMobile: isIPhoneSafari
    });

  } catch (error) {
    console.error(' Video upload failed:', {
      message: error.message,
      stack: error.stack,
      userAgent: req.headers['user-agent']?.substring(0, 100)
    });

    // iPhone Safari specific error messages
    const userAgent = req.headers['user-agent'] || '';
    const isIPhoneSafari = /iPhone/.test(userAgent) && /Safari/.test(userAgent) && !/Chrome/.test(userAgent);
    
    let errorMessage = 'Failed to upload video';
    if (isIPhoneSafari) {
      if (error.message.includes('timeout') || error.message.includes('network')) {
        errorMessage = 'Video upload timeout on mobile. Please try with a smaller video or check your connection.';
      } else if (error.message.includes('size') || error.message.includes('large')) {
        errorMessage = 'Video too large for mobile upload. Please compress the video and try again.';
      } else {
        errorMessage = 'Mobile video upload failed. Please try again with a smaller file.';
      }
    }

    res.status(500).json({
      error: errorMessage,
      details: process.env.NODE_ENV === 'development' ? error.message : undefined,
      isMobile: isIPhoneSafari
    });
  }
});

// Upload video from URL - Instructor only
router.post('/upload/video-url', requireHybridAuth, requireInstructor, async (req, res) => {
  try {
    console.log('Video URL upload request:', {
      hasSession: !!req.session,
      isAuthenticated: req.session?.isAuthenticated,
      userId: req.session?.userId || req.user?.id,
      userRole: req.session?.userRole || req.user?.role,
      url: req.body.url,
      sessionId: req.session?.id
    });

    const { url } = req.body;
    
    if (!url) {
      return res.status(400).json({ error: 'No URL provided' });
    }

    // Check if it's a YouTube URL
    const youtubeId = extractYouTubeId(url);
    let videoUrl;
    
    if (youtubeId) {
      // For YouTube videos, we'll store the embed URL
      videoUrl = `https://www.youtube.com/embed/${youtubeId}`;
    } else {
      // Validate if it's a direct video URL
      const isValidVideo = await validateVideoUrl(url);
      if (!isValidVideo) {
        return res.status(400).json({ error: 'Invalid video URL provided' });
      }
      
      // Upload to Cloudinary
      const result = await uploadFromUrl(url, {
        public_id: `course-videos/${Date.now()}`,
        resource_type: 'video',
        type: 'upload',
        source: 'url',
        url: url
      });
      videoUrl = result.secure_url;
    }

    res.json({
      success: true,
      url: videoUrl,
      isYouTube: !!youtubeId,
      youtubeId: youtubeId
    });
  } catch (error) {
    console.error('Video URL upload error:', {
      message: error.message,
      stack: error.stack,
      name: error.name,
      code: error.code
    });
    res.status(500).json({ 
      error: 'Failed to upload video from URL',
      details: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Get all courses (Public)
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find()
      .populate('creatorId', 'name email')
      .select('-quiz.correct'); // Don't send correct answers to client

    // Format each course with absolute URLs
    const formattedCourses = courses.map(course => formatCourseData(course, req.user, req));
    
    res.json(formattedCourses);
  } catch (error) {
    console.error("Error fetching courses:", {
      message: error.message,
      stack: error.stack,
      name: error.name,
      code: error.code
    });
    res.status(500).json({ error: "Error fetching courses" });
  }
});

// Get a specific course
router.get('/:id', requireHybridAuth, async (req, res) => {
  try {
    // Log request details
    console.log('Course fetch request:', {
      courseId: req.params.id,
      userId: req.user?.userId,
      userRole: req.user?.role
    });

    // Validate course ID
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      console.log('Invalid course ID format:', req.params.id);
      return res.status(400).json({ error: 'Invalid course ID format' });
    }

    const course = await Course.findById(req.params.id)
      .populate('creatorId', 'name email')
      .populate('studentsEnrolled', 'name email');

    if (!course) {
      console.log('Course not found:', req.params.id);
      return res.status(404).json({ error: 'Course not found' });
    }

    // Log course data
    console.log('Found course:', {
      id: course._id,
      title: course.title,
      creatorId: course.creatorId?._id,
      sectionsCount: course.sections?.length,
      studentsCount: course.studentsEnrolled?.length
    });

    // Check if user has permission to access this course
    // If user is instructor or admin, they can access any course
    if (req.user?.role === 'Instructor' || req.user?.role === 'Admin') {
      // For instructors/admins, check if they are the creator
      const isCreator = course.creatorId?._id?.toString() === req.user?.userId?.toString();
      console.log('Instructor/Admin access check:', {
        userRole: req.user?.role,
        isCreator,
        courseCreatorId: course.creatorId?._id?.toString(),
        userId: req.user?.userId
      });

      // Allow access for instructors and admins
      const courseData = formatCourseData(course, req.user, req);
      return res.json(courseData);
    }

    // For students, check if they're enrolled
    const isEnrolled = course.studentsEnrolled && 
      Array.isArray(course.studentsEnrolled) &&
      course.studentsEnrolled.some(student => {
        // Safely handle the comparison
        if (!student || !student._id || !req.user?.userId) return false;
        try {
          const isMatch = student._id.toString() === req.user.userId;
          console.log('Enrollment check for student:', {
            studentId: student._id.toString(),
            userId: req.user.userId,
            isMatch
          });
          return isMatch;
        } catch (err) {
          console.error('Error comparing IDs:', {
            studentId: student._id,
            userId: req.user.userId,
            error: err.message
          });
          return false;
        }
      });

    // Log enrollment check details for debugging
    console.log('Student Enrollment Check:', {
      courseId: course._id?.toString(),
      userId: req.user?.userId,
      studentsEnrolled: course.studentsEnrolled?.map(s => s._id?.toString() || 'invalid-id'),
      isEnrolled,
      studentRole: req.user?.role
    });

    if (!isEnrolled) {
      return res.status(403).json({ error: 'Access denied. Please enroll in the course to view content.' });
    }

    // Format the response with safe defaults
    const courseData = formatCourseData(course, req.user, req);
    
    // Log the formatted course data
    console.log('Sending formatted course data:', {
      id: courseData._id,
      title: courseData.title,
      sectionsCount: courseData.sections?.length,
      totalVideos: courseData.sections?.reduce((total, section) => total + (section.videos?.length || 0), 0) || 0
    });

    res.json(courseData);
  } catch (err) {
    console.error('Error in course fetch:', {
      error: err.message,
      stack: err.stack,
      userId: req.user?.userId,
      courseId: req.params.id,
      userRole: req.user?.role
    });
    res.status(500).json({ 
      error: 'Error fetching course details',
      message: err.message,
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

// Helper function to format course data
const formatCourseData = (course, user, req) => {
  try {
    console.log('Formatting course data:', {
      hasVideoLinks: Boolean(course.videoLinks?.length),
      hasSections: Boolean(course.sections?.length),
      videoLinksCount: course.videoLinks?.length || 0,
      sectionsCount: course.sections?.length || 0
    });

    let userProgress = null;
    
    // Safely check for student progress
    if (course?.studentProgress && Array.isArray(course.studentProgress)) {
      userProgress = course.studentProgress.find(progress => {
        if (!progress?.userId || !user?.userId) return false;
        try {
          return progress.userId.toString() === user.userId.toString();
        } catch (err) {
          console.error('Error comparing progress IDs:', {
            progressUserId: progress.userId,
            userId: user.userId,
            error: err.message
          });
          return false;
        }
      });
    }

    // Handle course sections
    let sections = [];
    
    // First try to use existing sections
    if (course.sections && Array.isArray(course.sections) && course.sections.length > 0) {
      sections = course.sections.map(section => ({
        title: section.title || '',
        description: section.description || '',
        order: section.order || 0,
        videos: Array.isArray(section.videos) ? section.videos.map(video => ({
          title: video.title || '',
          url: video.url || '',
          description: video.description || ''
        })).filter(video => video.url) : []
      })).filter(section => section.videos.length > 0);
    }
    // If no sections but has videoLinks, convert to section
    else if (course.videoLinks && Array.isArray(course.videoLinks) && course.videoLinks.length > 0) {
      const validVideos = course.videoLinks
        .filter(video => video && video.url)
        .map(video => ({
          title: video.title || 'Untitled Video',
          url: video.url,
          description: video.description || ''
        }));

      if (validVideos.length > 0) {
        sections = [{
          title: 'Course Content',
          description: course.description || '',
          order: 1,
          videos: validVideos
        }];
      }
    }

    // Sort sections by order
    sections.sort((a, b) => a.order - b.order);

    // Ensure thumbnail URL is absolute
    let thumbnail = course.thumbnail || '';
    if (thumbnail && thumbnail.startsWith('/uploads/')) {
      const baseUrl = `${req.protocol}://${req.get('host')}`;
      thumbnail = `${baseUrl}${thumbnail}`;
    }

    // Format the response with safe defaults
    const formattedData = {
      _id: course._id,
      title: course.title || 'Untitled Course',
      description: course.description || '',
      thumbnail: thumbnail,
      sections: sections,
      creatorId: course.creatorId || null,
      studentsEnrolled: Array.isArray(course.studentsEnrolled) ? course.studentsEnrolled : [],
      createdAt: course.createdAt || new Date(),
      updatedAt: course.updatedAt || new Date(),
      progress: userProgress?.progress || 0,
      completedVideos: userProgress && Array.isArray(userProgress.completedVideos) 
        ? userProgress.completedVideos 
        : [],
      lastWatched: userProgress?.lastWatched || 0
    };

    // Log the formatted data structure
    console.log('Formatted course data structure:', {
      id: formattedData._id,
      title: formattedData.title,
      sectionsCount: formattedData.sections.length,
      totalVideos: formattedData.sections.reduce((total, section) => total + section.videos.length, 0),
      sections: formattedData.sections.map(s => ({
        title: s.title,
        videosCount: s.videos.length
      }))
    });

    return formattedData;
  } catch (error) {
    console.error('Error formatting course data:', {
      message: error.message,
      stack: error.stack,
      name: error.name,
      code: error.code
    });
    // Return a safe default structure
    return {
      _id: course._id,
      title: course.title || 'Untitled Course',
      description: course.description || '',
      thumbnail: course.thumbnail || '',
      sections: [],
      creatorId: course.creatorId || null,
      studentsEnrolled: [],
      createdAt: course.createdAt || new Date(),
      updatedAt: course.updatedAt || new Date(),
      progress: 0,
      completedVideos: [],
      lastWatched: 0
    };
  }
};

// Add course (Instructor/Admin only) - Block pending instructors
router.post("/add", requireHybridAuth, requireInstructor, async (req, res) => {
  try {
    const { title, description, thumbnail, sections } = req.body;

    // Log the incoming data
    console.log('Creating course:', {
      title,
      description: description?.substring(0, 50) + '...',
      sectionsCount: sections?.length,
      sections: sections?.map(s => ({
        title: s.title,
        videosCount: s.videos?.length
      }))
    });

    // Validate required fields
    if (!title || !sections || !Array.isArray(sections)) {
      return res.status(400).json({ error: "Title and sections are required" });
    }

    // Format thumbnail URL if not provided or invalid
    const defaultThumbnail = "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=500&q=80";
    const formattedThumbnail = thumbnail && thumbnail.trim() !== "" ? thumbnail : defaultThumbnail;

    // Process sections and videos
    const processedSections = sections.map((section, sectionIndex) => {
      // Validate section
      if (!section.title || !section.videos || !Array.isArray(section.videos)) {
        throw new Error(`Invalid section data at index ${sectionIndex}`);
      }

      // Process videos
      const validVideos = section.videos
        .filter(video => video && video.title && video.url)
        .map(video => ({
          title: video.title.trim(),
          url: video.url.trim(),
          description: video.description?.trim() || '',
          duration: video.duration || 0
        }));

      if (validVideos.length === 0) {
        throw new Error(`Section ${section.title} must have at least one valid video`);
      }

      return {
        title: section.title.trim(),
        description: section.description?.trim() || '',
        order: sectionIndex + 1,
        videos: validVideos
      };
    });

    // Create the course
    const newCourse = new Course({
      title: title.trim(),
      description: description?.trim() || '',
      thumbnail: formattedThumbnail,
      sections: processedSections,
      creatorId: req.user._id
    });

    // Log the processed course data
    console.log('Processed course data:', {
      title: newCourse.title,
      sectionsCount: newCourse.sections.length,
      totalVideos: newCourse.sections.reduce((total, section) => total + section.videos.length, 0)
    });

    await newCourse.save();
    
    // Populate creator info before sending response
    const populatedCourse = await Course.findById(newCourse._id)
      .populate('creatorId', 'name email');
    
    res.status(201).json({ 
      message: "Course created successfully", 
      course: populatedCourse 
    });
  } catch (error) {
    console.error("Error creating course:", {
      message: error.message,
      stack: error.stack,
      name: error.name,
      code: error.code
    });
    res.status(500).json({ error: error.message || "Error creating course" });
  }
});

// Update course (Instructor/Admin only)
router.put("/:id", requireHybridAuth, requireInstructor, async (req, res) => {
  try {
    const { title, description, thumbnail, sections } = req.body;

    // Log update request
    console.log('Course update request:', {
      courseId: req.params.id,
      userId: req.user?.userId,
      title,
      sectionsCount: sections?.length
    });

    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    // Check if user is creator or admin
    const courseCreatorId = course.creatorId._id || course.creatorId;
    if (courseCreatorId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ error: "Not authorized to update this course" });
    }

    // Process sections and validate
    if (!sections || !Array.isArray(sections) || sections.length === 0) {
      return res.status(400).json({ error: "Course must have at least one section" });
    }

    // Process and validate sections
    const processedSections = sections.map((section, index) => {
      // Validate section
      if (!section.title?.trim()) {
        throw new Error(`Invalid section data at index ${index}`);
      }

      // Process videos
      if (!section.videos || !Array.isArray(section.videos) || section.videos.length === 0) {
        throw new Error(`Section ${section.title} must have at least one video`);
      }

      const validVideos = section.videos
        .filter(video => video && video.url?.trim())
        .map(video => ({
          title: video.title?.trim() || 'Untitled Video',
          url: video.url.trim(),
          description: video.description?.trim() || '',
          duration: video.duration || 0
        }));

      if (validVideos.length === 0) {
        throw new Error(`Section ${section.title} must have at least one valid video`);
      }

      return {
        title: section.title.trim(),
        description: section.description?.trim() || '',
        order: index + 1,
        videos: validVideos
      };
    });

    // Format thumbnail URL if not provided or invalid
    const defaultThumbnail = "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=500&q=80";
    const formattedThumbnail = thumbnail && thumbnail.trim() !== "" ? thumbnail : defaultThumbnail;

    // Update the course
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      {
        title: title?.trim(),
        description: description?.trim() || '',
        thumbnail: formattedThumbnail,
        sections: processedSections
      },
      { new: true }
    ).populate('creatorId', 'name email');

    // Log successful update
    console.log('Course updated successfully:', {
      courseId: updatedCourse._id,
      title: updatedCourse.title,
      sectionsCount: updatedCourse.sections.length,
      totalVideos: updatedCourse.sections.reduce((total, section) => total + section.videos.length, 0)
    });

    res.json({ 
      message: "Course updated successfully", 
      course: updatedCourse 
    });
  } catch (error) {
    console.error("Error updating course:", {
      message: error.message,
      stack: error.stack,
      courseId: req.params.id,
      userId: req.user?.userId
    });
    res.status(500).json({ error: error.message || "Error updating course" });
  }
});

// Delete course (Instructor/Admin only)
router.delete("/:id", requireHybridAuth, requireInstructor, async (req, res) => {
  try {
    console.log('Delete request received:', {
      courseId: req.params.id,
      user: {
        id: req.user._id,
        role: req.user.role,
        name: req.user.name,
        email: req.user.email
      }
    });

    const course = await Course.findById(req.params.id).populate('creatorId', 'name email');
    
    if (!course) {
      console.log('Course not found:', req.params.id);
      return res.status(404).json({ error: "Course not found" });
    }

    console.log('Course found:', {
      id: course._id,
      title: course.title,
      creatorId: course.creatorId._id || course.creatorId,
      createdAt: course.createdAt
    });

    // Check if user is creator or admin
    const courseCreatorId = (course.creatorId._id || course.creatorId).toString();
    const userId = req.user._id.toString();
    const isCreator = courseCreatorId === userId;
    const isAdmin = req.user.role === 'admin';

    console.log('Authorization check:', {
      courseCreatorId,
      userId,
      isCreator,
      isAdmin,
      userRole: req.user.role
    });

    if (!isCreator && !isAdmin) {
      console.log('Authorization failed:', {
        courseCreatorId,
        userId,
        userRole: req.user.role
      });
      return res.status(403).json({ 
        error: "Not authorized to delete this course",
        details: {
          message: "Only the course creator or an admin can delete this course",
          isCreator,
          isAdmin,
          courseCreatorId,
          userId
        }
      });
    }

    await Course.findByIdAndDelete(req.params.id);
    console.log('Course successfully deleted:', req.params.id);
    
    res.json({ 
      message: "Course deleted successfully",
      courseId: req.params.id
    });
  } catch (error) {
    console.error("Error deleting course:", {
      message: error.message,
      stack: error.stack,
      courseId: req.params.id,
      userId: req.user._id
    });
    res.status(500).json({ 
      error: "Error deleting course",
      details: error.message
    });
  }
});

// Enroll in course (Authenticated users only)
router.post("/enroll/:courseId", requireHybridAuth, async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.user._id || req.user.id || req.user.userId;

    // Log the enrollment request
    console.log('Enrollment request:', {
      courseId,
      userId,
      userRole: req.user?.role,
      userIdType: typeof userId
    });

    // Validate user ID
    if (!userId) {
      console.error('Invalid user ID in enrollment request:', {
        user: req.user,
        userId
      });
      return res.status(400).json({ error: "Invalid user ID" });
    }

    // Validate courseId
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ error: "Invalid course ID" });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    // Check if already enrolled
    const isAlreadyEnrolled = course.studentsEnrolled?.some(studentId => {
      try {
        const isMatch = studentId.toString() === userId.toString();
        console.log('Enrollment check for student:', {
          studentId: studentId.toString(),
          userId: userId,
          isMatch
        });
        return isMatch;
      } catch (err) {
        console.error('Error comparing IDs:', {
          studentId: studentId,
          userId: userId,
          error: err.message
        });
        return false;
      }
    });

    if (isAlreadyEnrolled) {
      return res.status(400).json({ error: "Already enrolled in this course" });
    }

    // Convert userId to ObjectId if it's a string
    let userObjectId;
    try {
      userObjectId = typeof userId === 'string' ? new mongoose.Types.ObjectId(userId) : userId;
    } catch (err) {
      console.error('Error converting userId to ObjectId:', {
        userId,
        error: err.message
      });
      return res.status(400).json({ error: "Invalid user ID format" });
    }

    // Add student to enrolled list
    course.studentsEnrolled.push(userObjectId);

    // Initialize progress tracking
    const progressRecord = {
      userId: userObjectId,
      progress: 0,
      completedVideos: [],
      lastWatched: 0,
      updatedAt: new Date()
    };

    // Log the progress record being created
    console.log('Creating progress record:', {
      ...progressRecord,
      userId: progressRecord.userId.toString()
    });

    course.studentProgress.push(progressRecord);

    await course.save();

    // Log successful enrollment
    console.log('Enrollment successful:', {
      courseId: courseId,
      userId: userId.toString(),
      enrolledStudents: course.studentsEnrolled.length,
      progressRecord: {
        ...progressRecord,
        userId: progressRecord.userId.toString()
      }
    });

    // Return the updated course data
    const courseData = formatCourseData(course, req.user, req);

    res.json({ 
      message: "Enrolled successfully",
      courseId: courseId,
      userId: userId,
      course: courseData
    });
  } catch (error) {
    console.error("Error enrolling in course:", {
      message: error.message,
      stack: error.stack,
      courseId: req.params.courseId,
      userId: req.user?.userId,
      userRole: req.user?.role
    });
    res.status(500).json({ error: error.message || "Error enrolling in course" });
  }
});

// Unenroll from course (for debugging)
router.post("/unenroll/:courseId", requireHybridAuth, async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.user.userId;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    // Remove student from enrolled list
    course.studentsEnrolled = course.studentsEnrolled.filter(
      studentId => studentId.toString() !== userId
    );

    // Remove progress tracking
    course.studentProgress = course.studentProgress.filter(
      progress => progress.userId.toString() !== userId
    );

    await course.save();

    res.json({ message: "Unenrolled successfully" });
  } catch (error) {
    console.error("Error unenrolling from course:", {
      message: error.message,
      stack: error.stack,
      courseId: req.params.courseId,
      userId: req.user.userId
    });
    res.status(500).json({ error: error.message || "Error unenrolling from course" });
  }
});

// Update course progress
router.post('/:id/progress', requireHybridAuth, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    // Ensure user is enrolled in the course
    const isEnrolled = course.studentsEnrolled && 
      course.studentsEnrolled.some(studentId => 
        studentId && req.user.userId && 
        studentId.toString() === req.user.userId.toString()
      );

    if (!isEnrolled) {
      return res.status(403).json({ error: 'User not enrolled in this course' });
    }

    // Initialize studentProgress array if it doesn't exist
    if (!course.studentProgress) {
      course.studentProgress = [];
    }

    // Find or create progress record
    let progressIndex = course.studentProgress.findIndex(
      p => p && p.userId && 
          req.user.userId && 
          p.userId.toString() === req.user.userId.toString()
    );

    const progressData = {
      userId: req.user.userId,
      progress: req.body.progress || 0,
      completedVideos: Array.isArray(req.body.completedVideos) ? req.body.completedVideos : [],
      lastWatched: req.body.lastWatched || 0,
      updatedAt: new Date()
    };

    if (progressIndex === -1) {
      course.studentProgress.push(progressData);
    } else {
      course.studentProgress[progressIndex] = {
        ...course.studentProgress[progressIndex],
        ...progressData
      };
    }

    await course.save();
    res.json({ 
      message: 'Progress updated successfully',
      progress: progressData
    });
  } catch (err) {
    console.error('Error updating progress:', {
      message: err.message,
      stack: err.stack,
      name: err.name,
      code: err.code
    });
    res.status(500).json({ 
      error: 'Failed to update progress',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

// Get course progress (Authenticated users only)
router.get("/:courseId/progress", requireHybridAuth, async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.user._id;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    const progress = course.studentProgress.find(
      p => p.userId.toString() === userId.toString()
    );

    if (!progress) {
      return res.json({
        progress: 0,
        completedVideos: [],
        lastWatched: 0
      });
    }

    res.json(progress);
  } catch (error) {
    console.error("Error fetching progress:", {
      message: error.message,
      stack: error.stack,
      name: error.name,
      code: error.code
    });
    res.status(500).json({ error: "Error fetching progress" });
  }
});

// Test authentication endpoint
router.get('/test-auth', requireHybridAuth, hybridRequireTeacher, (req, res) => {
  res.json({
    success: true,
    message: 'Hybrid authentication working',
    authType: req.authType,
    user: {
      id: req.user.id,
      role: req.user.role,
      name: req.user.name,
      email: req.user.email
    },
    isIPhoneSafari: req.isIPhoneSafari,
    sessionInfo: req.authType === 'session' ? {
      isAuthenticated: req.session?.isAuthenticated,
      userId: req.session?.userId,
      userRole: req.session?.userRole,
      sessionId: req.sessionID
    } : null
  });
});

// Test upload route for debugging
router.post('/test-upload', requireHybridAuth, requireInstructor, (req, res) => {
  console.log(' Test upload route hit:', {
    hasSession: !!req.session,
    isAuthenticated: req.session?.isAuthenticated,
    userId: req.session?.userId || req.user?.id,
    userRole: req.session?.userRole || req.user?.role,
    headers: req.headers,
    body: req.body
  });
  
  res.json({ 
    success: true, 
    message: 'Test route working',
    auth: {
      hasSession: !!req.session,
      isAuthenticated: req.session?.isAuthenticated,
      userId: req.session?.userId || req.user?.id,
      userRole: req.session?.userRole || req.user?.role
    }
  });
});

// Simple test endpoint for upload functionality
router.post('/test-upload-basic', requireHybridAuth, requireInstructor, upload.single('thumbnail'), (req, res) => {
  try {
    console.log(' Basic upload test hit');
    console.log(' Test request details:', {
      hasFile: !!req.file,
      contentType: req.headers['content-type'],
      userAgent: req.headers['user-agent']
    });
    
    if (!req.file) {
      return res.json({
        success: false,
        message: 'No file received',
        details: 'Multer did not process any file'
      });
    }
    
    console.log(' Test file details:', {
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      hasBuffer: !!req.file.buffer,
      bufferLength: req.file.buffer ? req.file.buffer.length : 0
    });
    
    res.json({
      success: true,
      message: 'File received successfully',
      file: {
        originalname: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
        bufferLength: req.file.buffer ? req.file.buffer.length : 0
      }
    });
  } catch (error) {
    console.error(' Basic upload test failed:', {
      message: error.message,
      stack: error.stack
    });
    
    res.status(500).json({
      success: false,
      error: 'Basic upload test failed',
      details: error.message
    });
  }
});

// Test endpoint to verify Cloudinary configuration
router.get('/test-cloudinary', (req, res) => {
  try {
    console.log(' Testing Cloudinary configuration...');
    
    // Check environment variables
    const envVars = {
      CLOUDINARY_CLOUD_NAME: !!process.env.CLOUDINARY_CLOUD_NAME,
      CLOUDINARY_API_KEY: !!process.env.CLOUDINARY_API_KEY,
      CLOUDINARY_API_SECRET: !!process.env.CLOUDINARY_API_SECRET
    };
    
    console.log('Environment variables check:', envVars);
    
    // Try to load Cloudinary config
    const { cloudinary } = require('../config/cloudinary');
    
    // Get Cloudinary config (without exposing secrets)
    const config = cloudinary.config();
    const configStatus = {
      cloud_name: !!config.cloud_name,
      api_key: !!config.api_key,
      api_secret: !!config.api_secret,
      cloud_name_value: config.cloud_name // Safe to show
    };
    
    console.log('Cloudinary config status:', configStatus);
    
    res.json({
      success: true,
      message: 'Cloudinary configuration test',
      environmentVariables: envVars,
      cloudinaryConfig: configStatus,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error(' Cloudinary test failed:', {
      message: error.message,
      stack: error.stack,
      name: error.name,
      code: error.code
    });
    res.status(500).json({
      success: false,
      error: 'Cloudinary configuration failed',
      details: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Simple test endpoint to verify routes are working
router.get('/test-upload-routes', (req, res) => {
  res.json({
    message: 'Upload routes are working!',
    availableRoutes: [
      'POST /api/courses/upload/thumbnail',
      'POST /api/courses/upload/thumbnail-url', 
      'POST /api/courses/upload/video',
      'POST /api/courses/upload/video-url',
      'POST /api/courses/test-upload'
    ],
    timestamp: new Date().toISOString()
  });
});

module.exports = router;