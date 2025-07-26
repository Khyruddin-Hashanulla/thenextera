import axios from 'axios';

// iPhone Safari detection utility
const isIPhoneSafari = () => {
  const userAgent = navigator.userAgent;
  const isIPhone = /iPhone/.test(userAgent);
  const isSafari = /Safari/.test(userAgent) && !/Chrome/.test(userAgent);
  return isIPhone && isSafari;
};

// Use environment variable for API URL, fallback to localhost for development
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8081',
  withCredentials: true, // Essential for session-based authentication
  // Don't set global Content-Type - let axios set it automatically based on data type
  // This allows FormData to be sent as multipart/form-data for file uploads
});

// Add a request interceptor for logging and debugging
api.interceptors.request.use(
  (config) => {
    console.log(`🌐 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    
    // Add JWT token for iPhone Safari only
    if (isIPhoneSafari()) {
      const token = localStorage.getItem('authToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log('🍎 iPhone Safari: Adding JWT token to request');
      }
    }
    
    return config;
  },
  (error) => {
    console.error('🚨 API Request Error:', error);
    return Promise.reject(error);
  }
);

// Add a response interceptor for debugging and error handling
api.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.config.method?.toUpperCase()} ${response.config.url} - ${response.status}`);
    
    // Store JWT token for iPhone Safari
    if (isIPhoneSafari() && response.data?.token) {
      localStorage.setItem('authToken', response.data.token);
      console.log('🍎 iPhone Safari: JWT token stored');
    }
    
    return response;
  },
  (error) => {
    console.error(`❌ API Response Error: ${error.config?.method?.toUpperCase()} ${error.config?.url} - ${error.response?.status || 'Network Error'}`);
    
    // Handle authentication errors
    if (error.response?.status === 401) {
      // Clear stored token for iPhone Safari
      if (isIPhoneSafari()) {
        localStorage.removeItem('authToken');
        console.log('🍎 iPhone Safari: JWT token cleared due to 401');
      }
      
      // Redirect to login if not already there
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

// File upload helper function (for thumbnails) with mobile optimizations
export const uploadFile = async (file, type = 'image') => {
  const isMobile = /Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  // Mobile specific file size limits
  const maxSize = isMobile ?
    (type === 'video' ? 30 * 1024 * 1024 : 8 * 1024 * 1024) : // 30MB video, 8MB image for mobile
    (type === 'video' ? 50 * 1024 * 1024 : 10 * 1024 * 1024); // 50MB video, 10MB image for desktop
  
  // Validate file size before upload
  if (file.size > maxSize) {
    const maxSizeMB = Math.round(maxSize / (1024 * 1024));
    throw new Error(isMobile ?
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
    isMobile: isMobile,
    maxAllowed: `${Math.round(maxSize / (1024 * 1024))}MB`
  });
  
  const maxRetries = isMobile ? 3 : 2;
  let lastError;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`📤 Upload attempt ${attempt}/${maxRetries}${isMobile ? ' (Mobile)' : ''}`);
      
      const endpoint = type === 'video' ? '/api/courses/upload/video' : '/api/courses/upload/thumbnail';
      
      const response = await api.post(endpoint, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        // Aggressive timeout settings for mobile
        timeout: isMobile ? 900000 : 300000, // 15min/5min
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          console.log(`📊 Upload progress: ${percentCompleted}%${isMobile ? ' (Mobile)' : ''}`);
        },
        // Enhanced axios configuration for mobile networks
        ...(isMobile && {
          maxContentLength: Infinity,
          maxBodyLength: Infinity,
          // Retry configuration for mobile
          'axios-retry': {
            retries: 3,
            retryDelay: (retryCount) => {
              return Math.min(1000 * Math.pow(2, retryCount), 5000);
            },
            retryCondition: (error) => {
              return error.code === 'ECONNABORTED' || 
                     error.code === 'NETWORK_ERROR' ||
                     error.response?.status >= 500;
            }
          }
        })
      });
      
      console.log('✅ Upload successful:', {
        attempt: attempt,
        fileName: file.name,
        url: response.data.url,
        isMobile: isMobile
      });
      
      return response.data;
      
    } catch (error) {
      lastError = error;
      
      console.error(`❌ Upload attempt ${attempt} failed:`, {
        message: error.message,
        code: error.code,
        status: error.response?.status,
        isNetworkError: error.code === 'ECONNABORTED' || error.code === 'NETWORK_ERROR',
        isMobile: isMobile
      });
      
      // Don't retry on certain errors
      if (error.response?.status === 413 || // Payload too large
          error.response?.status === 400 || // Bad request
          error.response?.status === 401) { // Unauthorized
        throw error;
      }
      
      // Wait before retry with exponential backoff (longer for mobile)
      if (attempt < maxRetries) {
        const waitTime = Math.min(
          1000 * Math.pow(2, attempt - 1), 
          isMobile ? 10000 : 5000
        );
        console.log(`⏳ Waiting ${waitTime}ms before retry...`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
      }
    }
  }
  
  // Provide user-friendly error message for mobile users
  const errorMessage = isMobile ?
    `Mobile upload failed after ${maxRetries} attempts. Please check your connection and try again. Error: ${lastError.message}` :
    `Upload failed after ${maxRetries} attempts. Error: ${lastError.message}`;
    
  throw new Error(errorMessage);
};

// Image upload helper function (for thumbnails)
export const uploadImage = async (file) => {
  return await uploadFile(file, 'image');
};

// Video upload helper function
export const uploadVideo = async (file) => {
  return await uploadFile(file, 'video');
};

export default api;