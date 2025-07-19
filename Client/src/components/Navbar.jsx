import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleCoursesClick = (e) => {
    e.preventDefault();
    if (user) {
      navigate('/courses');
    } else {
      navigate('/login', { state: { redirectTo: '/courses' } });
    }
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  const handleHomeClick = () => {
    navigate('/');
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className="bg-black border-b border-gray-800 shadow-2xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo and main nav links */}
          <div className="flex items-center flex-shrink-0">
            {/* Updated logo path - you may need to adjust this based on your actual logo location */}
            <div className="w-10 h-10 sm:w-14 sm:h-14 bg-[linear-gradient(1deg,_rgba(34,143,186,1)_0%,_rgba(0,0,0,1)_69%,_rgba(0,0,0,1)_100%)] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg sm:text-xl"><img src="/src/assets/logo.png" alt="" srcset="" /></span>
            </div>
            <div className="hidden lg:flex ml-6 space-x-8">
              <button 
                onClick={handleHomeClick}
                className="text-base font-semibold text-white hover:text-gray-300 transition-colors duration-200"
              >
                Home
              </button>
              <button 
                onClick={handleCoursesClick}
                className="text-base font-semibold text-white hover:text-gray-300 transition-colors duration-200"
              >
                Courses
              </button>
              {user && (
                <button
                  onClick={() => navigate('/dashboard')}
                  className="text-base font-semibold text-white hover:text-gray-300 transition-colors duration-200"
                >
                  Dashboard
                </button>
              )}
            </div>
          </div>

          {/* User menu / auth buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-white font-medium text-sm sm:text-base truncate max-w-32">{user.name}</span>
                <button
                  onClick={handleLogout}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-md transition-all duration-200 text-sm font-medium border border-blue-500"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-white font-medium hover:text-gray-300 transition-colors duration-200">Log in</Link>
                <Link to="/register" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-2 rounded-md transition-all duration-200 text-sm font-medium border border-blue-500">Sign up</Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black rounded-md p-2 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-gradient-to-b from-gray-900 to-black border-t border-gray-700 shadow-xl z-50">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <button 
              onClick={handleHomeClick}
              className="block w-full text-left px-4 py-3 text-white hover:bg-white/10 bg-transparent border-none font-medium rounded-md transition-colors duration-200"
            >
              Home
            </button>
            <button 
              onClick={handleCoursesClick}
              className="block w-full text-left px-4 py-3 text-white hover:bg-white/10 bg-transparent border-none font-medium rounded-md transition-colors duration-200"
            >
              Courses
            </button>
            {user && (
              <button
                onClick={() => {
                  navigate('/dashboard');
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-3 text-white hover:bg-white/10 bg-transparent border-none font-medium rounded-md transition-colors duration-200"
              >
                Dashboard
              </button>
            )}
          </div>
          {user ? (
            <div className="border-t border-gray-700 pt-4 pb-3">
              <div className="px-4 py-2">
                <p className="text-white font-medium text-base">{user.name}</p>
                {user.email && <p className="text-gray-400 text-sm mt-1">{user.email}</p>}
              </div>
              <div className="px-2">
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-3 text-white hover:bg-red-600/20 bg-transparent border-none font-medium rounded-md transition-colors duration-200"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="border-t border-gray-700 pt-4 pb-3 px-2 space-y-2">
              <Link 
                to="/login" 
                onClick={() => setIsMenuOpen(false)}
                className="block w-full text-left px-4 py-3 text-white hover:bg-white/10 font-medium rounded-md transition-colors duration-200"
              >
                Log in
              </Link>
              <Link 
                to="/register" 
                onClick={() => setIsMenuOpen(false)}
                className="block w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-3 rounded-md text-center font-medium transition-all duration-200 border border-blue-500"
              >
                Sign up
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar; 