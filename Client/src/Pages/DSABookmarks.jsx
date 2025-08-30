import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ProblemModal from '../components/ProblemModal';
import { FiBookmark, FiClock, FiTarget, FiSearch, FiFilter } from 'react-icons/fi';
import api from '../utils/api';

const DSABookmarks = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [bookmarkedProblems, setBookmarkedProblems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [showProblemModal, setShowProblemModal] = useState(false);
  const [filters, setFilters] = useState({
    difficulty: 'All',
    topic: 'All',
    search: ''
  });
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    fetchBookmarkedProblems();
    fetchTopics();
  }, [isAuthenticated, navigate]);

  const fetchBookmarkedProblems = async () => {
    setLoading(true);
    try {
      const response = await api.get('/api/dsa/progress/bookmarks');
      if (response.data.success) {
        setBookmarkedProblems(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching bookmarked problems:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTopics = async () => {
    try {
      const response = await api.get('/api/dsa/topics');
      if (response.data.success) {
        setTopics(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching topics:', error);
    }
  };

  const openProblemModal = (problem) => {
    setSelectedProblem(problem);
    setShowProblemModal(true);
  };

  const closeProblemModal = () => {
    setSelectedProblem(null);
    setShowProblemModal(false);
  };

  const handleProgressUpdate = () => {
    fetchBookmarkedProblems();
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy': return 'text-green-600 bg-green-100 border-green-200';
      case 'medium': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'hard': return 'text-red-600 bg-red-100 border-red-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getTopicName = (topicId) => {
    const topic = topics.find(t => t._id === topicId);
    return topic ? topic.name : 'Unknown Topic';
  };

  const filteredProblems = bookmarkedProblems.filter(problem => {
    const matchesDifficulty = filters.difficulty === 'All' || problem.difficulty === filters.difficulty;
    const matchesTopic = filters.topic === 'All' || problem.topicId === filters.topic;
    const matchesSearch = filters.search === '' || 
      problem.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      problem.description.toLowerCase().includes(filters.search.toLowerCase());
    
    return matchesDifficulty && matchesTopic && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <FiBookmark className="text-yellow-400" size={32} />
            <h1 className="text-4xl font-bold text-white">Bookmarked Problems</h1>
          </div>
          <p className="text-gray-300 text-lg">Review and practice your saved problems</p>
        </div>

        {/* Filters */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search problems..."
                value={filters.search}
                onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Difficulty Filter */}
            <select
              value={filters.difficulty}
              onChange={(e) => setFilters(prev => ({ ...prev, difficulty: e.target.value }))}
              className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-500"
            >
              <option value="All">All Difficulties</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>

            {/* Topic Filter */}
            <select
              value={filters.topic}
              onChange={(e) => setFilters(prev => ({ ...prev, topic: e.target.value }))}
              className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-500"
            >
              <option value="All">All Topics</option>
              {topics.map(topic => (
                <option key={topic._id} value={topic._id}>{topic.name}</option>
              ))}
            </select>

            {/* Results Count */}
            <div className="flex items-center justify-center text-gray-300">
              <FiFilter className="mr-2" />
              {filteredProblems.length} problems
            </div>
          </div>
        </div>

        {/* Problems Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : filteredProblems.length === 0 ? (
          <div className="text-center py-12">
            <FiBookmark className="mx-auto text-gray-400 mb-4" size={64} />
            <h3 className="text-xl font-semibold text-gray-300 mb-2">No bookmarked problems</h3>
            <p className="text-gray-400">Start bookmarking problems from the DSA Sheet to build your revision list!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProblems.map(problem => (
              <div key={problem._id} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:border-white/40 transition-all">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">
                      {problem.title}
                    </h3>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(problem.difficulty)}`}>
                        {problem.difficulty}
                      </span>
                      <span className="text-xs text-gray-400">
                        {getTopicName(problem.topicId)}
                      </span>
                    </div>
                  </div>
                  <FiBookmark className="text-yellow-400 flex-shrink-0" size={20} />
                </div>

                {/* Description */}
                <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                  {problem.description}
                </p>

                {/* Tags */}
                {problem.tags && problem.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {problem.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                    {problem.tags.length > 3 && (
                      <span className="px-2 py-1 bg-gray-500/20 text-gray-300 text-xs rounded-full">
                        +{problem.tags.length - 3} more
                      </span>
                    )}
                  </div>
                )}

                {/* Progress Indicators */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex space-x-2">
                    {problem.userProgress?.completed && (
                      <span className="flex items-center space-x-1 text-green-400 text-xs">
                        <FiTarget size={12} />
                        <span>Completed</span>
                      </span>
                    )}
                    {problem.userProgress?.practiced && !problem.userProgress?.completed && (
                      <span className="flex items-center space-x-1 text-blue-400 text-xs">
                        <FiClock size={12} />
                        <span>Practiced</span>
                      </span>
                    )}
                  </div>
                  
                  {problem.userProgress?.lastAttemptCode && (
                    <span className="text-xs text-gray-400">
                      Last attempt: {new Date(problem.userProgress.lastAttemptCode.timestamp).toLocaleDateString()}
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <button
                    onClick={() => openProblemModal(problem)}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:from-blue-600 hover:to-purple-700 transition-all"
                  >
                    {problem.hasCodeEditor ? 'Code Editor' : 'View Problem'}
                  </button>
                  
                  {problem.practiceLink && (
                    <a
                      href={problem.practiceLink.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-white/10 text-white rounded-lg text-sm hover:bg-white/20 transition-colors"
                    >
                      Practice
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Problem Modal */}
      <ProblemModal
        problem={selectedProblem}
        isOpen={showProblemModal}
        onClose={closeProblemModal}
        onProgressUpdate={handleProgressUpdate}
      />
    </div>
  );
};

export default DSABookmarks;
