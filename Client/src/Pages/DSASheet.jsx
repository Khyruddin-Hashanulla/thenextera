import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProblemModal from '../components/ProblemModal';

const DSASheet = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  // State management
  const [topics, setTopics] = useState([]);
  const [problems, setProblems] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [expandedTopics, setExpandedTopics] = useState(new Set());
  const [userStats, setUserStats] = useState({
    totalProblems: 0,
    completedProblems: 0,
    bookmarkedProblems: 0,
    currentStreak: 0,
    maxStreak: 0
  });
  const [loading, setLoading] = useState(true);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [showProblemModal, setShowProblemModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [activityData, setActivityData] = useState([]);
  const [showSidebar, setShowSidebar] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    difficulty: 'All',
    platform: 'All',
    status: 'All'
  });
  const [refreshing, setRefreshing] = useState(false);
  const [searchDebounce, setSearchDebounce] = useState(null);
  const [showDevelopmentModal, setShowDevelopmentModal] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      fetchTopics();
      fetchUserStats();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        if (showVideoModal) {
          closeVideoModal();
        } else if (showProblemModal) {
          closeProblemModal();
        } else if (showDevelopmentModal) {
          setShowDevelopmentModal(false);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showVideoModal, showProblemModal, showDevelopmentModal]);

  useEffect(() => {
    console.log('Activity data changed:', activityData.length, 'entries');
    if (activityData.length > 0) {
      console.log('First few activity entries:', activityData.slice(0, 5));
      console.log('Last few activity entries:', activityData.slice(-5));
      console.log('Activity data with levels > 0:', activityData.filter(d => d.level > 0).length);
    }
  }, [activityData]);

  useEffect(() => {
    let pollInterval;
    
    const pollForUpdates = async () => {
      try {
        // Only poll if user is authenticated and has topics loaded
        if (!topics.length) return;
        
        console.log('🔄 Polling for topic updates...');
        
        // Fetch latest topic counts
        const response = await api.get('/api/dsa/topics');
        if (response.data.success) {
          const latestTopics = response.data.topics;
          
          // Check if any topic has different problem counts
          let hasUpdates = false;
          const updatedTopics = topics.map(currentTopic => {
            const latestTopic = latestTopics.find(t => t.id === currentTopic.id);
            if (latestTopic && latestTopic.totalProblems !== currentTopic.totalProblems) {
              console.log(`📊 Topic "${currentTopic.name}" updated: ${currentTopic.totalProblems} → ${latestTopic.totalProblems} problems`);
              hasUpdates = true;
              return { ...currentTopic, totalProblems: latestTopic.totalProblems };
            }
            return currentTopic;
          });
          
          // Update topics if there are changes
          if (hasUpdates) {
            setTopics(updatedTopics);
            console.log('✅ Topic counts updated automatically');
            
            // Also refresh user stats to get updated totals
            fetchUserStats();
          }
        }
      } catch (error) {
        console.error('❌ Error polling for updates:', error);
      }
    };
    
    // Start polling every 30 seconds when component is active
    if (topics.length > 0) {
      pollInterval = setInterval(pollForUpdates, 30000); // 30 seconds
      console.log('🔄 Started polling for topic updates every 30 seconds');
    }
    
    // Cleanup interval on unmount or when topics change
    return () => {
      if (pollInterval) {
        clearInterval(pollInterval);
        console.log('🛑 Stopped polling for topic updates');
      }
    };
  }, [topics.length]); // Only depend on topics.length to avoid excessive re-renders

  const fetchTopics = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/dsa/topics');
      console.log('DSASheet topics response:', response.data);
      console.log('First topic data:', response.data.topics?.[0]);
      setTopics(response.data.topics || []);
    } catch (error) {
      console.error('Error fetching topics:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProblems = async (topicId) => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filters.difficulty !== 'All') params.append('difficulty', filters.difficulty);
      if (filters.platform !== 'All') params.append('platform', filters.platform);
      if (filters.search) params.append('search', filters.search);

      const response = await api.get(`/api/dsa/topics/${topicId}/problems?${params}`);
      setProblems(response.data.problems || []);
    } catch (error) {
      console.error('Error fetching problems:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserStats = async () => {
    try {
      console.log('🔄 Fetching user stats...');
      const response = await api.get('/api/dsa/progress/stats');
      const stats = response.data.stats || {};
      console.log('📊 Received stats from API:', stats);
      setUserStats(stats);

      // Fetch real activity data from API
      try {
        console.log('🔄 Fetching activity data...');
        const activityResponse = await api.get('/api/dsa/progress/activity');
        if (activityResponse.data.success) {
          console.log('✅ Fetched real activity data:', activityResponse.data.activity.length, 'entries');
          console.log('📅 Activity data sample:', activityResponse.data.activity.slice(-5));
          setActivityData(activityResponse.data.activity || []);
        } else {
          console.log('❌ Activity API returned no data, using empty array');
          setActivityData([]);
        }
      } catch (activityError) {
        console.log('❌ Activity API not available, using empty array');
        console.error('Activity error:', activityError);
        setActivityData([]);
      }

      // Fetch real streak data
      try {
        console.log('🔄 Fetching streak data...');
        const streakResponse = await api.get('/api/dsa/progress/streaks');
        if (streakResponse.data.success) {
          console.log('🏆 Received streak data:', streakResponse.data);
          setUserStats(prev => ({
            ...prev,
            currentStreak: streakResponse.data.currentStreak,
            maxStreak: streakResponse.data.maxStreak
          }));
        }
      } catch (streakError) {
        console.log('❌ Streak API not available, using defaults');
        console.error('Streak error:', streakError);
      }
    } catch (error) {
      console.error('❌ Error fetching user stats:', error);
      // Set default stats if API fails
      setUserStats({
        totalProblems: 0,
        completedProblems: 0,
        bookmarkedProblems: 0,
        currentStreak: 0,
        maxStreak: 0
      });
      setActivityData([]);
    }
  };

  const refreshActivityData = () => {
    console.log('Manually refreshing activity data...');
    fetchUserStats();
  };

  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
    fetchProblems(topic.id);
    setExpandedTopics(prev => new Set([...prev, topic.id]));
  };

  const toggleTopicExpansion = async (topicId) => {
    setExpandedTopics(prev => {
      const newSet = new Set(prev);
      if (newSet.has(topicId)) {
        newSet.delete(topicId);
        // Clear problems when collapsing
        if (selectedTopic?.id === topicId) {
          setProblems([]);
          setSelectedTopic(null);
        }
      } else {
        newSet.add(topicId);
        // Load problems when expanding
        const topic = topics.find(t => t.id === topicId);
        if (topic) {
          setSelectedTopic(topic);
          fetchProblems(topicId);
        }
      }
      return newSet;
    });
  };

  const openProblemModal = (problem) => {
    setSelectedProblem(problem);
    setShowProblemModal(true);
  };

  const closeProblemModal = () => {
    setSelectedProblem(null);
    setShowProblemModal(false);
  };

  const openYouTubeDirectly = (problem) => {
    if (problem.solution && problem.solution.type === 'youtube' && problem.solution.youtubeLink) {
      // Open YouTube link directly in new tab
      window.open(problem.solution.youtubeLink, '_blank', 'noopener,noreferrer');
    } else {
      // Fallback to regular modal for non-YouTube solutions
      openProblemModal(problem);
    }
  };

  const openCodeEditor = (problem) => {
    // Show "Under Development" modal instead of opening code editor
    setSelectedFeature('CodeEditor');
    setShowDevelopmentModal(true);
  };

  const openNotesModal = (problem) => {
    // TODO: Implement notes modal functionality
    console.log('Opening notes for:', problem.title);
  };

  const handleProgressUpdate = () => {
    fetchUserStats();
    if (selectedTopic) {
      fetchProblems(selectedTopic.id);
    }
  };

  const handleProgressMark = async (problemId, action) => {
    console.log(`🔄 Starting ${action} for problem:`, problemId);
    
    try {
      const response = await api.post('/api/dsa/progress/mark', { 
        problemId, 
        action
      });
      
      console.log(`✅ API Response for ${action}:`, response.data);
      
      if (response.data.success) {
        // Update local state immediately for better UX
        setProblems(prevProblems => 
          prevProblems.map(problem => {
            if (problem.id === problemId || problem._id === problemId) {
              const currentProgress = problem.userProgress || {};
              let updatedProgress = { ...currentProgress };
              
              console.log(`📊 Current progress for problem ${problemId}:`, currentProgress);
              
              if (action === 'completed') {
                updatedProgress.completed = !currentProgress.completed;
                updatedProgress.status = updatedProgress.completed ? 'completed' : 'not_started';
                console.log(`✅ Updated completed status:`, updatedProgress.completed);
              } else if (action === 'practiced') {
                updatedProgress.practiced = !currentProgress.practiced;
                updatedProgress.status = 'practiced';
              } else if (action === 'bookmark') {
                updatedProgress.bookmarked = !currentProgress.bookmarked;
                updatedProgress.isBookmarked = !currentProgress.isBookmarked;
                console.log(`🔖 Updated bookmark status:`, updatedProgress.isBookmarked);
              }
              
              return { 
                ...problem, 
                userProgress: updatedProgress
              };
            }
            return problem;
          })
        );
        
        // Update local stats immediately for instant UI feedback
        if (action === 'completed') {
          console.log(`📈 Updating stats for completed action`);
          setUserStats(prevStats => {
            const currentCompleted = prevStats.completedProblems || 0;
            // Check if the problem was actually completed (not uncompleted)
            const isCompleting = response.data.progress?.status === 'completed' || 
                                response.data.progress?.completed === true;
            const newCompleted = isCompleting 
              ? currentCompleted + 1 
              : Math.max(0, currentCompleted - 1);
            
            console.log(`📊 Stats update: ${currentCompleted} → ${newCompleted} (completing: ${isCompleting})`);
            console.log(`🔍 Backend response progress:`, response.data.progress);
            
            return {
              ...prevStats,
              completedProblems: newCompleted
            };
          });

          // Update today's activity immediately for real-time grid updates
          const today = new Date();
          const todayStr = today.getFullYear() + '-' + 
                          String(today.getMonth() + 1).padStart(2, '0') + '-' + 
                          String(today.getDate()).padStart(2, '0');
          console.log(`📅 Updating activity for today: ${todayStr} (local timezone)`);
          
          setActivityData(prevActivity => {
            console.log(`🎯 Current activity data length:`, prevActivity.length);
            
            return prevActivity.map(day => {
              if (day.date === todayStr) {
                // Check if the problem was actually completed (not uncompleted)
                const isCompleting = response.data.progress?.status === 'completed' || 
                                    response.data.progress?.completed === true;
                const newCount = isCompleting 
                  ? (day.count || 0) + 1 
                  : Math.max(0, (day.count || 0) - 1);
                
                // Calculate new level based on count
                let newLevel = 0;
                if (newCount === 0) newLevel = 0;
                else if (newCount <= 2) newLevel = 1;
                else if (newCount <= 5) newLevel = 2;
                else if (newCount <= 8) newLevel = 3;
                else newLevel = 4;
                
                console.log(`🎨 Activity update for ${todayStr}: count ${day.count || 0} → ${newCount}, level ${day.level || 0} → ${newLevel}`);
                
                return {
                  ...day,
                  count: newCount,
                  level: newLevel
                };
              }
              return day;
            });
          });
        } else if (action === 'bookmark') {
          setUserStats(prevStats => {
            const currentBookmarked = prevStats.bookmarkedProblems || 0;
            const isBookmarking = response.data.progress?.isBookmarked;
            const newBookmarked = isBookmarking 
              ? currentBookmarked + 1 
              : Math.max(0, currentBookmarked - 1);
            
            console.log(`🔖 Bookmark stats update: ${currentBookmarked} → ${newBookmarked}`);
            
            return {
              ...prevStats,
              bookmarkedProblems: newBookmarked
            };
          });
        }

        // Update topic progress counts in the topics list
        if (selectedTopic && (action === 'completed' || action === 'practiced')) {
          setTopics(prevTopics => 
            prevTopics.map(topic => {
              if (topic.id === selectedTopic.id) {
                const currentProgress = topic.userProgress || { completedProblems: 0, practicedProblems: 0 };
                let updatedProgress = { ...currentProgress };
                
                if (action === 'completed') {
                  const isCompleting = response.data.progress?.status === 'completed' || 
                                      response.data.progress?.completed === true;
                  updatedProgress.completedProblems = isCompleting 
                    ? (currentProgress.completedProblems || 0) + 1 
                    : Math.max(0, (currentProgress.completedProblems || 0) - 1);
                  
                  // Also update practiced count if completing
                  if (isCompleting && !currentProgress.practiced) {
                    updatedProgress.practicedProblems = (currentProgress.practicedProblems || 0) + 1;
                  }
                } else if (action === 'practiced') {
                  updatedProgress.practicedProblems = (currentProgress.practicedProblems || 0) + 1;
                }
                
                console.log(`📊 Topic progress update for ${topic.name}:`, updatedProgress);
                
                return {
                  ...topic,
                  userProgress: updatedProgress
                };
              }
              return topic;
            })
          );
        }
        
        // Refresh complete stats and activity data from server after a short delay
        setTimeout(() => {
          console.log(`🔄 Refreshing stats from server...`);
          fetchUserStats();
          // Also refresh topics to get updated counts
          fetchTopics();
        }, 1000);
        
        console.log(`✅ Problem ${action} completed successfully`);
      }
    } catch (error) {
      console.error(`❌ Error marking problem as ${action}:`, error);
      // Show user-friendly error message
      alert(`Failed to ${action} problem. Please try again.`);
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-500';
      case 'Medium': return 'text-yellow-500';
      case 'Hard': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getDifficultyBg = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getProgressPercentage = (topic) => {
    if (!topic.userProgress || topic.userProgress.totalProblems === 0) return 0;
    return Math.round((topic.userProgress.completedProblems / topic.userProgress.totalProblems) * 100);
  };

  const filteredProblems = problems.filter(problem => {
    if (filters.status !== 'All') {
      const progress = problem.userProgress;
      switch (filters.status) {
        case 'Completed':
          if (!progress?.completed) return false;
          break;
        case 'Practiced':
          if (!progress?.practiced || progress?.completed) return false;
          break;
        case 'Not Started':
          if (progress?.practiced) return false;
          break;
      }
    }
    return true;
  });

  const getBadgeInfo = () => {
    const totalProblems = userStats.totalProblems || 1;
    const completedProblems = userStats.completedProblems || 0;
    const percentage = Math.round((completedProblems / totalProblems) * 100);
    
    if (percentage >= 100) {
      return { badge: '💎', level: 'DIAMOND', color: 'text-cyan-400', unlocked: true };
    } else if (percentage >= 80) {
      return { badge: '🏆', level: 'GOLD', color: 'text-yellow-500', unlocked: true };
    } else if (percentage >= 60) {
      return { badge: '🥈', level: 'SILVER', color: 'text-gray-400', unlocked: true };
    } else if (percentage >= 30) {
      return { badge: '🥉', level: 'BRONZE', color: 'text-orange-600', unlocked: true };
    } else {
      return { badge: '</>', level: 'BEGINNER', color: 'text-blue-500', unlocked: true };
    }
  };

  const getActivityColor = (level) => {
    switch (level) {
      case 0: return 'bg-gray-600/50';
      case 1: return 'bg-green-300';
      case 2: return 'bg-green-500';
      case 3: return 'bg-green-700';
      case 4: return 'bg-green-900';
      default: return 'bg-gray-600/50';
    }
  };

  const getCurrentStreak = () => {
    return userStats.currentStreak || 0;
  };

  const getMaxStreak = () => {
    return userStats.maxStreak || 0;
  };

  const getMonthLabels = () => {
    const months = [];
    const today = new Date();
    
    // Start from September of last year to August of current year
    const startDate = new Date(today);
    startDate.setDate(startDate.getDate() - 364); // Go back 364 days
    
    // Get the starting month (should be around September)
    let currentDate = new Date(startDate);
    currentDate.setDate(1); // Set to first day of the month
    
    // Generate 12 months from the start date
    for (let i = 0; i < 12; i++) {
      months.push({
        name: currentDate.toLocaleDateString('en-US', { month: 'short' }),
        year: currentDate.getFullYear()
      });
      
      // Move to next month
      currentDate.setMonth(currentDate.getMonth() + 1);
    }
    
    console.log('Generated months:', months.map(m => `${m.name} ${m.year}`));
    return months;
  };

  const getWeeksInYear = () => {
    const weeks = [];
    const today = new Date();
    
    // If no activity data, return empty array
    if (activityData.length === 0) {
      return weeks;
    }
    
    // Get the date range from activity data
    const startDate = new Date(activityData[0].date);
    const endDate = new Date(activityData[activityData.length - 1].date);
    
    // Adjust start date to beginning of week (Sunday)
    const adjustedStartDate = new Date(startDate);
    adjustedStartDate.setDate(startDate.getDate() - startDate.getDay());
    
    let currentWeekStart = new Date(adjustedStartDate);
    
    // Generate weeks only up to today
    while (currentWeekStart <= today) {
      const weekData = [];
      let hasValidDay = false;
      
      for (let day = 0; day < 7; day++) {
        const currentDate = new Date(currentWeekStart);
        currentDate.setDate(currentWeekStart.getDate() + day);
        
        // Only include dates that are within our activity data range and not in the future
        if (currentDate >= startDate && currentDate <= endDate && currentDate <= today) {
          const dateStr = currentDate.toISOString().split('T')[0];
          const activityDay = activityData.find(d => d.date === dateStr);
          
          weekData.push(activityDay || { 
            date: dateStr, 
            count: 0, 
            level: 0 
          });
          hasValidDay = true;
        } else if (currentDate < startDate || currentDate > today) {
          // Don't show anything for dates before our range or in the future
          weekData.push(null);
        } else {
          weekData.push(null);
        }
      }
      
      // Only add weeks that have at least one valid day
      if (hasValidDay) {
        weeks.push(weekData);
      }
      
      currentWeekStart.setDate(currentWeekStart.getDate() + 7);
    }
    
    console.log('Generated weeks data:', weeks.length, 'weeks');
    console.log('Date range for weeks:', adjustedStartDate.toISOString().split('T')[0], 'to', today.toISOString().split('T')[0]);
    return weeks;
  };

  const getRevisionStatus = (problem) => {
    if (!problem.userProgress?.completed || !problem.userProgress?.firstCompletedAt) {
      return { status: 'not-started', text: '-', color: 'text-gray-500' };
    }

    const completedDate = new Date(problem.userProgress.firstCompletedAt);
    const now = new Date();
    const daysSinceCompletion = Math.floor((now - completedDate) / (1000 * 60 * 60 * 24));

    // Spaced repetition schedule: 1 day, 3 days, 7 days, 14 days, 30 days
    if (daysSinceCompletion >= 30) {
      return { status: 'overdue', text: '30d+', color: 'text-red-400' };
    } else if (daysSinceCompletion >= 14) {
      return { status: 'due', text: '14d', color: 'text-orange-400' };
    } else if (daysSinceCompletion >= 7) {
      return { status: 'due', text: '7d', color: 'text-yellow-400' };
    } else if (daysSinceCompletion >= 3) {
      return { status: 'due', text: '3d', color: 'text-blue-400' };
    } else if (daysSinceCompletion >= 1) {
      return { status: 'due', text: '1d', color: 'text-green-400' };
    } else {
      return { status: 'fresh', text: 'New', color: 'text-cyan-400' };
    }
  };

  const getNotesHint = (problem) => {
    if (!problem.tags || problem.tags.length === 0) return '';
    
    const hints = {
      'array': '💡 Consider two pointers or sliding window',
      'string': '💡 Think about string manipulation techniques',
      'dynamic-programming': '💡 Look for overlapping subproblems',
      'tree': '💡 Consider DFS/BFS traversal',
      'graph': '💡 Think about graph traversal algorithms',
      'sorting': '💡 Consider different sorting approaches',
      'binary-search': '💡 Think about search space reduction',
      'hash-table': '💡 Consider using HashMap for O(1) lookup',
      'two-pointers': '💡 Use left and right pointers',
      'sliding-window': '💡 Expand and contract window',
      'backtracking': '💡 Explore all possibilities with pruning',
      'greedy': '💡 Make locally optimal choices'
    };

    for (const tag of problem.tags) {
      const normalizedTag = tag.toLowerCase().replace(/\s+/g, '-');
      if (hints[normalizedTag]) {
        return hints[normalizedTag];
      }
    }
    return '💡 Break down the problem step by step';
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchUserStats();
    if (selectedTopic) {
      await fetchProblems(selectedTopic.id);
    }
    setRefreshing(false);
  };

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);
    
    // Apply filters immediately for non-search filters
    if (filterType !== 'search' && selectedTopic) {
      fetchProblems(selectedTopic.id);
    }
  };

  const handleSearchChange = (searchValue) => {
    setFilters(prev => ({ ...prev, search: searchValue }));
    
    // Clear existing debounce
    if (searchDebounce) {
      clearTimeout(searchDebounce);
    }
    
    // Set new debounce for search
    const newDebounce = setTimeout(() => {
      if (selectedTopic) {
        fetchProblems(selectedTopic.id);
      }
    }, 500); // 500ms delay
    
    setSearchDebounce(newDebounce);
  };

  useEffect(() => {
    if (searchDebounce) {
      return () => {
        clearTimeout(searchDebounce);
      };
    }
  }, [searchDebounce]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <div className="text-white text-center">
          <h1 className="text-2xl font-bold mb-4">Please Login</h1>
          <p>You need to be logged in to access the DSA Sheet.</p>
        </div>
      </div>
    );
  }

  return (<>
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/30 flex flex-col relative overflow-hidden">
      {/* Enhanced animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-gradient-to-br from-purple-500/15 to-pink-600/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
        
        {/* Floating particles */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-cyan-400/30 rounded-full animate-bounce"></div>
        <div className="absolute top-40 right-32 w-1.5 h-1.5 bg-purple-400/30 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-1/3 w-1 h-1 bg-blue-400/30 rounded-full animate-bounce" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>
      
      <div className="flex-grow container mx-auto px-4 py-4 pt-32 pb-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white via-cyan-200 to-blue-200 bg-clip-text text-transparent mb-2">DSA Practice Sheet</h1>
            <p className="text-sm md:text-base text-gray-300">Master Data Structures and Algorithms with curated problems</p>
          </div>

          {/* Activity Section - GitHub Style */}
          <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg p-4 md:p-6 shadow-xl mb-6 md:mb-8 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10"></div>
            
            <div className="relative z-10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 md:mb-6 gap-4">
                <h3 className="text-lg font-semibold text-white">Activity</h3>
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-sm text-gray-200">
                  <span>Current streak: {getCurrentStreak()}</span>
                  <span>Max streak: {getMaxStreak()}</span>
                  <button
                    onClick={handleRefresh}
                    disabled={refreshing}
                    className={`text-sm transition-colors duration-200 px-3 py-1 rounded ${
                      refreshing 
                        ? 'text-gray-400 bg-white/5 cursor-not-allowed' 
                        : 'text-gray-200 hover:text-white bg-white/10 hover:bg-white/20'
                    }`}
                  >
                    {refreshing ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 border border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                        <span>Refreshing...</span>
                      </div>
                    ) : (
                      'Refresh All Data'
                    )}
                  </button>
                </div>
              </div>
              
              {/* Activity Grid Container with better mobile handling */}
              <div className="w-full">
                <div style={{ minWidth: '320px', width: '100%' }}>
                  
                  {/* Month Labels */}
                  <div className="mb-3">
                    <div className="flex text-xs text-gray-300 mb-2 ml-8 sm:ml-12">
                      {getMonthLabels().map((month, i) => (
                        <div key={i} className="text-left flex-1 min-w-0 text-center sm:text-left">
                          <span className="hidden sm:inline">{month.name} {month.year === new Date().getFullYear() ? '' : month.year}</span>
                          <span className="sm:hidden">{month.name.slice(0, 3)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Activity Grid */}
                  <div className="flex space-x-1">
                    {/* Day labels */}
                    <div className="flex flex-col space-y-1 mr-2 sm:mr-3 flex-shrink-0">
                      <div className="h-3 sm:h-4 text-xs text-gray-300"></div>
                      <div className="h-3 sm:h-4 text-xs text-gray-300">M</div>
                      <div className="h-3 sm:h-4 text-xs text-gray-300"></div>
                      <div className="h-3 sm:h-4 text-xs text-gray-300">W</div>
                      <div className="h-3 sm:h-4 text-xs text-gray-300"></div>
                      <div className="h-3 sm:h-4 text-xs text-gray-300">F</div>
                      <div className="h-3 sm:h-4 text-xs text-gray-300"></div>
                    </div>
                    
                    {/* Weeks grid */}
                    <div className="flex space-x-1 flex-1">
                      {getWeeksInYear().map((week, weekIndex) => (
                        <div key={weekIndex} className="flex flex-col space-y-1 flex-1">
                          {week.map((day, dayIndex) => {
                            // Don't render anything for future dates (null values)
                            if (!day) return <div key={dayIndex} className="h-3 sm:h-4" />;
                            
                            return (
                              <div
                                key={dayIndex}
                                className={`h-3 sm:h-4 rounded-sm ${getActivityColor(day.level)} flex-1`}
                                title={`${day.date}: ${day.count} problems solved`}
                                style={{ minWidth: '8px' }}
                              />
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left Sidebar - Progress and Badges Only */}
            <div className={`lg:col-span-1 space-y-6 ${showSidebar ? 'block' : 'hidden lg:block'}`}>
              {/* Progress Section */}
              <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg p-6 shadow-xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10"></div>
                
                <div className="relative z-10">
                  <h3 className="text-lg font-semibold text-white mb-4">Progress</h3>

                  <div className="mb-4">
                    <div className="text-3xl font-bold bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
                      {userStats.totalProblems > 0 ? Math.round((userStats.completedProblems / userStats.totalProblems) * 100) : 0}%
                    </div>
                    <div className="text-sm text-gray-200">Total completion</div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-200">Total Problems</span>
                      <span className="text-sm text-gray-300">{userStats.totalProblems || 0}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-200">Completed</span>
                      <span className="text-sm text-gray-300">{userStats.completedProblems || 0}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-200">Bookmarked</span>
                      <span className="text-sm text-gray-300">{userStats.bookmarkedProblems || 0}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Badges Section */}
              <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg p-6 shadow-xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-orange-500/10"></div>
                
                <div className="relative z-10">
                  <h3 className="text-lg font-semibold text-white mb-4">Badges</h3>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2 ${
                        userStats.completedProblems >= Math.ceil((userStats.totalProblems || 1) * 0.3) 
                          ? 'bg-orange-500/30 ring-2 ring-orange-500/50' 
                          : 'bg-white/10 opacity-50'
                      }`}>
                        <span className="text-2xl">🥉</span>
                      </div>
                      <div className="text-xs text-gray-200">BRONZE</div>
                      <div className="text-xs text-gray-300">30% complete</div>
                      {userStats.completedProblems >= Math.ceil((userStats.totalProblems || 1) * 0.3) && (
                        <div className="text-xs text-green-400 mt-1">✓ Unlocked</div>
                      )}
                    </div>
                    <div className="text-center">
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2 ${
                        userStats.completedProblems >= Math.ceil((userStats.totalProblems || 1) * 0.6) 
                          ? 'bg-gray-400/30 ring-2 ring-gray-400/50' 
                          : 'bg-white/10 opacity-50'
                      }`}>
                        <span className="text-2xl">🥈</span>
                      </div>
                      <div className="text-xs text-gray-200">SILVER</div>
                      <div className="text-xs text-gray-300">60% complete</div>
                      {userStats.completedProblems >= Math.ceil((userStats.totalProblems || 1) * 0.6) && (
                        <div className="text-xs text-green-400 mt-1">✓ Unlocked</div>
                      )}
                    </div>
                    <div className="text-center">
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2 ${
                        userStats.completedProblems >= Math.ceil((userStats.totalProblems || 1) * 0.8) 
                          ? 'bg-yellow-500/30 ring-2 ring-yellow-500/50' 
                          : 'bg-white/10 opacity-50'
                      }`}>
                        <span className="text-2xl">🏆</span>
                      </div>
                      <div className="text-xs text-gray-200">GOLD</div>
                      <div className="text-xs text-gray-300">80% complete</div>
                      {userStats.completedProblems >= Math.ceil((userStats.totalProblems || 1) * 0.8) && (
                        <div className="text-xs text-green-400 mt-1">✓ Unlocked</div>
                      )}
                    </div>
                    <div className="text-center">
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2 ${
                        userStats.completedProblems >= userStats.totalProblems && userStats.totalProblems > 0
                          ? 'bg-cyan-500/30 ring-2 ring-cyan-500/50' 
                          : 'bg-white/10 opacity-50'
                      }`}>
                        <span className="text-2xl">💎</span>
                      </div>
                      <div className="text-xs text-gray-200">DIAMOND</div>
                      <div className="text-xs text-gray-300">100% complete</div>
                      {userStats.completedProblems >= userStats.totalProblems && userStats.totalProblems > 0 && (
                        <div className="text-xs text-green-400 mt-1">✓ Unlocked</div>
                      )}
                    </div>
                  </div>

                  <div className={`text-xs text-center mt-4 ${getBadgeInfo().color}`}>
                    Current badge: {getBadgeInfo().badge} {getBadgeInfo().level}
                  </div>
                  
                  <div className="text-xs text-center mt-2 text-gray-400">
                    Progress: {userStats.completedProblems || 0}/{userStats.totalProblems || 0} problems solved
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Mobile Sidebar Toggle */}
              <div className="lg:hidden mb-4">
                <button
                  onClick={() => setShowSidebar(!showSidebar)}
                  className="flex items-center space-x-2 px-4 py-2 bg-white/15 backdrop-blur-xl border border-white/25 text-white rounded-lg hover:bg-white/25 transition-all duration-300"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                  <span>{showSidebar ? 'Hide' : 'Show'} Stats</span>
                </button>
              </div>

              {/* Sheet Tabs */}
              <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg shadow-xl mb-6 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10"></div>
                
                <div className="relative z-10">
                  <div className="border-b border-white/10">
                    <nav className="flex space-x-2 lg:space-x-8 px-4 lg:px-6 overflow-x-auto">
                      <button className="border-b-2 border-cyan-400 py-4 px-2 lg:px-1 text-sm font-medium text-cyan-400 whitespace-nowrap">
                        Khyruddin's All DSA Patterns
                      </button>
                      <button className="border-b-2 border-transparent py-4 px-2 lg:px-1 text-sm font-medium text-gray-300 hover:text-white whitespace-nowrap"
                        onClick={() => {
                          setSelectedFeature('InterviewSheet');
                          setShowDevelopmentModal(true);
                        }}
                      >
                        Khyruddin's Interview Sheet
                      </button>
                      <button className="border-b-2 border-transparent py-4 px-2 lg:px-1 text-sm font-medium text-gray-300 hover:text-white whitespace-nowrap"
                        onClick={() => {
                          setSelectedFeature('LastMinuteSheet');
                          setShowDevelopmentModal(true);
                        }}
                      >
                        Khyruddin's Last Minute Sheet
                      </button>
                      <button className="border-b-2 border-transparent py-4 px-2 lg:px-1 text-sm font-medium text-gray-300 hover:text-white whitespace-nowrap"
                        onClick={() => {
                          setSelectedFeature('QASheet');
                          setShowDevelopmentModal(true);
                        }}
                      >
                        Khyruddin's OA Sheet
                      </button>
                    </nav>
                  </div>

                  <div className="p-4 lg:p-6">
                    <div className="mb-6">
                      <p className="text-gray-300 mb-4">
                        If you have the question "How to start DSA?" Khyruddin's All DSA Patterns is ideal for learning DSA from scratch and boosting your coding platform ratings. This Sheet offers 1,200 curated DSA questions organized by patterns and difficulty within the pattern to sharpen your problem-solving skills and ace interviews.
                      </p>
                      <p className="text-gray-300 mb-4">
                        If you want to be good at DSA, START NOW 🔥
                      </p>
                    </div>

                    {/* Search Bar */}
                    <div className="mb-6">
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Search problems..."
                          className="w-full pl-10 pr-4 py-3 lg:py-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-base lg:text-sm text-white placeholder-gray-400"
                          value={filters.search}
                          onChange={(e) => handleSearchChange(e.target.value)}
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Filter Bar */}
                    <div className="space-y-4 sm:space-y-0 sm:flex sm:flex-wrap sm:gap-4 mb-6">
                      <div className="flex items-center gap-2 w-full sm:w-auto">
                        <span className="text-sm text-gray-300 min-w-fit">Difficulty:</span>
                        <select
                          value={filters.difficulty}
                          onChange={(e) => handleFilterChange('difficulty', e.target.value)}
                          className="flex-1 sm:flex-none px-3 py-2 text-sm text-white bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                        >
                          <option value="All" className="bg-gray-800 text-white">All</option>
                          <option value="Easy" className="bg-gray-800 text-white">Easy</option>
                          <option value="Medium" className="bg-gray-800 text-white">Medium</option>
                          <option value="Hard" className="bg-gray-800 text-white">Hard</option>
                        </select>
                      </div>
                      <div className="flex items-center gap-2 w-full sm:w-auto">
                        <span className="text-sm text-gray-300 min-w-fit">Platform:</span>
                        <select
                          value={filters.platform}
                          onChange={(e) => handleFilterChange('platform', e.target.value)}
                          className="flex-1 sm:flex-none px-3 py-2 text-sm text-white bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                        >
                          <option value="All" className="bg-gray-800 text-white">All</option>
                          <option value="LeetCode" className="bg-gray-800 text-white">LeetCode</option>
                          <option value="HackerRank" className="bg-gray-800 text-white">HackerRank</option>
                          <option value="CodeForces" className="bg-gray-800 text-white">CodeForces</option>
                        </select>
                      </div>
                      <div className="flex items-center gap-2 w-full sm:w-auto">
                        <span className="text-sm text-gray-300 min-w-fit">Status:</span>
                        <select
                          value={filters.status}
                          onChange={(e) => handleFilterChange('status', e.target.value)}
                          className="flex-1 sm:flex-none px-3 py-2 text-sm text-white bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                        >
                          <option value="All" className="bg-gray-800 text-white">All</option>
                          <option value="Completed" className="bg-gray-800 text-white">Completed</option>
                          <option value="Practiced" className="bg-gray-800 text-white">Practiced</option>
                          <option value="Not Started" className="bg-gray-800 text-white">Not Started</option>
                        </select>
                      </div>
                    </div>

                    {/* Topics and Problems */}
                    <div className="space-y-4">
                      {topics.map((topic) => (
                        <div key={topic.id} className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg">
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10"></div>
                          
                          <div className="relative z-10">
                            <button
                              onClick={() => toggleTopicExpansion(topic.id)}
                              className="w-full px-4 md:px-6 py-4 text-left flex flex-col sm:flex-row sm:items-center justify-between hover:bg-white/15 transition-colors duration-300 gap-3"
                            >
                              <div className="flex items-center space-x-3 min-w-0 flex-1">
                                <div className="text-lg flex-shrink-0">{topic.icon}</div>
                                <div className="min-w-0 flex-1">
                                  <h3 className="font-semibold text-white text-sm md:text-base truncate">{topic.name}</h3>
                                  <p className="text-xs md:text-sm text-gray-300 line-clamp-2 md:line-clamp-1">{topic.description}</p>
                                </div>
                              </div>
                              <div className="flex items-center justify-between sm:justify-end space-x-4 flex-shrink-0">
                                <span className="text-xs md:text-sm text-gray-300 whitespace-nowrap">
                                  {topic.userProgress?.completedProblems || 0}/{topic.totalProblems || 0}
                                </span>
                                <svg 
                                  className={`w-4 h-4 md:w-5 md:h-5 text-gray-400 transition-transform flex-shrink-0 ${expandedTopics.has(topic.id) ? 'rotate-180' : ''}`}
                                  fill="none" 
                                  stroke="currentColor" 
                                  viewBox="0 0 24 24"
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                              </div>
                            </button>

                            {expandedTopics.has(topic.id) && (
                              <div className="border-t border-white/10">
                                {loading && selectedTopic?.id === topic.id ? (
                                  <div className="p-8 text-center">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400 mx-auto"></div>
                                    <p className="mt-2 text-gray-300">Loading problems...</p>
                                  </div>
                                ) : (
                                  <div className="overflow-x-auto lg:overflow-x-visible lg:scrollbar-hide">
                                    <table className="w-full table-auto min-w-[900px] lg:min-w-0">
                                      <thead className="bg-white/10">
                                        <tr>
                                          <th className="px-2 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider w-12">Status</th>
                                          <th className="px-2 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider w-12">Practice</th>
                                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider min-w-[150px]">Problem</th>
                                          <th className="px-2 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider w-16">Difficulty</th>
                                          <th className="px-2 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider w-16">Platform</th>
                                          <th className="px-2 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider w-16">Sol</th>
                                          <th className="px-2 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider w-16">Tag</th>
                                          <th className="px-2 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider w-20">Companies</th>
                                          <th className="px-2 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider w-12">Notes</th>
                                          <th className="px-2 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider w-12">Rev</th>
                                        </tr>
                                      </thead>
                                      <tbody className="bg-white/5 divide-y divide-white/5">
                                        {selectedTopic?.id === topic.id && filteredProblems.length > 0 ? (
                                          filteredProblems.map((problem, index) => (
                                            <tr key={problem.id} className="hover:bg-white/10 transition-colors duration-200 group">
                                              {/* Status Column */}
                                              <td className="px-2 sm:px-3 py-4 text-center">
                                                <input
                                                  type="checkbox"
                                                  checked={problem.userProgress?.status === 'completed' || problem.userProgress?.completed || false}
                                                  onChange={() => handleProgressMark(problem.id || problem._id, 'completed')}
                                                  className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 bg-gray-700 border-gray-700 rounded focus:ring-green-500 focus:ring-2 touch-manipulation"
                                                />
                                              </td>

                                              {/* Practice Column */}
                                              <td className="px-2 sm:px-3 py-4 text-center">
                                                <button
                                                  onClick={() => openCodeEditor(problem)}
                                                  className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-green-500 hover:bg-green-600 active:bg-green-700 text-white rounded transition-colors duration-200 touch-manipulation"
                                                  title="Practice in Code Editor"
                                                >
                                                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-2M7 7l10 10M17 7l-10 10" />
                                                  </svg>
                                                </button>
                                              </td>

                                              {/* Problem Column */}
                                              <td className="px-3 sm:px-4 py-4">
                                                <div className="flex items-center space-x-2 sm:space-x-3">
                                                  <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-gray-700 rounded-full flex items-center justify-center text-xs font-medium text-gray-300">
                                                    {index + 1}
                                                  </div>
                                                  <div className="flex-1 min-w-0">
                                                    <div className="text-white font-medium text-sm hover:text-cyan-300 cursor-pointer transition-colors">
                                                      {problem.title}
                                                    </div>
                                                  </div>
                                                </div>
                                              </td>

                                              {/* Difficulty Column */}
                                              <td className="px-2 sm:px-3 py-4 text-center">
                                                <span className={`inline-flex items-center px-1.5 sm:px-2 py-1 rounded-full text-xs font-medium ${
                                                  problem.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
                                                  problem.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                                                  'bg-red-500/20 text-red-400'
                                                }`}>
                                                  {problem.difficulty}
                                                </span>
                                              </td>

                                              {/* Platform Column */}
                                              <td className="px-2 sm:px-3 py-4 text-center">
                                                {problem.practiceLink?.platform ? (
                                                  <a
                                                    href={problem.practiceLink.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center px-1.5 sm:px-2 py-1 rounded text-xs font-medium bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 active:bg-blue-500/40 transition-colors touch-manipulation"
                                                  >
                                                    {problem.practiceLink.platform}
                                                  </a>
                                                ) : (
                                                  <span className="text-gray-500 text-xs">-</span>
                                                )}
                                              </td>

                                              {/* Solution Column - Enhanced for Mobile */}
                                              <td className="px-2 sm:px-3 py-4 text-center">
                                                {problem.solution && problem.solution.type && problem.solution.type !== 'none' ? (
                                                  <button 
                                                    onClick={(e) => {
                                                      e.preventDefault();
                                                      e.stopPropagation();
                                                      openYouTubeDirectly(problem);
                                                    }}
                                                    className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-red-500 hover:bg-red-600 active:bg-red-700 text-white rounded-lg transition-colors duration-200 touch-manipulation relative z-10"
                                                    title="View Solution"
                                                    style={{ 
                                                      minWidth: '40px', 
                                                      minHeight: '40px',
                                                      touchAction: 'manipulation'
                                                    }}
                                                  >
                                                    <span className="text-xs sm:text-sm font-medium">Sol</span>
                                                  </button>
                                                ) : (
                                                  <span className="text-gray-500 text-xs">-</span>
                                                )}
                                              </td>

                                              {/* Resource (Tag) Column */}
                                              <td className="px-2 sm:px-3 py-4 text-center">
                                                {problem.tags && problem.tags.length > 0 ? (
                                                  <div className="flex flex-wrap gap-1 justify-center">
                                                    {problem.tags.slice(0, 2).map((tag, idx) => (
                                                      <span key={idx} className="inline-flex items-center px-1 sm:px-1.5 py-0.5 rounded text-xs font-medium bg-indigo-500 text-white">
                                                        {tag}
                                                      </span>
                                                    ))}
                                                    {problem.tags.length > 2 && (
                                                      <span className="text-gray-500 text-xs">+{problem.tags.length - 2}</span>
                                                    )}
                                                  </div>
                                                ) : (
                                                  <span className="text-gray-500 text-xs">-</span>
                                                )}
                                              </td>

                                              {/* Resource (Companies) Column */}
                                              <td className="px-2 sm:px-3 py-4 text-center">
                                                {problem.companies && problem.companies.length > 0 ? (
                                                  <div className="flex flex-wrap gap-1 justify-center">
                                                    {problem.companies.slice(0, 2).map((company, idx) => (
                                                      <span key={idx} className="inline-flex items-center px-1.5 sm:px-2 py-0.5 rounded text-xs font-medium bg-emerald-500 text-white">
                                                        {company}
                                                      </span>
                                                    ))}
                                                    {problem.companies.length > 2 && (
                                                      <span className="text-gray-500 text-xs">+{problem.companies.length - 2}</span>
                                                    )}
                                                  </div>
                                                ) : (
                                                  <span className="text-gray-500 text-xs">-</span>
                                                )}
                                              </td>

                                              {/* Notes Column */}
                                              <td className="px-2 sm:px-3 py-4 text-center">
                                                <button
                                                  onClick={() => openNotesModal(problem)}
                                                  className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-purple-500 hover:bg-purple-600 active:bg-purple-700 text-white rounded transition-colors duration-200 touch-manipulation"
                                                  title="View Notes"
                                                >
                                                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                  </svg>
                                                </button>
                                              </td>

                                              {/* Revision Column */}
                                              <td className="px-2 sm:px-3 py-4 text-center">
                                                <button
                                                  onClick={() => handleProgressMark(problem.id || problem._id, 'bookmark')}
                                                  className={`inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded transition-colors duration-200 mx-auto ${
                                                    problem.userProgress?.isBookmarked || problem.userProgress?.bookmarked 
                                                      ? 'bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white' 
                                                      : 'bg-gray-600 hover:bg-gray-700 active:bg-gray-800 text-gray-300'
                                                  }`}
                                                  title={problem.userProgress?.isBookmarked || problem.userProgress?.bookmarked ? "Remove from bookmarks" : "Add to bookmarks"}
                                                  style={{ minWidth: '40px', minHeight: '40px' }}
                                                >
                                                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill={problem.userProgress?.isBookmarked || problem.userProgress?.bookmarked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                                                  </svg>
                                                </button>
                                                {/* Auto revision schedule - hidden for now to match other columns */}
                                                <div className={`text-xs font-medium mt-1 hidden ${getRevisionStatus(problem).color}`}>
                                                  {getRevisionStatus(problem).text}
                                                </div>
                                              </td>
                                            </tr>
                                          ))
                                        ) : selectedTopic?.id === topic.id ? (
                                          <tr>
                                            <td colSpan="10" className="px-6 py-8 text-center text-gray-400">
                                              No problems found for this topic.
                                            </td>
                                          </tr>
                                        ) : null}
                                      </tbody>
                                    </table>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      {showProblemModal && selectedProblem && (
        <ProblemModal
          problem={selectedProblem}
          isOpen={showProblemModal}
          onClose={closeProblemModal}
          onProgressUpdate={handleProgressUpdate}
        />
      )}
      {/* Under Development Modal */}
      {showDevelopmentModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 max-w-md w-full mx-4 relative">
            <div className="text-center">
              <div className="mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Under Development</h3>
                <p className="text-gray-300 mb-4">Coming Soon!</p>
                <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-lg p-4 mb-4">
                  {selectedFeature === 'CodeEditor' && (
                    <>
                      <h4 className="text-lg font-medium text-cyan-400 mb-2">NextEra Code Editor</h4>
                      <p className="text-gray-300 text-sm">
                        We're working hard to bring you an amazing coding experience with our advanced code editor. 
                        Stay tuned for the launch!
                      </p>
                    </>
                  )}
                  {selectedFeature === 'InterviewSheet' && (
                    <>
                      <h4 className="text-lg font-medium text-cyan-400 mb-2">Interview Preparation Sheet</h4>
                      <p className="text-gray-300 text-sm">
                        A comprehensive collection of interview-focused problems and patterns to help you ace your technical interviews. 
                        Coming soon with curated questions from top companies!
                      </p>
                    </>
                  )}
                  {selectedFeature === 'LastMinuteSheet' && (
                    <>
                      <h4 className="text-lg font-medium text-cyan-400 mb-2">Last Minute Revision Sheet</h4>
                      <p className="text-gray-300 text-sm">
                        Quick revision materials and essential problems for last-minute preparation before interviews and exams. 
                        Perfect for brushing up on key concepts!
                      </p>
                    </>
                  )}
                  {selectedFeature === 'QASheet' && (
                    <>
                      <h4 className="text-lg font-medium text-cyan-400 mb-2">Online Assessment Sheet</h4>
                      <p className="text-gray-300 text-sm">
                        Specialized problems and patterns commonly found in online assessments and coding challenges. 
                        Get ready for your OA rounds with targeted practice!
                      </p>
                    </>
                  )}
                </div>
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-400 mb-4">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <span>Development in progress...</span>
                </div>
              </div>
              
              <button
                onClick={() => setShowDevelopmentModal(false)}
                className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200"
              >
                Got it!
              </button>
            </div>
            
            {/* Close button */}
            <button
              onClick={() => setShowDevelopmentModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  </>
);
};

export default DSASheet;