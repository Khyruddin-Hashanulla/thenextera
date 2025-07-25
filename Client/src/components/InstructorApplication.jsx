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
      
      const response = await api.post('/api/auth/apply-instructor');
      setMessage(response.data.message);
      
      // Refresh application status
      await fetchApplicationStatus();
      
      // Refresh user context to update role
      window.location.reload(); // Simple way to refresh user context
      
    } catch (error) {
      console.error('Error applying for instructor:', error);
      setMessage(error.response?.data?.error || 'Error submitting application');
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-700 rounded w-1/3 mb-4"></div>
          <div className="h-8 bg-gray-700 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  // Don't show for admins or already approved instructors
  if (user?.role === 'Admin' || user?.role === 'Instructor') {
    return null;
  }

  // Don't show application form if backend says not to show it
  if (!applicationStatus?.showApplicationForm) {
    // Show status message for pending instructors or other states
    if (applicationStatus?.message) {
      return (
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-white">Instructor Status</h3>
            {user?.role === 'pending_instructor' && (
              <span className="bg-yellow-500 text-yellow-900 px-3 py-1 rounded-full text-sm font-medium">
                Pending Approval
              </span>
            )}
          </div>
          
          <div className="space-y-3">
            <p className="text-gray-300">{applicationStatus.message}</p>
            
            {applicationStatus?.requestDate && (
              <p className="text-sm text-gray-400">
                Applied on: {new Date(applicationStatus.requestDate).toLocaleDateString()}
              </p>
            )}
            
            {user?.role === 'pending_instructor' && (
              <div className="flex items-center space-x-2 text-yellow-500">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-500"></div>
                <span className="text-sm">Awaiting admin approval...</span>
              </div>
            )}
          </div>
        </div>
      );
    }
    return null;
  }

  const canApply = applicationStatus?.canApply;
  const isPending = applicationStatus?.applicationStatus === 'pending';
  const wasRejected = applicationStatus?.applicationStatus === 'rejected';
  const wantsToBeInstructor = applicationStatus?.wantsToBeInstructor;

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

      {/* Show custom message from backend if available */}
      {applicationStatus?.message && (
        <div className="mb-4 p-3 bg-blue-900/20 border border-blue-800 rounded-lg">
          <p className="text-blue-200">{applicationStatus.message}</p>
        </div>
      )}

      {isPending ? (
        <div className="space-y-3">
          <p className="text-gray-300">
            Your instructor application is pending approval. Please wait for admin review.
          </p>
          {applicationStatus?.requestDate && (
            <p className="text-sm text-gray-400">
              Applied on: {new Date(applicationStatus.requestDate).toLocaleDateString()}
            </p>
          )}
          <div className="flex items-center space-x-2 text-yellow-500">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-500"></div>
            <span className="text-sm">Awaiting admin approval...</span>
          </div>
        </div>
      ) : wasRejected ? (
        <div className="space-y-3">
          <p className="text-gray-300">
            Your previous instructor application was rejected.
          </p>
          {applicationStatus?.rejectionReason && (
            <p className="text-sm text-red-300 bg-red-900/20 p-3 rounded border border-red-800">
              <strong>Reason:</strong> {applicationStatus.rejectionReason}
            </p>
          )}
          {applicationStatus?.decisionDate && (
            <p className="text-sm text-gray-400">
              Decision made on: {new Date(applicationStatus.decisionDate).toLocaleDateString()}
            </p>
          )}
          {canApply && (
            <button
              onClick={handleApplyInstructor}
              disabled={applying}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2"
            >
              {applying ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Reapplying...</span>
                </>
              ) : (
                <span>Reapply as Instructor</span>
              )}
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {/* Show different message based on whether user wants to be instructor */}
          <p className="text-gray-300">
            {wantsToBeInstructor 
              ? "Complete your instructor application to start creating courses and sharing your knowledge."
              : "Apply to become an instructor and start creating courses to share your knowledge with students."
            }
          </p>
          
          <div className="bg-blue-900/20 border border-blue-800 rounded-lg p-4">
            <h4 className="text-blue-300 font-medium mb-2">As an instructor, you'll be able to:</h4>
            <ul className="text-blue-200 text-sm space-y-1">
              <li>• Create and publish courses</li>
              <li>• Upload course materials and videos</li>
              <li>• Manage enrolled students</li>
              <li>• Track student progress</li>
              <li>• Access instructor dashboard</li>
            </ul>
          </div>
          
          {canApply ? (
            <button
              onClick={handleApplyInstructor}
              disabled={applying}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2"
            >
              {applying ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Submitting Application...</span>
                </>
              ) : (
                <span>{wantsToBeInstructor ? "Submit Instructor Application" : "Apply as Instructor"}</span>
              )}
            </button>
          ) : (
            <p className="text-red-300 text-sm">
              You are not eligible to apply at this time.
            </p>
          )}
        </div>
      )}

      {message && (
        <div className={`mt-4 p-3 rounded-lg text-sm ${
          message.includes('Error') || message.includes('error')
            ? 'bg-red-900/20 border border-red-800 text-red-300'
            : 'bg-green-900/20 border border-green-800 text-green-300'
        }`}>
          {message}
        </div>
      )}
    </div>
  );
};

export default InstructorApplication;
