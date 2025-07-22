import { createContext, useState, useContext, useEffect } from 'react';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

// Create the hook but don't export it here
const useAuth = () => useContext(AuthContext);

// Create the provider component but don't export it here
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check for remember me token
    const checkRememberMe = async () => {
      try {
        const response = await api.get('/auth/check-remember-me');
        if (response.data.user) {
          setUser(response.data.user);
          localStorage.setItem('user', JSON.stringify(response.data.user));
        }
      } catch (err) {
        console.error('Remember me check failed:', err);
        // Clear invalid data
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    // Remove JWT token logic - using session-based authentication only
    localStorage.removeItem('token'); // Clean up any old JWT tokens
    
    // Remove any Authorization headers that might interfere with session cookies
    delete api.defaults.headers.common['Authorization'];
    
    const storedUser = localStorage.getItem('user');
    
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        setLoading(false);
      } catch (err) {
        console.error('Failed to parse stored user data:', err);
        localStorage.removeItem('user');
        checkRememberMe();
      }
    } else {
      checkRememberMe();
    }
  }, []);

  const register = async (userData) => {
    try {
      setError(null);
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (err) {
      setError(err.response?.data || 'Registration failed');
      throw err;
    }
  };

  const verifyOTP = async (otpData) => {
    try {
      setError(null);
      const response = await api.post('/auth/verify-otp', otpData);
      return response.data;
    } catch (err) {
      setError(err.response?.data || 'OTP verification failed');
      throw err;
    }
  };

  const resendOTP = async (emailData) => {
    try {
      setError(null);
      const response = await api.post('/auth/resend-verification', emailData);
      return response.data;
    } catch (err) {
      setError(err.response?.data || 'Failed to resend OTP');
      throw err;
    }
  };

  const login = async (credentials) => {
    try {
      setError(null);
      const response = await api.post('/auth/login', credentials);
      
      console.log('Full login response:', response.data);
      
      // Handle session-based response structure
      const { user, success, sessionId } = response.data;
      
      console.log('Login response:', {
        user,
        success,
        hasSessionId: !!sessionId
      });
      
      // Check if login was successful and user data exists
      if (success && user) {
        // Ensure consistent id field
        const normalizedUser = {
          ...user,
          id: user.id || user._id, // Normalize the ID field
          _id: user._id || user.id  // Keep both versions
        };
        
        console.log('Normalized user data:', normalizedUser);
        
        setUser(normalizedUser);
        // Store user data but no token (session-based auth)
        localStorage.setItem('user', JSON.stringify(normalizedUser));
        
        // Remove JWT token from API headers (using session cookies now)
        delete api.defaults.headers.common['Authorization'];
        
        // Ensure cookies are sent with requests for session-based auth
        api.defaults.withCredentials = true;
        
        console.log('Login successful - session-based authentication active');
      } else {
        console.error('Login failed - invalid response structure:', response.data);
        throw new Error('Invalid response from server');
      }
      
      return response.data;
    } catch (err) {
      console.error('Login error:', {
        error: err.message,
        response: err.response?.data,
        status: err.response?.status
      });
      
      // Extract the error message properly from backend response
      const errorMessage = err.response?.data?.error || 
                          err.response?.data?.message || 
                          err.response?.data || 
                          'Login failed. Please try again.';
      
      setError(errorMessage);
      throw err;
    }
  };

  const logout = async () => {
    try {
      // Try to call the logout endpoint to destroy session on server
      try {
        const response = await api.post('/auth/logout');
        console.log('Server logout successful:', response.data);
      } catch (err) {
        console.warn('Logout request failed:', err);
        // Continue with local cleanup even if server request fails
      }

      // Clear local storage (remove token reference since we're using sessions)
      localStorage.removeItem('token'); // Keep for backward compatibility
      localStorage.removeItem('user');
      
      // Clear auth header (not needed for sessions but good cleanup)
      delete api.defaults.headers.common['Authorization'];
      
      // Ensure cookies are still sent for future requests
      api.defaults.withCredentials = true;
      
      // Clear user state
      setUser(null);
      setError(null);
      
      console.log('Client logout completed - session should be destroyed');
      return true;
    } catch (err) {
      console.error('Logout failed:', err);
      // Still return true as we've cleared local state
      return true;
    }
  };

  const forgotPassword = async (email) => {
    try {
      setError(null);
      const response = await api.post('/auth/forgot-password', { email });
      return response.data;
    } catch (err) {
      setError(err.response?.data || 'Password reset request failed');
      throw err;
    }
  };

  const resetPassword = async (token, newPassword) => {
    try {
      setError(null);
      console.log('AuthContext: Making reset password request');
      const response = await api.post(`/auth/reset-password/${token}`, { password: newPassword });
      console.log('AuthContext: Reset password response:', response.data);
      return response.data;
    } catch (err) {
      console.error('AuthContext: Reset password error:', err);
      const errorMessage = err.response?.data?.error || err.response?.data?.message || err.response?.data || 'Password reset failed';
      setError(errorMessage);
      throw err;
    }
  };

  const verifyEmail = async (token) => {
    try {
      setError(null);
      const response = await api.get(`/auth/verify-email/${token}`);
      return response.data;
    } catch (err) {
      setError(err.response?.data || 'Email verification failed');
      throw err;
    }
  };

  const value = {
    user,
    loading,
    error,
    register,
    verifyOTP,
    resendOTP,
    login,
    logout,
    forgotPassword,
    resetPassword,
    verifyEmail,
    isInstructor: user?.role === 'Instructor' || user?.role === 'Admin',  // Changed to proper case
    isAdmin: user?.role === 'Admin'  // Add missing isAdmin property
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Protected Route component
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
    
    if (!loading && user && allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
      navigate('/');
    }
  }, [user, loading, navigate, allowedRoles]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return children;
};

// Export all components and hooks at once - remove any previous exports
export { AuthProvider, useAuth, ProtectedRoute }; 