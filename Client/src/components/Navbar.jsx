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
    <nav className="shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Logo and main nav links */}
          <div className="flex items-center">
            <img src="/src/assets/logo.png" alt="NextEra Logo" className="w-14 h-14" />
            <div className="hidden md:flex ml-4 space-x-6">
              <button 
                onClick={handleHomeClick}
                className="text-xl font-bold text-gray-900 ml-2 cursor-pointer"
              >
                Home
              </button>
              <button 
                onClick={handleCoursesClick}
                className="text-xl font-bold text-gray-900 ml-2 cursor-pointer"
              >
                Courses
              </button>
              {user && (
                <button
                  onClick={() => navigate('/dashboard')}
                  className="text-xl font-bold text-gray-900 ml-2 cursor-pointer"
                >
                  Dashboard
                </button>
              )}
            </div>
          </div>

          {/* User menu / auth buttons */}
          <div className="hidden md:flex items-center">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-white">{user.name}</span>
                <button
                  onClick={handleLogout}
                  className="bg-white text-pink-600 hover:bg-gray-100 px-4 py-2 rounded-md transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-white hover:text-gray-200 font-medium">Log in</Link>
                <Link to="/register" className="bg-white text-pink-600 hover:bg-gray-100 px-4 py-2 rounded-md transition-colors">Sign up</Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-gray-200 focus:outline-none"
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
        <div className="md:hidden bg-gradient-to-br from-orange-200 via-red-400 to-pink-600 pt-2 pb-3 space-y-1 shadow-lg">
          <button 
            onClick={handleHomeClick}
            className="block w-full text-left px-4 py-2 text-white hover:bg-white/10 bg-transparent border-none font-medium"
          >
            Home
          </button>
          <button 
            onClick={handleCoursesClick}
            className="block w-full text-left px-4 py-2 text-white hover:bg-white/10 bg-transparent border-none font-medium"
          >
            Courses
          </button>
          {user && (
            <button
              onClick={() => {
                navigate('/dashboard');
                setIsMenuOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-white hover:bg-white/10 bg-transparent border-none font-medium"
            >
              Dashboard
            </button>
          )}
          {user ? (
            <div className="border-t border-white/20 pt-4 pb-3">
              <div className="px-4 py-2">
                <p className="text-white font-medium">{user.name}</p>
                <p className="text-white/70 text-sm">{user.email}</p>
              </div>
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-white hover:bg-white/10 bg-transparent border-none font-medium"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="border-t border-white/20 pt-4 pb-3 px-4 space-y-2">
              <Link to="/login" className="block text-white font-medium">Log in</Link>
              <Link to="/register" className="block bg-white text-pink-600 px-4 py-2 rounded-md text-center">Sign up</Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar; 