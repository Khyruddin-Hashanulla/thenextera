import { createContext, useState, useContext, useEffect } from 'react';
import api, { isIPhoneSafari } from '../utils/api';
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
        const isIPhoneSafariBrowser = isIPhoneSafari();
        
        if (isIPhoneSafariBrowser) {
          // For iPhone Safari, check for JWT token
          console.log('🍎 iPhone Safari detected - checking JWT authentication');
          const token = localStorage.getItem('jwt_token');
          const storedUser = localStorage.getItem('user');
          
          if (token && storedUser) {
            try {
              const userData = JSON.parse(storedUser);
              setUser(userData);
              console.log('🍎 iPhone Safari: Restored user from JWT token');
            } catch (err) {
              console.error('🍎 iPhone Safari: Failed to parse stored user data:', err);
              localStorage.removeItem('jwt_token');
              localStorage.removeItem('user');
            }
          } else {
            console.log('🍎 iPhone Safari: No JWT token found');
          }
        } else {
          // For other browsers, check session-based authentication
          console.log('🖥️ Regular browser detected - checking session authentication');
          
          // Check for remember me token
          try {
            const response = await api.get('/api/auth/check-remember-me');
            if (response.data.user) {
              setUser(response.data.user);
              localStorage.setItem('user', JSON.stringify(response.data.user));
              console.log('🖥️ Regular browser: Restored user from remember me');
            }
          } catch (err) {
            console.error('🖥️ Regular browser: Remember me check failed:', err);
            
            // Check if there's stored user data from a previous session
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
              try {
                const userData = JSON.parse(storedUser);
                setUser(userData);
                console.log('🖥️ Regular browser: Restored user from localStorage');
              } catch (parseErr) {
                console.error('🖥️ Regular browser: Failed to parse stored user data:', parseErr);
                localStorage.removeItem('user');
              }
            }
          }
        }
      } catch (err) {
        console.error('Auth initialization error:', err);
      } finally {
        setLoading(false);
      }
    };

    // Clean up any old JWT tokens if not on iPhone Safari
    if (!isIPhoneSafari()) {
      localStorage.removeItem('jwt_token');
      // Remove any Authorization headers that might interfere with session cookies
      delete api.defaults.headers.common['Authorization'];
    }
    
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
      
      const isIPhoneSafariBrowser = isIPhoneSafari();
      
      if (isIPhoneSafariBrowser && response.data.authType === 'jwt') {
        // Handle JWT authentication for iPhone Safari
        console.log('🍎 iPhone Safari: Handling JWT login response');
        
        const { token, user } = response.data;
        
        if (!token) {
          throw new Error('No JWT token received from server');
        }
        
        // Store JWT token and user data
        localStorage.setItem('jwt_token', token);
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
        
        console.log('🍎 iPhone Safari: JWT authentication successful:', {
          userId: user.id,
          role: user.role,
          tokenStored: !!localStorage.getItem('jwt_token')
        });
        
        return response.data;
      } else {
        // Handle session-based authentication for other browsers
        console.log('🖥️ Regular browser: Handling session login response');
        
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
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data || 'Login failed');
      throw err;
    }
  };

  const logout = async () => {
    try {
      setError(null);
      const isIPhoneSafariBrowser = isIPhoneSafari();
      
      if (isIPhoneSafariBrowser) {
        // For iPhone Safari, just clear local storage (no server logout needed for JWT)
        console.log('🍎 iPhone Safari: Logging out (clearing JWT token)');
        localStorage.removeItem('jwt_token');
        localStorage.removeItem('user');
      } else {
        // For other browsers, call server logout to destroy session
        console.log('🖥️ Regular browser: Logging out (destroying session)');
        try {
          await api.post('/api/auth/logout');
        } catch (err) {
          console.error('Server logout error:', err);
          // Continue with local cleanup even if server logout fails
        }
        localStorage.removeItem('user');
      }
      
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
    isIPhoneSafari: isIPhoneSafari()
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