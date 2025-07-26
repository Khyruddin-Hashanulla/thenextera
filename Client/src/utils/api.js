import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8081',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Request interceptor to add JWT token to all requests
api.interceptors.request.use(
  (config) => {
    console.log(`🌐 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    
    // Add JWT token from localStorage to Authorization header
    const token = localStorage.getItem('authToken');
    
    // Enhanced debugging for JWT token
    console.log('🔐 JWT Token Debug:', {
      hasToken: !!token,
      tokenLength: token ? token.length : 0,
      tokenPreview: token ? `${token.substring(0, 20)}...` : 'No token',
      isUploadRequest: config.url?.includes('/upload/'),
      currentHeaders: config.headers
    });
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('✅ JWT token added to Authorization header');
    } else {
      console.log('❌ No JWT token found in localStorage');
      
      // Check if user should be logged in
      const currentPath = window.location.pathname;
      if (!currentPath.includes('/login') && !currentPath.includes('/register')) {
        console.log('⚠️ User appears to be on protected page without JWT token');
      }
    }
    
    // Handle file uploads - remove Content-Type header for multipart/form-data
    if (config.data instanceof FormData) {
      console.log('📁 File upload detected - removing Content-Type header for multipart/form-data');
      delete config.headers['Content-Type'];
      // Browser will automatically set Content-Type: multipart/form-data with boundary
    }
    
    return config;
  },
  (error) => {
    console.error('❌ API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling and token management
api.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.config.method?.toUpperCase()} ${response.config.url} - ${response.status}`);
    
    // Store JWT token if provided in response
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token);
    }
    
    return response;
  },
  (error) => {
    console.log(`❌ API Response Error: ${error.config?.method?.toUpperCase()} ${error.config?.url} - ${error.response?.status}`);
    
    // Handle 401 Unauthorized - clear invalid token
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      
      // Only redirect to login if not already on login/register pages
      const currentPath = window.location.pathname;
      if (!currentPath.includes('/login') && !currentPath.includes('/register') && !currentPath.includes('/')) {
        console.log('🔄 Redirecting to login due to 401 error');
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

// Mobile detection utility
const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

// Enhanced upload helper with mobile optimization
export const uploadToCloudinary = async (file, uploadType = 'image', onProgress = null) => {
  try {
    const formData = new FormData();
    formData.append(uploadType === 'video' ? 'video' : 'thumbnail', file);

    // Mobile-specific optimizations
    const mobile = isMobile();
    const config = {
      timeout: mobile ? 120000 : 60000, // 2 minutes for mobile, 1 minute for desktop
      onUploadProgress: (progressEvent) => {
        if (onProgress) {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress(percentCompleted);
        }
      },
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    };

    // Determine upload endpoint
    const endpoint = uploadType === 'video' ? '/api/courses/upload/video' : '/api/courses/upload/thumbnail';
    
    console.log(`📤 Starting ${uploadType} upload:`, {
      fileName: file.name,
      fileSize: file.size,
      isMobile: mobile,
      timeout: config.timeout
    });

    const response = await api.post(endpoint, formData, config);
    
    if (response.data.success) {
      console.log(`✅ ${uploadType} upload successful:`, response.data.url);
      return {
        success: true,
        url: response.data.url,
        public_id: response.data.public_id
      };
    } else {
      throw new Error(response.data.error || 'Upload failed');
    }
  } catch (error) {
    console.error(`❌ ${uploadType} upload failed:`, error);
    
    // Enhanced error handling for mobile
    if (error.code === 'ECONNABORTED') {
      throw new Error(`Upload timeout - please check your connection and try again`);
    } else if (error.response?.status === 413) {
      throw new Error('File too large - please choose a smaller file');
    } else if (error.response?.status === 401) {
      throw new Error('Authentication failed - please log in again');
    } else {
      throw new Error(error.response?.data?.error || error.message || 'Upload failed');
    }
  }
};

export default api;