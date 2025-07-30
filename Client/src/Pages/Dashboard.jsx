import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import InstructorApplication from "../components/InstructorApplication";
import ResumeBuilder from "../components/ResumeBuilder";
import CareerCoach from "../components/CareerCoach";
import api from "../utils/api";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, isInstructor, isAdmin, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({
    totalCourses: 0,
    enrolledCourses: 0,
    completedCourses: 0,
    totalStudents: 0,
    recentActivity: [],
  });
  const [loading, setLoading] = useState(true);
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    // Set greeting based on time
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 17) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");

    // Fetch dashboard data
    fetchDashboardData();

    // Add event listener for when user navigates back to dashboard
    const handleFocus = () => {
      fetchDashboardData();
    };

    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, [user?.userId, user?._id]); // Add user ID dependencies to refetch when user changes

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await api.get("/api/courses");
      const courses = response.data;

      // Get the current user's ID - handle different possible formats
      const currentUserId = user?.userId || user?._id || user?.id;

      console.log("Dashboard: Current user ID:", currentUserId);
      console.log("Dashboard: User object:", user);

      // Calculate stats based on user role
      if (isInstructor || isAdmin) {
        const instructorCourses = courses.filter((course) => {
          const creatorId = course.creatorId?._id || course.creatorId;
          return creatorId === currentUserId;
        });
        const totalStudents = instructorCourses.reduce(
          (sum, course) => sum + (course.studentsEnrolled?.length || 0),
          0
        );

        setStats({
          totalCourses: instructorCourses.length,
          enrolledCourses: courses.length,
          completedCourses: Math.floor(instructorCourses.length * 0.7), // Mock data
          totalStudents,
          recentActivity: generateRecentActivity(instructorCourses),
        });
      } else {
        // Student stats - improved enrollment detection
        const enrolledCourses = courses.filter((course) => {
          if (
            !course.studentsEnrolled ||
            !Array.isArray(course.studentsEnrolled)
          ) {
            return false;
          }

          return course.studentsEnrolled.some((studentId) => {
            // Handle different ID formats
            const studentIdStr = (studentId?._id || studentId).toString();
            const currentUserIdStr = currentUserId?.toString();

            console.log("Comparing:", studentIdStr, "with", currentUserIdStr);
            return studentIdStr === currentUserIdStr;
          });
        });

        console.log(
          "Dashboard: Found enrolled courses:",
          enrolledCourses.length
        );
        console.log(
          "Dashboard: Enrolled courses:",
          enrolledCourses.map((c) => c.title)
        );

        setStats({
          totalCourses: courses.length,
          enrolledCourses: enrolledCourses.length,
          completedCourses: Math.floor(enrolledCourses.length * 0.6), // Mock data
          totalStudents: 0,
          recentActivity: generateStudentActivity(enrolledCourses),
        });
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const generateRecentActivity = (courses) => {
    const activities = [];
    courses.slice(0, 3).forEach((course) => {
      activities.push({
        id: course._id,
        type: "course_created",
        title: `Course "${course.title}" created`,
        time: "2 hours ago",
        icon: "📚",
      });
    });
    return activities;
  };

  const generateStudentActivity = (courses) => {
    const activities = [];
    courses.slice(0, 3).forEach((course) => {
      activities.push({
        id: course._id,
        type: "course_enrolled",
        title: `Enrolled in "${course.title}"`,
        time: "1 day ago",
        icon: "🎓",
      });
    });
    return activities;
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const StatCard = ({ title, value, icon, color, delay }) => (
    <div
      className={`bg-gradient-to-br ${color} px-4 py-2 rounded-lg shadow-md border border-white/10 backdrop-blur-sm transform hover:scale-105 transition-all duration-300 animate-fade-in-up group relative overflow-hidden`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Animated background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="absolute -top-1 -right-1 w-8 h-8 bg-white/10 rounded-full blur-md group-hover:bg-white/20 transition-colors duration-300"></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-1">
          <div className="text-lg filter drop-shadow-lg">{icon}</div>
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-0.5">
            <div className="w-1 h-1 bg-white rounded-full animate-pulse"></div>
          </div>
        </div>
        <div className="text-lg font-bold text-white mb-0.5 tracking-tight">
          {loading ? (
            <div className="animate-pulse bg-white/30 h-4 w-8 rounded"></div>
          ) : (
            value
          )}
        </div>
        <div className="text-white/90 font-medium text-xs uppercase tracking-wider leading-none">
          {title}
        </div>
      </div>
    </div>
  );

  const QuickActionCard = ({ title, description, icon, to, color, delay, onClick }) => (
    <div
      className={`group cursor-pointer animate-fade-in-up`}
      style={{ animationDelay: `${delay}ms` }}
      onClick={onClick}
    >
      {to ? (
        <Link to={to} className="block">
          <ActionCardContent title={title} description={description} icon={icon} color={color} />
        </Link>
      ) : (
        <ActionCardContent title={title} description={description} icon={icon} color={color} />
      )}
    </div>
  );

  const ActionCardContent = ({ title, description, icon, color }) => (
    <div className={`bg-gradient-to-br ${getColorGradient(color)} p-6 rounded-2xl shadow-xl border border-white/10 backdrop-blur-sm transform group-hover:scale-105 transition-all duration-300 relative overflow-hidden`}>
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="absolute -top-6 -right-6 w-20 h-20 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-colors duration-300"></div>
      <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white/5 rounded-full blur-xl"></div>
      
      <div className="relative z-10">
        <div className="flex items-center space-x-4 mb-3">
          <div className="text-3xl filter drop-shadow-lg transform group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
        </div>
        <h4 className="font-bold text-white text-lg mb-2 tracking-tight">{title}</h4>
        <p className="text-white/80 text-sm leading-relaxed">{description}</p>
        
        {/* Hover arrow */}
        <div className="absolute top-4 right-4 text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all duration-300">
          →
        </div>
      </div>
    </div>
  );

  const getColorGradient = (color) => {
    const gradients = {
      blue: "from-blue-500 via-blue-600 to-cyan-500",
      green: "from-green-500 via-emerald-500 to-teal-500",
      purple: "from-purple-500 via-violet-500 to-pink-500",
      orange: "from-orange-500 via-red-500 to-rose-500",
      cyan: "from-cyan-500 via-blue-500 to-indigo-500",
      pink: "from-pink-500 via-rose-500 to-red-500"
    };
    return gradients[color] || gradients.blue;
  };

  const ActivityItem = ({ activity }) => (
    <div
      className="flex items-center space-x-4 p-4 bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 group"
    >
      <div className="text-2xl group-hover:scale-110 transition-transform duration-300">{activity.icon}</div>
      <div className="flex-1">
        <p className="text-white text-sm font-medium">{activity.title}</p>
        <p className="text-gray-400 text-xs">{activity.time}</p>
      </div>
      <div className="w-2 h-2 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black flex flex-col relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <Navbar />

      <div className="flex-grow container mx-auto px-4 py-8 relative z-10">
        {/* Welcome Section */}
        <div className="mb-12 animate-fade-in">
          <div className="bg-gradient-to-r from-gray-800/50 via-gray-800/30 to-transparent backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50 shadow-2xl">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-cyan-200 to-blue-200 bg-clip-text text-transparent mb-4">
                  {greeting}, {user?.name}! 👋
                </h1>
                <p className="text-gray-300 text-xl font-medium">
                  Welcome to your <span className="text-cyan-400 font-semibold">{user?.role?.toLowerCase()}</span> dashboard
                </p>
                <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between lg:justify-start gap-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2 bg-green-500/20 px-3 py-1 rounded-full">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-green-300 text-sm font-medium">Online</span>
                    </div>
                    <div className="text-gray-400 text-sm">
                      Last login: {new Date().toLocaleDateString()}
                    </div>
                  </div>
                  
                  {/* Mobile refresh button - next to login info */}
                  <div className="sm:block lg:hidden">
                    <button
                      onClick={fetchDashboardData}
                      disabled={loading}
                      className={`group relative px-3 py-2 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white rounded-lg transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105 ${
                        loading ? "opacity-70 cursor-not-allowed" : "hover:border-cyan-400/50"
                      }`}
                    >
                      <span className={`text-lg ${loading ? "animate-spin" : "group-hover:rotate-180"} transition-transform duration-500`}>
                        🔄
                      </span>
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Desktop refresh button - right side */}
              <div className="hidden lg:block mt-4 lg:mt-0">
                <button
                  onClick={fetchDashboardData}
                  disabled={loading}
                  className={`group relative px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white rounded-xl transition-all duration-300 flex items-center space-x-3 shadow-xl hover:shadow-2xl transform hover:scale-105 hover:-translate-y-1 ${
                    loading ? "opacity-70 cursor-not-allowed" : "hover:border-cyan-400/50"
                  }`}
                >
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Content */}
                  <div className="relative z-10 flex items-center space-x-3">
                    <span className={`text-xl ${loading ? "animate-spin" : "group-hover:rotate-180"} transition-transform duration-500`}>
                      🔄
                    </span>
                    <span className="font-semibold tracking-wide">
                      {loading ? "Refreshing..." : "Refresh"}
                    </span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation for Resume & Career Features */}
        {activeTab !== 'overview' && (
          <div className="mb-8 animate-fade-in">
            <div className="flex justify-center">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-2 border border-gray-700/50 shadow-xl">
                <button
                  onClick={() => setActiveTab('overview')}
                  className="px-6 py-3 rounded-xl transition-all duration-300 text-gray-300 hover:text-white hover:bg-gray-700/50 flex items-center space-x-2"
                >
                  <span>←</span>
                  <span>Back to Dashboard</span>
                </button>
                <button
                  onClick={() => setActiveTab('resume')}
                  className={`px-6 py-3 rounded-xl transition-all duration-300 flex items-center space-x-2 ${
                    activeTab === 'resume' 
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg' 
                      : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                  }`}
                >
                  <span>📄</span>
                  <span>Resume Builder</span>
                </button>
                <button
                  onClick={() => setActiveTab('career-coach')}
                  className={`px-6 py-3 rounded-xl transition-all duration-300 flex items-center space-x-2 ${
                    activeTab === 'career-coach' 
                      ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg' 
                      : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                  }`}
                >
                  <span>🤖</span>
                  <span>Career Coach</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Conditional Content Rendering */}
        {activeTab === 'overview' && (
          <>
            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              {/* Stats Cards */}
              <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                <StatCard
                  title="Total Courses"
                  value={stats.totalCourses}
                  icon="📚"
                  color="from-blue-500 via-blue-600 to-cyan-500"
                  delay={0}
                />
                <StatCard
                  title={isInstructor || isAdmin ? "Total Students" : "Enrolled Courses"}
                  value={isInstructor || isAdmin ? stats.totalStudents : stats.enrolledCourses}
                  icon={isInstructor || isAdmin ? "👥" : "📖"}
                  color="from-green-500 via-emerald-500 to-teal-500"
                  delay={100}
                />
                <StatCard
                  title="Completed"
                  value={stats.completedCourses}
                  icon="✅"
                  color="from-purple-500 via-violet-500 to-pink-500"
                  delay={200}
                />
                <StatCard
                  title={isInstructor || isAdmin ? "Available Courses" : "Available Courses"}
                  value={isInstructor || isAdmin ? stats.enrolledCourses : stats.totalCourses}
                  icon="🌟"
                  color="from-orange-500 via-red-500 to-rose-500"
                  delay={300}
                />
              </div>

              {/* Quick Actions or Instructor Application */}
              <div className="space-y-6">
                {/* Show instructor application for students */}
                {!isInstructor && !isAdmin && (
                  <div className="animate-fade-in-up" style={{ animationDelay: "400ms" }}>
                    <InstructorApplication />
                  </div>
                )}
                
                {/* Quick Actions */}
                <div className="animate-fade-in-up" style={{ animationDelay: isInstructor || isAdmin ? "400ms" : "500ms" }}>
                  <div className="bg-gradient-to-br from-gray-800/50 via-gray-800/30 to-transparent backdrop-blur-sm rounded-3xl p-6 border border-gray-700/50 shadow-2xl">
                    <h3 className="text-2xl font-bold text-white mb-6 flex items-center space-x-3">
                      <span className="text-3xl">⚡</span>
                      <span>Quick Actions</span>
                    </h3>
                    <div className="space-y-4">
                      {isInstructor || isAdmin ? (
                        <>
                          <QuickActionCard
                            title="Create Course"
                            description="Start building a new course"
                            icon="➕"
                            to="/courses/create"
                            color="blue"
                            delay={0}
                          />
                          <QuickActionCard
                            title="Manage Courses"
                            description="Edit your existing courses"
                            icon="⚙️"
                            to="/courses"
                            color="green"
                            delay={100}
                          />
                          {isAdmin && (
                            <QuickActionCard
                              title="Admin Panel"
                              description="Manage users and applications"
                              icon="👑"
                              to="/admin"
                              color="purple"
                              delay={200}
                            />
                          )}
                        </>
                      ) : (
                        <>
                          <QuickActionCard
                            title="Browse Courses"
                            description="Discover new learning opportunities"
                            icon="🔍"
                            to="/courses"
                            color="blue"
                            delay={0}
                          />
                          <QuickActionCard
                            title="My Learning"
                            description="Continue your enrolled courses"
                            icon="📖"
                            to="/courses"
                            color="green"
                            delay={100}
                          />
                          <QuickActionCard
                            title="Resume Builder"
                            description="Generate AI-powered resume"
                            icon="📄"
                            color="cyan"
                            delay={200}
                            onClick={() => setActiveTab('resume')}
                          />
                          <QuickActionCard
                            title="Career Coach"
                            description="AI-powered career guidance"
                            icon="🤖"
                            color="pink"
                            delay={300}
                            onClick={() => setActiveTab('career-coach')}
                          />
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Chart Section */}
            <div className="mt-8">
              <div className="bg-gradient-to-br from-gray-800/50 via-gray-800/30 to-transparent backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50 shadow-2xl animate-fade-in-up" style={{ animationDelay: "800ms" }}>
                <h2 className="text-3xl font-bold text-white mb-8 flex items-center space-x-3">
                  <span className="text-4xl">📊</span>
                  <span>Learning Progress</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center group">
                    <div className="relative w-32 h-32 mx-auto mb-6">
                      <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeDasharray="60, 100"
                          className="text-blue-500 drop-shadow-lg group-hover:text-blue-400 transition-colors duration-300"
                        />
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeDasharray="0, 100"
                          className="text-gray-600"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl font-bold text-white">60%</span>
                      </div>
                    </div>
                    <p className="text-gray-300 font-semibold text-lg">Course Completion</p>
                  </div>
                  <div className="text-center group">
                    <div className="relative w-32 h-32 mx-auto mb-6">
                      <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeDasharray="75, 100"
                          className="text-green-500 drop-shadow-lg group-hover:text-green-400 transition-colors duration-300"
                        />
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeDasharray="0, 100"
                          className="text-gray-600"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl font-bold text-white">75%</span>
                      </div>
                    </div>
                    <p className="text-gray-300 font-semibold text-lg">Weekly Goal</p>
                  </div>
                  <div className="text-center group">
                    <div className="relative w-32 h-32 mx-auto mb-6">
                      <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeDasharray="90, 100"
                          className="text-purple-500 drop-shadow-lg group-hover:text-purple-400 transition-colors duration-300"
                        />
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeDasharray="0, 100"
                          className="text-gray-600"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl font-bold text-white">90%</span>
                      </div>
                    </div>
                    <p className="text-gray-300 font-semibold text-lg">Engagement</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="mt-8">
              <div className="bg-gradient-to-br from-gray-800/50 via-gray-800/30 to-transparent backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50 shadow-2xl animate-fade-in-up" style={{ animationDelay: "1000ms" }}>
                <h2 className="text-3xl font-bold text-white mb-8 flex items-center space-x-3">
                  <span className="text-4xl">🔔</span>
                  <span>Recent Activity</span>
                </h2>
                <div className="space-y-4">
                  {stats.recentActivity.length > 0 ? (
                    stats.recentActivity.map((activity, index) => (
                      <ActivityItem key={index} activity={activity} />
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <div className="text-6xl mb-4">📝</div>
                      <p className="text-gray-400 text-lg">No recent activity</p>
                      <p className="text-gray-500 text-sm">Start learning to see your progress here!</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'resume' && <ResumeBuilder />}
        {activeTab === 'career-coach' && <CareerCoach />}
      </div>

      {/* Footer */}
      <footer className="relative bg-gray-900/80 backdrop-blur-sm text-white py-16 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                NextEra
              </h3>
              <p className="text-gray-400 mb-6">
                Empowering developers worldwide with cutting-edge education and hands-on experience.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                  <span className="text-white font-bold">f</span>
                </a>
                <a href="#" className="w-10 h-10 bg-sky-500 rounded-full flex items-center justify-center hover:bg-sky-600 transition-colors">
                  <span className="text-white font-bold">t</span>
                </a>
                <a href="#" className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center hover:bg-blue-800 transition-colors">
                  <span className="text-white font-bold">in</span>
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Courses</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/courses" className="hover:text-cyan-400 transition-colors">Full Stack Development</Link></li>
                <li><Link to="/courses" className="hover:text-cyan-400 transition-colors">AI & Machine Learning</Link></li>
                <li><Link to="/courses" className="hover:text-cyan-400 transition-colors">DevOps & Cloud</Link></li>
                <li><Link to="/courses" className="hover:text-cyan-400 transition-colors">Mobile Development</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/about" className="hover:text-cyan-400 transition-colors">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-cyan-400 transition-colors">Contact</Link></li>
                <li><Link to="/careers" className="hover:text-cyan-400 transition-colors">Careers</Link></li>
                <li><Link to="/blog" className="hover:text-cyan-400 transition-colors">Blog</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/help" className="hover:text-cyan-400 transition-colors">Help Center</Link></li>
                <li><Link to="/community" className="hover:text-cyan-400 transition-colors">Community</Link></li>
                <li><Link to="/privacy" className="hover:text-cyan-400 transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-cyan-400 transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-gray-400 mb-4 md:mb-0">
                <p>
                  &copy; {new Date().getFullYear()} NextEra. Developed &
                  Designed by &nbsp;
                  <a
                    href="https://khyruddin-hashanulla.github.io/MY-PORTFOLIO/"
                    target="_blank"
                    className="text-blue-400 hover:text-blue-600 transition-colors duration-200"
                  >
                    Khyruddin Hashanulla
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
