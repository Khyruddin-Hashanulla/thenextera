import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const EmailVerification = () => {
  const [status, setStatus] = useState('verifying');
  const { token } = useParams();
  const { verifyEmail } = useAuth();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        await verifyEmail(token);
        setStatus('success');
      } catch (error) {
        setStatus('error');
      }
    };

    verifyToken();
  }, [token, verifyEmail]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Email Verification
          </h2>
          
          {status === 'verifying' && (
            <div className="mt-2 text-center text-sm text-gray-600">
              <p>Verifying your email address...</p>
              <div className="mt-4 flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
              </div>
            </div>
          )}

          {status === 'success' && (
            <div className="mt-2">
              <div className="rounded-md bg-green-50 p-4">
                <div className="text-sm text-green-700 text-center">
                  Your email has been verified successfully!
                </div>
              </div>
              <div className="mt-4 text-center">
                <Link
                  to="/login"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Proceed to Login
                </Link>
              </div>
            </div>
          )}

          {status === 'error' && (
            <div className="mt-2">
              <div className="rounded-md bg-red-50 p-4">
                <div className="text-sm text-red-700 text-center">
                  Invalid or expired verification link. Please request a new verification email.
                </div>
              </div>
              <div className="mt-4 text-center">
                <Link
                  to="/login"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Back to Login
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailVerification; 