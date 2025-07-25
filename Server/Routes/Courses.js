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
    console.log('📁 File upload attempt:', {
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

// Helper function to upload buffer to Cloudinary with retry and better error handling
const uploadToCloudinary = async (buffer, options, maxRetries = 3) => {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`🔄 Cloudinary upload attempt ${attempt}/${maxRetries}`);
      
      // Add more robust options for large files
      const uploadOptions = {
        ...options,
        timeout: 300000, // 5 minute timeout for large files
        chunk_size: 6000000, // 6MB chunks
        eager_async: true, // Process transformations asynchronously
        use_filename: false, // Let Cloudinary generate filename
        unique_filename: true,
        overwrite: false,
        ...options // Allow override of defaults
      };
      
      console.log('📤 Upload options:', {
        folder: uploadOptions.folder,
        resource_type: uploadOptions.resource_type,
        timeout: uploadOptions.timeout,
        chunk_size: uploadOptions.chunk_size,
        bufferSize: buffer ? buffer.length : 'no buffer'
      });
      
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          uploadOptions,
          (error, result) => {
            if (error) {
              console.error(`❌ Cloudinary upload attempt ${attempt} failed:`, {
                message: error.message,
                http_code: error.http_code,
                error_code: error.error?.code
              });
              reject(error);
            } else {
              console.log(`✅ Cloudinary upload attempt ${attempt} successful:`, {
                public_id: result.public_id,
                secure_url: result.secure_url,
                bytes: result.bytes,
                format: result.format
              });
              resolve(result);
            }
          }
        );
        
        // Set up error handling for the stream
        uploadStream.on('error', (error) => {
          console.error(`❌ Upload stream error on attempt ${attempt}:`, error);
          reject(error);
        });
        
        // Write buffer to stream
        if (buffer) {
          uploadStream.end(buffer);
        } else {
          uploadStream.end();
        }
      });
      
      return result;
    } catch (error) {
      console.error(`❌ Upload attempt ${attempt} failed:`, {
        message: error.message,
        code: error.code,
        http_code: error.http_code,
        error_code: error.error?.code
      });
      
      if (attempt === maxRetries) {
        // If all retries failed, throw a more descriptive error
        const enhancedError = new Error(`Cloudinary upload failed after ${maxRetries} attempts: ${error.message}`);
        enhancedError.originalError = error;
        enhancedError.code = error.code;
        throw enhancedError;
      }
      
      // Progressive delay with jitter to avoid thundering herd
      const delay = (1000 * attempt) + Math.random() * 1000;
      console.log(`⏳ Waiting ${Math.round(delay)}ms before retry...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
};

// Helper function to upload from URL to Cloudinary
const uploadFromUrl = async (url, options, maxRetries = 3) => {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`🔄 URL upload attempt ${attempt}/${maxRetries} for: ${url}`);
      
      const result = await cloudinary.uploader.upload(url, {
        ...options,
        timeout: 120000,
      });
      
      console.log(`✅ URL upload attempt ${attempt} successful:`, {
        public_id: result.public_id,
        secure_url: result.secure_url,
        bytes: result.bytes
      });
      
      return result;
    } catch (error) {
      console.error(`❌ URL upload attempt ${attempt} failed:`, {
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
    console.log('🔍 Thumbnail upload route hit');
    
    // iPhone Safari detection and enhanced logging
    const userAgent = req.headers['user-agent'] || '';
    const isIPhoneSafari = /iPhone/.test(userAgent) && /Safari/.test(userAgent) && !/Chrome/.test(userAgent);
    
    console.log('📋 Request details:', {
      hasFile: !!req.file,
      isIPhoneSafari,
      contentLength: req.headers['content-length'],
      contentType: req.headers['content-type'],
      userAgent: isIPhoneSafari ? 'iPhone Safari' : 'Other',
      sessionId: req.sessionID?.substring(0, 8) + '...',
      userId: req.user?.id
    });
    
    if (!req.file) {
      console.warn('⚠️ No file provided in request');
      return res.status(400).json({ 
        error: 'No thumbnail file provided',
        type: 'missing_file',
        isIPhoneSafari
      });
    }

    console.log('📁 File received:', {
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      bufferLength: req.file.buffer ? req.file.buffer.length : 'no buffer',
      isIPhoneSafari
    });

    // Validate file buffer
    if (!req.file.buffer) {
      console.error('❌ File buffer is missing');
      return res.status(400).json({
        error: 'File buffer is missing',
        type: 'buffer_error',
        isIPhoneSafari
      });
    }

    // iPhone Safari specific upload handling
    if (isIPhoneSafari) {
      console.log('🍎 iPhone Safari upload - Enhanced handling');
      
      // Set iPhone Safari specific response headers
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('X-Content-Type-Options', 'nosniff');
      
      // Force session save for iPhone Safari before upload
      if (req.session) {
        req.session.uploadAttempt = new Date().toISOString();
        req.session.touch();
        
        await new Promise((resolve) => {
          req.session.save((err) => {
            if (err) {
              console.error('🍎 iPhone Safari session save error before upload:', err);
            } else {
              console.log('🍎 iPhone Safari session saved before upload');
            }
            resolve();
          });
        });
      }
    }

    console.log('🚀 Starting Cloudinary upload...');
    
    let result;
    try {
      // Enhanced Cloudinary upload with iPhone Safari compatibility
      result = await uploadToCloudinary(req.file.buffer, {
        folder: 'course-thumbnails',
        resource_type: 'image',
        originalname: req.file.originalname,
        transformation: [
          { width: 800, height: 450, crop: 'fill', quality: 'auto' }
        ],
        // iPhone Safari specific options
        timeout: isIPhoneSafari ? 300000 : 120000, // 5 min for iPhone Safari, 2 min for others
        chunk_size: isIPhoneSafari ? 3000000 : 6000000, // Smaller chunks for iPhone Safari
        retry: isIPhoneSafari ? 5 : 3 // More retries for iPhone Safari
      });
      
      console.log('✅ Cloudinary upload successful');
    } catch (cloudinaryError) {
      console.warn('⚠️ Cloudinary upload failed, using local fallback:', {
        error: cloudinaryError.message,
        code: cloudinaryError.code,
        isIPhoneSafari
      });
      
      // Enhanced fallback for iPhone Safari
      if (isIPhoneSafari) {
        console.log('🍎 iPhone Safari - Using enhanced local fallback');
      }
      
      // Fallback to local storage
      result = await saveFileLocally(req.file.buffer, req.file.originalname, 'thumbnail');
      console.log('💾 Local fallback successful');
    }

    console.log('✅ Thumbnail upload completed:', {
      url: result.secure_url,
      public_id: result.public_id,
      size: result.bytes,
      fallback: result.fallback || false,
      isIPhoneSafari
    });
    
    // iPhone Safari: Force session save after successful upload
    if (isIPhoneSafari && req.session) {
      req.session.lastUpload = new Date().toISOString();
      req.session.uploadSuccess = true;
      req.session.touch();
      
      await new Promise((resolve) => {
        req.session.save((err) => {
          if (err) {
            console.error('🍎 iPhone Safari session save error after upload:', err);
          } else {
            console.log('🍎 iPhone Safari session saved after upload');
          }
          resolve();
        });
      });
    }
    
    res.json({
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
      size: result.bytes,
      mimetype: req.file.mimetype,
      fallback: result.fallback || false,
      isIPhoneSafari,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ Thumbnail upload failed completely:', {
      message: error.message,
      stack: error.stack,
      name: error.name,
      code: error.code,
      isIPhoneSafari: /iPhone/.test(req.headers['user-agent'] || '') && /Safari/.test(req.headers['user-agent'] || '') && !/Chrome/.test(req.headers['user-agent'] || '')
    });
    
    // iPhone Safari specific error handling
    const isIPhoneSafari = /iPhone/.test(req.headers['user-agent'] || '') && /Safari/.test(req.headers['user-agent'] || '') && !/Chrome/.test(req.headers['user-agent'] || '');
    
    if (isIPhoneSafari && req.session) {
      req.session.uploadError = error.message;
      req.session.uploadErrorTime = new Date().toISOString();
      req.session.touch();
      
      req.session.save((err) => {
        if (err) {
          console.error('🍎 iPhone Safari session save error after upload error:', err);
        }
      });
    }
    
    res.status(500).json({ 
      error: 'Failed to upload thumbnail',
      details: error.message,
      type: 'upload_error',
      isIPhoneSafari,
      timestamp: new Date().toISOString(),
      suggestion: isIPhoneSafari ? 'Try refreshing the page and uploading again. iPhone Safari may require multiple attempts.' : 'Please try again or contact support.'
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
    console.log('🔍 Video upload route hit');
    
    if (!req.file) {
      return res.status(400).json({ 
        error: 'No video file provided',
        type: 'missing_file'
      });
    }

    console.log('📁 File received:', {
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      bufferLength: req.file.buffer ? req.file.buffer.length : 'no buffer'
    });

    // Validate file buffer
    if (!req.file.buffer) {
      console.error('❌ File buffer is missing');
      return res.status(400).json({
        error: 'File buffer is missing',
        type: 'buffer_error'
      });
    }

    console.log('🚀 Starting Cloudinary upload...');
    
    // Upload to Cloudinary with retry
    const result = await uploadToCloudinary(req.file.buffer, {
      folder: 'course-videos',
      resource_type: 'video',
      eager: [
        { width: 640, height: 480, crop: 'pad' },
        { width: 1280, height: 720, crop: 'pad' }
      ],
      eager_async: true
    });

    console.log('✅ Video uploaded successfully:', {
      url: result.secure_url,
      public_id: result.public_id,
      size: result.bytes
    });
    
    res.json({
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
      size: result.bytes,
      mimetype: req.file.mimetype
    });
  } catch (error) {
    console.error('❌ Video upload failed:', {
      message: error.message,
      stack: error.stack,
      name: error.name,
      code: error.code
    });
    res.status(500).json({ 
      error: 'Failed to upload video',
      details: error.message,
      type: 'upload_error',
      timestamp: new Date().toISOString()
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
  console.log('🧪 Test upload route hit:', {
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
    console.log('🧪 Basic upload test hit');
    console.log('📋 Test request details:', {
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
    
    console.log('📁 Test file details:', {
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
    console.error('❌ Basic upload test failed:', {
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
    console.log('🧪 Testing Cloudinary configuration...');
    
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
    console.error('❌ Cloudinary test failed:', {
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