import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [debugInfo, setDebugInfo] = useState('');
  const { token } = useParams();
  const navigate = useNavigate();
  const { resetPassword, user, logout } = useAuth();

  // Add comprehensive debugging and handle logged-in users
  useEffect(() => {
    console.log('=== ResetPassword Component Debug Info ===');
    console.log('Component mounted at:', new Date().toISOString());
    console.log('Token from URL:', token);
    console.log('Current user state:', user);
    console.log('Current URL:', window.location.href);
    console.log('Current hash:', window.location.hash);
    
    // Debug AuthContext functions
    console.log('🔍 AuthContext functions availability:', {
      resetPassword: typeof resetPassword,
      user: typeof user,
      logout: typeof logout,
      resetPasswordExists: !!resetPassword,
      resetPasswordIsFunction: typeof resetPassword === 'function'
    });
    
    if (!resetPassword) {
      console.error('❌ CRITICAL: resetPassword function is not available from AuthContext!');
    } else {
      console.log('✅ resetPassword function is available');
    }
    
    setDebugInfo(`Token: ${token}, User: ${user ? 'Logged in' : 'Not logged in'}, URL: ${window.location.href}, resetPassword: ${typeof resetPassword}`);
    
    // If user is already logged in, log them out for password reset
    if (user) {
      console.log('User is logged in during password reset, logging out...');
      logout().then(() => {
        console.log('User logged out for password reset');
      }).catch(err => {
        console.error('Error logging out user for password reset:', err);
      });
    }
    
    // Prevent any automatic navigation
    const handleBeforeUnload = (e) => {
      console.log('Page is about to unload/navigate away');
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [user, logout, token, resetPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }

    if (password.length < 6) {
      return setError('Password must be at least 6 characters long');
    }

    try {
      setError('');
      setLoading(true);
      console.log('🔐 Attempting password reset with token:', token);
      
      // Debug function availability right before calling
      console.log('🔍 Pre-call debug:', {
        resetPasswordType: typeof resetPassword,
        resetPasswordExists: !!resetPassword,
        resetPasswordIsFunction: typeof resetPassword === 'function',
        tokenExists: !!token,
        passwordExists: !!password
      });
      
      if (!resetPassword) {
        throw new Error('resetPassword function is not available from AuthContext');
      }
      
      if (typeof resetPassword !== 'function') {
        throw new Error(`resetPassword is not a function, it's a ${typeof resetPassword}`);
      }
      
      console.log('✅ About to call resetPassword function...');
      const response = await resetPassword({ token, password });
      console.log('✅ Password reset response:', response);
      
      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      console.error('❌ Password reset error:', err);
      
      // Better error handling for different response formats
      let errorMessage = 'Failed to reset password';
      
      if (err.response) {
        // Server responded with error status
        if (err.response.data) {
          if (typeof err.response.data === 'string') {
            errorMessage = err.response.data;
          } else if (err.response.data.error) {
            errorMessage = err.response.data.error;
          } else if (err.response.data.message) {
            errorMessage = err.response.data.message;
          }
        }
      } else if (err.message) {
        // Network or other error
        errorMessage = err.message;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-gray-800/50 backdrop-blur-sm p-8 rounded-lg shadow-2xl border border-gray-700/50">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-100">
            Reset your password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-100">
            Please enter your new password
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="text-sm text-red-700">{error}</div>
            </div>
          )}

          {success && (
            <div className="rounded-md bg-green-50 p-4">
              <div className="text-sm text-green-700">
                Password reset successful! Redirecting to login...
              </div>
            </div>
          )}

          <div className="rounded-md shadow-sm -space-y-px">
            <div className="mb-4">
              <label htmlFor="password" className="sr-only">
                New Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mt-4">
              <label htmlFor="confirm-password" className="sr-only">
                Confirm New Password
              </label>
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading || success}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
          </div>

          <div className="text-sm text-center">
            <Link
              to="/login"
              className="font-medium text-gray-100 hover:text-gray-500"
            >
              Back to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword; 