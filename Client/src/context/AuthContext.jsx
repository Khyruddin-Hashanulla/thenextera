import { createContext, useState, useContext, useEffect } from 'react';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

// Create the provider component
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        console.log('🔐 Initializing JWT authentication state...');
        
        // Check if JWT token exists in localStorage
        const token = localStorage.getItem('authToken');
        if (!token) {
          console.log('❌ No JWT token found');
          setLoading(false);
          return;
        }
        
        // Call the auth check endpoint with JWT token
        const response = await api.get('/api/auth/me');
        
        if (response.data.success && response.data.user) {
          setUser(response.data.user);
          console.log('✅ JWT authentication initialized:', {
            userId: response.data.user.id,
            name: response.data.user.name,
            role: response.data.user.role,
            authType: response.data.authType
          });
          console.log('🔍 Full response data:', response.data);
        }
      } catch (error) {
        console.log('❌ JWT authentication initialization failed:', error.response?.status);
        // Clear invalid token
        localStorage.removeItem('authToken');
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email, password, rememberMe = false) => {
    try {
      setError(null);
      setLoading(true);

      const response = await api.post('/api/auth/login', {
        email,
        password,
        rememberMe
      });

      if (response.data.success) {
        setUser(response.data.user);
        
        // Store JWT token in localStorage
        localStorage.setItem('authToken', response.data.token);
        
        console.log('✅ JWT login successful:', {
          userId: response.data.user.id,
          name: response.data.user.name,
          role: response.data.user.role,
          authType: response.data.authType
        });

        // Return success to let the component handle navigation
        return {
          success: true,
          user: response.data.user
        };
      }
    } catch (error) {
      console.error('Login error:', error);
      setError(error.response?.data?.error || 'Login failed');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setError(null);
      setLoading(true);

      console.log('🔐 Registration attempt:', {
        name: userData.name,
        email: userData.email,
        role: userData.role,
        wantsToBeInstructor: userData.wantsToBeInstructor
      });

      const response = await api.post('/api/auth/register', userData);

      if (response.data.success) {
        console.log('✅ Registration successful:', response.data.message);
        
        // Registration successful - user needs to verify email
        // Don't auto-login, redirect to login page with success message
        return {
          success: true,
          message: response.data.message,
          requiresVerification: true
        };
      }
    } catch (error) {
      console.error('Registration error:', error);
      const errorMessage = error.response?.data?.error || 'Registration failed';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      // Call logout endpoint
      await api.post('/api/auth/logout');
    } catch (error) {
      console.error('Logout API error:', error);
    } finally {
      // Clear user state and token regardless of API response
      setUser(null);
      localStorage.removeItem('authToken');
      
      // Return success to let the component handle navigation
      return {
        success: true
      };
    }
  };

  const forgotPassword = async ({ email }) => {
    try {
      setError(null);
      setLoading(true);

      console.log('🔐 Forgot password request:', { email });

      const response = await api.post('/api/auth/forgot-password', { email });

      if (response.data.success) {
        console.log('✅ Forgot password email sent:', response.data.message);
        return {
          success: true,
          message: response.data.message
        };
      }
    } catch (error) {
      console.error('Forgot password error:', error);
      const errorMessage = error.response?.data?.error || 'Failed to send reset email';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async ({ token, password }) => {
    try {
      setError(null);
      setLoading(true);

      console.log('🔐 Reset password request:', { token: token?.substring(0, 10) + '...' });

      const response = await api.post(`/api/auth/reset-password/${token}`, { password });

      if (response.data.success) {
        console.log('✅ Password reset successful:', response.data.message);
        return {
          success: true,
          message: response.data.message
        };
      }
    } catch (error) {
      console.error('Reset password error:', error);
      const errorMessage = error.response?.data?.error || 'Failed to reset password';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async ({ email, otp }) => {
    try {
      setError(null);
      setLoading(true);

      console.log('🔐 OTP verification request:', { email, otp: otp?.substring(0, 2) + '****' });

      const response = await api.post('/api/auth/verify-otp', { email, otp });

      if (response.data.success) {
        console.log('✅ OTP verification successful:', response.data.message);
        return {
          success: true,
          message: response.data.message,
          instructorApplicationCreated: response.data.instructorApplicationCreated
        };
      }
    } catch (error) {
      console.error('OTP verification error:', error);
      const errorMessage = error.response?.data?.error || 'Failed to verify OTP';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const resendOTP = async ({ email }) => {
    try {
      setError(null);
      setLoading(true);

      console.log('🔐 Resend OTP request:', { email });

      const response = await api.post('/api/auth/resend-verification', { email });

      if (response.data.message) {
        console.log('✅ OTP resent successfully:', response.data.message);
        return {
          success: true,
          message: response.data.message
        };
      }
    } catch (error) {
      console.error('Resend OTP error:', error);
      const errorMessage = error.response?.data?.error || 'Failed to resend OTP';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const applyInstructor = async () => {
    try {
      setError(null);
      setLoading(true);

      console.log('🎓 Applying for instructor role...');
      console.log('🔍 Current user state:', {
        userId: user?.id,
        userRole: user?.role,
        userName: user?.name,
        userEmail: user?.email,
        hasInstructorApplication: !!user?.instructorApplication,
        currentApplicationStatus: user?.instructorApplication?.status,
        wantsToBeInstructor: user?.wantsToBeInstructor
      });

      const response = await api.post('/api/auth/apply-instructor');

      console.log('📡 Backend response:', response.data);

      if (response.data.message) {
        console.log('✅ Instructor application submitted:', response.data.message);
        
        // Update user state to reflect pending application
        if (user) {
          const updatedUser = {
            ...user,
            instructorApplication: {
              status: response.data.status,
              requestDate: response.data.applicationDate
            },
            wantsToBeInstructor: true
          };
          
          console.log('🔄 Updating user state:', updatedUser);
          setUser(updatedUser);
        }

        return {
          success: true,
          message: response.data.message,
          status: response.data.status,
          applicationDate: response.data.applicationDate
        };
      }
    } catch (error) {
      console.error('❌ Apply instructor error:', error);
      console.error('❌ Error details:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        message: error.message
      });
      const errorMessage = error.response?.data?.error || 'Failed to submit instructor application';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const updateUser = (updatedUserData) => {
    setUser(prevUser => ({
      ...prevUser,
      ...updatedUserData
    }));
  };

  const value = {
    user,
    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
    verifyOTP,
    resendOTP,
    applyInstructor,
    updateUser,
    loading,
    error,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'Admin',
    isInstructor: user?.role === 'Instructor' || user?.role === 'Admin'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Create the hook
const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Protected Route component
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        console.log('🔒 No authenticated user - redirecting to login');
        navigate('/login');
        return;
      }

      if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
        console.log(`🚫 User role '${user.role}' not in allowed roles:`, allowedRoles);
        navigate('/unauthorized');
        return;
      }

      console.log('✅ Access granted to protected route');
    }
  }, [user, loading, allowedRoles, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect in useEffect
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return null; // Will redirect in useEffect
  }

  return children;
};

// Export all components and hooks
export { AuthProvider, useAuth, ProtectedRoute };