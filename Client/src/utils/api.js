import axios from 'axios';

// iPhone Safari detection utility
const isIPhoneSafari = () => {
  const userAgent = navigator.userAgent;
  return /iPhone/.test(userAgent) && /Safari/.test(userAgent) && !/Chrome/.test(userAgent);
};

// Use environment variable for API URL, fallback to localhost for development
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8081',
  withCredentials: true, // Essential for session-based authentication
  // Don't set global Content-Type - let axios set it automatically based on data type
  // This allows FormData to be sent as multipart/form-data for file uploads
});

// Add a request interceptor for hybrid authentication
api.interceptors.request.use(
  (config) => {
    const isIPhoneSafariBrowser = isIPhoneSafari();
    
    if (isIPhoneSafariBrowser) {
      // For iPhone Safari, use JWT authentication
      const token = localStorage.getItem('jwt_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log('🍎 iPhone Safari: Adding JWT token to request');
      }
    }
    // For other browsers, session cookies are automatically sent with withCredentials: true
    
    // Set Content-Type for non-FormData requests
    if (!(config.data instanceof FormData)) {
      config.headers['Content-Type'] = 'application/json';
    }
    // For FormData, let axios set multipart/form-data automatically
    
    // Log request details for debugging
    console.log('API Request:', {
      method: config.method,
      url: config.url,
      withCredentials: config.withCredentials,
      hasAuthHeader: !!config.headers.Authorization,
      isIPhoneSafari: isIPhoneSafariBrowser,
      authType: isIPhoneSafariBrowser ? 'jwt' : 'session'
    });
    
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', {
      message: error.message,
      config: error.config
    });
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    // Log successful responses for debugging
    console.log('API Response:', {
      status: response.status,
      url: response.config.url,
      method: response.config.method,
      hasSessionData: !!response.data.sessionId,
      hasJWTToken: !!response.data.token,
      authType: response.data.authType
    });
    
    return response;
  },
  (error) => {
    console.error('API Error:', {
      status: error.response?.status,
      message: error.response?.data?.error || error.message,
      url: error.config?.url,
      method: error.config?.method,
      authType: error.response?.data?.authType
    });

    // Handle authentication errors
    if (error.response?.status === 401) {
      const isIPhoneSafariBrowser = isIPhoneSafari();
      
      if (isIPhoneSafariBrowser) {
        // For iPhone Safari, clear JWT token and redirect to login
        console.log('🍎 iPhone Safari: JWT authentication failed, clearing token');
        localStorage.removeItem('jwt_token');
        localStorage.removeItem('user');
      } else {
        // For other browsers, clear session data
        console.log('🖥️ Regular browser: Session authentication failed');
        localStorage.removeItem('user');
      }
      
      // Redirect to login page
      if (window.location.pathname !== '/login' && window.location.pathname !== '/register') {
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

// File upload helper function (for thumbnails) with iPhone Safari optimizations
export const uploadFile = async (file, type = 'image') => {
  const isIPhoneSafariBrowser = isIPhoneSafari();
  
  // iPhone Safari specific file size limits
  const maxSize = isIPhoneSafariBrowser ? 
    (type === 'video' ? 25 * 1024 * 1024 : 5 * 1024 * 1024) : // 25MB video, 5MB image for iPhone Safari
    (type === 'video' ? 50 * 1024 * 1024 : 10 * 1024 * 1024); // 50MB video, 10MB image for others
  
  // Validate file size before upload
  if (file.size > maxSize) {
    const maxSizeMB = Math.round(maxSize / (1024 * 1024));
    throw new Error(isIPhoneSafariBrowser ? 
      `File too large for mobile upload. Please compress to under ${maxSizeMB}MB.` :
      `File size exceeds ${maxSizeMB}MB limit.`
    );
  }
  
  const formData = new FormData();
  formData.append(type === 'video' ? 'video' : 'thumbnail', file);
  
  console.log('📤 Starting file upload:', {
    fileName: file.name,
    fileSize: `${(file.size / 1024 / 1024).toFixed(2)}MB`,
    fileType: file.type,
    isIPhoneSafari: isIPhoneSafariBrowser,
    maxAllowed: `${Math.round(maxSize / (1024 * 1024))}MB`
  });
  
  try {
    const endpoint = type === 'video' ? '/api/courses/upload/video' : '/api/courses/upload/thumbnail';
    
    const response = await api.post(endpoint, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      // iPhone Safari specific timeout and retry settings
      timeout: isIPhoneSafariBrowser ? 600000 : 300000, // 10 minutes for iPhone Safari, 5 for others
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        console.log(`📊 Upload progress: ${percentCompleted}%${isIPhoneSafariBrowser ? ' (iPhone Safari)' : ''}`);
      }
    });
    
    console.log('✅ File upload successful:', {
      url: response.data.url,
      optimizedForMobile: response.data.optimizedForMobile,
      isIPhoneSafari: isIPhoneSafariBrowser
    });
    
    return response.data;
  } catch (error) {
    console.error('❌ File upload failed:', {
      message: error.message,
      response: error.response?.data,
      isIPhoneSafari: isIPhoneSafariBrowser
    });
    
    // Enhanced error handling for iPhone Safari
    if (isIPhoneSafariBrowser) {
      if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
        throw new Error('Upload timeout on mobile. Please try with a smaller file or check your connection.');
      } else if (error.response?.status === 413 || error.message.includes('large')) {
        throw new Error('File too large for mobile upload. Please compress the file and try again.');
      } else if (error.response?.status === 0 || error.message.includes('Network Error')) {
        throw new Error('Network error on mobile. Please check your connection and try again.');
      }
    }
    
    // Use server error message if available, otherwise generic message
    const errorMessage = error.response?.data?.error || error.response?.data?.message || error.message;
    throw new Error(errorMessage);
  }
};

// Image upload helper function (for thumbnails)
export const uploadImage = async (file) => {
  return await uploadFile(file, 'image');
};

// Video upload helper function
export const uploadVideo = async (file) => {
  return await uploadFile(file, 'video');
};

export { isIPhoneSafari };
export default api;