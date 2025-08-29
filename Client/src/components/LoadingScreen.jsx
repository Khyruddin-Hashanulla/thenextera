import React from 'react';
import logo from '../assets/logo.png';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/30">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-gradient-to-br from-purple-500/15 to-pink-600/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Loading content */}
      <div className="relative z-10 text-center">
        {/* Animated logo container */}
        <div className="relative mb-8">
          {/* Logo with zoom animation */}
          <div className="relative w-32 h-32 mx-auto flex items-center justify-center">
            <img 
              src={logo} 
              alt="NextEra Logo" 
              className="w-24 h-24 object-contain animate-zoom-pulse"
            />
          </div>
        </div>

        {/* Brand text */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-fade-in">
            NextEra
          </h1>
          <p className="text-lg text-gray-300 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            Learn. Build. Earn.
          </p>
        </div>

        {/* Loading dots */}
        <div className="flex justify-center space-x-2 mt-8">
          <div className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>

        {/* Loading text */}
        <p className="text-gray-400 text-sm mt-4 animate-pulse">
          Initializing your learning experience...
        </p>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes zoom-pulse {
          0% {
            transform: scale(0.8);
            opacity: 0.7;
          }
          50% {
            transform: scale(1.1);
            opacity: 1;
          }
          100% {
            transform: scale(0.8);
            opacity: 0.7;
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-zoom-pulse {
          animation: zoom-pulse 2s ease-in-out infinite;
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }

        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
