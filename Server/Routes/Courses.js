const express = require("express");
const router = express.Router();
const Course = require("../Models/Course");
const User = require("../Models/User");
const mongoose = require("mongoose");
const { requireAuth, requireTeacher } = require("../Middleware/auth");
const { 
  uploadThumbnail, 
  uploadVideo, 
  uploadFromUrl, 
  extractYouTubeId, 
  getYouTubeThumbnail,
  validateImageUrl,
  validateVideoUrl,
  deleteFromCloudinary,
  DEFAULT_THUMBNAIL_URL 
} = require('../config/cloudinary');
const { requireHybridAuth, requireRole: hybridRequireRole, requireTeacher: hybridRequireTeacher } = require("../Middleware/jwt-auth");

// Upload thumbnail from file
router.post('/upload/thumbnail', requireAuth, requireTeacher, uploadThumbnail.single('thumbnail'), async (req, res) => {
  try {
    console.log('Thumbnail upload request:', {
      hasSession: !!req.session,
      isAuthenticated: req.session?.isAuthenticated,
      userId: req.session?.userId,
      userRole: req.session?.userRole,
      hasFile: !!req.file,
      sessionId: req.session?.id,
      contentType: req.headers['content-type'],
      bodyKeys: Object.keys(req.body || {}),
      filesKeys: Object.keys(req.files || {}),
      fileDetails: req.file ? {
        fieldname: req.file.fieldname,
        originalname: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size
      } : null
    });

    if (!req.file) {
      return res.status(400).json({ error: 'No thumbnail file provided' });
    }

    console.log('Thumbnail uploaded successfully:', req.file.path);
    
    res.json({
      success: true,
      url: req.file.path,
      publicId: req.file.filename
    });
  } catch (error) {
    console.error('Thumbnail upload error:', error);
    res.status(500).json({ 
      error: 'Failed to upload thumbnail',
      details: error.message 
    });
  }
});

// Upload thumbnail from URL
router.post('/upload/thumbnail-url', requireAuth, requireTeacher, async (req, res) => {
  try {
    console.log('Thumbnail URL upload request:', {
      hasSession: !!req.session,
      isAuthenticated: req.session?.isAuthenticated,
      userId: req.session?.userId,
      userRole: req.session?.userRole,
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
        const cloudinaryUrl = await uploadFromUrl(thumbnailUrl, 'image', 'course-thumbnails');
        thumbnailUrl = cloudinaryUrl;
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
      thumbnailUrl = await uploadFromUrl(url, 'image', 'course-thumbnails');
    }

    res.json({
      success: true,
      url: thumbnailUrl,
      isYouTube: !!youtubeId
    });
  } catch (error) {
    console.error('Thumbnail URL upload error:', error);
    res.status(500).json({ 
      error: 'Failed to upload thumbnail from URL',
      details: error.message 
    });
  }
});

// Upload video from file
router.post('/upload/video', requireAuth, requireTeacher, uploadVideo.single('video'), async (req, res) => {
  try {
    console.log('Video upload request:', {
      hasSession: !!req.session,
      isAuthenticated: req.session?.isAuthenticated,
      userId: req.session?.userId,
      userRole: req.session?.userRole,
      hasFile: !!req.file,
      sessionId: req.session?.id
    });

    if (!req.file) {
      return res.status(400).json({ error: 'No video file provided' });
    }

    console.log('Video uploaded successfully:', req.file.path);
    
    res.json({
      success: true,
      url: req.file.path,
      publicId: req.file.filename,
      duration: req.file.duration || 0
    });
  } catch (error) {
    console.error('Video upload error:', error);
    res.status(500).json({ 
      error: 'Failed to upload video',
      details: error.message 
    });
  }
});

// Upload video from URL
router.post('/upload/video-url', requireAuth, requireTeacher, async (req, res) => {
  try {
    console.log('Video URL upload request:', {
      hasSession: !!req.session,
      isAuthenticated: req.session?.isAuthenticated,
      userId: req.session?.userId,
      userRole: req.session?.userRole,
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
      videoUrl = await uploadFromUrl(url, 'video', 'course-videos');
    }

    res.json({
      success: true,
      url: videoUrl,
      isYouTube: !!youtubeId,
      youtubeId: youtubeId
    });
  } catch (error) {
    console.error('Video URL upload error:', error);
    res.status(500).json({ 
      error: 'Failed to upload video from URL',
      details: error.message 
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
    console.error("Error fetching courses:", error);
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
    console.error('Error formatting course data:', error);
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

// Add course (Instructor/Admin only)
router.post("/add", requireAuth, requireTeacher, async (req, res) => {
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
      error: error.message,
      stack: error.stack
    });
    res.status(500).json({ error: error.message || "Error creating course" });
  }
});

// Update course (Instructor/Admin only)
router.put("/:id", requireHybridAuth, hybridRequireTeacher, async (req, res) => {
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
        throw new Error(`Section ${index + 1} title is required`);
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
      error: error.message,
      stack: error.stack,
      courseId: req.params.id,
      userId: req.user?.userId
    });
    res.status(500).json({ error: error.message || "Error updating course" });
  }
});

// Delete course (Instructor/Admin only)
router.delete("/:id", requireHybridAuth, hybridRequireTeacher, async (req, res) => {
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
      error: error.message,
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
        const enrolledId = typeof studentId === 'string' ? studentId : studentId.toString();
        return enrolledId === userId.toString();
      } catch (err) {
        console.error('Error comparing enrollment IDs:', {
          studentId,
          userId,
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
      error: error.message,
      stack: error.stack,
      courseId: req.params.courseId,
      userId: req.user?.userId,
      userRole: req.user?.role
    });
    res.status(500).json({ error: error.message || "Error enrolling in course" });
  }
});

// Unenroll from course (for debugging)
router.post("/unenroll/:courseId", requireAuth, async (req, res) => {
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
    console.error("Error unenrolling from course:", error);
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
    console.error('Error updating progress:', err);
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
    console.error("Error fetching progress:", error);
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

module.exports = router;