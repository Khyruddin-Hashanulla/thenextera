const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Default thumbnail URL (you can replace with your own default image)
const DEFAULT_THUMBNAIL_URL = 'https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg';

// Storage configuration for thumbnails
const thumbnailStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'course-thumbnails',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
    transformation: [
      { width: 800, height: 450, crop: 'fill', quality: 'auto' }
    ],
  },
});

// Storage configuration for videos
const videoStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'course-videos',
    resource_type: 'video',
    allowed_formats: ['mp4', 'mov', 'avi', 'mkv', 'webm'],
    transformation: [
      { quality: 'auto', fetch_format: 'auto' }
    ],
  },
});

// Multer configurations
const uploadThumbnail = multer({ 
  storage: thumbnailStorage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit for images
});

const uploadVideo = multer({ 
  storage: videoStorage,
  limits: { fileSize: 500 * 1024 * 1024 }, // 500MB limit for videos
});

// Utility function to upload from URL
const uploadFromUrl = async (url, resourceType = 'image', folder = 'course-thumbnails') => {
  try {
    const result = await cloudinary.uploader.upload(url, {
      resource_type: resourceType,
      folder: folder,
      transformation: resourceType === 'image' ? 
        [{ width: 800, height: 450, crop: 'fill', quality: 'auto' }] : 
        [{ quality: 'auto', fetch_format: 'auto' }]
    });
    return result.secure_url;
  } catch (error) {
    console.error('Cloudinary URL upload error:', error);
    throw new Error('Failed to upload from URL');
  }
};

// Utility function to validate and extract YouTube video ID
const extractYouTubeId = (url) => {
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
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
  } catch (error) {
    return false;
  }
};

// Utility function to validate video URL
const validateVideoUrl = async (url) => {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    const contentType = response.headers.get('content-type');
    return response.ok && contentType && contentType.startsWith('video/');
  } catch (error) {
    return false;
  }
};

// Utility function to delete from Cloudinary
const deleteFromCloudinary = async (publicId, resourceType = 'image') => {
  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType
    });
    return result;
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    throw new Error('Failed to delete from Cloudinary');
  }
};

module.exports = {
  cloudinary,
  uploadThumbnail,
  uploadVideo,
  uploadFromUrl,
  extractYouTubeId,
  getYouTubeThumbnail,
  validateImageUrl,
  validateVideoUrl,
  deleteFromCloudinary,
  DEFAULT_THUMBNAIL_URL
};
