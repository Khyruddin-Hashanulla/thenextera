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
    const initializeAuth = async () => {
      try {
        console.log('🔄 Initializing authentication...');
        
        // Use session-based authentication for all browsers to prevent conflicts
        // This ensures consistent behavior across all platforms
        try {
          const response = await api.get('/api/auth/me');
          if (response.data.user) {
            setUser(response.data.user);
            console.log('✅ Session authentication successful:', response.data.user.name);
          } else {
            console.log('❌ No session found');
            setUser(null);
          }
        } catch (error) {
          console.log('❌ Session authentication failed:', error.response?.status);
          setUser(null);
          
          // Clear any stored data on auth failure
          localStorage.removeItem('jwt_token');
          localStorage.removeItem('user');
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const register = async (userData) => {
    try {
      setError(null);
      const response = await api.post('/api/auth/register', userData);
      return response.data;
    } catch (err) {
      setError(err.response?.data || 'Registration failed');
      throw err;
    }
  };

  const verifyOTP = async (otpData) => {
    try {
      setError(null);
      const response = await api.post('/api/auth/verify-otp', otpData);
      return response.data;
    } catch (err) {
      setError(err.response?.data || 'OTP verification failed');
      throw err;
    }
  };

  const resendOTP = async (emailData) => {
    try {
      setError(null);
      const response = await api.post('/api/auth/resend-verification', emailData);
      return response.data;
    } catch (err) {
      setError(err.response?.data || 'Failed to resend OTP');
      throw err;
    }
  };

  const login = async (credentials) => {
    try {
      setError(null);
      const response = await api.post('/api/auth/login', credentials);
      
      console.log('Full login response:', response.data);
      
      const { user, success, sessionId } = response.data;
      
      if (!success || !user) {
        throw new Error('Login failed - invalid response structure');
      }
      
      // Store user data for session-based auth
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      
      console.log('🖥️ Regular browser: Session authentication successful:', {
        userId: user.id,
        role: user.role,
        sessionId: sessionId
      });
      
      return response.data;
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data || 'Login failed');
      throw err;
    }
  };

  const logout = async () => {
    try {
      setError(null);
      
      // Call server logout to destroy session
      console.log('🖥️ Regular browser: Logging out (destroying session)');
      try {
        await api.post('/api/auth/logout');
      } catch (err) {
        console.error('Server logout error:', err);
        // Continue with local cleanup even if server logout fails
      }
      localStorage.removeItem('user');
      
      setUser(null);
      console.log('Logout successful');
    } catch (err) {
      console.error('Logout error:', err);
      setError(err.response?.data || 'Logout failed');
      throw err;
    }
  };

  const forgotPassword = async (emailData) => {
    try {
      setError(null);
      const response = await api.post('/api/auth/forgot-password', emailData);
      return response.data;
    } catch (err) {
      setError(err.response?.data || 'Failed to send reset email');
      throw err;
    }
  };

  const resetPassword = async (resetData) => {
    try {
      setError(null);
      const response = await api.post(`/api/auth/reset-password/${resetData.token}`, {
        password: resetData.password
      });
      return response.data;
    } catch (err) {
      setError(err.response?.data || 'Password reset failed');
      throw err;
    }
  };

  const updateProfile = async (profileData) => {
    try {
      setError(null);
      const response = await api.put('/api/auth/profile', profileData);
      
      // Update user state with new profile data
      const updatedUser = { ...user, ...response.data.user };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      return response.data;
    } catch (err) {
      setError(err.response?.data || 'Profile update failed');
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
    updateProfile,
    isAuthenticated: !!user,
    // Role-based helper properties
    isInstructor: user?.role === 'Instructor' || user?.role === 'Teacher' || user?.role === 'Admin',
    isAdmin: user?.role === 'Admin',
    isStudent: user?.role === 'Student'
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Protected Route component
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      console.log('ProtectedRoute: User not authenticated, redirecting to login');
      navigate('/login');
    } else if (!loading && user && allowedRoles.length > 0) {
      if (!allowedRoles.includes(user.role)) {
        console.log('ProtectedRoute: User role not authorized:', user.role, 'Required:', allowedRoles);
        navigate('/unauthorized');
      }
    }
  }, [user, loading, navigate, allowedRoles]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return null; // Will redirect to login
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return null; // Will redirect to unauthorized
  }

  return children;
};

// Export all components and hooks at once - remove any previous exports
export { AuthProvider, useAuth, ProtectedRoute };