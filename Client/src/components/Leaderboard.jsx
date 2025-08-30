import React, { useState, useEffect } from 'react';
import { FiAward, FiTarget, FiZap, FiUser } from 'react-icons/fi';
import api from '../utils/api';

const Leaderboard = ({ isOpen, onClose }) => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [timeframe, setTimeframe] = useState('all'); // all, week, month
  const [category, setCategory] = useState('problems'); // problems, streak, difficulty

  useEffect(() => {
    if (isOpen) {
      fetchLeaderboard();
    }
  }, [isOpen, timeframe, category]);

  const fetchLeaderboard = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/api/dsa/leaderboard?timeframe=${timeframe}&category=${category}`);
      if (response.data.success) {
        setLeaderboardData(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1: return <FiAward className="text-yellow-500" size={20} />;
      case 2: return <FiAward className="text-gray-400" size={20} />;
      case 3: return <FiAward className="text-orange-600" size={20} />;
      default: return <span className="text-gray-500 font-bold">{rank}</span>;
    }
  };

  const getRankBadge = (rank) => {
    if (rank <= 3) {
      const colors = {
        1: 'bg-gradient-to-r from-yellow-400 to-yellow-600',
        2: 'bg-gradient-to-r from-gray-300 to-gray-500',
        3: 'bg-gradient-to-r from-orange-400 to-orange-600'
      };
      return colors[rank];
    }
    return 'bg-gray-100 dark:bg-gray-700';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-4 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FiAward size={24} />
              <h2 className="text-xl font-bold">Leaderboard</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              ✕
            </button>
          </div>
          
          {/* Filters */}
          <div className="flex items-center space-x-4 mt-4">
            <div className="flex items-center space-x-2">
              <label className="text-sm">Timeframe:</label>
              <select
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
                className="bg-white/10 border border-white/20 rounded px-2 py-1 text-sm"
              >
                <option value="all">All Time</option>
                <option value="month">This Month</option>
                <option value="week">This Week</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <label className="text-sm">Category:</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="bg-white/10 border border-white/20 rounded px-2 py-1 text-sm"
              >
                <option value="problems">Problems Solved</option>
                <option value="streak">Current Streak</option>
                <option value="difficulty">Hard Problems</option>
              </select>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(80vh-140px)]">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
            </div>
          ) : (
            <div className="space-y-3">
              {leaderboardData.length === 0 ? (
                <div className="text-center py-12">
                  <FiUser className="mx-auto text-gray-400 mb-4" size={48} />
                  <p className="text-gray-500 dark:text-gray-400">No data available yet</p>
                </div>
              ) : (
                leaderboardData.map((user, index) => {
                  const rank = index + 1;
                  return (
                    <div
                      key={user.userId}
                      className={`flex items-center justify-between p-4 rounded-lg border ${
                        rank <= 3 
                          ? 'border-yellow-200 dark:border-yellow-800 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20'
                          : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50'
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        {/* Rank */}
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getRankBadge(rank)}`}>
                          {getRankIcon(rank)}
                        </div>
                        
                        {/* User Info */}
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            {user.name || 'Anonymous User'}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {user.email}
                          </p>
                        </div>
                      </div>
                      
                      {/* Stats */}
                      <div className="text-right">
                        <div className="flex items-center space-x-4">
                          {category === 'problems' && (
                            <>
                              <div className="text-center">
                                <div className="text-lg font-bold text-gray-900 dark:text-white">
                                  {user.totalCompleted || 0}
                                </div>
                                <div className="text-xs text-gray-500">Solved</div>
                              </div>
                              <div className="text-center">
                                <div className="text-lg font-bold text-blue-600">
                                  {user.totalPracticed || 0}
                                </div>
                                <div className="text-xs text-gray-500">Practiced</div>
                              </div>
                            </>
                          )}
                          
                          {category === 'streak' && (
                            <div className="text-center">
                              <div className="flex items-center space-x-1">
                                <FiZap className="text-orange-500" />
                                <span className="text-lg font-bold text-gray-900 dark:text-white">
                                  {user.currentStreak || 0}
                                </span>
                              </div>
                              <div className="text-xs text-gray-500">Days</div>
                            </div>
                          )}
                          
                          {category === 'difficulty' && (
                            <div className="text-center">
                              <div className="text-lg font-bold text-red-600">
                                {user.hardCompleted || 0}
                              </div>
                              <div className="text-xs text-gray-500">Hard Problems</div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
