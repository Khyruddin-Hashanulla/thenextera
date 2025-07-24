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

// File upload helper function (for thumbnails)
const uploadFile = (file, type = 'image') => {
  const formData = new FormData();
  formData.append(type, file);
  
  // Create config object for upload
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };
  
  // For iPhone Safari, explicitly add JWT token to headers
  const isIPhoneSafariBrowser = isIPhoneSafari();
  if (isIPhoneSafariBrowser) {
    const token = localStorage.getItem('jwt_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('🍎 iPhone Safari: Adding JWT token to upload request');
    }
  }
  
  return api.post(`/api/courses/upload/${type}`, formData, config);
};

// Image upload helper function (for thumbnails)
const uploadImage = (file) => {
  const formData = new FormData();
  formData.append('thumbnail', file);
  
  // Create config object for upload
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };
  
  // For iPhone Safari, explicitly add JWT token to headers
  const isIPhoneSafariBrowser = isIPhoneSafari();
  if (isIPhoneSafariBrowser) {
    const token = localStorage.getItem('jwt_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('🍎 iPhone Safari: Adding JWT token to thumbnail upload');
    }
  }
  
  return api.post('/api/courses/upload/thumbnail', formData, config);
};

// Video upload helper function
const uploadVideo = (file) => {
  const formData = new FormData();
  formData.append('video', file);
  
  // Create config object for upload
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: (progressEvent) => {
      const percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      console.log(`Upload Progress: ${percentCompleted}%`);
    },
  };
  
  // For iPhone Safari, explicitly add JWT token to headers
  const isIPhoneSafariBrowser = isIPhoneSafari();
  if (isIPhoneSafariBrowser) {
    const token = localStorage.getItem('jwt_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('🍎 iPhone Safari: Adding JWT token to video upload');
    }
  }
  
  return api.post('/api/courses/upload/video', formData, config);
};

export { isIPhoneSafari };
export default api;