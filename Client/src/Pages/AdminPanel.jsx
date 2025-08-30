import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import api from '../utils/api';

const AdminPanel = () => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [pendingApplications, setPendingApplications] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [instructorStats, setInstructorStats] = useState({ totalInstructors: 0, totalCourses: 0, totalStudents: 0, topInstructor: 'None', topInstructorCourses: 0 });
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
      console.log('🔍 AdminPanel: Fetching pending applications...');
      const response = await api.get('/api/auth/pending-instructors');
      console.log('📊 AdminPanel response:', response.data);
      console.log('📊 Applications array:', response.data.applications);
      console.log('📊 Applications count:', response.data.applications?.length || 0);
      
      if (response.data.applications && response.data.applications.length > 0) {
        console.log('✅ Found pending applications:', response.data.applications);
      } else {
        console.log('⚠️ No pending applications found');
      }
      
      setPendingApplications(response.data.applications || []);
    } catch (error) {
      console.error('❌ Error fetching pending applications:', error);
      console.error('❌ Error response:', error.response?.data);
      console.error('❌ Error status:', error.response?.status);
      setMessage('Error loading pending applications');
    } finally {
      setLoading(false);
    }
  };

  const fetchAllInstructors = async () => {
    try {
      setLoadingInstructors(true);
      const response = await api.get('/api/auth/all-instructors');
      console.log('📊 Admin panel instructors response:', response.data);
      setInstructors(response.data.instructors || []);
      setInstructorStats({
        totalInstructors: response.data.stats?.totalInstructors || 0,
        totalCourses: response.data.stats?.totalCourses || 0,
        totalStudents: response.data.stats?.totalStudents || 0,
        topInstructor: response.data.stats?.topInstructor || 'None',
        topInstructorCourses: response.data.stats?.topInstructorCourses || 0
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
        prev.filter(app => app._id !== userId)
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
      console.log('🔍 Approving application:', { userId: application._id, name: application.name });
      handleApplicationDecision(application._id, 'approve');
    };

    const handleReject = () => {
      console.log('🔍 Rejecting application:', { userId: application._id, name: application.name, reason: rejectReason });
      handleApplicationDecision(application._id, 'reject', rejectReason);
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
            {application.instructorApplication?.requestDate 
              ? new Date(application.instructorApplication.requestDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })
              : 'Recently'
            }
          </p>
          <p className="text-sm text-gray-300">
            <span className="font-medium">Account Created:</span>{' '}
            {application.createdAt 
              ? new Date(application.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })
              : 'Unknown'
            }
          </p>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={handleApprove}
            disabled={processing[application._id]}
            className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-green-800 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            {processing[application._id] ? (
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
            disabled={processing[application._id]}
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
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleReject}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
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
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <Navbar />
      
      <div className="flex-grow container mx-auto px-4 py-8 pt-32">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8 mb-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4">
                Admin Dashboard
              </h1>
              <p className="text-gray-300 text-lg">
                Welcome back, {user?.name}! Manage your platform from here.
              </p>
            </div>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <div className="text-2xl font-bold text-blue-400">{instructorStats.totalInstructors}</div>
                <div className="text-gray-400">Total Instructors</div>
              </div>
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <div className="text-2xl font-bold text-green-400">{instructorStats.totalCourses}</div>
                <div className="text-gray-400">Total Courses</div>
              </div>
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <div className="text-2xl font-bold text-purple-400">{instructorStats.totalStudents}</div>
                <div className="text-gray-400">Total Students</div>
              </div>
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <div className="text-2xl font-bold text-orange-400">{instructorStats.topInstructorCourses}</div>
                <div className="text-gray-400">Top Instructor Courses</div>
                <div className="text-xs text-gray-500 mt-1">{instructorStats.topInstructor}</div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex space-x-1 mb-8 bg-gray-800/50 p-1 rounded-lg border border-gray-700">
            <button
              onClick={() => setActiveTab('applications')}
              className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'applications'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              Pending Applications ({pendingApplications.length})
            </button>
            <button
              onClick={() => setActiveTab('instructors')}
              className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'instructors'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              All Instructors ({instructors.length})
            </button>
          </div>

          {/* Message Display */}
          {message && (
            <div className="mb-6 p-4 bg-blue-900/20 border border-blue-800 rounded-lg text-blue-300">
              {message}
            </div>
          )}

          {/* Content based on active tab */}
          {activeTab === 'applications' && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Pending Instructor Applications</h2>
              
              {loading ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                </div>
              ) : pendingApplications.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-gray-400 text-lg mb-4">No pending applications</div>
                  <p className="text-gray-500">All instructor applications have been processed.</p>
                </div>
              ) : (
                <div className="grid gap-6">
                  {pendingApplications.map((application) => (
                    <ApplicationCard key={application._id} application={application} />
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'instructors' && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">All Instructors</h2>
              
              {loadingInstructors ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                </div>
              ) : instructors.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-gray-400 text-lg mb-4">No instructors found</div>
                  <p className="text-gray-500">No instructors are currently registered on the platform.</p>
                </div>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {instructors.map((instructor) => (
                    <InstructorCard key={instructor._id} instructor={instructor} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
