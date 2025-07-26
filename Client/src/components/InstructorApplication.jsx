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
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-white">Become an Instructor</h3>
        {isPending && (
          <span className="bg-yellow-500 text-yellow-900 px-3 py-1 rounded-full text-sm font-medium">
            Pending Approval
          </span>
        )}
        {wasRejected && (
          <span className="bg-red-500 text-red-100 px-3 py-1 rounded-full text-sm font-medium">
            Application Rejected
          </span>
        )}
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
            <div className="text-center py-4">
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 mb-4">
                <p className="text-yellow-400 font-medium">
                  🎓 Your instructor application is pending admin approval
                </p>
                <p className="text-gray-400 text-sm mt-2">
                  You'll receive notification once an admin reviews your application.
                </p>
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
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-4">
                <p className="text-red-400 font-medium">Application Rejected</p>
                {applicationStatus?.rejectionReason && (
                  <p className="text-gray-400 text-sm mt-2">
                    Reason: {applicationStatus.rejectionReason}
                  </p>
                )}
              </div>
              
              <button
                onClick={handleApplyInstructor}
                disabled={applying}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {applying ? 'Resubmitting...' : 'Reapply as Instructor'}
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
            <div className="text-center py-4">
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                <p className="text-red-400 font-medium">Application Rejected</p>
                {applicationStatus?.rejectionReason && (
                  <p className="text-gray-400 text-sm mt-2">
                    Reason: {applicationStatus.rejectionReason}
                  </p>
                )}
                <p className="text-gray-400 text-sm mt-2">
                  Resubmission is not allowed for this application.
                </p>
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
