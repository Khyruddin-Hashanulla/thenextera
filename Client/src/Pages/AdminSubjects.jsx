import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import { 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaEye, 
  FaEyeSlash, 
  FaSave, 
  FaTimes,
  FaSpinner,
  FaExclamationTriangle,
  FaCheckCircle
} from 'react-icons/fa';

const AdminSubjects = () => {
  const { user, isAdmin } = useAuth();
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingSubject, setEditingSubject] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    icon: '',
    progress: 0,
    description: ''
  });
  const [formLoading, setFormLoading] = useState(false);

  // Check if user is admin
  useEffect(() => {
    console.log('AdminSubjects - User check:', {
      user: user,
      userRole: user?.role,
      isAdmin: isAdmin
    });
    
    if (user && !isAdmin) {
      setError('Access denied. Admin privileges required.');
      setLoading(false);
      return;
    }
    
    if (user && isAdmin) {
      fetchSubjects();
    }
  }, [user, isAdmin]);

  const fetchSubjects = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/subjects/admin');
      if (response.data.success) {
        setSubjects(response.data.subjects);
      } else {
        setError('Failed to fetch subjects');
      }
    } catch (error) {
      console.error('Error fetching subjects:', error);
      setError('Failed to fetch subjects');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'progress' ? parseInt(value) || 0 : value
    }));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      icon: '',
      progress: 0,
      description: ''
    });
    setEditingSubject(null);
    setShowForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setError('');
    setSuccess('');

    try {
      let response;
      if (editingSubject) {
        response = await api.put(`/api/subjects/${editingSubject.id}`, formData);
      } else {
        response = await api.post('/api/subjects', formData);
      }

      if (response.data.success) {
        setSuccess(response.data.message);
        resetForm();
        fetchSubjects();
      } else {
        setError(response.data.message || 'Operation failed');
      }
    } catch (error) {
      console.error('Error saving subject:', error);
      setError(error.response?.data?.message || 'Failed to save subject');
    } finally {
      setFormLoading(false);
    }
  };

  const handleEdit = (subject) => {
    setFormData({
      name: subject.name,
      icon: subject.icon,
      progress: subject.progress,
      description: subject.description || ''
    });
    setEditingSubject(subject);
    setShowForm(true);
  };

  const handleDelete = async (subjectId) => {
    if (!window.confirm('Are you sure you want to delete this subject?')) {
      return;
    }

    try {
      const response = await api.delete(`/api/subjects/${subjectId}`);
      if (response.data.success) {
        setSuccess('Subject deleted successfully');
        fetchSubjects();
      } else {
        setError('Failed to delete subject');
      }
    } catch (error) {
      console.error('Error deleting subject:', error);
      setError('Failed to delete subject');
    }
  };

  const handleToggleActive = async (subjectId) => {
    try {
      const response = await api.patch(`/api/subjects/${subjectId}/toggle`);
      if (response.data.success) {
        setSuccess(response.data.message);
        fetchSubjects();
      } else {
        setError('Failed to toggle subject status');
      }
    } catch (error) {
      console.error('Error toggling subject status:', error);
      setError('Failed to toggle subject status');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="w-12 h-12 text-cyan-400 animate-spin mx-auto mb-4" />
          <p className="text-gray-300 text-lg">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  if (user && !isAdmin) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="bg-red-500/20 backdrop-blur-sm border border-red-500/30 rounded-2xl p-8 text-center max-w-md">
          <FaExclamationTriangle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Access Denied</h2>
          <p className="text-gray-300 mb-4">Admin privileges required to access this page.</p>
          <div className="bg-gray-800/50 rounded-lg p-4 mt-4">
            <p className="text-sm text-gray-400">Current Role: <span className="text-cyan-400">{user?.role || 'Unknown'}</span></p>
            <p className="text-sm text-gray-400">Required Role: <span className="text-green-400">Admin</span></p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 relative py-8 px-4">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/20 via-gray-900/30 to-gray-900/20"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.1),transparent_50%)]"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-2">
            Core Subjects Management
          </h1>
          <p className="text-gray-400">Manage core subjects for the learning platform</p>
        </div>

        {/* Success/Error Messages */}
        {success && (
          <div className="mb-6 bg-green-500/20 backdrop-blur-sm border border-green-500/30 rounded-xl p-4 flex items-center space-x-3">
            <FaCheckCircle className="text-green-400 w-5 h-5" />
            <span className="text-green-300">{success}</span>
            <button onClick={() => setSuccess('')} className="ml-auto text-green-400 hover:text-green-300">
              <FaTimes />
            </button>
          </div>
        )}

        {error && (
          <div className="mb-6 bg-red-500/20 backdrop-blur-sm border border-red-500/30 rounded-xl p-4 flex items-center space-x-3">
            <FaExclamationTriangle className="text-red-400 w-5 h-5" />
            <span className="text-red-300">{error}</span>
            <button onClick={() => setError('')} className="ml-auto text-red-400 hover:text-red-300">
              <FaTimes />
            </button>
          </div>
        )}

        {/* Add Subject Button */}
        <div className="mb-6">
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-xl hover:from-cyan-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <FaPlus className="w-4 h-4" />
            <span>Add New Subject</span>
          </button>
        </div>

        {/* Subject Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-gray-800/90 backdrop-blur-sm border border-white/10 rounded-2xl p-6 w-full max-w-md">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">
                  {editingSubject ? 'Edit Subject' : 'Add New Subject'}
                </h3>
                <button
                  onClick={resetForm}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <FaTimes className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Subject Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 transition-colors"
                    placeholder="Enter subject name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Icon URL *
                  </label>
                  <input
                    type="url"
                    name="icon"
                    value={formData.icon}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 transition-colors"
                    placeholder="https://example.com/icon.png"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Progress (0-100%)
                  </label>
                  <input
                    type="number"
                    name="progress"
                    value={formData.progress}
                    onChange={handleInputChange}
                    min="0"
                    max="100"
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 transition-colors"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                    placeholder="Enter subject description"
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="submit"
                    disabled={formLoading}
                    className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {formLoading ? (
                      <FaSpinner className="w-4 h-4 animate-spin" />
                    ) : (
                      <FaSave className="w-4 h-4" />
                    )}
                    <span>{formLoading ? 'Saving...' : 'Save Subject'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Subjects Table */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-white/10">
            <h2 className="text-xl font-bold text-white">All Subjects</h2>
            <p className="text-gray-400 text-sm">Total: {subjects.length} subjects</p>
          </div>

          {loading ? (
            <div className="p-8 text-center">
              <FaSpinner className="w-8 h-8 text-cyan-400 animate-spin mx-auto mb-4" />
              <p className="text-gray-400">Loading subjects...</p>
            </div>
          ) : subjects.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-400">No subjects found. Add your first subject!</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-700/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Subject
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Progress
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700/50">
                  {subjects.map((subject) => (
                    <tr key={subject.id} className="hover:bg-gray-700/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <img
                            src={subject.icon}
                            alt={subject.name}
                            className="w-10 h-10 rounded-lg object-cover"
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/40x40/6366f1/ffffff?text=?';
                            }}
                          />
                          <div>
                            <p className="text-white font-medium">{subject.name}</p>
                            {subject.description && (
                              <p className="text-gray-400 text-sm truncate max-w-xs">
                                {subject.description}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-20 bg-gray-700 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-cyan-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${subject.progress}%` }}
                            />
                          </div>
                          <span className="text-gray-300 text-sm">{subject.progress}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          subject.isActive
                            ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                            : 'bg-red-500/20 text-red-300 border border-red-500/30'
                        }`}>
                          {subject.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-400 text-sm">
                        {new Date(subject.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleEdit(subject)}
                            className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-500/20 rounded-lg transition-all duration-200"
                            title="Edit subject"
                          >
                            <FaEdit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleToggleActive(subject.id)}
                            className={`p-2 rounded-lg transition-all duration-200 ${
                              subject.isActive
                                ? 'text-yellow-400 hover:text-yellow-300 hover:bg-yellow-500/20'
                                : 'text-green-400 hover:text-green-300 hover:bg-green-500/20'
                            }`}
                            title={subject.isActive ? 'Deactivate subject' : 'Activate subject'}
                          >
                            {subject.isActive ? <FaEyeSlash className="w-4 h-4" /> : <FaEye className="w-4 h-4" />}
                          </button>
                          <button
                            onClick={() => handleDelete(subject.id)}
                            className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-all duration-200"
                            title="Delete subject"
                          >
                            <FaTrash className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminSubjects;
