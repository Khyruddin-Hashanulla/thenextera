import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.png';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout, isInstructor } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      console.log('🚪 Navbar logout initiated...');
      await logout();
      // Redirect is handled by AuthContext logout function
    } catch (error) {
      console.error('❌ Logout error:', error);
      // Force redirect even if logout fails
      window.location.href = '/';
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

  const handleCreateCourseClick = () => {
    navigate('/courses/create');
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
              <span className="text-white font-bold text-lg sm:text-xl"><img src={logo} alt="" srcset="" /></span>
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
          <div className="hidden lg:flex items-center space-x-6">
            {user ? (
              <div className="flex items-center space-x-5">
                {/* Create Course button for instructors - positioned before logout */}
                {isInstructor && (
                  <button
                    onClick={handleCreateCourseClick}
                    className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-md transition-all duration-200 text-sm font-medium border border-green-500 flex items-center gap-2"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    Create Course
                  </button>
                )}
                <button
                  onClick={handleLogout}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-md transition-all duration-200 text-sm font-medium border border-blue-500"
                >
                  Logout
                </button>
                <div className="flex flex-col items-center space-y-1">
                  {/* Profile Picture */}
                  <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-gray-400 shadow-lg hover:border-blue-400 transition-colors duration-200">
                    {user.profilePic ? (
                      <img 
                        src={user.profilePic} 
                        alt="Profile" 
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div 
                      className={`w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-inner ${user.profilePic ? 'hidden' : 'flex'}`}
                    >
                      {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                  </div>
                  {/* Role Badge */}
                  {isInstructor ? (
                    <span className="bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full text-xs font-semibold border border-green-500/30">
                      Instructor
                    </span>
                  ) : (
                    <span className="bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full text-xs font-semibold border border-blue-500/30">
                      Student
                    </span>
                  )}
                </div>
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
          {/* Mobile instructor navigation */}
          {isInstructor && (
            <button
              onClick={handleCreateCourseClick}
              className="block w-full text-left px-4 py-3 text-green-400 hover:bg-white/10 bg-transparent border-none font-medium rounded-md transition-colors duration-200 flex items-center gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Create Course
            </button>
          )}
          
          {/* Mobile user section */}
          <div className="border-t border-gray-700 pt-4 mt-4">
            {user ? (
              <div className="space-y-1">
                <div className="px-4 py-2 flex items-center">
                  <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-gray-300 mr-2">
                    {user.profilePic ? (
                      <img 
                        src={user.profilePic} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div 
                      className={`w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm ${user.profilePic ? 'hidden' : 'flex'}`}
                    >
                      {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                  </div>
                  <div>
                    {isInstructor ? (
                      <p className="text-green-400 text-sm">Instructor</p>
                    ) : (
                      <p className="text-blue-400 text-sm">Student</p>
                    )}
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-3 text-white hover:bg-white/10 bg-transparent border-none font-medium rounded-md transition-colors duration-200"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="space-y-1">
                <Link 
                  to="/login" 
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-3 text-white hover:bg-white/10 font-medium rounded-md transition-colors duration-200"
                >
                  Log in
                </Link>
                <Link 
                  to="/register" 
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-3 text-white hover:bg-white/10 font-medium rounded-md transition-colors duration-200"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      )}
    </nav>
  );
};

export default Navbar;