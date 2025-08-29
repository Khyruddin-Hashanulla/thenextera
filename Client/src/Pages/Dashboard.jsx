import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import InstructorApplication from "../components/InstructorApplication";
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
      className={`group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl hover:shadow-cyan-500/25 transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 overflow-hidden animate-fade-in-up h-48`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Floating orbs */}
      <div className="absolute -top-2 -right-2 w-12 h-12 bg-gradient-to-br from-cyan-400/20 to-blue-600/20 rounded-full blur-lg group-hover:scale-125 transition-transform duration-500"></div>
      <div className="absolute -bottom-1 -left-1 w-8 h-8 bg-gradient-to-br from-purple-400/15 to-pink-600/15 rounded-full blur-md group-hover:scale-110 transition-transform duration-300"></div>
      
      {/* Animated border */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
      
      <div className="relative z-10 h-full flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="text-3xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 filter drop-shadow-lg">
              {icon}
            </div>
            <div className="flex space-x-1">
              <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse"></div>
              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
          
          <div className="text-3xl font-bold text-white mb-2 tracking-tight">
            {loading ? (
              <div className="animate-pulse bg-gradient-to-r from-white/20 to-white/40 h-8 w-16 rounded"></div>
            ) : (
              <span className="bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
                {value}
              </span>
            )}
          </div>
          
          <div className="text-white/80 font-medium text-sm uppercase tracking-wider">
            {title}
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="mt-4 w-full bg-white/10 rounded-full h-1 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transform origin-left scale-x-75 group-hover:scale-x-100 transition-transform duration-700"></div>
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
    <div className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 shadow-lg hover:shadow-xl hover:shadow-cyan-500/20 transform hover:scale-101 hover:-translate-y-0.2 transition-all duration-300 overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {/* Floating particles */}
      <div className="absolute top-2 right-2 w-2 h-2 bg-cyan-400/60 rounded-full animate-bounce"></div>
      <div className="absolute bottom-3 left-3 w-1.5 h-1.5 bg-purple-400/60 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <div className="text-2xl transform group-hover:scale-105 group-hover:rotate-2 transition-all duration-300 filter drop-shadow-lg">
            {icon}
          </div>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-6 h-6 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">→</span>
            </div>
          </div>
        </div>
        
        <h4 className="font-bold text-white text-base mb-1 tracking-tight group-hover:text-cyan-200 transition-colors duration-300">
          {title}
        </h4>
        <p className="text-white/70 text-sm leading-relaxed group-hover:text-white/90 transition-colors duration-300">
          {description}
        </p>
      </div>
    </div>
  );

  const ActivityItem = ({ activity, index }) => (
    <div
      className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-3 hover:bg-white/10 transition-all duration-300 transform hover:scale-102 hover:-translate-y-0.5 animate-fade-in-up"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Glow effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
      
      <div className="relative z-10 flex items-center space-x-3">
        <div className="text-lg transform group-hover:scale-105 transition-transform duration-300">
          {activity.icon}
        </div>
        <div className="flex-1">
          <p className="text-white text-sm font-medium group-hover:text-cyan-200 transition-colors duration-300">
            {activity.title}
          </p>
          <p className="text-gray-400 text-xs group-hover:text-gray-300 transition-colors duration-300">
            {activity.time}
          </p>
        </div>
        <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 animate-pulse"></div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/30 flex flex-col relative overflow-hidden">
      {/* Enhanced animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-gradient-to-br from-purple-500/15 to-pink-600/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
        
        {/* Floating particles */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-cyan-400/30 rounded-full animate-bounce"></div>
        <div className="absolute top-40 right-32 w-1.5 h-1.5 bg-purple-400/30 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-1/3 w-1 h-1 bg-blue-400/30 rounded-full animate-bounce" style={{ animationDelay: '2s' }}></div>
      </div>

      <Navbar />

      <div className="flex-grow container mx-auto px-4 py-4 pt-32 relative z-10">
        {/* Enhanced Welcome Section */}
        <div className="mb-4 animate-fade-in">
          <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-4 shadow-xl overflow-hidden">
            {/* Animated background pattern */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/5 to-purple-500/10"></div>
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500"></div>
            
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white via-cyan-200 to-blue-200 bg-clip-text text-transparent mb-2 animate-pulse">
                  {greeting}, {user?.name}! 
                  <span className="inline-block animate-bounce ml-2">👋</span>
                </h1>
                <p className="text-gray-300 text-lg font-medium mb-3">
                  Welcome to your <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 font-bold">{user?.role?.toLowerCase()}</span> dashboard
                </p>
                
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center space-x-2 bg-green-500/20 backdrop-blur-sm px-3 py-1.5 rounded-full border border-green-400/30">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-green-300 text-sm font-medium">Online</span>
                  </div>
                  <div className="text-gray-400 text-sm bg-white/5 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    Last login: {new Date().toLocaleDateString()}
                  </div>
                </div>
              </div>
              
              {/* Enhanced refresh button */}
              <div className="mt-3 lg:mt-0">
                <button
                  onClick={fetchDashboardData}
                  disabled={loading}
                  className={`group relative px-6 py-3 bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 text-white rounded-xl transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-cyan-500/25 transform hover:scale-105 hover:-translate-y-0.5 ${
                    loading ? "opacity-70 cursor-not-allowed" : "hover:border-cyan-400/50"
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="relative z-10 flex items-center space-x-2">
                    <span className={`text-lg ${loading ? "animate-spin" : "group-hover:rotate-180"} transition-transform duration-500`}>
                      🔄
                    </span>
                    <span className="font-semibold tracking-wide text-sm">
                      {loading ? "Refreshing..." : "Refresh"}
                    </span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats and Actions Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          {/* Stats Cards */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="animate-fade-in-up" style={{ animationDelay: "100ms" }}>
                <StatCard
                  title="Total Courses"
                  value={stats.totalCourses}
                  icon="📚"
                  color="blue"
                  delay={100}
                />
              </div>
              <div className="animate-fade-in-up" style={{ animationDelay: "200ms" }}>
                <StatCard
                  title={isInstructor || isAdmin ? "Total Students" : "Enrolled Courses"}
                  value={isInstructor || isAdmin ? stats.totalStudents : stats.enrolledCourses}
                  icon={isInstructor || isAdmin ? "👥" : "📖"}
                  color="green"
                  delay={200}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="animate-fade-in-up" style={{ animationDelay: "300ms" }}>
                <StatCard
                  title="Completed"
                  value={stats.completedCourses}
                  icon="✅"
                  color="purple"
                  delay={300}
                />
              </div>
              <div className="animate-fade-in-up" style={{ animationDelay: "400ms" }}>
                <StatCard
                  title="Available Courses"
                  value={stats.totalCourses - stats.enrolledCourses}
                  icon="🌟"
                  color="orange"
                  delay={400}
                />
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {/* Instructor Application */}
            {!isInstructor && !isAdmin && (
              <div className="animate-fade-in-up" style={{ animationDelay: "400ms" }}>
                <InstructorApplication />
              </div>
            )}
            
            {/* Quick Actions */}
            <div className="animate-fade-in-up" style={{ animationDelay: isInstructor || isAdmin ? "400ms" : "500ms" }}>
              <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-4 shadow-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5"></div>
                
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-3">
                    <span className="text-2xl animate-bounce">⚡</span>
                    <span className="bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">Quick Actions</span>
                  </h3>
                  
                  <div className="space-y-3">
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
                          <>
                            <QuickActionCard
                              title="Admin Panel"
                              description="Manage users and applications"
                              icon="👑"
                              to="/admin"
                              color="purple"
                              delay={200}
                            />
                            <QuickActionCard
                              title="Core Subjects"
                              description="Manage core subjects and topics"
                              icon="📚"
                              to="/admin/subjects"
                              color="cyan"
                              delay={300}
                            />
                          </>
                        )}
                      </>
                    ) : (
                      <>
                        <QuickActionCard
                          title="Core Subjects"
                          description="Access programming fundamentals"
                          icon="🧠"
                          to="/core-subjects"
                          color="orange"
                          delay={0}
                        />
                        <QuickActionCard
                          title="Browse Courses"
                          description="Discover new learning opportunities"
                          icon="🔍"
                          to="/courses"
                          color="cyan"
                          delay={100}
                        />
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Progress Charts */}
        <div className="mb-4">
          <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-4 shadow-xl overflow-hidden animate-fade-in-up" style={{ animationDelay: "800ms" }}>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5"></div>
            
            <div className="relative z-10">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center space-x-2">
                <span className="text-3xl animate-pulse">📊</span>
                <span className="bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">Learning Progress</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { percentage: 60, label: "Course Completion", color: "text-blue-500", delay: "0ms" },
                  { percentage: 75, label: "Weekly Goal", color: "text-green-500", delay: "200ms" },
                  { percentage: 90, label: "Engagement", color: "text-purple-500", delay: "400ms" }
                ].map((item, index) => (
                  <div key={index} className="text-center group animate-fade-in-up" style={{ animationDelay: item.delay }}>
                    <div className="relative w-24 h-24 mx-auto mb-2">
                      <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 36 36">
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeDasharray={`${item.percentage}, 100`}
                          className={`${item.color} drop-shadow-lg group-hover:drop-shadow-xl transition-all duration-300`}
                        />
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeDasharray="0, 100"
                          className="text-gray-700"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-lg font-bold text-white group-hover:scale-105 transition-transform duration-300">
                          {item.percentage}%
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-300 font-semibold text-sm group-hover:text-gray-300 transition-colors duration-300">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Learning Streak & Achievements section */}
        <div className="mb-4">
          <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-4 shadow-xl overflow-hidden animate-fade-in-up" style={{ animationDelay: "900ms" }}>
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-blue-500/5"></div>
            
            <div className="relative z-10">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center space-x-2">
                <span className="text-3xl animate-pulse">🎯</span>
                <span className="bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">Learning Streak & Achievements</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Learning Streak */}
                <div className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all duration-300 transform hover:scale-102">
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-500/20 to-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                  <div className="relative z-10 text-center">
                    <div className="text-4xl mb-2">🔥</div>
                    <div className="text-2xl font-bold text-white mb-1">7</div>
                    <div className="text-gray-300 text-sm">Day Streak</div>
                  </div>
                </div>

                {/* Badges Earned */}
                <div className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all duration-300 transform hover:scale-102">
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-yellow-500/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                  <div className="relative z-10 text-center">
                    <div className="text-4xl mb-2">🏆</div>
                    <div className="text-2xl font-bold text-white mb-1">3</div>
                    <div className="text-gray-300 text-sm">Badges Earned</div>
                  </div>
                </div>

                {/* Hours Learned */}
                <div className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all duration-300 transform hover:scale-102">
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                  <div className="relative z-10 text-center">
                    <div className="text-4xl mb-2">⏰</div>
                    <div className="text-2xl font-bold text-white mb-1">24</div>
                    <div className="text-gray-300 text-sm">Hours This Month</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Continue Learning section */}
        <div className="mb-4">
          <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-4 shadow-xl overflow-hidden animate-fade-in-up" style={{ animationDelay: "950ms" }}>
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5"></div>
            
            <div className="relative z-10">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center space-x-2">
                <span className="text-3xl animate-pulse">📚</span>
                <span className="bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">Continue Learning</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Sample Course Cards */}
                {[
                  { title: "JavaScript Fundamentals", progress: 65, icon: "🟨", color: "yellow" },
                  { title: "React Development", progress: 40, icon: "⚛️", color: "blue" },
                  { title: "Node.js Backend", progress: 80, icon: "🟢", color: "green" }
                ].map((course, index) => (
                  <div key={index} className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all duration-300 transform hover:scale-102 cursor-pointer">
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-3">
                        <div className="text-2xl">{course.icon}</div>
                        <div className="text-xs text-gray-400 bg-white/10 px-2 py-1 rounded-full">
                          {course.progress}%
                        </div>
                      </div>
                      <h3 className="text-white font-semibold mb-2 group-hover:text-cyan-200 transition-colors">
                        {course.title}
                      </h3>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-500`}
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Recent Activity */}
        <div>
          <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-4 shadow-xl overflow-hidden animate-fade-in-up" style={{ animationDelay: "1000ms" }}>
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5"></div>
            
            <div className="relative z-10">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center space-x-2">
                <span className="text-3xl animate-pulse">🔔</span>
                <span className="bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">Recent Activity</span>
              </h2>
              
              <div className="space-y-3">
                {stats.recentActivity.length > 0 ? (
                  stats.recentActivity.map((activity, index) => (
                    <ActivityItem key={index} activity={activity} index={index} />
                  ))
                ) : (
                  <div className="text-center py-4 animate-fade-in">
                    <div className="text-5xl mb-2 animate-bounce">📝</div>
                    <p className="text-gray-400 text-lg font-medium mb-1">No recent activity</p>
                    <p className="text-gray-500 text-sm">Start learning to see your progress here!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Dashboard;
