import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { 
  FaCodeBranch, 
  FaBook, 
  FaChartBar, 
  FaUsers, 
  FaPlus,
  FaEdit,
  FaEye,
  FaTasks,
  FaGraduationCap,
  FaRocket
} from 'react-icons/fa';
import api from '../utils/api';

const InstructorPanel = () => {
  const navigate = useNavigate();
  const { user, isInstructor } = useAuth();
  const [stats, setStats] = useState({
    totalCourses: 0,
    totalStudents: 0,
    totalDSAProblems: 0,
    totalDSATopics: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isInstructor) {
      navigate('/dashboard');
      return;
    }
    fetchInstructorStats();
  }, [isInstructor, navigate]);

  const fetchInstructorStats = async () => {
    try {
      setLoading(true);
      
      // Fetch course stats
      const coursesResponse = await api.get('/api/courses');
      const instructorCourses = coursesResponse.data.filter(
        course => course.createdBy === user.id || course.createdBy === user._id
      );
      
      // Calculate total students from instructor's courses
      const totalStudents = instructorCourses.reduce((total, course) => {
        return total + (course.enrolledStudents?.length || 0);
      }, 0);

      // Fetch DSA stats if available
      let dsaStats = { totalProblems: 0, totalTopics: 0 };
      try {
        const dsaResponse = await api.get('/api/dsa/admin/topics');
        if (dsaResponse.data.success) {
          dsaStats.totalTopics = dsaResponse.data.count || 0;
        }
        
        const problemsResponse = await api.get('/api/dsa/admin/problems');
        if (problemsResponse.data.success) {
          dsaStats.totalProblems = problemsResponse.data.count || 0;
        }
      } catch (dsaError) {
        console.log('DSA stats not available:', dsaError);
      }

      setStats({
        totalCourses: instructorCourses.length,
        totalStudents,
        totalDSAProblems: dsaStats.totalProblems,
        totalDSATopics: dsaStats.totalTopics
      });
    } catch (error) {
      console.error('Error fetching instructor stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const managementOptions = [
    {
      title: 'DSA Management',
      description: 'Manage DSA topics, problems, and student progress',
      icon: FaCodeBranch,
      route: '/dsa-management',
      color: 'from-purple-500 to-pink-500',
      stats: [
        { label: 'Topics', value: stats.totalDSATopics },
        { label: 'Problems', value: stats.totalDSAProblems }
      ]
    },
    {
      title: 'Manage Courses',
      description: 'Create, edit, and manage your courses',
      icon: FaBook,
      route: '/courses',
      color: 'from-blue-500 to-cyan-500',
      stats: [
        { label: 'Courses', value: stats.totalCourses },
        { label: 'Students', value: stats.totalStudents }
      ]
    }
  ];

  const quickActions = [
    {
      title: 'Create New Course',
      description: 'Start building a new course',
      icon: FaPlus,
      route: '/courses/create',
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'View All Courses',
      description: 'See all your courses',
      icon: FaEye,
      route: '/courses',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      title: 'Student Analytics',
      description: 'View student progress and analytics',
      icon: FaChartBar,
      route: '/instructor/analytics',
      color: 'from-orange-500 to-red-500'
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-cyan-400"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <Navbar />
      
      <div className="relative z-10 container mx-auto px-4 py-4 pt-32 pb-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <FaGraduationCap className="text-4xl text-cyan-400 mr-3" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Instructor Panel
            </h1>
          </div>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Welcome back, {user.name}! Manage your courses and DSA content from your centralized instructor dashboard.
          </p>
        </div>

        {/* Main Management Options */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {managementOptions.map((option, index) => (
            <div
              key={option.title}
              className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-500 transform hover:scale-105 cursor-pointer"
              onClick={() => navigate(option.route)}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${option.color} opacity-0 group-hover:opacity-20 rounded-2xl transition-opacity duration-500`}></div>
              
              {/* Floating Elements */}
              <div className="absolute top-4 right-4 w-2 h-2 bg-cyan-400/60 rounded-full animate-bounce"></div>
              <div className="absolute bottom-4 left-4 w-1 h-1 bg-purple-400/60 rounded-full animate-pulse"></div>
              
              <div className="relative z-10">
                {/* Icon and Title */}
                <div className="flex items-center mb-6">
                  <div className={`p-4 rounded-xl bg-gradient-to-br ${option.color} mr-4 group-hover:scale-110 transition-transform duration-300`}>
                    <option.icon className="text-2xl text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white group-hover:text-cyan-200 transition-colors duration-300">
                      {option.title}
                    </h3>
                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                      {option.description}
                    </p>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                  {option.stats.map((stat, statIndex) => (
                    <div key={statIndex} className="bg-white/5 rounded-lg p-4 border border-white/10">
                      <div className="text-2xl font-bold text-white">{stat.value}</div>
                      <div className="text-sm text-gray-400">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Arrow Indicator */}
                <div className="absolute top-1/2 right-6 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300">
                  <FaRocket className="text-cyan-400 text-xl" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Quick Actions</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {quickActions.map((action, index) => (
              <div
                key={action.title}
                className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 transform hover:scale-105 cursor-pointer"
                onClick={() => navigate(action.route)}
                style={{ animationDelay: `${(index + 2) * 150}ms` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${action.color} opacity-0 group-hover:opacity-20 rounded-xl transition-opacity duration-300`}></div>
                
                <div className="relative z-10">
                  <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${action.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <action.icon className="text-xl text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-cyan-200 transition-colors duration-300">
                    {action.title}
                  </h3>
                  <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">
                    {action.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Welcome Message */}
        <div className="text-center bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
          <div className="flex items-center justify-center mb-4">
            <FaTasks className="text-3xl text-purple-400 mr-3" />
            <h3 className="text-2xl font-bold text-white">Ready to Teach?</h3>
          </div>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Your instructor dashboard gives you complete control over your educational content. 
            Create engaging courses, manage DSA problems, and track student progress all in one place.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default InstructorPanel;
