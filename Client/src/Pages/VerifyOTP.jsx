import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';

const VerifyOTP = () => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendMessage, setResendMessage] = useState('');
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  
  const location = useLocation();
  const navigate = useNavigate();
  const { verifyOTP, resendOTP } = useAuth();
  
  const email = location.state?.email;
  const intent = location.state?.intent; // Get the intent from registration

  // Redirect if no email provided
  useEffect(() => {
    if (!email) {
      navigate('/register');
    }
  }, [email, navigate]);

  // Countdown timer
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (otp.length !== 6) {
      setError('Please enter a 6-digit OTP code');
      setLoading(false);
      return;
    }

    try {
      console.log('🔍 Verifying OTP for user with intent:', intent);
      await verifyOTP({ email, otp });
      
      // If user chose "Teach on NextEra" during registration, show appropriate message
      if (intent === 'teach') {
        console.log('🔍 User chose to teach - will need to apply after login');
        alert('Email verified successfully! You can now log in. After logging in, you can apply to become an instructor from your dashboard.');
      } else {
        alert('Email verified successfully! You can now log in.');
      }
      
      navigate('/login');
    } catch (err) {
      console.error('OTP verification error:', err);
      setError(err.response?.data?.error || 'Invalid or expired OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResendLoading(true);
    setResendMessage('');
    setError('');

    try {
      await resendOTP({ email });
      setResendMessage('New OTP sent successfully! Please check your email.');
      setTimeLeft(600); // Reset timer
    } catch (err) {
      console.error('Resend OTP error:', err);
      setError(err.response?.data?.error || 'Failed to resend OTP');
    } finally {
      setResendLoading(false);
    }
  };

  const handleOtpChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Only allow digits
    if (value.length <= 6) {
      setOtp(value);
    }
  };

  if (!email) {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-100">
            Verify Your Email
          </h2>
          <p className="mt-2 text-center text-sm text-gray-100">
            We've sent a 6-digit code to
          </p>
          <p className="text-center text-sm font-medium text-blue-600">
            {email}
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="otp" className="sr-only">
              OTP Code
            </label>
            <input
              id="otp"
              name="otp"
              type="text"
              required
              value={otp}
              onChange={handleOtpChange}
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm text-center text-2xl font-mono tracking-widest"
              placeholder="000000"
              maxLength="6"
            />
          </div>

          {error && (
            <div className="text-red-600 text-sm text-center">{error}</div>
          )}

          {resendMessage && (
            <div className="text-green-600 text-sm text-center">{resendMessage}</div>
          )}

          <div className="text-center text-sm text-gray-100">
            {timeLeft > 0 ? (
              <p>Code expires in: <span className="font-mono font-bold">{formatTime(timeLeft)}</span></p>
            ) : (
              <p className="text-red-600">Code has expired</p>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={loading || otp.length !== 6}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 opacity-100 disabled:cursor-not-allowed"
            >
              {loading ? 'Verifying...' : 'Verify Email'}
            </button>
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={handleResend}
              disabled={resendLoading || timeLeft > 540} // Allow resend after 1 minute
              className="text-blue-600 hover:text-blue-500 text-sm opacity-100 disabled:cursor-not-allowed"
            >
              {resendLoading ? 'Sending...' : 'Resend Code'}
            </button>
          </div>

          <div className="text-center">
            <Link
              to="/login"
              className="text-blue-600 hover:text-blue-500 text-sm"
            >
              Already verified? Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyOTP;
