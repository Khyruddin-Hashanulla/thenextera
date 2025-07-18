import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add a request interceptor to add the token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      // Log request details for debugging
      console.log('API Request:', {
        method: config.method,
        url: config.url,
        hasToken: !!token,
        headers: {
          ...config.headers,
          Authorization: config.headers.Authorization ? 'Bearer [REDACTED]' : undefined
        }
      });
    } else {
      console.warn('No token found in localStorage');
    }
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
      data: response.data
    });
    return response;
  },
  (error) => {
    console.error('API Error:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      url: error.config?.url,
      method: error.config?.method,
      headers: error.config?.headers ? {
        ...error.config.headers,
        Authorization: error.config.headers.Authorization ? 'Bearer [REDACTED]' : undefined
      } : undefined
    });

    if (error.response?.status === 401) {
      // Handle unauthorized access
      console.log('Unauthorized access, clearing credentials');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// File upload helper function
api.uploadFile = async (file, type = 'image') => {
  try {
    // Create form data
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);

    // Upload file
    const response = await api.post('/api/courses/upload', formData, {
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