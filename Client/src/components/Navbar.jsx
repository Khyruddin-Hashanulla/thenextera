import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  FaHome, 
  FaBook, 
  FaTachometerAlt, 
  FaPlus, 
  FaSignInAlt, 
  FaUserPlus, 
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaUser,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaStar,
  FaRocket,
  FaGem,
  FaBookOpen,
  FaCode
} from 'react-icons/fa';
import logo from '../assets/logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const { user, logout, isInstructor } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
      localStorage.removeItem('authToken');
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
    setIsOpen(false);
  };

  const handleCreateCourseClick = () => {
    navigate('/courses/create');
    setIsOpen(false);
  };

  const handleNavClick = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  // Navigation items for authenticated users
  const navItems = [
    { path: '/', name: 'Home', icon: FaHome, color: 'from-space-cyan to-space-blue' },
    { path: '/courses', name: 'Courses', icon: FaBook, requiresAuth: true, color: 'from-space-purple to-space-pink' },
    { path: '/core-subject', name: 'Core Subject', icon: FaBookOpen, requiresAuth: true, color: 'from-space-orange to-space-red' },
    { path: '/dsa-sheet', name: 'DSA Sheet', icon: FaCode, requiresAuth: true, color: 'from-space-green to-space-teal' },
    ...(user ? [{ path: '/dashboard', name: 'Dashboard', icon: FaTachometerAlt, color: 'from-space-emerald to-space-cyan' }] : []),
  ];

  return (
    <>
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-space-cyan/10 to-space-purple/10 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-20 right-20 w-24 h-24 bg-gradient-to-r from-space-pink/10 to-space-indigo/10 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-40 left-1/2 w-20 h-20 bg-gradient-to-r from-space-emerald/10 to-space-blue/10 rounded-full blur-xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <nav className={`glass-card-enhanced m-4 p-5 relative z-50 transition-all duration-500 ${scrolled ? 'animate-glow' : ''}`}>
        {/* Decorative gradient line at top */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-space-cyan to-transparent opacity-60"></div>
        
        <div className="flex items-center justify-between">
          {/* Enhanced Logo and Brand */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              {/* Logo container with enhanced styling */}
              <div className="w-10 h-10 rounded-xl overflow-hidden relative bg-gradient-to-br from-space-cyan/20 to-space-purple/20 p-0.5 group-hover:scale-105 transition-transform duration-300">
                <div className="w-full h-full rounded-xl overflow-hidden bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
                  <img 
                    src={logo} 
                    alt="NextEra Logo" 
                    className="w-7 h-7 object-contain filter drop-shadow-lg"
                  />
                </div>
              </div>
              {/* Floating decorative elements */}
              <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-gradient-to-r from-space-cyan to-space-purple rounded-full animate-pulse-slow"></div>
            </div>
            
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-gradient-to-r from-space-cyan via-space-purple to-space-pink bg-clip-text text-transparent group-hover:from-space-pink group-hover:via-space-cyan group-hover:to-space-purple transition-all duration-500">
                NextEra
              </span>
              <span className="text-xs text-gray-400 font-medium tracking-wide">Learning Platform</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Main Navigation with enhanced styling */}
            <div className="flex items-center space-x-1">
              {navItems.map(({ path, name, icon: Icon, requiresAuth, color }) => {
                if (requiresAuth && !user) return null;
                const isActive = location.pathname === path;
                return (
                  <button
                    key={path}
                    onClick={() => path === '/courses' ? handleCoursesClick({ preventDefault: () => {} }) : handleNavClick(path)}
                    className={`relative flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 group overflow-hidden ${
                      isActive
                        ? `bg-gradient-to-r ${color} text-white shadow-lg shadow-space-purple/25`
                        : 'hover:bg-white/10 text-gray-300 hover:text-white hover:shadow-lg hover:shadow-white/10'
                    }`}
                  >
                    {/* Background shimmer effect */}
                    {!isActive && <div className="absolute inset-0 shimmer-effect opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>}
                    
                    <Icon className={`w-4 h-4 ${isActive ? 'animate-pulse-slow' : 'group-hover:scale-110'} transition-transform duration-300`} />
                    <span className="font-medium text-sm">{name}</span>
                    
                    {/* Active indicator */}
                    {isActive && (
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-0.5 bg-white rounded-full"></div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Enhanced Auth Section */}
            {user ? (
              <div className="flex items-center space-x-3 pl-4 border-l border-white/20">
                {/* Enhanced Create Course Button for Instructors */}
                {isInstructor && (
                  <button
                    onClick={handleCreateCourseClick}
                    className="relative flex items-center space-x-2 px-4 py-2 rounded-lg bg-gradient-to-r from-space-emerald/20 to-space-cyan/20 border border-space-emerald/30 text-space-emerald hover:from-space-emerald/30 hover:to-space-cyan/30 transition-all duration-300 group overflow-hidden shimmer-effect"
                  >
                    <FaPlus className="w-3 h-3 group-hover:rotate-90 transition-transform duration-300" />
                    <span className="font-medium text-sm">Create</span>
                  </button>
                )}

                {/* Enhanced User Profile */}
                <div className="relative profile-dropdown">
                  <button
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    className="flex items-center space-x-2 bg-white/5 rounded-lg p-2 border border-white/10 hover:bg-white/10 transition-all duration-300 group"
                  >
                    {/* Enhanced profile picture */}
                    <div className="relative">
                      <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-space-cyan/50 group-hover:border-space-purple/70 transition-colors duration-300">
                        {user.profilePic ? (
                          <img 
                            src={user.profilePic} 
                            alt="Profile" 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                        ) : null}
                        <div 
                          className={`w-full h-full bg-gradient-to-br from-space-cyan to-space-purple flex items-center justify-center text-white font-bold text-xs ${user.profilePic ? 'hidden' : 'flex'}`}
                        >
                          {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                        </div>
                      </div>
                      {/* Online indicator */}
                      <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-space-emerald rounded-full border border-gray-900 animate-pulse-slow"></div>
                    </div>
                    
                    <div className="flex flex-col">
                      <span className="text-white text-sm font-medium group-hover:text-space-cyan transition-colors duration-300">{user.name}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        isInstructor 
                          ? 'bg-gradient-to-r from-space-emerald/20 to-space-cyan/20 text-space-emerald border border-space-emerald/30' 
                          : 'bg-gradient-to-r from-space-blue/20 to-space-purple/20 text-space-blue border border-space-blue/30'
                      }`}>
                        {isInstructor ? 'Instructor' : 'Student'}
                      </span>
                    </div>

                    {/* Dropdown arrow */}
                    <svg 
                      className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${profileDropdownOpen ? 'rotate-180' : ''}`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Dropdown Menu */}
                  {profileDropdownOpen && (
                    <div className="absolute top-full right-0 mt-2 w-56 bg-gray-800/90 backdrop-blur-sm rounded-lg border border-white/10 shadow-lg shadow-black/20 z-50">
                      <div className="p-2">
                        {/* Profile Header */}
                        <div className="px-3 py-2 border-b border-white/10 mb-2">
                          <p className="text-white text-sm font-medium">{user.name}</p>
                          <p className="text-gray-400 text-xs">{user.email}</p>
                        </div>

                        {/* Menu Items */}
                        <div className="space-y-1">
                          <button
                            onClick={() => {
                              navigate('/profile');
                              setProfileDropdownOpen(false);
                            }}
                            className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-white/10 text-gray-300 hover:text-white transition-all duration-300 w-full text-left group"
                          >
                            <FaUser className="w-4 h-4" />
                            <span className="text-sm">Profile Settings</span>
                          </button>

                          {isInstructor && (
                            <button
                              onClick={() => {
                                navigate('/instructor-panel');
                                setProfileDropdownOpen(false);
                              }}
                              className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-white/10 text-gray-300 hover:text-white transition-all duration-300 w-full text-left group"
                            >
                              <FaChalkboardTeacher className="w-4 h-4" />
                              <span className="text-sm">Instructor Panel</span>
                            </button>
                          )}

                          {user.role === 'Admin' && (
                            <button
                              onClick={() => {
                                navigate('/admin');
                                setProfileDropdownOpen(false);
                              }}
                              className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-white/10 text-gray-300 hover:text-white transition-all duration-300 w-full text-left group"
                            >
                              <FaUserGraduate className="w-4 h-4" />
                              <span className="text-sm">Admin Panel</span>
                            </button>
                          )}

                          <div className="border-t border-white/10 my-2"></div>

                          <button
                            onClick={() => {
                              handleLogout();
                              setProfileDropdownOpen(false);
                            }}
                            className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-red-500/20 text-gray-300 hover:text-red-400 transition-all duration-300 w-full text-left group border border-transparent hover:border-red-500/30"
                          >
                            <FaSignOutAlt className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                            <span className="text-sm">Logout</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3 pl-4 border-l border-white/20">
                {/* Enhanced Login Button */}
                <Link
                  to="/login"
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-white/10 text-gray-300 hover:text-white transition-all duration-300 group border border-transparent hover:border-white/20"
                >
                  <FaSignInAlt className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  <span className="font-medium text-sm">Log in</span>
                </Link>
                
                {/* Enhanced Sign Up Button */}
                <Link
                  to="/register"
                  className="relative flex items-center space-x-2 px-4 py-2 rounded-lg bg-gradient-to-r from-space-blue/20 to-space-purple/20 border border-space-blue/30 text-space-cyan hover:from-space-blue/30 hover:to-space-purple/30 transition-all duration-300 group overflow-hidden shimmer-effect"
                >
                  <FaUserPlus className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                  <span className="font-medium text-sm">Sign up</span>
                </Link>
              </div>
            )}
          </div>

          {/* Enhanced Mobile Menu Button */}
          <button
            className="md:hidden p-3 rounded-xl hover:bg-white/10 transition-all duration-300 text-white group border border-white/20 hover:border-space-cyan/50"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? 
              <FaTimes className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" /> : 
              <FaBars className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
            }
          </button>
        </div>

        {/* Enhanced Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-6 pt-6 border-t border-white/20 animate-fade-in">
            <div className="flex flex-col space-y-3">
              {/* Mobile Navigation Items */}
              {navItems.map(({ path, name, icon: Icon, requiresAuth, color }) => {
                if (requiresAuth && !user) return null;
                const isActive = location.pathname === path;
                return (
                  <button
                    key={path}
                    onClick={() => path === '/courses' ? handleCoursesClick({ preventDefault: () => {} }) : handleNavClick(path)}
                    className={`flex items-center space-x-3 px-4 py-4 rounded-xl transition-all duration-300 text-left group ${
                      isActive
                        ? `bg-gradient-to-r ${color} text-white shadow-lg`
                        : 'hover:bg-white/10 text-gray-300 hover:text-white'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? 'animate-pulse-slow' : 'group-hover:scale-110'} transition-transform duration-300`} />
                    <span className="font-medium">{name}</span>
                    {isActive && <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse-slow"></div>}
                  </button>
                );
              })}

              {/* Mobile Create Course Button */}
              {user && isInstructor && (
                <button
                  onClick={handleCreateCourseClick}
                  className="flex items-center space-x-3 px-4 py-4 rounded-xl bg-gradient-to-r from-space-emerald/20 to-space-cyan/20 border border-space-emerald/30 text-space-emerald hover:from-space-emerald/30 hover:to-space-cyan/30 transition-all duration-300 group"
                >
                  <FaPlus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                  <span className="font-medium">Create Course</span>
                  <FaRocket className="w-4 h-4 opacity-60 group-hover:opacity-100 ml-auto transition-all duration-300" />
                </button>
              )}

              {/* Mobile Auth Section */}
              <div className="border-t border-white/20 pt-4 mt-4">
                {user ? (
                  <div className="space-y-3">
                    {/* Mobile User Profile */}
                    <div className="flex items-center space-x-3 px-4 py-3 bg-white/5 rounded-xl border border-white/10">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-space-cyan/50">
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
                            className={`w-full h-full bg-gradient-to-br from-space-cyan to-space-purple flex items-center justify-center text-white font-bold text-xs ${user.profilePic ? 'hidden' : 'flex'}`}
                          >
                            {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                          </div>
                        </div>
                        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-space-emerald rounded-full border-2 border-gray-900 animate-pulse-slow"></div>
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-medium">{user.name}</p>
                        <div className="flex items-center space-x-1">
                          <p className={`text-xs ${isInstructor ? 'text-space-emerald' : 'text-space-blue'}`}>
                            {isInstructor ? 'Instructor' : 'Student'}
                          </p>
                          {isInstructor && <FaStar className="w-3 h-3 text-yellow-400" />}
                        </div>
                      </div>
                    </div>
                    
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-3 px-4 py-4 rounded-xl hover:bg-red-500/20 text-gray-300 hover:text-red-400 transition-all duration-300 w-full text-left group border border-transparent hover:border-red-500/30"
                    >
                      <FaSignOutAlt className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                      <span className="font-medium">Logout</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Link 
                      to="/login" 
                      onClick={() => setIsOpen(false)}
                      className="flex items-center space-x-3 px-4 py-4 rounded-xl hover:bg-white/10 text-gray-300 hover:text-white transition-all duration-300 group"
                    >
                      <FaSignInAlt className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                      <span className="font-medium">Log in</span>
                    </Link>
                    <Link 
                      to="/register" 
                      onClick={() => setIsOpen(false)}
                      className="flex items-center space-x-3 px-4 py-4 rounded-xl bg-gradient-to-r from-space-blue/20 to-space-purple/20 border border-space-blue/30 text-space-cyan hover:from-space-blue/30 hover:to-space-purple/30 transition-all duration-300 group"
                    >
                      <FaUserPlus className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                      <span className="font-medium">Sign up</span>
                      <FaGem className="w-4 h-4 opacity-60 group-hover:opacity-100 ml-auto transition-all duration-300" />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Decorative gradient line at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-space-purple to-transparent opacity-40"></div>
      </nav>
    </>
  );
};

export default Navbar;