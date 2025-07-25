import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import api from '../utils/api';

const AdminPanel = () => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [pendingApplications, setPendingApplications] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [instructorStats, setInstructorStats] = useState({ totalInstructors: 0, totalCourses: 0 });
  const [loading, setLoading] = useState(true);
  const [loadingInstructors, setLoadingInstructors] = useState(true);
  const [processing, setProcessing] = useState({});
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState('applications'); // 'applications' or 'instructors'

  useEffect(() => {
    // Redirect if not admin
    if (!isAdmin) {
      navigate('/dashboard');
      return;
    }
    
    fetchPendingApplications();
    fetchAllInstructors();
  }, [isAdmin, navigate]);

  const fetchPendingApplications = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/auth/pending-instructors');
      setPendingApplications(response.data.pendingApplications || []);
    } catch (error) {
      console.error('Error fetching pending applications:', error);
      setMessage('Error loading pending applications');
    } finally {
      setLoading(false);
    }
  };

  const fetchAllInstructors = async () => {
    try {
      setLoadingInstructors(true);
      const response = await api.get('/api/auth/all-instructors');
      setInstructors(response.data.instructors || []);
      setInstructorStats({
        totalInstructors: response.data.totalInstructors || 0,
        totalCourses: response.data.totalCourses || 0
      });
    } catch (error) {
      console.error('Error fetching instructors:', error);
      setMessage('Error loading instructors data');
    } finally {
      setLoadingInstructors(false);
    }
  };

  const handleApplicationDecision = async (userId, action, reason = '') => {
    try {
      setProcessing(prev => ({ ...prev, [userId]: true }));
      setMessage('');

      const response = await api.post('/api/auth/manage-instructor-application', {
        userId,
        action,
        reason
      });

      setMessage(response.data.message);
      
      // Remove the application from the list
      setPendingApplications(prev => 
        prev.filter(app => app.id !== userId)
      );

    } catch (error) {
      console.error(`Error ${action}ing application:`, error);
      setMessage(error.response?.data?.error || `Error ${action}ing application`);
    } finally {
      setProcessing(prev => ({ ...prev, [userId]: false }));
    }
  };

  const ApplicationCard = ({ application }) => {
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [rejectReason, setRejectReason] = useState('');

    const handleApprove = () => {
      handleApplicationDecision(application.id, 'approve');
    };

    const handleReject = () => {
      handleApplicationDecision(application.id, 'reject', rejectReason);
      setShowRejectModal(false);
      setRejectReason('');
    };

    return (
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-white">{application.name}</h3>
            <p className="text-gray-400">{application.email}</p>
          </div>
          <span className="bg-yellow-500 text-yellow-900 px-3 py-1 rounded-full text-sm font-medium">
            Pending
          </span>
        </div>

        <div className="space-y-2 mb-4">
          <p className="text-sm text-gray-300">
            <span className="font-medium">Applied:</span>{' '}
            {new Date(application.requestDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
          <p className="text-sm text-gray-300">
            <span className="font-medium">Account Created:</span>{' '}
            {new Date(application.accountCreated).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={handleApprove}
            disabled={processing[application.id]}
            className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-green-800 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            {processing[application.id] ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Processing...</span>
              </>
            ) : (
              <>
                <span>✓</span>
                <span>Approve</span>
              </>
            )}
          </button>
          
          <button
            onClick={() => setShowRejectModal(true)}
            disabled={processing[application.id]}
            className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-red-800 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <span>✗</span>
            <span>Reject</span>
          </button>
        </div>

        {/* Reject Modal */}
        {showRejectModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">
                Reject Application
              </h3>
              <p className="text-gray-300 mb-4">
                Are you sure you want to reject {application.name}'s instructor application?
              </p>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Reason (optional)
                </label>
                <textarea
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  placeholder="Provide a reason for rejection..."
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  rows={3}
                />
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setShowRejectModal(false)}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleReject}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Instructor Card Component
  const InstructorCard = ({ instructor }) => (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-gray-600 transition-colors">
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
          {instructor.name.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1">
          <h3 className="text-white font-semibold text-lg">{instructor.name}</h3>
          <p className="text-gray-400 text-sm">{instructor.email}</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-blue-400">{instructor.courseCount}</div>
          <div className="text-gray-400 text-xs">Courses</div>
        </div>
      </div>
      
      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Joined:</span>
          <span className="text-gray-300">
            {new Date(instructor.joinedDate).toLocaleDateString()}
          </span>
        </div>
        {instructor.courseCount > 0 && (
          <div className="text-sm">
            <span className="text-gray-400">Recent courses:</span>
            <div className="mt-1 space-y-1">
              {instructor.recentCourses.slice(0, 2).map((course, index) => (
                <div key={index} className="text-gray-300 text-xs bg-gray-700 px-2 py-1 rounded truncate">
                  {course.title}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <div className="flex items-center justify-between">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          instructor.courseCount > 0 
            ? 'bg-green-900/20 border border-green-800 text-green-300'
            : 'bg-yellow-900/20 border border-yellow-800 text-yellow-300'
        }`}>
          {instructor.courseCount > 0 ? 'Active Instructor' : 'New Instructor'}
        </span>
        {instructor.courseCount > 5 && (
          <span className="text-purple-400 text-xs font-medium">⭐ Top Instructor</span>
        )}
      </div>
    </div>
  );

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(1deg,_rgba(34,143,186,1)_0%,_rgba(0,0,0,1)_69%,_rgba(0,0,0,1)_100%)] flex flex-col">
      <Navbar />
      
      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Admin Panel
            </h1>
            <p className="text-xl text-gray-300">
              Manage instructor applications and user roles
            </p>
          </div>

          {/* Message Display */}
          {message && (
            <div className={`mb-6 p-4 rounded-lg ${
              message.includes('Error') || message.includes('error')
                ? 'bg-red-900/20 border border-red-800 text-red-300'
                : 'bg-green-900/20 border border-green-800 text-green-300'
            }`}>
              {message}
            </div>
          )}

          {/* Tab Navigation */}
          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => setActiveTab('applications')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'applications'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
              }`}
            >
              Pending Applications
            </button>
            <button
              onClick={() => setActiveTab('instructors')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'instructors'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
              }`}
            >
              All Instructors
            </button>
          </div>

          {/* Pending Applications Section */}
          {activeTab === 'applications' && (
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">
                  Pending Instructor Applications
                </h2>
                <button
                  onClick={fetchPendingApplications}
                  disabled={loading}
                  className={`px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center space-x-2 ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  <span className={loading ? "animate-spin" : ""}>🔄</span>
                  <span>{loading ? "Refreshing..." : "Refresh"}</span>
                </button>
              </div>

              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-gray-800 rounded-lg p-6 border border-gray-700 animate-pulse">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="w-12 h-12 bg-gray-700 rounded-full"></div>
                        <div className="flex-1">
                          <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
                          <div className="h-3 bg-gray-700 rounded w-1/2"></div>
                        </div>
                      </div>
                      <div className="space-y-2 mb-4">
                        <div className="h-3 bg-gray-700 rounded"></div>
                        <div className="h-3 bg-gray-700 rounded w-5/6"></div>
                      </div>
                      <div className="flex space-x-2">
                        <div className="h-10 bg-gray-700 rounded flex-1"></div>
                        <div className="h-10 bg-gray-700 rounded flex-1"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : pendingApplications.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📋</div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    No Pending Applications
                  </h3>
                  <p className="text-gray-400">
                    All instructor applications have been processed.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {pendingApplications.map((application) => (
                    <ApplicationCard
                      key={application.id}
                      application={application}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* All Instructors Section */}
          {activeTab === 'instructors' && (
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">
                  All Instructors
                </h2>
                <button
                  onClick={fetchAllInstructors}
                  disabled={loadingInstructors}
                  className={`px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center space-x-2 ${
                    loadingInstructors ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  <span className={loadingInstructors ? "animate-spin" : ""}>🔄</span>
                  <span>{loadingInstructors ? "Refreshing..." : "Refresh"}</span>
                </button>
              </div>

              {loadingInstructors ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-gray-800 rounded-lg p-6 border border-gray-700 animate-pulse">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="w-12 h-12 bg-gray-700 rounded-full"></div>
                        <div className="flex-1">
                          <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
                          <div className="h-3 bg-gray-700 rounded w-1/2"></div>
                        </div>
                      </div>
                      <div className="space-y-2 mb-4">
                        <div className="h-3 bg-gray-700 rounded"></div>
                        <div className="h-3 bg-gray-700 rounded w-5/6"></div>
                      </div>
                      <div className="flex space-x-2">
                        <div className="h-10 bg-gray-700 rounded flex-1"></div>
                        <div className="h-10 bg-gray-700 rounded flex-1"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : instructors.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📋</div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    No Instructors
                  </h3>
                  <p className="text-gray-400">
                    No instructors have been added yet.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {instructors.map((instructor) => (
                    <InstructorCard
                      key={instructor.id}
                      instructor={instructor}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">
                {pendingApplications.length}
              </div>
              <div className="text-gray-300">Pending Applications</div>
            </div>
            
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">
                {instructorStats.totalInstructors}
              </div>
              <div className="text-gray-300">Total Instructors</div>
            </div>
            
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">
                {instructorStats.totalCourses}
              </div>
              <div className="text-gray-300">Total Courses</div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AdminPanel;
