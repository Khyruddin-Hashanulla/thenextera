import { createContext, useState, useContext, useEffect } from 'react';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

// iPhone Safari detection utility
const isIPhoneSafari = () => {
  const userAgent = navigator.userAgent;
  const isIPhone = /iPhone/.test(userAgent);
  const isSafari = /Safari/.test(userAgent) && !/Chrome/.test(userAgent);
  return isIPhone && isSafari;
};

// Create the provider component
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        console.log('� Initializing hybrid authentication state...');
        
        // For iPhone Safari, check if we have a stored JWT token
        if (isIPhoneSafari()) {
          const token = localStorage.getItem('authToken');
          if (!token) {
            console.log('🍎 iPhone Safari: No JWT token found');
            setLoading(false);
            return;
          }
          console.log('🍎 iPhone Safari: JWT token found, verifying...');
        }
        
        // Call the auth check endpoint (handles both session and JWT)
        const response = await api.get('/api/auth/me');
        
        if (response.data.success && response.data.user) {
          setUser(response.data.user);
          console.log('✅ Authentication initialized:', {
            userId: response.data.user.id,
            name: response.data.user.name,
            role: response.data.user.role,
            authType: response.data.authType,
            isIPhoneSafari: response.data.isIPhoneSafari
          });
          console.log('🔍 Full response data:', response.data);
        }
      } catch (error) {
        console.log('❌ Authentication initialization failed:', error.response?.status);
        
        // Clear iPhone Safari token if authentication fails
        if (isIPhoneSafari()) {
          localStorage.removeItem('authToken');
          console.log('🍎 iPhone Safari: JWT token cleared');
        }
        
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email, password, rememberMe = false) => {
    try {
      console.log('🔐 Attempting hybrid login...');
      setError(null);
      
      const response = await api.post('/api/auth/login', {
        email,
        password,
        rememberMe
      });

      if (response.data.success) {
        setUser(response.data.user);
        
        console.log('✅ Login successful:', {
          userId: response.data.user.id,
          name: response.data.user.name,
          role: response.data.user.role,
          authType: response.data.authType,
          isIPhoneSafari: response.data.isIPhoneSafari
        });

        // Handle different authentication types
        if (response.data.isIPhoneSafari && response.data.token) {
          console.log('🍎 iPhone Safari: JWT authentication successful');
          // JWT token is stored by the API interceptor
        } else {
          console.log('� Session-based authentication successful');
        }

        // Use window.location.href for reliable redirect on all platforms
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 100);

        return { success: true };
      }
    } catch (error) {
      console.error('❌ Login failed:', error.response?.data?.error || error.message);
      setError(error.response?.data?.error || 'Login failed');
      return { 
        success: false, 
        error: error.response?.data?.error || 'Login failed' 
      };
    }
  };

  const logout = async () => {
    try {
      console.log('🚪 Attempting logout...');
      setError(null);
      
      // Clear iPhone Safari JWT token
      if (isIPhoneSafari()) {
        localStorage.removeItem('authToken');
        console.log('🍎 iPhone Safari: JWT token cleared');
      }
      
      // Call logout endpoint for session-based auth
      await api.post('/api/auth/logout');
      
      setUser(null);
      console.log('✅ Logout successful');
      
      // Use window.location.href for reliable redirect
      window.location.href = '/';
    } catch (error) {
      console.error('❌ Logout error:', error);
      // Force logout even if API call fails
      setUser(null);
      
      // Clear iPhone Safari token on error
      if (isIPhoneSafari()) {
        localStorage.removeItem('authToken');
      }
      
      window.location.href = '/';
    }
  };

  const value = {
    user,
    login,
    logout,
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