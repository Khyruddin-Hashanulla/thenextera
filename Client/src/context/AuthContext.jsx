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

    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (token) {
      // Set the token in the API instance
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
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
    } else {
      setLoading(false);
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

  const login = async (credentials) => {
    try {
      setError(null);
      const response = await api.post('/auth/login', credentials);
      const { user, token } = response.data;
      
      console.log('Login response:', {
        user,
        hasToken: !!token
      });
      
      if (user && token) {
        // Ensure consistent id field
        const normalizedUser = {
          ...user,
          id: user.id || user._id, // Normalize the ID field
          _id: user._id || user.id  // Keep both versions
        };
        
        console.log('Normalized user data:', normalizedUser);
        
        setUser(normalizedUser);
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(normalizedUser));
        
        // Set the token in the API instance
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      } else {
        throw new Error('Invalid response from server');
      }
      
      return response.data;
    } catch (err) {
      console.error('Login error:', {
        error: err.message,
        response: err.response?.data,
        status: err.response?.status
      });
      setError(err.response?.data?.message || err.response?.data || 'Login failed');
      throw err;
    }
  };

  const logout = async () => {
    try {
      // Try to call the logout endpoint
      try {
        await api.post('/auth/logout');
      } catch (err) {
        console.warn('Logout request failed:', err);
        // Continue with local cleanup even if server request fails
      }

      // Clear local storage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // Clear auth header
      delete api.defaults.headers.common['Authorization'];
      
      // Clear user state
      setUser(null);
      setError(null);
      
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
      const response = await api.post(`/auth/reset-password/${token}`, { password: newPassword });
      return response.data;
    } catch (err) {
      setError(err.response?.data || 'Password reset failed');
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
    login,
    logout,
    forgotPassword,
    resetPassword,
    verifyEmail,
    isInstructor: user?.role === 'Instructor' || user?.role === 'Admin'  // Changed to proper case
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