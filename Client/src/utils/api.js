import axios from 'axios';

// Use environment variable for API URL, fallback to localhost for development
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8081',
  withCredentials: true, // Essential for session-based authentication
  // Don't set global Content-Type - let axios set it automatically based on data type
  // This allows FormData to be sent as multipart/form-data for file uploads
});

// Add a request interceptor for session-based authentication
api.interceptors.request.use(
  (config) => {
    // For session-based auth, we don't need to add tokens
    // The session cookie will be automatically sent with withCredentials: true
    
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
      hasAuthHeader: !!config.headers.Authorization
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
      hasSessionData: !!response.data.sessionId
    });
    return response;
  },
  (error) => {
    console.error('API Error:', {
      status: error.response?.status,
      url: error.config?.url,
      method: error.config?.method,
      message: error.message,
      data: error.response?.data
    });

    // Handle session expiration or authentication errors
    if (error.response?.status === 401) {
      console.warn('Authentication failed - session may have expired');
      // Clear local user data if session is invalid
      localStorage.removeItem('user');
      localStorage.removeItem('token'); // Remove legacy token
      
      // Optionally redirect to login or dispatch logout action
      // This depends on your app's routing setup
    }

    return Promise.reject(error);
  }
);

// File upload helper function (for thumbnails)
api.uploadFile = async (file, type = 'image') => {
  try {
    // Create form data
    const formData = new FormData();
    formData.append('thumbnail', file); // Backend expects 'thumbnail' field name

    // Upload file to thumbnail endpoint
    const response = await api.post('/api/courses/upload/thumbnail', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    return response.data.url;
  } catch (error) {
    console.error('File upload error:', error);
    throw error;
  }
};

// Image upload helper function (for thumbnails)
api.uploadImage = async (file) => {
  try {
    // Create form data
    const formData = new FormData();
    formData.append('thumbnail', file); // Backend expects 'thumbnail' field name

    console.log('Uploading image file:', {
      name: file.name,
      type: file.type,
      size: file.size
    });

    // Upload image to thumbnail endpoint
    const response = await api.post('/api/courses/upload/thumbnail', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    console.log('Image upload response:', response.data);
    return response.data.url;
  } catch (error) {
    console.error('Image upload error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
    throw error;
  }
};

// Video upload helper function
api.uploadVideo = async (file) => {
  try {
    // Validate video file
    if (!file.type.startsWith('video/')) {
      throw new Error('Invalid file type. Please upload a video file.');
    }

    console.log('Uploading video file:', {
      name: file.name,
      type: file.type,
      size: file.size
    });

    // Create form data
    const formData = new FormData();
    formData.append('video', file);

    // Upload video with progress tracking
    const response = await api.post('/api/courses/upload/video', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        console.log('Upload progress:', percentCompleted);
        // You can use this to update a progress bar
      }
    });

    console.log('Upload response:', response.data);
    return response.data.url;
  } catch (error) {
    console.error('Video upload error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
    throw error;
  }
};

export default api;