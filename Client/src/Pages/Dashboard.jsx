import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import InstructorApplication from "../components/InstructorApplication";
import api from "../utils/api";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, isInstructor, isAdmin, logout } = useAuth();
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

  const StatCard = ({ title, value, icon, color, delay = 0 }) => (
    <div
      className={`bg-gradient-to-br ${color} rounded-xl p-6 text-white transform transition-all duration-300 shadow-lg hover:shadow-xl animate-fade-in-up`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white/80 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold mt-2">{loading ? "..." : value}</p>
        </div>
        <div className="text-4xl opacity-80">{icon}</div>
      </div>
    </div>
  );

  const QuickActionCard = ({
    title,
    description,
    icon,
    to,
    color,
    delay = 0,
  }) => (
    <Link
      to={to}
      className={`block bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:bg-gray-700/50 transition-all duration-300 transform hover:scale-105 hover:shadow-xl animate-fade-in-up`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center space-x-4">
        <div
          className={`w-12 h-12 ${color} rounded-lg flex items-center justify-center text-2xl`}
        >
          {icon}
        </div>
        <div>
          <h3 className="text-white font-semibold">{title}</h3>
          <p className="text-gray-400 text-sm">{description}</p>
        </div>
      </div>
    </Link>
  );

  const ActivityItem = ({ activity, delay = 0 }) => (
    <div
      className="flex items-center space-x-3 p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors animate-fade-in-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="text-2xl">{activity.icon}</div>
      <div className="flex-1">
        <p className="text-white text-sm">{activity.title}</p>
        <p className="text-gray-400 text-xs">{activity.time}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[linear-gradient(1deg,_rgba(34,143,186,1)_0%,_rgba(0,0,0,1)_69%,_rgba(0,0,0,1)_100%)] flex flex-col">
      <Navbar />

      <div className="flex-grow container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                {greeting}, {user?.name}! 👋
              </h1>
              <p className="text-gray-300 text-lg">
                Welcome to your {user?.role?.toLowerCase()} dashboard
              </p>
            </div>
            <button
              onClick={fetchDashboardData}
              disabled={loading}
              className={`px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center space-x-2 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <span className={loading ? "animate-spin" : ""}>🔄</span>
              <span>{loading ? "Refreshing..." : "Refresh"}</span>
            </button>
          </div>
        </div>

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
              <h3 className="text-xl font-semibold text-white mb-4">Quick Actions</h3>
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
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Progress Chart Section */}
        <div className="mt-8">
          <div
            className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 animate-fade-in-up"
            style={{ animationDelay: "800ms" }}
          >
            <h2 className="text-2xl font-bold text-white mb-6">
              Learning Progress
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <svg
                    className="w-24 h-24 transform -rotate-90"
                    viewBox="0 0 36 36"
                  >
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeDasharray="60, 100"
                      className="text-blue-500 animate-pulse-slow"
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
                    <span className="text-xl font-bold text-white">60%</span>
                  </div>
                </div>
                <p className="text-gray-300">Course Completion</p>
              </div>
              <div className="text-center">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <svg
                    className="w-24 h-24 transform -rotate-90"
                    viewBox="0 0 36 36"
                  >
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeDasharray="75, 100"
                      className="text-green-500 animate-pulse-slow"
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
                    <span className="text-xl font-bold text-white">75%</span>
                  </div>
                </div>
                <p className="text-gray-300">Weekly Goal</p>
              </div>
              <div className="text-center">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <svg
                    className="w-24 h-24 transform -rotate-90"
                    viewBox="0 0 36 36"
                  >
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeDasharray="90, 100"
                      className="text-purple-500 animate-pulse-slow"
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
                    <span className="text-xl font-bold text-white">90%</span>
                  </div>
                </div>
                <p className="text-gray-300">Engagement</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {/* Custom CSS for animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.6s ease-out;
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out both;
        }

        .animate-pulse-slow {
          animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
