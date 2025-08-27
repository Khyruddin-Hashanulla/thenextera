import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';

const InstructorApplication = () => {
  const { user } = useAuth();
  const [applicationStatus, setApplicationStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchApplicationStatus();
  }, []);

  const fetchApplicationStatus = async () => {
    try {
      setLoading(true);
      console.log('Fetching instructor application status...');
      const response = await api.get('/api/auth/instructor-application-status');
      console.log('Application status response:', response.data);
      setApplicationStatus(response.data);
      setMessage(''); // Clear any previous error messages
    } catch (error) {
      console.error('Error fetching application status:', error);
      console.error('Error response:', error.response?.data);
      console.error('Error status:', error.response?.status);
      setMessage(`Error loading application status: ${error.response?.data?.error || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleApplyInstructor = async () => {
    try {
      setApplying(true);
      setMessage('');
      
      console.log('🔍 InstructorApplication: Submitting instructor application...');
      console.log('🔍 User data:', { userId: user?._id || user?.id, email: user?.email, name: user?.name });
      
      const response = await api.post('/api/auth/apply-instructor');
      console.log('✅ Application submitted successfully:', response.data);
      setMessage(response.data.message);
      
      // Refresh application status
      console.log('🔄 Refreshing application status...');
      await fetchApplicationStatus();
      
      // Refresh user context to update role
      window.location.reload(); // Simple way to refresh user context
      
    } catch (error) {
      console.error('❌ Error applying for instructor:', error);
      console.error('❌ Error response:', error.response?.data);
      console.error('❌ Error status:', error.response?.status);
      setMessage(error.response?.data?.error || 'Error submitting application');
    } finally {
      setApplying(false);
    }
  };

  // Determine what to show based on user role and application status
  const userRole = user?.role;
  const isPendingInstructor = userRole === 'pending_instructor';
  const isInstructor = userRole === 'Instructor';
  const isStudent = userRole === 'Student';
  
  const isPending = applicationStatus?.applicationStatus === 'pending' || isPendingInstructor;
  const wasRejected = applicationStatus?.applicationStatus === 'rejected';
  const canReapply = wasRejected && applicationStatus?.resubmissionAllowed !== false;
  const canApply = applicationStatus?.canApply && isStudent && !isPending && !wasRejected;
  const wantsToBeInstructor = applicationStatus?.wantsToBeInstructor;

  // Don't show component for instructors
  if (isInstructor) {
    return null;
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <h3 className="text-xl font-semibold text-white">Become an Instructor</h3>
        <div className="flex flex-wrap gap-2">
          {isPending && (
            <span className="bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
              Under Review
            </span>
          )}
          {wasRejected && (
            <span className="bg-red-500/20 text-red-300 border border-red-500/30 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
              Not Approved
            </span>
          )}
        </div>
      </div>

      {loading ? (
        <div className="text-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mx-auto"></div>
          <p className="text-gray-400 mt-2">Loading application status...</p>
        </div>
      ) : (
        <div>
          {/* Pending Instructor Status */}
          {isPendingInstructor && (
            <div className="text-center py-6">
              <div className="bg-gradient-to-r from-yellow-500/10 via-orange-500/10 to-yellow-500/10 border border-yellow-500/30 rounded-xl p-6 mb-4 backdrop-blur-sm">
                <div className="flex items-center justify-center mb-3">
                  <div className="bg-yellow-500/20 rounded-full p-3 mr-3">
                    <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold text-yellow-400">Application Under Review</h4>
                </div>
                <p className="text-yellow-300 font-medium text-lg mb-2">
                  🎓 Your instructor application is being reviewed by our admin team
                </p>
                <p className="text-gray-300 text-sm leading-relaxed">
                  We typically review applications within 24-48 hours. You'll receive an email notification once your application has been processed. Thank you for your patience!
                </p>
                <div className="mt-4 flex items-center justify-center">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Student - Can Apply */}
          {isStudent && canApply && (
            <div>
              <p className="text-gray-300 mb-4">
                Ready to share your knowledge? Apply to become an instructor and start creating courses.
              </p>
              
              <div className="bg-gray-700/50 rounded-lg p-4 mb-4">
                <h4 className="text-white font-medium mb-2">As an instructor, you can:</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Create and publish courses</li>
                  <li>• Upload videos and course materials</li>
                  <li>• Manage student enrollments</li>
                  <li>• Earn from course sales</li>
                </ul>
              </div>

              <button
                onClick={handleApplyInstructor}
                disabled={applying}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {applying ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Submitting Application...
                  </div>
                ) : (
                  'Apply as Instructor'
                )}
              </button>
            </div>
          )}

          {/* Rejected Application */}
          {wasRejected && canReapply && (
            <div>
              <div className="bg-gradient-to-r from-red-500/10 via-pink-500/10 to-red-500/10 border border-red-500/30 rounded-xl p-6 mb-6 backdrop-blur-sm">
                <div className="flex items-center justify-center mb-4">
                  <div className="bg-red-500/20 rounded-full p-3 mr-3">
                    <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold text-red-400">Application Not Approved</h4>
                </div>
                <p className="text-red-300 font-medium text-center mb-3">
                  Your instructor application was not approved at this time
                </p>
                {applicationStatus?.rejectionReason && (
                  <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-4 mb-4">
                    <p className="text-gray-300 text-sm font-medium mb-1">Feedback from Admin:</p>
                    <p className="text-gray-400 text-sm italic">
                      "{applicationStatus.rejectionReason}"
                    </p>
                  </div>
                )}
                <p className="text-gray-300 text-sm text-center leading-relaxed">
                  Don't worry! You can address the feedback above and reapply. We encourage you to improve your profile and try again.
                </p>
              </div>
              
              <button
                onClick={handleApplyInstructor}
                disabled={applying}
                className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white py-4 px-6 rounded-xl font-medium hover:from-purple-700 hover:via-pink-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
              >
                {applying ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Resubmitting Application...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Reapply as Instructor
                  </div>
                )}
              </button>
            </div>
          )}

          {/* No Application Allowed */}
          {!canApply && !isPending && !wasRejected && isStudent && (
            <div className="text-center py-4">
              <p className="text-gray-400">
                Instructor applications are currently not available for your account.
              </p>
            </div>
          )}

          {/* Rejected but cannot reapply */}
          {wasRejected && !canReapply && (
            <div className="text-center py-6">
              <div className="bg-gradient-to-r from-red-500/10 via-gray-500/10 to-red-500/10 border border-red-500/30 rounded-xl p-6 backdrop-blur-sm">
                <div className="flex items-center justify-center mb-4">
                  <div className="bg-red-500/20 rounded-full p-3 mr-3">
                    <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold text-red-400">Application Permanently Declined</h4>
                </div>
                <p className="text-red-300 font-medium text-center mb-3">
                  Your instructor application has been permanently declined
                </p>
                {applicationStatus?.rejectionReason && (
                  <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-4 mb-4">
                    <p className="text-gray-300 text-sm font-medium mb-1">Admin Decision:</p>
                    <p className="text-gray-400 text-sm italic">
                      "{applicationStatus.rejectionReason}"
                    </p>
                  </div>
                )}
                <p className="text-gray-400 text-sm text-center leading-relaxed">
                  Unfortunately, resubmission is not allowed for this application. If you believe this is an error, please contact our support team.
                </p>
                <div className="mt-4">
                  <a 
                    href="mailto:support@nextera.com" 
                    className="inline-flex items-center text-blue-400 hover:text-blue-300 text-sm transition-colors"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Contact Support
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Error/Success Messages */}
          {message && (
            <div className={`mt-4 p-3 rounded-lg ${
              message.includes('Error') || message.includes('error')
                ? 'bg-red-500/10 border border-red-500/20 text-red-400'
                : 'bg-green-500/10 border border-green-500/20 text-green-400'
            }`}>
              {message}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default InstructorApplication;
