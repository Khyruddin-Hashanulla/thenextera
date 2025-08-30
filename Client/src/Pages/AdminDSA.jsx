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
        order: item.order
      } : {
        name: '',
        description: '',
        icon: '</>',
        difficulty: 'Beginner',
        estimatedHours: 10,
        order: 0
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
          order: formData.order || 0,
          hasCodeEditor: formData.hasCodeEditor || false
        };

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
    } catch (error) {
      console.error('Error saving:', error);
      setMessage('Error saving data');
    } finally {
      setLoading(false);
    }
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

      <Navbar />
      
      <div className="container mx-auto px-4 py-8 pt-28 max-w-7xl relative z-10">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              DSA Management Panel
            </h1>
            <p className="text-gray-300 text-lg">Manage Data Structures & Algorithms content</p>
          </div>

          {message && (
            <div className="mb-8 p-4 bg-blue-500/20 border border-blue-500/30 rounded-xl text-blue-200 text-center">
              {message}
            </div>
          )}

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-cyan-400 text-lg font-semibold">Total Topics</h3>
                  <p className="text-3xl font-bold text-white">{topics.length}</p>
                </div>
                <div className="text-4xl">&lt;/&gt;</div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-green-400 text-lg font-semibold">Total Problems</h3>
                  <p className="text-3xl font-bold text-white">{problems.length}</p>
                </div>
                <div className="text-4xl">💻</div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex justify-center mb-8">
            <div className="bg-white/5 rounded-xl p-2 border border-white/10">
              <button
                onClick={() => handleTabChange('topics')}
                className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  activeTab === 'topics'
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg'
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                Topics ({topics.length})
              </button>
              <button
                onClick={() => handleTabChange('problems')}
                className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${
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
          <div className="flex justify-center mb-8">
            <button
              onClick={() => openModal(activeTab === 'topics' ? 'topic' : 'problem')}
              className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
            >
              <span className="text-xl">+</span>
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
            <div className="space-y-6">
              {activeTab === 'topics' ? (
                topics.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="text-6xl mb-4">&lt;/&gt;</div>
                    <h3 className="text-xl font-semibold text-white mb-2">No Topics Yet</h3>
                    <p className="text-gray-400">Create your first DSA topic to get started</p>
                  </div>
                ) : (
                  topics.map((topic) => (
                    <div key={topic.id} className="bg-white/5 border border-white/10 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-white/10">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-4 mb-3">
                            <span className="text-3xl">{topic.icon}</span>
                            <h3 className="text-2xl font-semibold text-white">{topic.name}</h3>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getDifficultyColor(topic.difficulty)}`}>
                              {topic.difficulty}
                            </span>
                          </div>
                          <p className="text-gray-300 mb-4 text-lg">{topic.description}</p>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div className="bg-blue-500/20 rounded-lg p-3 text-center">
                              <div className="text-blue-400 font-semibold">Problems</div>
                              <div className="text-white text-lg">{topic.totalProblems || 0}</div>
                            </div>
                            <div className="bg-purple-500/20 rounded-lg p-3 text-center">
                              <div className="text-purple-400 font-semibold">Hours</div>
                              <div className="text-white text-lg">{topic.estimatedHours}</div>
                            </div>
                            <div className="bg-orange-500/20 rounded-lg p-3 text-center">
                              <div className="text-orange-400 font-semibold">Order</div>
                              <div className="text-white text-lg">{topic.order}</div>
                            </div>
                            <div className="bg-green-500/20 rounded-lg p-3 text-center">
                              <div className="text-green-400 font-semibold">Status</div>
                              <div className="text-white text-lg">{topic.isActive ? 'Active' : 'Inactive'}</div>
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-3 ml-6">
                          <button
                            onClick={() => openModal('topic', topic)}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete('topic', topic.id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )
              ) : (
                problems.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="text-6xl mb-4">💻</div>
                    <h3 className="text-xl font-semibold text-white mb-2">No Problems Yet</h3>
                    <p className="text-gray-400">Create your first DSA problem to get started</p>
                  </div>
                ) : (
                  problems.map((problem) => (
                    <div key={problem.id} className="bg-white/5 border border-white/10 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-white/10">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-4 mb-3">
                            <h3 className="text-2xl font-semibold text-white">{problem.title}</h3>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getDifficultyColor(problem.difficulty)}`}>
                              {problem.difficulty}
                            </span>
                          </div>
                          <p className="text-gray-300 mb-4 text-lg">{problem.description}</p>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                            <div className="bg-cyan-500/20 rounded-lg p-3">
                              <div className="text-cyan-400 font-semibold">Topic</div>
                              <div className="text-white">{problem.topic?.name || 'N/A'}</div>
                            </div>
                            <div className="bg-indigo-500/20 rounded-lg p-3">
                              <div className="text-indigo-400 font-semibold">Platform</div>
                              <div className="text-white">{problem.practiceLink?.platform || 'N/A'}</div>
                            </div>
                            <div className="bg-emerald-500/20 rounded-lg p-3">
                              <div className="text-emerald-400 font-semibold">Code Editor</div>
                              <div className="text-white">{problem.hasCodeEditor ? 'Yes' : 'No'}</div>
                            </div>
                            <div className="bg-pink-500/20 rounded-lg p-3">
                              <div className="text-pink-400 font-semibold">Success Rate</div>
                              <div className="text-white">{problem.successRate || 0}%</div>
                            </div>
                          </div>
                          {problem.tags?.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {problem.tags.map((tag, index) => (
                                <span key={index} className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm border border-blue-500/30">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="flex space-x-3 ml-6">
                          <button
                            onClick={() => openModal('problem', problem)}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete('problem', problem.id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )
              )}
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl p-6 w-full max-w-2xl max-h-[85vh] overflow-y-auto border border-gray-600">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">
                {editingItem ? 'Edit' : 'Add'} {modalType === 'topic' ? 'Topic' : 'Problem'}
              </h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-white text-2xl transition-colors">×</button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {modalType === 'topic' ? (
                <>
                  <div>
                    <label className="block text-white mb-2 font-medium">Name *</label>
                    <input
                      type="text"
                      value={formData.name || ''}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-cyan-500 focus:outline-none"
                      required
                      placeholder="Enter topic name"
                    />
                  </div>
                  <div>
                    <label className="block text-white mb-2 font-medium">Description *</label>
                    <textarea
                      value={formData.description || ''}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      className="w-full p-3 bg-gray-700 text-white rounded-lg h-20 border border-gray-600 focus:border-cyan-500 focus:outline-none"
                      required
                      placeholder="Enter topic description"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white mb-2 font-medium">Icon</label>
                      <input
                        type="text"
                        value={formData.icon || ''}
                        onChange={(e) => setFormData({...formData, icon: e.target.value})}
                        className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-cyan-500 focus:outline-none"
                        placeholder="</>"
                      />
                    </div>
                    <div>
                      <label className="block text-white mb-2 font-medium">Difficulty</label>
                      <select
                        value={formData.difficulty || 'Beginner'}
                        onChange={(e) => setFormData({...formData, difficulty: e.target.value})}
                        className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-cyan-500 focus:outline-none"
                      >
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white mb-2 font-medium">Estimated Hours</label>
                      <input
                        type="number"
                        value={formData.estimatedHours || ''}
                        onChange={(e) => setFormData({...formData, estimatedHours: parseInt(e.target.value)})}
                        className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-cyan-500 focus:outline-none"
                        placeholder="10"
                      />
                    </div>
                    <div>
                      <label className="block text-white mb-2 font-medium">Order</label>
                      <input
                        type="number"
                        value={formData.order || 0}
                        onChange={(e) => setFormData({...formData, order: e.target.value ? parseInt(e.target.value) : 0})}
                        className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-cyan-500 focus:outline-none"
                        placeholder="0"
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-white mb-2 font-medium">Topic *</label>
                    <select
                      value={formData.topicId || ''}
                      onChange={(e) => setFormData({...formData, topicId: e.target.value})}
                      className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-cyan-500 focus:outline-none"
                      required
                    >
                      <option value="">Select Topic</option>
                      {topics.map(topic => (
                        <option key={topic.id} value={topic.id}>{topic.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-white mb-2 font-medium">Title *</label>
                    <input
                      type="text"
                      value={formData.title || ''}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-cyan-500 focus:outline-none"
                      required
                      placeholder="Enter problem title"
                    />
                  </div>
                  <div>
                    <label className="block text-white mb-2 font-medium">Description *</label>
                    <textarea
                      value={formData.description || ''}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      className="w-full p-3 bg-gray-700 text-white rounded-lg h-20 border border-gray-600 focus:border-cyan-500 focus:outline-none"
                      required
                      placeholder="Enter problem description"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white mb-2 font-medium">Difficulty *</label>
                      <select
                        value={formData.difficulty || 'Easy'}
                        onChange={(e) => setFormData({...formData, difficulty: e.target.value})}
                        className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-cyan-500 focus:outline-none"
                        required
                      >
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-white mb-2 font-medium">Platform *</label>
                      <select
                        value={formData.platform || 'LeetCode'}
                        onChange={(e) => setFormData({...formData, platform: e.target.value})}
                        className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-cyan-500 focus:outline-none"
                        required
                      >
                        <option value="LeetCode">LeetCode</option>
                        <option value="HackerRank">HackerRank</option>
                        <option value="Codeforces">Codeforces</option>
                        <option value="GeeksforGeeks">GeeksforGeeks</option>
                        <option value="InterviewBit">InterviewBit</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-white mb-2 font-medium">Platform URL</label>
                    <input
                      type="url"
                      value={formData.url || ''}
                      onChange={(e) => setFormData({...formData, url: e.target.value})}
                      className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-cyan-500 focus:outline-none"
                      placeholder="https://leetcode.com/problems/..."
                    />
                  </div>
                  <div>
                    <label className="block text-white mb-2 font-medium">Solution Type</label>
                    <select
                      value={formData.solutionType || 'none'}
                      onChange={(e) => setFormData({...formData, solutionType: e.target.value})}
                      className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-cyan-500 focus:outline-none"
                    >
                      <option value="none">None</option>
                      <option value="text">Text Explanation</option>
                      <option value="youtube">YouTube Video</option>
                      <option value="code">Code Snippet</option>
                    </select>
                  </div>
                  {formData.solutionType === 'youtube' && (
                    <div>
                      <label className="block text-white mb-2 font-medium">YouTube Link</label>
                      <input
                        type="url"
                        value={formData.youtubeLink || ''}
                        onChange={(e) => setFormData({...formData, youtubeLink: e.target.value})}
                        className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-cyan-500 focus:outline-none"
                        placeholder="https://youtube.com/watch?v=..."
                      />
                    </div>
                  )}
                  {formData.solutionType === 'text' && (
                    <div>
                      <label className="block text-white mb-2 font-medium">Text Explanation</label>
                      <textarea
                        value={formData.textExplanation || ''}
                        onChange={(e) => setFormData({...formData, textExplanation: e.target.value})}
                        className="w-full p-3 bg-gray-700 text-white rounded-lg h-20 border border-gray-600 focus:border-cyan-500 focus:outline-none"
                        placeholder="Explain the solution approach..."
                      />
                    </div>
                  )}
                  {formData.solutionType === 'code' && (
                    <>
                      <div>
                        <label className="block text-white mb-2 font-medium">Programming Language</label>
                        <select
                          value={formData.codeLanguage || 'cpp'}
                          onChange={(e) => setFormData({...formData, codeLanguage: e.target.value})}
                          className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-cyan-500 focus:outline-none"
                        >
                          <option value="cpp">C++</option>
                          <option value="python">Python</option>
                          <option value="java">Java</option>
                          <option value="javascript">JavaScript</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-white mb-2 font-medium">Code Snippet</label>
                        <textarea
                          value={formData.codeSnippet || ''}
                          onChange={(e) => setFormData({...formData, codeSnippet: e.target.value})}
                          className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-cyan-500 focus:outline-none"
                          rows="8"
                          placeholder="Enter your code solution here..."
                        />
                      </div>
                    </>
                  )}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white mb-2 font-medium">Tags (comma separated)</label>
                      <input
                        type="text"
                        value={formData.tags || ''}
                        onChange={(e) => setFormData({...formData, tags: e.target.value})}
                        className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-cyan-500 focus:outline-none"
                        placeholder="array, sorting, binary search"
                      />
                    </div>
                    <div>
                      <label className="block text-white mb-2 font-medium">Companies (comma separated)</label>
                      <input
                        type="text"
                        value={formData.companies || ''}
                        onChange={(e) => setFormData({...formData, companies: e.target.value})}
                        className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-cyan-500 focus:outline-none"
                        placeholder="Google, Amazon, Microsoft"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white mb-2 font-medium">Order</label>
                      <input
                        type="number"
                        value={formData.order || 0}
                        onChange={(e) => setFormData({...formData, order: e.target.value ? parseInt(e.target.value) : 0})}
                        className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-cyan-500 focus:outline-none"
                        placeholder="0"
                      />
                    </div>
                    <div className="flex items-center">
                      <label className="flex items-center text-white cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.hasCodeEditor || false}
                          onChange={(e) => setFormData({...formData, hasCodeEditor: e.target.checked})}
                          className="mr-2 w-4 h-4 text-cyan-500 bg-gray-700 border-gray-600 rounded focus:ring-cyan-500"
                        />
                        <span className="font-medium">Enable Code Editor</span>
                      </label>
                    </div>
                  </div>
                </>
              )}

              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-600">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50 font-medium"
                >
                  {loading ? 'Saving...' : (editingItem ? 'Update' : 'Create')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDSA;
