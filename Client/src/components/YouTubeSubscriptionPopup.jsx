import React, { useState, useEffect } from 'react';

const YouTubeSubscriptionPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Check if user has visited before
    const hasVisited = localStorage.getItem('nextera_first_visit_complete');
    
    if (!hasVisited) {
      // Show popup after a short delay for better UX
      setTimeout(() => {
        setIsVisible(true);
        setIsAnimating(true);
      }, 1000);
    }
  }, []);

  const handleSubscribe = () => {
    // Open YouTube channel with subscription confirmation
    const youtubeUrl = 'https://youtube.com/@khyruddinkh?si=n7i_6McLafAAS37I&sub_confirmation=1';
    window.open(youtubeUrl, '_blank');
    
    // Close popup after subscribing
    handleClose();
  };

  const handleClose = () => {
    setIsAnimating(false);
    
    // Wait for animation to complete before hiding
    setTimeout(() => {
      setIsVisible(false);
      // Mark as visited so popup doesn't show again
      localStorage.setItem('nextera_first_visit_complete', 'true');
    }, 400);
  };

  const handleSkip = () => {
    handleClose();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Animated Gradient Backdrop */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br from-black via-gray-900/90 to-black 
          backdrop-blur-md transition-all duration-500 ${
          isAnimating ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={handleClose}
      >
        {/* Floating Gradient Orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full blur-3xl animate-pulse" 
               style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 right-1/3 w-20 h-20 bg-gradient-to-r from-cyan-600/15 to-blue-600/15 rounded-full blur-2xl animate-pulse" 
               style={{ animationDelay: '2s' }} />
        </div>
      </div>
      
      {/* Compact Animated Popup Card */}
      <div 
        className={`relative bg-gradient-to-br from-gray-900/95 via-black/90 to-gray-800/95 
          backdrop-blur-xl border border-gray-600/50 rounded-2xl shadow-2xl 
          max-w-sm w-full mx-4 overflow-hidden
          transform transition-all duration-600 ease-out ${
            isAnimating 
              ? 'scale-100 opacity-100 translate-y-0 rotate-0' 
              : 'scale-90 opacity-0 translate-y-8 rotate-1'
          }`}
        style={{
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 80px rgba(59, 130, 246, 0.15)'
        }}
      >
        {/* Animated Border Gradient */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30 opacity-60 animate-pulse" />
        <div className="absolute inset-[1px] rounded-2xl bg-gradient-to-br from-gray-900/95 via-black/90 to-gray-800/95" />
        
        {/* Animated Decorative Elements */}
        <div className="absolute -top-3 -right-3 w-20 h-20 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-2xl animate-pulse" />
        <div className="absolute -bottom-3 -left-3 w-16 h-16 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-2xl animate-pulse" 
             style={{ animationDelay: '1s' }} />
        
        {/* Animated Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full 
            bg-gradient-to-r from-gray-800/60 to-gray-700/60 hover:from-gray-700/80 hover:to-gray-600/80 
            transition-all duration-300 group border border-gray-500/30 hover:border-gray-400/50
            transform hover:scale-110 hover:rotate-90"
        >
          <svg 
            className="w-4 h-4 text-gray-400 group-hover:text-white transition-all duration-300" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Compact Content with Animations */}
        <div className="relative p-6 text-center">
          {/* Animated YouTube Icon */}
          <div className="mb-4 flex justify-center">
            <div className="relative">
              <div className="w-14 h-14 bg-gradient-to-br from-red-500 via-red-600 to-red-700 rounded-xl 
                flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300
                border border-red-400/40 animate-pulse">
                <svg className="w-8 h-8 text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </div>
              {/* Pulsing Ring */}
              <div className="absolute inset-0 rounded-xl border-2 border-red-400/30 animate-ping" />
            </div>
          </div>

          {/* Animated Gradient Title */}
          <h2 className="text-xl font-bold mb-3">
            <span className="bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent animate-pulse">
              Welcome to NextEra!
            </span>
            <span className="inline-block animate-bounce ml-1" style={{ animationDelay: '0.5s' }}>🚀</span>
          </h2>

          {/* Gradient Description */}
          <p className="text-gray-300 text-sm mb-4 leading-relaxed">
            Subscribe to our <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-semibold">
            YouTube channel</span> for exclusive tutorials and coding tips!
          </p>

          {/* Animated Benefits */}
          <div className="mb-5 space-y-2">
            {[
              { icon: '🎯', text: 'Coding tutorials', gradient: 'from-blue-400 to-cyan-400' },
              { icon: '💡', text: 'Tech tips & guidance', gradient: 'from-purple-400 to-pink-400' },
              { icon: '⚡', text: 'Early access content', gradient: 'from-green-400 to-teal-400' }
            ].map((benefit, index) => (
              <div key={index} className="flex items-center justify-center space-x-2 text-xs text-gray-400
                transform hover:scale-105 transition-all duration-300 group">
                <span className="text-sm animate-bounce group-hover:scale-125 transition-transform duration-300" 
                      style={{ animationDelay: `${index * 0.2}s` }}>
                  {benefit.icon}
                </span>
                <div className={`w-2 h-2 bg-gradient-to-r ${benefit.gradient} rounded-full animate-pulse`} 
                     style={{ animationDelay: `${index * 0.3}s` }} />
                <span className="group-hover:text-white transition-colors duration-300">{benefit.text}</span>
              </div>
            ))}
          </div>

          {/* Animated Buttons */}
          <div className="space-y-3">
            {/* Gradient Subscribe Button */}
            <button
              onClick={handleSubscribe}
              className="w-full bg-gradient-to-r from-red-600 via-red-500 to-red-600 
                hover:from-red-500 hover:via-red-400 hover:to-red-500 
                text-white font-semibold py-3 px-4 rounded-lg transition-all duration-500 
                transform hover:scale-105 hover:shadow-xl hover:-translate-y-0.5
                flex items-center justify-center space-x-2 group relative overflow-hidden
                border border-red-400/40 hover:border-red-300/60"
              style={{
                boxShadow: '0 10px 25px rgba(239, 68, 68, 0.3)'
              }}
            >
              {/* Button Shine Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              
              <svg className="w-4 h-4 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300" 
                   fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              <span>Subscribe</span>
              <span className="animate-pulse">✨</span>
            </button>

            {/* Gradient Skip Button */}
            <button
              onClick={handleSkip}
              className="w-full bg-gradient-to-r from-gray-800/60 to-gray-700/60 
                hover:from-gray-700/80 hover:to-gray-600/80 
                text-gray-300 hover:text-white font-medium py-2.5 px-4 rounded-lg 
                transition-all duration-300 border border-gray-500/30 hover:border-gray-400/50
                transform hover:scale-102 group"
            >
              <span className="group-hover:tracking-wider transition-all duration-300">Continue to Website</span>
            </button>
          </div>

          {/* Animated Footer Note */}
          <div className="mt-3 flex items-center justify-center space-x-1">
            <span className="animate-pulse">💙</span>
            <p className="text-xs text-gray-500">
              This popup appears only once. Thanks for your support!
            </p>
            <span className="animate-pulse" style={{ animationDelay: '0.5s' }}>✨</span>
          </div>
        </div>
      </div>

      {/* Custom CSS for gradient animations */}
      <style jsx>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient-shift 3s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default YouTubeSubscriptionPopup;
