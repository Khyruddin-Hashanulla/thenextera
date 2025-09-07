import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import api from '../utils/api';

const AdminDSA = () => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('topics');
  const [topics, setTopics] = useState([]);
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState('');
  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    
    if (modalType === 'problem') {
      // Mandatory fields for problems
      if (!formData.topicId || formData.topicId.trim() === '') {
        errors.topicId = 'Topic is required';
      }
      if (!formData.title || formData.title.trim() === '') {
        errors.title = 'Title is required';
      }
      if (!formData.description || formData.description.trim() === '') {
        errors.description = 'Description is required';
      }
      if (!formData.difficulty || formData.difficulty.trim() === '') {
        errors.difficulty = 'Difficulty is required';
      }
      if (formData.order === undefined || formData.order === null || formData.order === '') {
        errors.order = 'Order is required';
      }
    } else if (modalType === 'topic') {
      // Mandatory fields for topics (existing validation)
      if (!formData.name || formData.name.trim() === '') {
        errors.name = 'Name is required';
      }
      if (!formData.description || formData.description.trim() === '') {
        errors.description = 'Description is required';
      }
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form before submission
    if (!validateForm()) {
      setMessage('Please fill in all required fields');
      return;
    }
    
    try {
      setLoading(true);
      
      if (modalType === 'topic') {
        if (editingItem) {
          await api.put(`/api/dsa/admin/topics/${editingItem.id}`, formData);
          setMessage('Topic updated successfully');
        } else {
          await api.post('/api/dsa/admin/topics', formData);
          setMessage('Topic created successfully');
        }
        fetchTopics();
      } else if (modalType === 'problem') {
        // Structure the data properly for problem creation/update
        const problemData = {
          topicId: formData.topicId,
          title: formData.title,
          description: formData.description,
          difficulty: formData.difficulty,
          solution: {
            type: formData.solutionType || 'none',
            ...(formData.solutionType === 'youtube' && { youtubeLink: formData.youtubeLink }),
            ...(formData.solutionType === 'text' && { textExplanation: formData.textExplanation }),
            ...(formData.solutionType === 'code' && { 
              codeSnippet: {
                language: formData.codeLanguage || 'cpp',
                code: formData.codeSnippet
              }
            })
          },
          practiceLink: {
            platform: formData.platform,
            url: formData.url,
            problemId: formData.problemId || ''
          },
          tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag) : [],
          companies: formData.companies ? formData.companies.split(',').map(company => company.trim()).filter(company => company) : [],
          order: parseInt(formData.order) || 0,
          hasCodeEditor: formData.hasCodeEditor || false
        };

        console.log('Sending problem data:', JSON.stringify(problemData, null, 2));

        if (editingItem) {
          await api.put(`/api/dsa/admin/problems/${editingItem.id}`, problemData);
          setMessage('Problem updated successfully');
        } else {
          await api.post('/api/dsa/admin/problems', problemData);
          setMessage('Problem created successfully');
        }
        fetchProblems();
      }
      
      setShowModal(false);
      setEditingItem(null);
      setFormData({});
      setFormErrors({});
    } catch (error) {
      console.error('Error saving:', error);
      
      // Handle specific backend validation errors
      if (error.response?.status === 400) {
        const errorMessage = error.response?.data?.message || 'Validation error';
        const backendErrors = error.response?.data?.errors || [];
        
        if (backendErrors.length > 0) {
          // Map backend errors to form errors
          const newFormErrors = {};
          backendErrors.forEach(err => {
            newFormErrors[err.field] = err.message;
          });
          setFormErrors(newFormErrors);
          setMessage(`Validation failed: ${backendErrors.map(e => e.message).join(', ')}`);
        } else {
          setMessage(errorMessage);
        }
      } else {
        setMessage('Error saving data. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isAdmin) {
      navigate('/dashboard');
      return;
    }
    fetchTopics();
  }, [isAdmin, navigate]);

  const fetchTopics = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/dsa/admin/topics');
      setTopics(response.data.topics || []);
    } catch (error) {
      console.error('Error fetching topics:', error);
      setMessage('Error loading topics');
    } finally {
      setLoading(false);
    }
  };

  const fetchProblems = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/dsa/admin/problems');
      setProblems(response.data.problems || []);
    } catch (error) {
      console.error('Error fetching problems:', error);
      setMessage('Error loading problems');
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === 'topics') {
      fetchTopics();
    } else {
      fetchProblems();
    }
  };

  const openModal = (type, item = null) => {
    setModalType(type);
    setEditingItem(item);
    if (type === 'topic') {
      setFormData(item ? {
        name: item.name,
        description: item.description,
        icon: item.icon,
        difficulty: item.difficulty,
        estimatedHours: item.estimatedHours,
        order: item.order,
        isActive: item.isActive
      } : {
        name: '',
        description: '',
        icon: '</>',
        difficulty: 'Beginner',
        estimatedHours: 10,
        order: 0,
        isActive: true
      });
    } else {
      setFormData(item ? {
        topicId: item.topic?.id || item.topicId,
        title: item.title,
        description: item.description,
        difficulty: item.difficulty,
        solutionType: item.solution?.type || 'none',
        youtubeLink: item.solution?.youtubeLink || '',
        textExplanation: item.solution?.textExplanation || '',
        codeLanguage: item.solution?.codeSnippet?.language || 'cpp',
        codeSnippet: item.solution?.codeSnippet?.code || '',
        platform: item.practiceLink?.platform || 'LeetCode',
        url: item.practiceLink?.url || '',
        hasCodeEditor: item.hasCodeEditor || false,
        tags: item.tags ? item.tags.join(', ') : '',
        companies: item.companies ? item.companies.join(', ') : '',
        order: item.order || 0
      } : {
        topicId: '',
        title: '',
        description: '',
        difficulty: 'Easy',
        solutionType: 'none',
        youtubeLink: '',
        textExplanation: '',
        platform: 'LeetCode',
        url: '',
        hasCodeEditor: false,
        tags: '',
        companies: '',
        order: 0
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingItem(null);
    setFormData({});
    setFormErrors({});
  };

  const handleDelete = async (type, id) => {
    if (!window.confirm(`Are you sure you want to delete this ${type}?`)) return;
    
    try {
      const url = type === 'topic' 
        ? `/api/dsa/admin/topics/${id}`
        : `/api/dsa/admin/problems/${id}`;
      
      await api.delete(url);
      setMessage(`${type} deleted successfully`);
      
      if (type === 'topic') {
        fetchTopics();
      } else {
        fetchProblems();
      }
    } catch (error) {
      console.error('Error deleting:', error);
      setMessage(error.response?.data?.message || 'Error deleting item');
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-400 bg-green-400/20 border-green-400/30';
      case 'Medium': return 'text-yellow-400 bg-yellow-400/20 border-yellow-400/30';
      case 'Hard': return 'text-red-400 bg-red-400/20 border-red-400/30';
      case 'Beginner': return 'text-blue-400 bg-blue-400/20 border-blue-400/30';
      case 'Intermediate': return 'text-purple-400 bg-purple-400/20 border-purple-400/30';
      case 'Advanced': return 'text-red-400 bg-red-400/20 border-red-400/30';
      default: return 'text-gray-400 bg-gray-400/20 border-gray-400/30';
    }
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <div className="text-white text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p>You need admin privileges to access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/30 flex flex-col relative overflow-hidden">
      {/* Enhanced animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-gradient-to-br from-purple-500/15 to-pink-600/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
        
        {/* Floating particles */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-cyan-400/30 rounded-full animate-bounce"></div>
        <div className="absolute top-40 right-40 w-1 h-1 bg-purple-400/40 rounded-full animate-ping"></div>
        <div className="absolute bottom-20 right-20 w-3 h-3 bg-blue-400/20 rounded-full animate-pulse"></div>
      </div>

      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>
      
      <div className="min-h-screen pt-32">
        <div className="container mx-auto px-4 py-6 md:py-8 max-w-7xl relative z-10">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-8 border border-white/20 shadow-2xl">
            {/* Header */}
            <div className="text-center mb-6 md:mb-10">
              <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
                DSA Management
              </h1>
              <p className="text-sm md:text-lg text-gray-300">Manage topics and problems for the DSA practice sheet</p>
            </div>

            {/* Message */}
            {message && (
              <div className="mb-4 md:mb-6 p-3 md:p-4 bg-blue-500/20 border border-blue-500/30 rounded-lg text-blue-300 text-sm md:text-base">
                {message}
              </div>
            )}

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-10">
              <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-xl p-4 md:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-cyan-300 text-sm md:text-base font-medium">Total Topics</p>
                    <p className="text-2xl md:text-3xl font-bold text-white">{topics.length}</p>
                  </div>
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-cyan-500/30 rounded-lg flex items-center justify-center">
                    <span className="text-lg md:text-xl">📚</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl p-4 md:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-300 text-sm md:text-base font-medium">Total Problems</p>
                    <p className="text-2xl md:text-3xl font-bold text-white">{problems.length}</p>
                  </div>
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-500/30 rounded-lg flex items-center justify-center">
                    <span className="text-lg md:text-xl">🧩</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex justify-center mb-6">
              <div className="bg-white/5 rounded-lg p-1 border border-white/10">
                <button
                  onClick={() => handleTabChange('topics')}
                  className={`px-4 py-2 rounded-md font-medium transition-all duration-300 text-sm ${
                    activeTab === 'topics'
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg'
                      : 'text-gray-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  Topics ({topics.length})
                </button>
                <button
                  onClick={() => handleTabChange('problems')}
                  className={`px-4 py-2 rounded-md font-medium transition-all duration-300 text-sm ${
                    activeTab === 'problems'
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg'
                      : 'text-gray-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  Problems ({problems.length})
                </button>
              </div>
            </div>

            {/* Add Button */}
            <div className="flex justify-center mb-6">
              <button
                onClick={() => openModal(activeTab === 'topics' ? 'topic' : 'problem')}
                className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 text-sm"
              >
                <span className="text-base">+</span>
                <span>Add New {activeTab === 'topics' ? 'Topic' : 'Problem'}</span>
              </button>
            </div>

            {/* Content */}
            {loading ? (
              <div className="text-center py-16">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-cyan-400 mx-auto"></div>
                <p className="text-gray-300 mt-6 text-lg">Loading...</p>
              </div>
            ) : (
              <div className="space-y-4 md:space-y-6">
                {activeTab === 'topics' ? (
                  topics.length === 0 ? (
                    <div className="text-center py-16">
                      <div className="text-6xl mb-4">&lt;/&gt;</div>
                      <h3 className="text-xl font-semibold text-white mb-2">No Topics Yet</h3>
                      <p className="text-gray-400">Create your first DSA topic to get started</p>
                    </div>
                  ) : (
                    <div className="space-y-4 md:space-y-6">
                      {topics.map(topic => (
                        <div key={topic.id} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-white/10 hover:border-white/20 transition-all duration-300">
                          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center mb-3">
                                <span className="text-2xl mr-3">{topic.icon}</span>
                                <div>
                                  <h3 className="text-lg md:text-xl font-bold text-white">{topic.name}</h3>
                                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                    topic.difficulty === 'Beginner' ? 'bg-green-500/20 text-green-400' :
                                    topic.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                                    'bg-red-500/20 text-red-400'
                                  }`}>
                                    {topic.difficulty}
                                  </span>
                                </div>
                              </div>
                              <p className="text-gray-300 mb-4 text-sm md:text-base">{topic.description}</p>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 text-sm">
                                <div className="bg-blue-500/20 rounded-lg p-3 text-center">
                                  <div className="text-blue-400 font-semibold">Problems</div>
                                  <div className="text-white text-lg">{topic.totalProblems || 0}</div>
                                </div>
                                <div className="bg-purple-500/20 rounded-lg p-3 text-center">
                                  <div className="text-purple-400 font-semibold">Hours</div>
                                  <div className="text-white text-lg">{topic.estimatedHours || 0}</div>
                                </div>
                                <div className="bg-orange-500/20 rounded-lg p-3 text-center">
                                  <div className="text-orange-400 font-semibold">Order</div>
                                  <div className="text-white text-lg">{topic.order || 0}</div>
                                </div>
                                <div className="bg-green-500/20 rounded-lg p-3 text-center">
                                  <div className="text-green-400 font-semibold">Status</div>
                                  <div className="text-white text-lg">{topic.isActive ? 'Active' : 'Inactive'}</div>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 lg:flex-col lg:gap-2 lg:min-w-[120px]">
                              <button
                                onClick={() => openModal('topic', topic)}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors w-full"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDelete('topic', topic.id)}
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors w-full"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )
                ) : (
                  problems.length === 0 ? (
                    <div className="text-center py-16">
                      <div className="text-6xl mb-4">💻</div>
                      <h3 className="text-xl font-semibold text-white mb-2">No Problems Yet</h3>
                      <p className="text-gray-400">Create your first DSA problem to get started</p>
                    </div>
                  ) : (
                    <div className="space-y-4 md:space-y-6">
                      {problems.map((problem) => (
                        <div key={problem.id} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-white/10 hover:border-white/20 transition-all duration-300">
                          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center mb-3">
                                <h3 className="text-lg md:text-xl font-bold text-white">{problem.title}</h3>
                                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ml-3 ${
                                  problem.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
                                  problem.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                                  'bg-red-500/20 text-red-400'
                                }`}>
                                  {problem.difficulty}
                                </span>
                              </div>
                              <p className="text-gray-300 mb-4 text-sm md:text-base">{problem.description}</p>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 text-sm">
                                <div className="bg-cyan-500/20 rounded-lg p-3 text-center">
                                  <div className="text-cyan-400 font-semibold">Topic</div>
                                  <div className="text-white">{problem.topic?.name || 'N/A'}</div>
                                </div>
                                <div className="bg-indigo-500/20 rounded-lg p-3 text-center">
                                  <div className="text-indigo-400 font-semibold">Platform</div>
                                  <div className="text-white">{problem.practiceLink?.platform || 'N/A'}</div>
                                </div>
                                <div className="bg-emerald-500/20 rounded-lg p-3 text-center">
                                  <div className="text-emerald-400 font-semibold">Code Editor</div>
                                  <div className="text-white">{problem.hasCodeEditor ? 'Yes' : 'No'}</div>
                                </div>
                                <div className="bg-pink-500/20 rounded-lg p-3 text-center">
                                  <div className="text-pink-400 font-semibold">Success Rate</div>
                                  <div className="text-white">{problem.successRate || 0}%</div>
                                </div>
                              </div>
                              {problem.tags?.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-4">
                                  {problem.tags.map((tag, index) => (
                                    <span key={index} className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm border border-blue-500/30">
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 lg:flex-col lg:gap-2 lg:min-w-[120px]">
                              <button
                                onClick={() => openModal('problem', problem)}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors w-full"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDelete('problem', problem.id)}
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors w-full"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-xl p-4 md:p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-gray-600">
              <div className="flex justify-between items-center mb-4 md:mb-6">
                <h2 className="text-xl md:text-2xl font-bold text-white">
                  {editingItem ? 'Edit' : 'Add'} {modalType === 'topic' ? 'Topic' : 'Problem'}
                </h2>
                <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white text-xl md:text-2xl">
                  ×
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                {modalType === 'topic' ? (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.name || ''}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className={`w-full p-3 bg-gray-700 text-white rounded-lg border focus:outline-none text-sm md:text-base ${
                          formErrors.name 
                            ? 'border-red-500 focus:border-red-400' 
                            : 'border-gray-600 focus:border-cyan-500'
                        }`}
                        required
                        placeholder="Enter topic name"
                      />
                      {formErrors.name && (
                        <p className="text-red-400 text-sm mt-1">{formErrors.name}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Description <span className="text-red-400">*</span>
                      </label>
                      <textarea
                        value={formData.description || ''}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        className={`w-full p-3 bg-gray-700 text-white rounded-lg h-20 border border-gray-600 focus:border-cyan-500 focus:outline-none text-sm md:text-base ${
                          formErrors.description 
                            ? 'border-red-500 focus:border-red-400' 
                            : ''
                        }`}
                        required
                        placeholder="Enter topic description"
                      />
                      {formErrors.description && (
                        <p className="text-red-400 text-sm mt-1">{formErrors.description}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Icon</label>
                        <input
                          type="text"
                          value={formData.icon || ''}
                          onChange={(e) => setFormData({...formData, icon: e.target.value})}
                          className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-cyan-500 focus:outline-none text-sm md:text-base"
                          placeholder="</>"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Difficulty <span className="text-red-400">*</span>
                        </label>
                        <select
                          value={formData.difficulty || 'Beginner'}
                          onChange={(e) => setFormData({...formData, difficulty: e.target.value})}
                          className={`w-full p-3 bg-gray-700 text-white rounded-lg border focus:outline-none text-sm md:text-base ${
                            formErrors.difficulty 
                              ? 'border-red-500 focus:border-red-400' 
                              : 'border-gray-600 focus:border-cyan-500'
                          }`}
                          required
                        >
                          <option value="Beginner">Beginner</option>
                          <option value="Intermediate">Intermediate</option>
                          <option value="Advanced">Advanced</option>
                        </select>
                        {formErrors.difficulty && (
                          <p className="text-red-400 text-sm mt-1">{formErrors.difficulty}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Estimated Hours</label>
                        <input
                          type="number"
                          value={formData.estimatedHours || ''}
                          onChange={(e) => setFormData({...formData, estimatedHours: parseInt(e.target.value)})}
                          className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-cyan-500 focus:outline-none text-sm md:text-base"
                          placeholder="10"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Order</label>
                        <input
                          type="number"
                          value={formData.order || 0}
                          onChange={(e) => setFormData({...formData, order: e.target.value ? parseInt(e.target.value) : 0})}
                          className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-cyan-500 focus:outline-none text-sm md:text-base"
                          placeholder="0"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
                      <div className="flex items-center space-x-3">
                        <label className="flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.isActive !== false}
                            onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                            className="w-4 h-4 text-cyan-600 bg-gray-700 border-gray-600 rounded focus:ring-cyan-500 focus:ring-2"
                          />
                          <span className="ml-2 text-sm text-gray-300">Active Topic</span>
                        </label>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Topic <span className="text-red-400">*</span>
                      </label>
                      <select
                        value={formData.topicId || ''}
                        onChange={(e) => setFormData({...formData, topicId: e.target.value})}
                        className={`w-full p-3 bg-gray-700 text-white rounded-lg border focus:outline-none text-sm md:text-base ${
                          formErrors.topicId 
                            ? 'border-red-500 focus:border-red-400' 
                            : 'border-gray-600 focus:border-cyan-500'
                        }`}
                        required
                      >
                        <option value="">Select Topic</option>
                        {topics.map(topic => (
                          <option key={topic.id} value={topic.id}>{topic.name}</option>
                        ))}
                      </select>
                      {formErrors.topicId && (
                        <p className="text-red-400 text-sm mt-1">{formErrors.topicId}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Title <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.title || ''}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        className={`w-full p-3 bg-gray-700 text-white rounded-lg border focus:outline-none text-sm md:text-base ${
                          formErrors.title 
                            ? 'border-red-500 focus:border-red-400' 
                            : 'border-gray-600 focus:border-cyan-500'
                        }`}
                        required
                        placeholder="Enter problem title"
                      />
                      {formErrors.title && (
                        <p className="text-red-400 text-sm mt-1">{formErrors.title}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Description <span className="text-red-400">*</span>
                      </label>
                      <textarea
                        value={formData.description || ''}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        className={`w-full p-3 bg-gray-700 text-white rounded-lg h-20 border border-gray-600 focus:border-cyan-500 focus:outline-none text-sm md:text-base ${
                          formErrors.description 
                            ? 'border-red-500 focus:border-red-400' 
                            : ''
                        }`}
                        required
                        placeholder="Enter problem description"
                      />
                      {formErrors.description && (
                        <p className="text-red-400 text-sm mt-1">{formErrors.description}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Difficulty <span className="text-red-400">*</span>
                        </label>
                        <select
                          value={formData.difficulty || 'Easy'}
                          onChange={(e) => setFormData({...formData, difficulty: e.target.value})}
                          className={`w-full p-3 bg-gray-700 text-white rounded-lg border focus:outline-none text-sm md:text-base ${
                            formErrors.difficulty 
                              ? 'border-red-500 focus:border-red-400' 
                              : 'border-gray-600 focus:border-cyan-500'
                          }`}
                          required
                        >
                          <option value="Easy">Easy</option>
                          <option value="Medium">Medium</option>
                          <option value="Hard">Hard</option>
                        </select>
                        {formErrors.difficulty && (
                          <p className="text-red-400 text-sm mt-1">{formErrors.difficulty}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Platform</label>
                        <select
                          value={formData.platform || 'LeetCode'}
                          onChange={(e) => setFormData({...formData, platform: e.target.value})}
                          className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-cyan-500 focus:outline-none text-sm md:text-base"
                        >
                          <option value="LeetCode">LeetCode</option>
                          <option value="HackerRank">HackerRank</option>
                          <option value="CodeChef">CodeChef</option>
                          <option value="Codeforces">Codeforces</option>
                          <option value="GeeksforGeeks">GeeksforGeeks</option>
                          <option value="InterviewBit">InterviewBit</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Practice URL</label>
                      <input
                        type="url"
                        value={formData.url || ''}
                        onChange={(e) => setFormData({...formData, url: e.target.value})}
                        className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-cyan-500 focus:outline-none text-sm md:text-base"
                        placeholder="https://leetcode.com/problems/..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Solution Type</label>
                      <select
                        value={formData.solutionType || 'none'}
                        onChange={(e) => setFormData({...formData, solutionType: e.target.value})}
                        className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-cyan-500 focus:outline-none text-sm md:text-base"
                      >
                        <option value="none">No Solution</option>
                        <option value="youtube">YouTube Video</option>
                        <option value="text">Text Explanation</option>
                        <option value="code">Code Snippet</option>
                      </select>
                    </div>

                    {formData.solutionType === 'youtube' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">YouTube Link</label>
                        <input
                          type="url"
                          value={formData.youtubeLink || ''}
                          onChange={(e) => setFormData({...formData, youtubeLink: e.target.value})}
                          className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-cyan-500 focus:outline-none text-sm md:text-base"
                          placeholder="https://youtube.com/watch?v=..."
                        />
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Tags (comma separated)</label>
                        <input
                          type="text"
                          value={formData.tags || ''}
                          onChange={(e) => setFormData({...formData, tags: e.target.value})}
                          className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-cyan-500 focus:outline-none text-sm md:text-base"
                          placeholder="Array, String, Dynamic Programming"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Companies (comma separated)</label>
                        <input
                          type="text"
                          value={formData.companies || ''}
                          onChange={(e) => setFormData({...formData, companies: e.target.value})}
                          className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-cyan-500 focus:outline-none text-sm md:text-base"
                          placeholder="Google, Amazon, Microsoft"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Order <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="number"
                          value={formData.order || 0}
                          onChange={(e) => setFormData({...formData, order: e.target.value ? parseInt(e.target.value) : 0})}
                          className={`w-full p-3 bg-gray-700 text-white rounded-lg border focus:outline-none text-sm md:text-base ${
                            formErrors.order 
                              ? 'border-red-500 focus:border-red-400' 
                              : 'border-gray-600 focus:border-cyan-500'
                          }`}
                          placeholder="0"
                        />
                        {formErrors.order && (
                          <p className="text-red-400 text-sm mt-1">{formErrors.order}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Code Editor</label>
                        <div className="flex items-center space-x-3 mt-3">
                          <label className="flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={formData.hasCodeEditor || false}
                              onChange={(e) => setFormData({...formData, hasCodeEditor: e.target.checked})}
                              className="w-4 h-4 text-cyan-600 bg-gray-700 border-gray-600 rounded focus:ring-cyan-500 focus:ring-2"
                            />
                            <span className="ml-2 text-sm text-gray-300">Has Code Editor</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 disabled:opacity-50 text-sm md:text-base"
                  >
                    {loading ? 'Saving...' : (editingItem ? 'Update' : 'Create')}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 text-sm md:text-base"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDSA;
