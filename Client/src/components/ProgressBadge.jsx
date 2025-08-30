import React from 'react';
import { FiAward, FiTarget, FiTrendingUp, FiZap, FiStar, FiClock } from 'react-icons/fi';

const ProgressBadge = ({ type, count, total, streak, className = '' }) => {
  const getBadgeConfig = () => {
    switch (type) {
      case 'completed':
        return {
          icon: FiAward,
          title: 'Problems Solved',
          color: 'from-green-500 to-emerald-600',
          textColor: 'text-white',
          bgColor: 'bg-gray-700/60',
          value: count,
          subtitle: 'solved'
        };
      case 'practiced':
        return {
          icon: FiTarget,
          title: 'Problems Practiced',
          color: 'from-blue-500 to-cyan-600',
          textColor: 'text-white',
          bgColor: 'bg-gray-700/60',
          value: count,
          subtitle: 'practiced'
        };
      case 'streak':
        return {
          icon: FiZap,
          title: 'Current Streak',
          color: 'from-orange-500 to-red-600',
          textColor: 'text-white',
          bgColor: 'bg-gray-700/60',
          value: streak || 0,
          subtitle: 'days'
        };
      case 'difficulty_easy':
        return {
          icon: FiStar,
          title: 'Easy Problems',
          color: 'from-green-400 to-green-600',
          textColor: 'text-white',
          bgColor: 'bg-gray-700/60',
          value: count,
          subtitle: 'easy'
        };
      case 'difficulty_medium':
        return {
          icon: FiStar,
          title: 'Medium Problems',
          color: 'from-yellow-400 to-orange-600',
          textColor: 'text-white',
          bgColor: 'bg-gray-700/60',
          value: count,
          subtitle: 'medium'
        };
      case 'difficulty_hard':
        return {
          icon: FiStar,
          title: 'Hard Problems',
          color: 'from-red-400 to-red-600',
          textColor: 'text-white',
          bgColor: 'bg-gray-700/60',
          value: count,
          subtitle: 'hard'
        };
      case 'weekly_goal':
        return {
          icon: FiTrendingUp,
          title: 'Weekly Goal',
          color: 'from-purple-500 to-indigo-600',
          textColor: 'text-white',
          bgColor: 'bg-gray-700/60',
          value: count,
          subtitle: 'this week'
        };
      case 'time_spent':
        return {
          icon: FiClock,
          title: 'Time Spent',
          color: 'from-indigo-500 to-purple-600',
          textColor: 'text-white',
          bgColor: 'bg-gray-700/60',
          value: `${Math.floor(count / 60)}h ${count % 60}m`,
          subtitle: 'total practice time'
        };
      default:
        return {
          icon: FiAward,
          title: 'Progress',
          color: 'from-gray-500 to-gray-600',
          textColor: 'text-white',
          bgColor: 'bg-gray-700/60',
          value: count,
          subtitle: 'achievements'
        };
    }
  };

  const config = getBadgeConfig();
  const Icon = config.icon;
  const percentage = total ? Math.round((count / total) * 100) : 0;

  return (
    <div className={`bg-gray-700/60 rounded-xl p-4 border border-gray-600/40 ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${config.color} flex items-center justify-center`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
      </div>
      
      <div className="space-y-1">
        <h3 className="text-sm font-medium text-gray-100">
          {config.title}
        </h3>
        <div className="flex items-baseline space-x-2">
          <span className="text-2xl font-bold text-white">
            {config.value}
          </span>
        </div>
        <p className="text-xs text-white">
          {config.subtitle}
        </p>
      </div>
      
      {total && (
        <div className="mt-3">
          <div className="w-full bg-gray-600/50 rounded-full h-2">
            <div 
              className={`h-2 rounded-full bg-gradient-to-r ${config.color} transition-all duration-300`}
              style={{ width: `${Math.min(percentage, 100)}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressBadge;
