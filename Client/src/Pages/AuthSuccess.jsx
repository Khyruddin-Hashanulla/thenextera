import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AuthSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState('');

  useEffect(() => {
    const handleAuthSuccess = () => {
      try {
        // Check if we're on a hash route
        const isHashRoute = window.location.hash && window.location.hash.includes('/auth-success');
        
        // Extract query parameters from the appropriate location
        let params;
        if (isHashRoute) {
          // Extract params from the hash fragment
          const hashParams = window.location.hash.split('?')[1];
          params = new URLSearchParams(hashParams);
        } else {
          // Extract params from the regular query string
          params = new URLSearchParams(location.search);
        }
        
        const token = params.get('token');
        const userParam = params.get('user');
        
        console.log('Auth Success - Token received:', !!token);
        console.log('Auth Success - User data received:', !!userParam);
        
        if (token) {
          // Store token
          localStorage.setItem('token', token);
          console.log('Token stored in localStorage');
          
          // Store user if available
          if (userParam) {
            try {
              const user = JSON.parse(decodeURIComponent(userParam));
              console.log('Parsed user data:', user);
              localStorage.setItem('user', JSON.stringify(user));
              console.log('User data stored in localStorage');
            } catch (e) {
              console.error('Failed to parse user data:', e);
              setError('Failed to process user data');
            }
          }
          
          // Redirect to dashboard using window.location for a full page reload
          console.log('Redirecting to dashboard...');
          setTimeout(() => {
            window.location.href = '/dashboard';
          }, 1500);
        } else {
          console.error('No token found in URL');
          setError('No authentication token received');
          setTimeout(() => {
            window.location.href = '/login';
          }, 1500);
        }
      } catch (e) {
        console.error('Error handling auth success:', e);
        setError('Authentication process failed');
        setTimeout(() => {
          window.location.href = '/login';
        }, 1500);
      }
    };

    // Call the handler immediately
    handleAuthSuccess();
  }, [navigate, location]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center">Authentication Successful!</h1>
        {error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <>
            <p className="text-center">You are now logged in.</p>
            <p className="text-center">Redirecting to dashboard...</p>
          </>
        )}
        <div className="flex justify-center mt-4">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      </div>
    </div>
  );
};

export default AuthSuccess;