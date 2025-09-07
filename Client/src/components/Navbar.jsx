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
  FaCode,
  FaChevronDown,
  FaDatabase,
  FaDesktop,
  FaNetworkWired,
  FaCube,
  FaCodeBranch
} from 'react-icons/fa';
import logo from '../assets/logo.png';
import api from '../utils/api';
import ProgressManager from '../CoreSubjects/ProgressManager';
import { DBMS_TOPICS } from '../CoreSubjects/DBMS';
import { OS_TOPICS } from '../CoreSubjects/OS';
import { CN_TOPICS } from '../CoreSubjects/CN';
import { OOP_TOPICS } from '../CoreSubjects/OOP';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [coreSubjectDropdownOpen, setCoreSubjectDropdownOpen] = useState(false);
  const [coreSubjects, setCoreSubjects] = useState([]);
  const [loadingSubjects, setLoadingSubjects] = useState(false);
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

  useEffect(() => {
    if (user) {
      fetchCoreSubjects();
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchCoreSubjects();
    }
  }, [user]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (coreSubjectDropdownOpen && !event.target.closest('.core-subject-dropdown')) {
        setCoreSubjectDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [coreSubjectDropdownOpen]);

  // Fetch core subjects for dropdown with real progress data
  const fetchCoreSubjects = async () => {
    if (!user) return;
    
    try {
      setLoadingSubjects(true);
      
      // Get real progress data from ProgressManager
      const topicsMap = {
        1: DBMS_TOPICS,
        2: OS_TOPICS,
        3: CN_TOPICS,
        4: OOP_TOPICS
      };

      const subjectsWithProgress = [
        { 
          id: 1, 
          name: "Database Management Systems (DBMS)", 
          icon: FaDatabase, 
          progress: ProgressManager.getSubjectProgress(1, topicsMap[1]).percentage 
        },
        { 
          id: 2, 
          name: "Operating Systems", 
          icon: FaDesktop, 
          progress: ProgressManager.getSubjectProgress(2, topicsMap[2]).percentage 
        },
        { 
          id: 3, 
          name: "Computer Networks", 
          icon: FaNetworkWired, 
          progress: ProgressManager.getSubjectProgress(3, topicsMap[3]).percentage 
        },
        { 
          id: 4, 
          name: "Object-Oriented Programming (OOPS)", 
          icon: FaCube, 
          progress: ProgressManager.getSubjectProgress(4, topicsMap[4]).percentage 
        }
      ];
        
      setCoreSubjects(subjectsWithProgress);
    } catch (error) {
      console.error('Error fetching core subjects:', error);
    } finally {
      setLoadingSubjects(false);
    }
  };

  // Listen for progress updates to refresh navbar data
  useEffect(() => {
    const handleProgressUpdate = () => {
      if (!user) return;
      
      // Refresh progress data when any subject progress is updated
      const topicsMap = {
        1: DBMS_TOPICS,
        2: OS_TOPICS,
        3: CN_TOPICS,
        4: OOP_TOPICS
      };

      const updatedSubjects = coreSubjects.map(subject => ({
        ...subject,
        progress: ProgressManager.getSubjectProgress(subject.id, topicsMap[subject.id]).percentage
      }));

      setCoreSubjects(updatedSubjects);
    };

    window.addEventListener('progressUpdated', handleProgressUpdate);
    return () => window.removeEventListener('progressUpdated', handleProgressUpdate);
  }, [user, coreSubjects]);

  const handleLogout = async () => {
    try {
      const result = await logout();
      if (result.success) {
        navigate('/login');
      }
    } catch (error) {
      console.error('Logout error:', error);
      localStorage.removeItem('authToken');
      navigate('/login');
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

  const handleDSASheetClick = (e) => {
    e.preventDefault();
    if (user) {
      navigate('/dsa-sheet');
    } else {
      navigate('/login', { state: { redirectTo: '/dsa-sheet' } });
    }
    setIsOpen(false);
  };

  const handleCoreSubjectClick = (e) => {
    e?.preventDefault();
    if (user) {
      navigate('/core-subject');
    } else {
      navigate('/login', { state: { redirectTo: '/core-subject' } });
    }
    setIsOpen(false);
    setCoreSubjectDropdownOpen(false);
  };

  const handleNavClick = (path, requiresAuth = false) => {
    if (requiresAuth && !user) {
      navigate('/login', { state: { redirectTo: path } });
    } else {
      navigate(path);
    }
    setIsOpen(false);
  };

  const handleSubjectNavigation = (subjectId) => {
    navigate(`/subject/${subjectId}`);
    setCoreSubjectDropdownOpen(false);
    setIsOpen(false);
  };

  const handleCreateCourseClick = () => {
    navigate('/courses/create');
    setIsOpen(false);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.core-subject-dropdown') && !event.target.closest('.profile-dropdown')) {
        setCoreSubjectDropdownOpen(false);
        setProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Navigation items for all users (show all items, handle auth in click handlers)
  const navItems = [
    { path: '/', name: 'Home', icon: FaHome, color: 'from-space-cyan to-space-blue', requiresAuth: false },
    { path: '/courses', name: 'Courses', icon: FaBook, requiresAuth: true, color: 'from-space-purple to-space-pink' },
    { path: '/dsa-sheet', name: 'DSA Sheet', icon: FaCode, requiresAuth: true, color: 'from-space-green to-space-teal' },
    { path: '/core-subject', name: 'Core Subject', icon: FaBookOpen, requiresAuth: true, color: 'from-space-orange to-space-red' },
    ...(user ? [{ path: '/dashboard', name: 'Dashboard', icon: FaTachometerAlt, color: 'from-space-emerald to-space-cyan', requiresAuth: true }] : []),
  ];

  const mobileNavItems = [
    { path: '/', name: 'Home', icon: FaHome, color: 'from-space-cyan to-space-blue', requiresAuth: false },
    { path: '/courses', name: 'Courses', icon: FaBook, requiresAuth: true, color: 'from-space-purple to-space-pink' },
    { path: '/dsa-sheet', name: 'DSA Sheet', icon: FaCode, requiresAuth: true, color: 'from-space-green to-space-teal' },
    { path: '/core-subject', name: 'Core Subject', icon: FaBookOpen, requiresAuth: true, color: 'from-space-orange to-space-red', hasDropdown: true },
    ...(user ? [{ path: '/dashboard', name: 'Dashboard', icon: FaTachometerAlt, color: 'from-space-emerald to-space-cyan', requiresAuth: true }] : []),
  ];

  return (
    <>
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-space-cyan/10 to-space-purple/10 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-20 right-20 w-24 h-24 bg-gradient-to-r from-space-pink/10 to-space-indigo/10 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-40 left-1/2 w-20 h-20 bg-gradient-to-r from-space-emerald/10 to-space-blue/10 rounded-full blur-xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <nav className={`fixed top-1 left-1 right-1 glass-card-enhanced p-4 z-50 transition-all duration-500 backdrop-blur-md bg-gray-900/95 border-b border-gray-700/50 ${scrolled ? 'animate-glow' : ''}`}>
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
                const isActive = location.pathname === path;
                
                // Add dropdown functionality for Core Subject in desktop navbar
                if (name === 'Core Subject') {
                  return (
                    <div key={path} className="relative core-subject-dropdown">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          if (requiresAuth && !user) {
                            navigate('/login', { state: { redirectTo: path } });
                          } else {
                            setCoreSubjectDropdownOpen(!coreSubjectDropdownOpen);
                          }
                        }}
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
                        {user && <FaChevronDown className={`w-3 h-3 transition-transform duration-200 ${coreSubjectDropdownOpen ? 'rotate-180' : ''}`} />}
                        
                        {/* Active indicator */}
                        {isActive && (
                          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-0.5 bg-white rounded-full"></div>
                        )}
                      </button>

                      {/* Desktop Core Subject Dropdown - Only show if user is logged in */}
                      {coreSubjectDropdownOpen && user && (
                        <div className="absolute top-full left-0 mt-2 w-80 bg-gray-800/95 backdrop-blur-sm rounded-lg border border-white/10 shadow-xl z-[100]">
                          <div className="p-3">
                            {/* Dropdown Header */}
                            <div className="px-3 py-2 border-b border-white/10 mb-3">
                              <div className="flex items-center justify-between">
                                <h3 className="text-white text-sm font-medium">Core Subjects</h3>
                                <button
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    handleCoreSubjectClick();
                                    setCoreSubjectDropdownOpen(false);
                                  }}
                                  className="text-xs text-space-cyan hover:text-space-purple transition-colors duration-200 px-2 py-1 rounded hover:bg-white/10"
                                >
                                  📚 View All
                                </button>
                              </div>
                            </div>

                            {/* Subjects List */}
                            <div className="space-y-1">
                              {loadingSubjects ? (
                                <div className="px-3 py-2 text-gray-400 text-sm">Loading subjects...</div>
                              ) : coreSubjects.length > 0 ? (
                                coreSubjects.map((subject) => (
                                  <button
                                    key={subject.id}
                                    onClick={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      handleSubjectNavigation(subject.id);
                                      setCoreSubjectDropdownOpen(false);
                                    }}
                                    className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-white/10 text-gray-300 hover:text-white transition-all duration-300 w-full text-left cursor-pointer"
                                  >
                                    <div className="flex items-center space-x-2">
                                      <subject.icon className="w-4 h-4 text-space-cyan" />
                                      <span className="text-sm">{subject.name}</span>
                                    </div>
                                    <span className="text-xs text-gray-400">{subject.progress}%</span>
                                  </button>
                                ))
                              ) : (
                                <div className="px-3 py-2 text-gray-400 text-sm">No subjects available</div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                // Handle DSA Sheet navigation
                if (name === 'DSA Sheet') {
                  return (
                    <button
                      key={path}
                      onClick={(e) => {
                        e.preventDefault();
                        handleDSASheetClick(e);
                      }}
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
                }

                // Handle Courses navigation
                if (name === 'Courses') {
                  return (
                    <button
                      key={path}
                      onClick={(e) => {
                        e.preventDefault();
                        handleCoursesClick(e);
                      }}
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
                }

                return (
                  <button
                    key={path}
                    onClick={() => handleNavClick(path, requiresAuth)}
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
                    className="relative flex items-center space-x-2 px-4 py-2 rounded-lg bg-gradient-to-r from-space-emerald/20 to-space-cyan/20 border border-space-emerald/30 text-space-emerald hover:from-space-emerald/30 hover:to-space-cyan/30 transition-all duration-300 group"
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
                        user.role === 'Admin'
                          ? 'bg-gradient-to-r from-red-500/20 to-orange-500/20 text-red-400 border border-red-500/30'
                          : isInstructor 
                          ? 'bg-gradient-to-r from-space-emerald/20 to-space-cyan/20 text-space-emerald border border-space-emerald/30' 
                          : 'bg-gradient-to-r from-space-blue/20 to-space-purple/20 text-space-blue border border-space-blue/30'
                      }`}>
                        {user.role === 'Admin' ? 'Admin' : isInstructor ? 'Instructor' : 'Student'}
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
                        <div className="px-3 py-2 border-b border-white/10 mb-3">
                          <h3 className="text-white text-sm font-medium">{user.name}</h3>
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

                          {user.role === 'Admin' && (
                            <button
                              onClick={() => {
                                navigate('/dsa-management');
                                setProfileDropdownOpen(false);
                              }}
                              className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-white/10 text-gray-300 hover:text-white transition-all duration-300 w-full text-left group"
                            >
                              <FaCodeBranch className="w-4 h-4" />
                              <span className="text-sm">DSA Management</span>
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
                  className="relative flex items-center space-x-2 px-4 py-2 rounded-lg bg-gradient-to-r from-space-blue/20 to-space-purple/20 border border-space-blue/30 text-space-cyan hover:from-space-blue/30 hover:to-space-purple/30 transition-all duration-300 group"
                >
                  <FaUserPlus className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                  <span className="font-medium text-sm">Sign up</span>
                </Link>
              </div>
            )}
          </div>

          {/* Enhanced Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-xl hover:bg-white/10 transition-all duration-300 text-white group border border-white/20 hover:border-space-cyan/50 relative z-10"
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
              {mobileNavItems.map(({ path, name, icon: Icon, requiresAuth, color, hasDropdown }) => {
                const isActive = location.pathname === path || (hasDropdown && location.pathname.startsWith('/subject/'));

                if (hasDropdown && name === 'Core Subject') {
                  return (
                    <div key={path} className="space-y-2 core-subject-dropdown">
                      {/* Core Subject Toggle Button */}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          if (requiresAuth && !user) {
                            navigate('/login', { state: { redirectTo: path } });
                            setIsOpen(false);
                          } else {
                            setCoreSubjectDropdownOpen(!coreSubjectDropdownOpen);
                          }
                        }}
                        className={`flex items-center justify-between px-4 py-4 rounded-xl transition-all duration-300 text-left group w-full ${
                          isActive
                            ? `bg-gradient-to-r ${color} text-white shadow-lg`
                            : 'hover:bg-white/10 text-gray-300 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <Icon className={`w-5 h-5 ${isActive ? 'animate-pulse-slow' : 'group-hover:scale-110'} transition-transform duration-300`} />
                          <span className="font-medium">{name}</span>
                        </div>
                        {user && <FaChevronDown className={`w-4 h-4 transition-transform duration-200 ${coreSubjectDropdownOpen ? 'rotate-180' : ''}`} />}
                      </button>

                      {/* Dropdown Content - Only show if user is logged in */}
                      {coreSubjectDropdownOpen && user && (
                        <div className="ml-4 space-y-2 border-l-2 border-space-cyan/30 pl-4">
                          {/* View All Subjects Button */}
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleCoreSubjectClick();
                              setIsOpen(false);
                              setCoreSubjectDropdownOpen(false);
                            }}
                            className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-white/10 text-gray-300 hover:text-white transition-all duration-300 w-full text-left text-sm cursor-pointer"
                          >
                            <span>📚 View All Subjects</span>
                          </button>
                          
                          {/* Individual Subject Buttons */}
                          {loadingSubjects ? (
                            <div className="px-3 py-2 text-gray-400 text-sm">Loading...</div>
                          ) : (
                            coreSubjects.map((subject) => (
                              <button
                                key={subject.id}
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  handleSubjectNavigation(subject.id);
                                  setIsOpen(false);
                                  setCoreSubjectDropdownOpen(false);
                                }}
                                className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-white/10 text-gray-300 hover:text-white transition-all duration-300 w-full text-left cursor-pointer"
                              >
                                <div className="flex items-center space-x-2">
                                  <subject.icon className="w-4 h-4 text-space-cyan" />
                                  <span className="text-sm">{subject.name}</span>
                                </div>
                                <span className="text-xs text-gray-400">{subject.progress}%</span>
                              </button>
                            ))
                          )}
                        </div>
                      )}
                    </div>
                  );
                }

                // Handle DSA Sheet in mobile
                if (name === 'DSA Sheet') {
                  return (
                    <button
                      key={path}
                      onClick={(e) => {
                        e.preventDefault();
                        handleDSASheetClick(e);
                      }}
                      className={`flex items-center space-x-3 px-4 py-4 rounded-xl transition-all duration-300 text-left group w-full ${
                        isActive
                          ? `bg-gradient-to-r ${color} text-white shadow-lg`
                          : 'hover:bg-white/10 text-gray-300 hover:text-white'
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${isActive ? 'animate-pulse-slow' : 'group-hover:scale-110'} transition-transform duration-300`} />
                      <span className="font-medium">{name}</span>
                    </button>
                  );
                }

                // Handle Courses in mobile
                if (name === 'Courses') {
                  return (
                    <button
                      key={path}
                      onClick={(e) => {
                        e.preventDefault();
                        handleCoursesClick(e);
                      }}
                      className={`flex items-center space-x-3 px-4 py-4 rounded-xl transition-all duration-300 text-left group w-full ${
                        isActive
                          ? `bg-gradient-to-r ${color} text-white shadow-lg`
                          : 'hover:bg-white/10 text-gray-300 hover:text-white'
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${isActive ? 'animate-pulse-slow' : 'group-hover:scale-110'} transition-transform duration-300`} />
                      <span className="font-medium">{name}</span>
                    </button>
                  );
                }

                return (
                  <button
                    key={path}
                    onClick={() => handleNavClick(path, requiresAuth)}
                    className={`flex items-center space-x-3 px-4 py-4 rounded-xl transition-all duration-300 text-left group w-full ${
                      isActive
                        ? `bg-gradient-to-r ${color} text-white shadow-lg`
                        : 'hover:bg-white/10 text-gray-300 hover:text-white'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? 'animate-pulse-slow' : 'group-hover:scale-110'} transition-transform duration-300`} />
                    <span className="font-medium">{name}</span>
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
                        {/* Online indicator */}
                        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-space-emerald rounded-full border-2 border-gray-900 animate-pulse-slow"></div>
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-medium">{user.name}</p>
                        <div className="flex items-center space-x-1">
                          <p className={`text-xs ${user.role === 'Admin' ? 'text-red-400' : isInstructor ? 'text-space-emerald' : 'text-space-blue'}`}>
                            {user.role === 'Admin' ? 'Admin' : isInstructor ? 'Instructor' : 'Student'}
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
                      className="flex items-center space-x-3 px-4 py-4 rounded-lg hover:bg-white/10 text-gray-300 hover:text-white transition-all duration-300 group"
                    >
                      <FaSignInAlt className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                      <span className="font-medium">Log in</span>
                    </Link>
                    <Link 
                      to="/register" 
                      onClick={() => setIsOpen(false)}
                      className="relative flex items-center space-x-3 px-4 py-4 rounded-lg bg-gradient-to-r from-space-blue/20 to-space-purple/20 border border-space-blue/30 text-space-cyan hover:from-space-blue/30 hover:to-space-purple/30 transition-all duration-300 group"
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