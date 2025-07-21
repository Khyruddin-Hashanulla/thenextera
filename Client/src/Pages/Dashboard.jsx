import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
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

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title={isInstructor || isAdmin ? "My Courses" : "Available Courses"}
            value={stats.totalCourses}
            icon="📚"
            color="bg-linear-to-r from-green-500 via-emerald-500 to-teal-500"
            delay={100}
          />
          <StatCard
            title={
              isInstructor || isAdmin ? "Total Students" : "Enrolled Courses"
            }
            value={
              isInstructor || isAdmin
                ? stats.totalStudents
                : stats.enrolledCourses
            }
            icon={isInstructor || isAdmin ? "👥" : "🎓"}
            color="bg-linear-to-r from-red-200 via-rose-400 to-pink-600"
            delay={200}
          />
          <StatCard
            title="Completed"
            value={stats.completedCourses}
            icon="✅"
            color="bg-linear-to-r from-blue-500 via-cyan-500 to-teal-500"
            delay={300}
          />
          <StatCard
            title="Progress"
            value={`${Math.round(
              (stats.completedCourses / Math.max(stats.totalCourses, 1)) * 100
            )}%`}
            icon="📈"
            color="bg-linear-to-r from-gray-700 via-rose-500 to-orange-400"
            delay={400}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <div
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 animate-fade-in-up"
              style={{ animationDelay: "500ms" }}
            >
              <h2 className="text-2xl font-bold text-white mb-6">
                Quick Actions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <QuickActionCard
                  title="Browse Courses"
                  description="Explore available courses"
                  icon="🔍"
                  to="/courses"
                  color="bg-blue-600"
                  delay={600}
                />
                {(isInstructor || isAdmin) && (
                  <QuickActionCard
                    title="Create Course"
                    description="Share your knowledge"
                    icon="➕"
                    to="/courses/create"
                    color="bg-green-600"
                    delay={700}
                  />
                )}
                <QuickActionCard
                  title="My Profile"
                  description="Update your information"
                  icon="👤"
                  to="/profile"
                  color="bg-purple-600"
                  delay={800}
                />
                <QuickActionCard
                  title="Settings"
                  description="Customize your experience"
                  icon="⚙️"
                  to="/settings"
                  color="bg-gray-600"
                  delay={900}
                />
              </div>
            </div>
          </div>

          {/* Recent Activity & Profile */}
          <div className="space-y-6">
            {/* Profile Card */}
            <div
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 animate-fade-in-up"
              style={{ animationDelay: "600ms" }}
            >
              <h3 className="text-xl font-bold text-white mb-4">Profile</h3>
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-2xl font-bold text-white">
                  {user?.name?.charAt(0)?.toUpperCase()}
                </div>
                <div>
                  <h4 className="text-white font-semibold">{user?.name}</h4>
                  <p className="text-gray-400 text-sm">{user?.email}</p>
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      user?.role === "Admin"
                        ? "bg-red-500/20 text-red-300"
                        : user?.role === "Instructor"
                        ? "bg-green-500/20 text-green-300"
                        : "bg-blue-500/20 text-blue-300"
                    }`}
                  >
                    {user?.role}
                  </span>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              >
                Logout
              </button>
            </div>

            {/* Recent Activity */}
            <div
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 animate-fade-in-up"
              style={{ animationDelay: "700ms" }}
            >
              <h3 className="text-xl font-bold text-white mb-4">
                Recent Activity
              </h3>
              <div className="space-y-3">
                {stats.recentActivity.length > 0 ? (
                  stats.recentActivity.map((activity, index) => (
                    <ActivityItem
                      key={activity.id}
                      activity={activity}
                      delay={800 + index * 100}
                    />
                  ))
                ) : (
                  <p className="text-gray-400 text-sm">No recent activity</p>
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
