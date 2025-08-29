import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  FaSpinner, 
  FaExclamationTriangle, 
  FaGraduationCap,
  FaChevronDown,
  FaChevronRight,
  FaCheckCircle,
  FaCircle,
  FaPlayCircle,
  FaBook,
  FaClock,
  FaTrophy,
  FaDatabase,
  FaDesktop,
  FaNetworkWired,
  FaCode,
  FaBookmark,
  FaRegBookmark,
  FaStar,
  FaSearch,
  FaFilter,
  FaChartLine,
  FaCalendarAlt,
  FaFire
} from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProgressManager from '../CoreSubjects/ProgressManager';

// Import actual modular subjects
import { DBMS_TOPICS } from '../CoreSubjects/DBMS';
import { OS_TOPICS } from '../CoreSubjects/OS';
import { CN_TOPICS } from '../CoreSubjects/CN';
import { OOP_TOPICS } from '../CoreSubjects/OOP';

const CoreSubjects = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedSubjects, setExpandedSubjects] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [bookmarkedTopics, setBookmarkedTopics] = useState(new Set());
  const [userProgress, setUserProgress] = useState({});

  // Progress tracking utilities
  const getStorageKey = (userId) => `coreSubjects_progress_${userId || 'guest'}`;
  
  const loadUserProgress = () => {
    try {
      const stored = ProgressManager.getProgress(user?.id);
      return stored || {};
    } catch (error) {
      console.error('Error loading progress:', error);
      return {};
    }
  };

  const saveUserProgress = (progress) => {
    try {
      ProgressManager.saveProgress(user?.id, progress);
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  };

  const loadBookmarks = () => {
    try {
      const stored = localStorage.getItem(`bookmarks_${user?.id || 'guest'}`);
      return stored ? new Set(JSON.parse(stored)) : new Set();
    } catch (error) {
      console.error('Error loading bookmarks:', error);
      return new Set();
    }
  };

  const saveBookmarks = (bookmarks) => {
    try {
      localStorage.setItem(`bookmarks_${user?.id || 'guest'}`, JSON.stringify([...bookmarks]));
    } catch (error) {
      console.error('Error saving bookmarks:', error);
    }
  };

  // Calculate real completion status based on user visits
  const calculateTopicCompletion = (subjectId, topicId, progress) => {
    const key = `${subjectId}_${topicId}`;
    return progress[key] || { completed: false, lastVisited: null, timeSpent: 0 };
  };

  // Convert modular topics to display format with real data
  const convertTopicsToDisplay = (topicsObj, subjectId, progress) => {
    return Object.entries(topicsObj).map(([key, topic]) => {
      const completion = calculateTopicCompletion(subjectId, topic.id, progress);
      return {
        id: topic.id,
        name: topic.name,
        description: topic.description,
        completed: completion.completed,
        lastVisited: completion.lastVisited,
        timeSpent: completion.timeSpent,
        duration: "45-90 min",
        subtopics: topic.subtopics || [],
        difficulty: topic.difficulty || 'Medium'
      };
    });
  };

  // Real subjects data with dynamic progress using ProgressManager
  const createRealSubjects = (progress) => {
    const topicsMap = {
      1: DBMS_TOPICS,
      2: OS_TOPICS,
      3: CN_TOPICS,
      4: OOP_TOPICS
    };

    return [
      {
        id: 1,
        name: "Database Management Systems (DBMS)",
        icon: FaDatabase,
        description: "Database Management Systems (DBMS) for Placements - Study Sheet. This Database Management Systems (DBMS) study sheet is thoughtfully designed for placement preparation, covering fundamental to advanced database concepts.",
        topics: convertTopicsToDisplay(DBMS_TOPICS, 1, progress),
        totalTopics: Object.keys(DBMS_TOPICS).length,
        category: "Backend",
        estimatedHours: 40,
        lastAccessed: progress.subject_1_lastAccessed || null,
        progress: ProgressManager.getSubjectProgress(1, topicsMap[1]).percentage
      },
      {
        id: 2,
        name: "Operating Systems",
        icon: FaDesktop,
        description: "Core operating system concepts including process management, memory management, file systems, and synchronization mechanisms. Essential for system-level programming and technical interviews.",
        topics: convertTopicsToDisplay(OS_TOPICS, 2, progress),
        totalTopics: Object.keys(OS_TOPICS).length,
        category: "Systems",
        estimatedHours: 35,
        lastAccessed: progress.subject_2_lastAccessed || null,
        progress: ProgressManager.getSubjectProgress(2, topicsMap[2]).percentage
      },
      {
        id: 3,
        name: "Computer Networks",
        icon: FaNetworkWired,
        description: "Comprehensive study of computer networking concepts covering OSI model, TCP/IP, routing protocols, network security, and modern networking technologies.",
        topics: convertTopicsToDisplay(CN_TOPICS, 3, progress),
        totalTopics: Object.keys(CN_TOPICS).length,
        category: "Networking",
        estimatedHours: 30,
        lastAccessed: progress.subject_3_lastAccessed || null,
        progress: ProgressManager.getSubjectProgress(3, topicsMap[3]).percentage
      },
      {
        id: 4,
        name: "Object-Oriented Programming (OOPs)",
        icon: FaCode,
        description: "Fundamental object-oriented programming concepts including encapsulation, inheritance, polymorphism, and abstraction. Essential for software development roles.",
        topics: convertTopicsToDisplay(OOP_TOPICS, 4, progress),
        totalTopics: Object.keys(OOP_TOPICS).length,
        category: "Programming",
        estimatedHours: 25,
        lastAccessed: progress.subject_4_lastAccessed || null,
        progress: ProgressManager.getSubjectProgress(4, topicsMap[4]).percentage
      }
    ];
  };

  useEffect(() => {
    const progress = loadUserProgress();
    const bookmarks = loadBookmarks();
    
    setUserProgress(progress);
    setBookmarkedTopics(bookmarks);
    
    const realSubjects = createRealSubjects(progress);
    setSubjects(realSubjects);
    setLoading(false);

    // Listen for ProgressManager updates to sync real-time changes
    const handleProgressUpdate = () => {
      const updatedSubjects = createRealSubjects(progress);
      setSubjects(updatedSubjects);
    };

    window.addEventListener('progressUpdated', handleProgressUpdate);
    window.addEventListener('progressReset', handleProgressUpdate);

    return () => {
      window.removeEventListener('progressUpdated', handleProgressUpdate);
      window.removeEventListener('progressReset', handleProgressUpdate);
    };
  }, [user]);

  const toggleSubjectExpansion = (subjectId) => {
    setExpandedSubjects(prev => ({
      ...prev,
      [subjectId]: !prev[subjectId]
    }));
  };

  const handleTopicClick = (subjectId, topicId) => {
    // Update progress tracking
    const newProgress = {
      ...userProgress,
      [`${subjectId}_${topicId}`]: {
        completed: false,
        lastVisited: new Date().toISOString(),
        timeSpent: (userProgress[`${subjectId}_${topicId}`]?.timeSpent || 0)
      },
      [`subject_${subjectId}_lastAccessed`]: new Date().toISOString()
    };
    
    setUserProgress(newProgress);
    saveUserProgress(newProgress);
    
    navigate(`/subject/${subjectId}/topic/${topicId}`);
  };

  const toggleBookmark = (subjectId, topicId) => {
    const topicKey = `${subjectId}_${topicId}`;
    const newBookmarks = new Set(bookmarkedTopics);
    
    if (newBookmarks.has(topicKey)) {
      newBookmarks.delete(topicKey);
    } else {
      newBookmarks.add(topicKey);
    }
    
    setBookmarkedTopics(newBookmarks);
    saveBookmarks(newBookmarks);
  };

  const markTopicComplete = (subjectId, topicId) => {
    const key = `${subjectId}_${topicId}`;
    const newProgress = {
      ...userProgress,
      [key]: {
        ...userProgress[key],
        completed: !userProgress[key]?.completed,
        lastVisited: new Date().toISOString()
      }
    };
    
    setUserProgress(newProgress);
    saveUserProgress(newProgress);
    
    // Update subjects state
    const updatedSubjects = subjects.map(subject => {
      if (subject.id === subjectId) {
        const updatedTopics = subject.topics.map(topic => {
          if (topic.id === topicId) {
            return { ...topic, completed: newProgress[key].completed };
          }
          return topic;
        });
        return {
          ...subject,
          topics: updatedTopics,
          progress: ProgressManager.getSubjectProgress(subjectId, subject.topics).percentage
        };
      }
      return subject;
    });
    
    setSubjects(updatedSubjects);
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 60) return 'bg-blue-500';
    if (progress >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'hard': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getFilteredTopics = (topics) => {
    return topics.filter(topic => {
      const matchesSearch = topic.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           topic.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterStatus === 'all' || 
        (filterStatus === 'completed' && topic.completed) ||
        (filterStatus === 'in-progress' && topic.lastVisited && !topic.completed) ||
        (filterStatus === 'not-started' && !topic.lastVisited);
      
      return matchesSearch && matchesFilter;
    });
  };

  const getFilteredSubjects = (subjects) => {
    if (!searchTerm && filterStatus === 'all') {
      return subjects;
    }

    return subjects.filter(subject => {
      // Search in subject name and description
      const subjectMatchesSearch = !searchTerm || 
        subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        subject.description.toLowerCase().includes(searchTerm.toLowerCase());

      // Check if any topics in the subject match the search/filter
      const hasMatchingTopics = subject.topics.some(topic => {
        const topicMatchesSearch = !searchTerm || 
          topic.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          topic.description?.toLowerCase().includes(searchTerm.toLowerCase());
        
        const topicMatchesFilter = filterStatus === 'all' || 
          (filterStatus === 'completed' && topic.completed) ||
          (filterStatus === 'in-progress' && topic.lastVisited && !topic.completed) ||
          (filterStatus === 'not-started' && !topic.lastVisited);
        
        return topicMatchesSearch && topicMatchesFilter;
      });

      // Subject matches if either the subject itself matches search OR it has matching topics
      return subjectMatchesSearch || hasMatchingTopics;
    });
  };

  const formatLastAccessed = (dateString) => {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="h-full bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="w-12 h-12 text-blue-400 animate-spin mx-auto mb-4" />
          <p className="text-gray-300 text-lg">Loading core subjects...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full bg-gray-900 flex items-center justify-center">
        <div className="bg-red-500/20 backdrop-blur-sm border border-red-500/30 rounded-2xl p-8 text-center max-w-md">
          <FaExclamationTriangle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Error Loading Subjects</h2>
          <p className="text-gray-300 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/30">
      {/* Enhanced animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-gradient-to-br from-purple-500/15 to-pink-600/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
        
        {/* Floating particles */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-cyan-400/30 rounded-full animate-bounce"></div>
        <div className="absolute top-40 right-32 w-1.5 h-1.5 bg-purple-400/30 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-1/3 w-1 h-1 bg-blue-400/30 rounded-full animate-bounce" style={{ animationDelay: '2s' }}></div>
      </div>

      <Navbar />
      
      <div className="relative z-10 flex flex-col min-h-screen pt-32">
        <div className="flex-grow py-4 sm:py-8 px-3 sm:px-4 lg:px-6 max-w-7xl mx-auto w-full">
          {/* Header Section */}
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent mb-4 animate-fade-in">
              Core Subjects
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed animate-fade-in-up mb-8" style={{ animationDelay: '200ms' }}>
              Master the fundamental concepts that form the backbone of computer science and software development
            </p>
            
            {/* Search and Filter Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-center gap-4 mb-8">
              <div className="relative flex-1 max-w-md">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search topics..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                />
              </div>
              <div className="relative">
                <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="pl-10 pr-8 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent appearance-none cursor-pointer min-w-[160px]"
                >
                  <option value="all">All Topics</option>
                  <option value="completed">Completed</option>
                  <option value="in-progress">In Progress</option>
                  <option value="not-started">Not Started</option>
                </select>
                <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Responsive Subjects List */}
          <div className="space-y-4 sm:space-y-6">
            {(() => {
              const filteredSubjects = getFilteredSubjects(subjects);
              
              if (filteredSubjects.length === 0) {
                return (
                  <div className="text-center py-12">
                    <div className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl p-8">
                      <FaSearch className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-white mb-2">No Results Found</h3>
                      <p className="text-gray-400 mb-4">
                        {searchTerm 
                          ? `No subjects or topics match "${searchTerm}"` 
                          : `No subjects match the selected filter "${filterStatus}"`
                        }
                      </p>
                      <button
                        onClick={() => {
                          setSearchTerm('');
                          setFilterStatus('all');
                        }}
                        className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                      >
                        Clear Filters
                      </button>
                    </div>
                  </div>
                );
              }

              return (
                <>
                  {(searchTerm || filterStatus !== 'all') && (
                    <div className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg p-3 mb-4">
                      <div className="flex items-center justify-between text-sm text-gray-300">
                        <span>
                          Found {filteredSubjects.length} subject{filteredSubjects.length !== 1 ? 's' : ''}
                          {searchTerm && ` matching "${searchTerm}"`}
                          {filterStatus !== 'all' && ` with ${filterStatus} topics`}
                        </span>
                        <button
                          onClick={() => {
                            setSearchTerm('');
                            setFilterStatus('all');
                          }}
                          className="text-purple-400 hover:text-purple-300 transition-colors"
                        >
                          Clear
                        </button>
                      </div>
                    </div>
                  )}
                  {filteredSubjects.map((subject) => (
                    <div key={subject.id} className="bg-white/5 backdrop-blur-sm border-2 border-white/20 rounded-xl overflow-hidden hover:border-white/30 hover:bg-white/8 transition-all duration-300 shadow-lg hover:shadow-purple-500/10">
                      {/* Responsive Subject Header */}
                      <div className="p-4 sm:p-6 border-b border-white/20">
                        <div className="flex flex-col lg:flex-row lg:items-start justify-between mb-4 space-y-4 lg:space-y-0">
                          <div className="flex-1">
                            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 mb-3">
                              <div className="flex items-center space-x-3">
                                <subject.icon className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400 flex-shrink-0" />
                                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white leading-tight">{subject.name}</h2>
                              </div>
                              <div className="flex items-center space-x-2 flex-wrap">
                                <span className="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded-full whitespace-nowrap">
                                  {subject.category}
                                </span>
                                {subject.progress >= 80 && (
                                  <FaTrophy className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" />
                                )}
                              </div>
                            </div>
                            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-3 sm:line-clamp-none">
                              {subject.description}
                            </p>
                            
                            {/* Responsive Enhanced Progress Section */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-4">
                              <div className="flex items-center space-x-2 min-w-0">
                                <FaChartLine className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400 flex-shrink-0" />
                                <span className="text-xs sm:text-sm text-gray-400 flex-shrink-0">Progress:</span>
                                <span className="text-purple-400 font-semibold text-xs sm:text-sm flex-shrink-0">{subject.progress}%</span>
                                <div className="flex-1 h-1.5 sm:h-2 bg-slate-700 rounded-full overflow-hidden min-w-0">
                                  <div 
                                    className={`h-full ${getProgressColor(subject.progress)} transition-all duration-500`}
                                    style={{ width: `${subject.progress}%` }}
                                  />
                                </div>
                              </div>
                              <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-400">
                                <FaClock className="w-3 h-3 sm:w-4 sm:h-4" />
                                <span className="hidden sm:inline">{subject.estimatedHours}h total</span>
                                <span className="sm:hidden">45-90m</span>
                              </div>
                              <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-400">
                                <FaCalendarAlt className="w-3 h-3 sm:w-4 sm:h-4" />
                                <span className="truncate">Last: {formatLastAccessed(subject.lastAccessed)}</span>
                              </div>
                            </div>
                          </div>
                          
                          {/* Responsive Stats Section */}
                          <div className="text-center lg:text-right lg:ml-6 flex-shrink-0">
                            <div className="text-2xl sm:text-3xl font-bold text-white mb-1">{subject.progress}%</div>
                            <div className="text-xs sm:text-sm text-gray-400 mb-2">
                              {subject.topics.filter(topic => topic.completed).length}/{subject.totalTopics} topics
                            </div>
                            {subject.progress > 0 && (
                              <div className="flex items-center justify-center lg:justify-end space-x-1 text-orange-400">
                                <FaFire className="w-3 h-3" />
                                <span className="text-xs">Active</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Responsive Action Buttons */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-3 sm:space-y-0 sm:space-x-4">
                          <div className="text-xs sm:text-sm text-gray-400 text-center sm:text-left">
                            Explore the Complete Playlist: <span 
                              className="text-purple-400 underline cursor-pointer hover:text-purple-300 transition-colors"
                              onClick={() => toggleSubjectExpansion(subject.id)}
                            >
                              {subject.name} for Placements
                            </span>
                          </div>
                          <button
                            onClick={() => toggleSubjectExpansion(subject.id)}
                            className="flex items-center justify-center space-x-2 px-4 py-2.5 sm:py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg transition-all duration-200 transform hover:scale-105 text-sm sm:text-base font-medium"
                          >
                            {expandedSubjects[subject.id] ? (
                              <>
                                <FaChevronDown className="w-4 h-4" />
                                <span>Collapse</span>
                              </>
                            ) : (
                              <>
                                <FaChevronRight className="w-4 h-4" />
                                <span>Expand Topics</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Responsive Expandable Topics Section */}
                      {expandedSubjects[subject.id] && (
                        <div className="bg-white/3 backdrop-blur-sm">
                          <div className="p-3 sm:p-4">
                            <div className="grid grid-cols-1 gap-2 sm:gap-3">
                              {getFilteredTopics(subject.topics).map((topic, index) => (
                                <div
                                  key={topic.id}
                                  className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 bg-white/5 hover:bg-white/8 rounded-lg transition-all duration-200 group border border-white/20 hover:border-white/30 space-y-3 sm:space-y-0"
                                >
                                  <div className="flex items-start sm:items-center space-x-3 sm:space-x-4 flex-1 min-w-0">
                                    <div className="flex items-start sm:items-center space-x-3 flex-1 min-w-0">
                                      <button
                                        onClick={() => markTopicComplete(subject.id, topic.id)}
                                        className="transition-colors duration-200 flex-shrink-0 mt-0.5 sm:mt-0"
                                      >
                                        {topic.completed ? (
                                          <FaCheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 hover:text-green-300" />
                                        ) : (
                                          <FaCircle className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 hover:text-gray-400" />
                                        )}
                                      </button>
                                      <div className="flex-1 min-w-0">
                                        <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2 mb-1">
                                          <span 
                                            className={`font-medium cursor-pointer hover:text-purple-400 transition-colors text-sm sm:text-base leading-tight ${topic.completed ? 'text-white' : 'text-gray-300'}`}
                                            onClick={() => handleTopicClick(subject.id, topic.id)}
                                          >
                                            {topic.name}
                                          </span>
                                          <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(topic.difficulty)} bg-slate-800/50 whitespace-nowrap`}>
                                            {topic.difficulty}
                                          </span>
                                        </div>
                                        {topic.lastVisited && (
                                          <div className="text-xs text-gray-500">
                                            Last visited: {formatLastAccessed(topic.lastVisited)}
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                  
                                  {/* Responsive Topic Actions */}
                                  <div className="flex items-center justify-between sm:justify-end space-x-3 sm:space-x-3 flex-shrink-0">
                                    <div className="flex items-center space-x-3">
                                      <button
                                        onClick={() => toggleBookmark(subject.id, topic.id)}
                                        className="text-gray-400 hover:text-yellow-400 transition-colors duration-200"
                                      >
                                        {bookmarkedTopics.has(`${subject.id}_${topic.id}`) ? (
                                          <FaBookmark className="w-3 h-3 sm:w-4 sm:h-4" />
                                        ) : (
                                          <FaRegBookmark className="w-3 h-3 sm:w-4 sm:h-4" />
                                        )}
                                      </button>
                                      <div className="flex items-center space-x-1 sm:space-x-2 text-gray-400 text-xs sm:text-sm">
                                        <FaClock className="w-3 h-3 sm:w-4 sm:h-4" />
                                        <span className="hidden sm:inline">{topic.duration}</span>
                                        <span className="sm:hidden">45-90m</span>
                                      </div>
                                    </div>
                                    <div className="flex items-center">
                                      {topic.completed ? (
                                        <span className="text-green-400 text-xs sm:text-sm font-medium flex items-center space-x-1">
                                          <FaCheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                                          <span className="hidden sm:inline">Completed</span>
                                          <span className="sm:hidden">Done</span>
                                        </span>
                                      ) : (
                                        <button
                                          onClick={() => handleTopicClick(subject.id, topic.id)}
                                          className="flex items-center space-x-1 px-2 sm:px-3 py-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-xs sm:text-sm rounded-md transition-all duration-200 transform hover:scale-105 whitespace-nowrap"
                                        >
                                          <FaPlayCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                                          <span>{topic.lastVisited ? 'Continue' : 'Start'}</span>
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                            
                            {getFilteredTopics(subject.topics).length === 0 && (
                              <div className="text-center py-6 sm:py-8 text-gray-400">
                                <FaSearch className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 opacity-50" />
                                <p className="text-sm sm:text-base">No topics found matching your criteria</p>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </>
              );
            })()}
          </div>

          {/* Responsive Enhanced Bottom Stats */}
          <div className="mt-8 sm:mt-12 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            <div className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl p-4 sm:p-6 text-center hover:border-white/30 transition-colors">
              <FaBook className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-400 mx-auto mb-2 sm:mb-3" />
              <div className="text-xl sm:text-2xl font-bold text-white mb-1">{subjects.length}</div>
              <div className="text-gray-400 text-xs sm:text-sm">Core Subjects</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl p-4 sm:p-6 text-center hover:border-white/30 transition-colors">
              <FaTrophy className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400 mx-auto mb-2 sm:mb-3" />
              <div className="text-xl sm:text-2xl font-bold text-white mb-1">
                {subjects.reduce((acc, s) => acc + s.topics.filter(t => t.completed).length, 0)}
              </div>
              <div className="text-gray-400 text-xs sm:text-sm">Topics Completed</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl p-4 sm:p-6 text-center hover:border-white/30 transition-colors">
              <FaGraduationCap className="w-6 h-6 sm:w-8 sm:h-8 text-green-400 mx-auto mb-2 sm:mb-3" />
              <div className="text-xl sm:text-2xl font-bold text-white mb-1">
                {Math.round(subjects.reduce((acc, s) => acc + s.progress, 0) / subjects.length) || 0}%
              </div>
              <div className="text-gray-400 text-xs sm:text-sm">Average Progress</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl p-4 sm:p-6 text-center hover:border-white/30 transition-colors">
              <FaStar className="w-6 h-6 sm:w-8 sm:h-8 text-pink-400 mx-auto mb-2 sm:mb-3" />
              <div className="text-xl sm:text-2xl font-bold text-white mb-1">{bookmarkedTopics.size}</div>
              <div className="text-gray-400 text-xs sm:text-sm">Bookmarked</div>
            </div>
          </div>

          {/* Responsive Study Streak Section */}
          {subjects.some(s => s.progress > 0) && (
            <div className="mt-6 sm:mt-8 bg-gradient-to-r from-orange-500/20 to-red-500/20 backdrop-blur-sm border border-orange-500/30 rounded-xl p-4 sm:p-6">
              <div className="flex items-center justify-center space-x-2 sm:space-x-3">
                <FaFire className="w-5 h-5 sm:w-6 sm:h-6 text-orange-400" />
                <h3 className="text-lg sm:text-xl font-bold text-white text-center">Keep up the momentum!</h3>
                <FaFire className="w-5 h-5 sm:w-6 sm:h-6 text-orange-400" />
              </div>
              <p className="text-center text-gray-300 mt-2 text-sm sm:text-base px-2">
                You're making great progress across {subjects.filter(s => s.progress > 0).length} subjects. 
                Stay consistent to master these core concepts!
              </p>
            </div>
          )}
          
          {/* Enhanced Study Motivation */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 sm:p-6 text-center mb-6 sm:mb-8">
            <div className="flex items-center justify-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
              <FaFire className="w-5 h-5 sm:w-6 sm:h-6 text-orange-400" />
              <h3 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Keep Learning!
              </h3>
            </div>
            <p className="text-gray-300 text-sm sm:text-base mb-4">
              {subjects.reduce((acc, s) => acc + s.topics.filter(t => t.completed).length, 0) > 0 
                ? `Great progress! You've completed ${subjects.reduce((acc, s) => acc + s.topics.filter(t => t.completed).length, 0)} topics. Keep going!`
                : "Start your learning journey today. Every expert was once a beginner!"
              }
            </p>
            <div className="flex flex-wrap justify-center gap-2 text-xs sm:text-sm text-gray-400">
              <span className="flex items-center space-x-1">
                <FaBookmark className="w-3 h-3" />
                <span>Bookmark important topics</span>
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center space-x-1">
                <FaSearch className="w-3 h-3" />
                <span>Search to find specific content</span>
              </span>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default CoreSubjects;
