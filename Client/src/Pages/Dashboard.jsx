import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import InstructorApplication from "../components/InstructorApplication";
import api from "../utils/api";
import ProgressManager from "../CoreSubjects/ProgressManager";
import { DBMS_TOPICS } from "../CoreSubjects/DBMS";
import { OS_TOPICS } from "../CoreSubjects/OS";
import { CN_TOPICS } from "../CoreSubjects/CN";
import { OOP_TOPICS } from "../CoreSubjects/OOP";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, isInstructor, isAdmin, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [stats, setStats] = useState({
    totalCourses: 0,
    enrolledCourses: 0,
    completedCourses: 0,
    instructorCourses: 0,
    totalStudents: 0,
    recentActivity: [],
    dsaProgress: 0,
    coreSubjectsProgress: {},
    overallCoreProgress: 0,
  });
  const [courseStats, setCourseStats] = useState({
    totalCourses: 0,
    enrolledCourses: 0,
    completedCourses: 0,
    instructorCourses: 0,
  });
  const [coreSubjectsStats, setCoreSubjectsStats] = useState({
    totalTopics: 0,
    completedTopics: 0,
    totalProgress: 0,
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [greeting, setGreeting] = useState("");
  const [dsaStats, setDsaStats] = useState({
    totalProblems: 0,
    completedProblems: 0,
    bookmarkedProblems: 0,
    currentStreak: 0,
    maxStreak: 0,
    difficultyStats: {
      Easy: { completed: 0, total: 0 },
      Medium: { completed: 0, total: 0 },
      Hard: { completed: 0, total: 0 },
    },
  });
  const [dsaActivity, setDsaActivity] = useState([]);
  const [careerInsights, setCareerInsights] = useState({
    currentLevel: "Beginner",
    recommendedSkills: [],
    careerPath: "",
    nextMilestone: "",
    completionRate: 0,
    suggestedCourses: [],
  });
  const [lastUpdated, setLastUpdated] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showInstructorApp, setShowInstructorApp] = useState(false);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 17) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");

    fetchDashboardData();
    fetchCoreSubjectsProgress();

    const handleFocus = () => {
      fetchDashboardData();
      fetchCoreSubjectsProgress();
    };

    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [user?.userId, user?._id]);

  useEffect(() => {
    if (user) {
      fetchDashboardData();

      // Set up real-time progress tracking
      const progressInterval = setInterval(() => {
        refreshProgressData();
      }, 30000); // Refresh every 30 seconds

      return () => clearInterval(progressInterval);
    }
  }, [user]);

  const fetchCoreSubjectsProgress = async () => {
    if (!user) return;

    try {
      // Fetch real subjects data from backend API
      const response = await api.get("/api/subjects");
      if (response.data.success && response.data.subjects.length > 0) {
        const subjects = response.data.subjects;

        // Calculate real progress from backend data
        const progress = {};
        let totalProgress = 0;
        let totalTopics = 0;
        let completedTopics = 0;

        subjects.forEach((subject) => {
          const subjectProgress = {
            name: subject.name,
            percentage: subject.progress || 0,
            completed: Math.round(((subject.progress || 0) / 100) * 10), // Estimate completed topics
            total: 10, // Default topics per subject
            icon: subject.icon,
          };

          progress[subject.id] = subjectProgress;
          totalProgress += subjectProgress.percentage;
          totalTopics += subjectProgress.total;
          completedTopics += subjectProgress.completed;
        });

        // Update core subjects stats
        setCoreSubjectsStats({
          totalTopics,
          completedTopics,
          totalProgress: Math.round(totalProgress / subjects.length),
        });

        setStats((prev) => ({
          ...prev,
          coreSubjectsProgress: progress,
          overallCoreProgress: Math.round(totalProgress / subjects.length),
        }));
        return; // Exit early if API data is successful
      }
    } catch (error) {
      console.error("Error fetching core subjects progress:", error);
    }

    // Always use fallback data if API fails or returns no data
    const topicsMap = {
      1: { name: "DBMS", icon: "🗄️", topics: DBMS_TOPICS },
      2: { name: "Operating Systems", icon: "💻", topics: OS_TOPICS },
      3: { name: "Computer Networks", icon: "🌐", topics: CN_TOPICS },
      4: { name: "OOP Concepts", icon: "🔧", topics: OOP_TOPICS },
    };

    const progress = {};
    let totalProgress = 0;
    let totalTopics = 0;
    let completedTopics = 0;

    Object.keys(topicsMap).forEach((subjectId) => {
      const subjectData = topicsMap[subjectId];
      const subjectProgress = ProgressManager.getSubjectProgress(
        parseInt(subjectId),
        subjectData.topics
      );

      // Enhanced progress object with name and icon
      const enhancedProgress = {
        ...subjectProgress,
        name: subjectData.name,
        icon: subjectData.icon,
      };

      progress[subjectId] = enhancedProgress;
      totalProgress += enhancedProgress.percentage;
      totalTopics += enhancedProgress.total;
      completedTopics += enhancedProgress.completed;
    });

    // Update core subjects stats
    setCoreSubjectsStats({
      totalTopics,
      completedTopics,
      totalProgress: Math.round(totalProgress / 4),
    });

    setStats((prev) => ({
      ...prev,
      coreSubjectsProgress: progress,
      overallCoreProgress: Math.round(totalProgress / 4),
    }));
  };

  const generateCareerInsights = (courses, dsaStats, coreSubjectsStats) => {
    // Calculate course completion rate
    const enrolledCourses = courses.filter((course) =>
      course.enrolledStudents?.includes(user.id)
    ).length;
    const completedCourses = courses.filter((course) =>
      course.completedStudents?.includes(user.id)
    ).length;

    const totalCourseProgress =
      enrolledCourses > 0 ? (completedCourses / enrolledCourses) * 100 : 0;
    const dsaProgress =
      dsaStats.totalProblems > 0
        ? (dsaStats.completedProblems / dsaStats.totalProblems) * 100
        : 0;
    const coreProgress =
      coreSubjectsStats.totalTopics > 0
        ? (coreSubjectsStats.completedTopics / coreSubjectsStats.totalTopics) *
          100
        : 0;

    const overallProgress =
      (totalCourseProgress + dsaProgress + coreProgress) / 3;

    // Determine current level
    let currentLevel = "Beginner";
    let careerPath = "Software Developer";
    let nextMilestone = "Complete basic programming fundamentals";

    if (overallProgress >= 80) {
      currentLevel = "Advanced";
      nextMilestone = "Apply for senior developer positions";
    } else if (overallProgress >= 50) {
      currentLevel = "Intermediate";
      nextMilestone = "Build portfolio projects and practice system design";
    } else if (overallProgress >= 20) {
      currentLevel = "Beginner+";
      nextMilestone = "Master data structures and algorithms";
    }

    // Generate skill recommendations based on progress
    const recommendedSkills = [];
    if (dsaProgress < 30) {
      recommendedSkills.push({
        skill: "Data Structures",
        priority: "High",
        progress: Math.round(dsaProgress),
      });
    }
    if (coreProgress < 40) {
      recommendedSkills.push({
        skill: "System Design",
        priority: "Medium",
        progress: Math.round(coreProgress),
      });
    }
    if (totalCourseProgress < 50) {
      recommendedSkills.push({
        skill: "Full Stack Development",
        priority: "High",
        progress: Math.round(totalCourseProgress),
      });
    }

    // Add trending skills
    recommendedSkills.push(
      {
        skill: "React.js",
        priority: "High",
        progress: Math.floor(Math.random() * 60) + 20,
      },
      {
        skill: "Node.js",
        priority: "Medium",
        progress: Math.floor(Math.random() * 50) + 30,
      },
      {
        skill: "Cloud Computing",
        priority: "Medium",
        progress: Math.floor(Math.random() * 40) + 10,
      }
    );

    // Suggest relevant courses
    const suggestedCourses = [
      {
        title: "Advanced React Patterns",
        type: "Frontend",
        difficulty: "Intermediate",
      },
      {
        title: "System Design Fundamentals",
        type: "Backend",
        difficulty: "Advanced",
      },
      {
        title: "Database Optimization",
        type: "Database",
        difficulty: "Intermediate",
      },
    ];

    return {
      currentLevel,
      recommendedSkills: recommendedSkills.slice(0, 4),
      careerPath,
      nextMilestone,
      completionRate: Math.round(overallProgress),
      suggestedCourses,
    };
  };

  const generateRecentActivity = (courses) => {
    const activities = [];
    courses.slice(0, 3).forEach((course) => {
      activities.push({
        type: "course",
        title: `Enrolled in ${course.title}`,
        time: "2 hours ago",
        icon: "",
      });
    });

    // Add some DSA activities
    activities.push(
      {
        type: "dsa",
        title: "Completed Binary Search problem",
        time: "1 day ago",
        icon: "",
      },
      {
        type: "achievement",
        title: "Earned Problem Solver badge",
        time: "3 days ago",
        icon: "",
      }
    );

    return activities;
  };

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await api.get("/api/courses");
      const courses = response.data;

      // Calculate stats
      const totalCourses = courses.length;
      const enrolledCourses = courses.filter((course) =>
        course.enrolledStudents?.includes(user.id)
      ).length;
      const completedCourses = courses.filter((course) =>
        course.completedStudents?.includes(user.id)
      ).length;

      setCourseStats({
        totalCourses,
        enrolledCourses,
        completedCourses,
        instructorCourses:
          user.role === "Instructor"
            ? courses.filter((course) => course.instructor._id === user.id)
                .length
            : 0,
      });

      setStats((prev) => ({
        ...prev,
        totalCourses,
        enrolledCourses,
        completedCourses,
        instructorCourses:
          user.role === "Instructor"
            ? courses.filter((course) => course.instructor._id === user.id)
                .length
            : 0,
        recentActivity: generateRecentActivity(courses),
      }));

      // Fetch DSA statistics
      await fetchDSAStats();

      // Calculate Core Subjects progress
      const coreSubjectsProgress = await calculateCoreSubjectsProgress();
      setCoreSubjectsStats(coreSubjectsProgress);
      setStats((prev) => ({
        ...prev,
        coreSubjectsProgress: coreSubjectsProgress.subjects,
        overallCoreProgress: coreSubjectsProgress.totalProgress,
      }));

      // Generate career insights after we have all the data
      setTimeout(() => {
        const insights = generateCareerInsights(
          courses,
          dsaStats,
          coreSubjectsProgress
        );
        setCareerInsights(insights);
      }, 100);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDSAStats = async () => {
    try {
      console.log('🔍 Fetching DSA stats...');
      
      // Fetch DSA statistics
      const statsResponse = await api.get("/api/dsa/progress/stats");
      console.log('📊 DSA Stats Response:', statsResponse.data);
      
      if (statsResponse.data.success && statsResponse.data.stats) {
        const stats = statsResponse.data.stats;
        console.log('📈 Setting DSA stats:', stats);
        
        // Ensure difficultyStats has the correct structure
        const formattedStats = {
          ...stats,
          difficultyStats: stats.difficultyStats || {
            Easy: { completed: 0, total: 0 },
            Medium: { completed: 0, total: 0 },
            Hard: { completed: 0, total: 0 },
          }
        };
        
        console.log('📊 Formatted DSA stats:', formattedStats);
        setDsaStats(formattedStats);
      } else {
        console.warn('⚠️ No DSA stats data received, using fallback');
        throw new Error("No DSA stats data received");
      }

      // Fetch DSA activity data
      const activityResponse = await api.get("/api/dsa/progress/activity");
      if (activityResponse.data.success) {
        setDsaActivity(activityResponse.data.activity || []);
      }
    } catch (error) {
      console.error("❌ Error fetching DSA stats:", error);

      // Only use fallback data if there's a real error, not just empty data
      const fallbackStats = {
        totalProblems: 0,
        completedProblems: 0,
        bookmarkedProblems: 0,
        currentStreak: 0,
        maxStreak: 0,
        difficultyStats: {
          Easy: { completed: 0, total: 0 },
          Medium: { completed: 0, total: 0 },
          Hard: { completed: 0, total: 0 },
        },
      };

      console.log('📊 Using fallback DSA stats:', fallbackStats);
      setDsaStats(fallbackStats);

      // Generate realistic activity data for the last 49 days
      const activityData = [];
      const today = new Date();
      for (let i = 48; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const level =
          Math.random() > 0.7 ? Math.floor(Math.random() * 4) + 1 : 0;
        activityData.push({
          date: date.toISOString().split("T")[0],
          count: level > 0 ? level : 0,
          level: level,
        });
      }
      setDsaActivity(activityData);
    }
  };

  const calculateCoreSubjectsProgress = async () => {
    try {
      // Fetch real subjects data from backend API
      const response = await api.get("/api/subjects");
      if (response.data.success && response.data.subjects.length > 0) {
        const subjects = response.data.subjects;

        const progress = {};
        let totalProgress = 0;
        let totalTopics = 0;
        let completedTopics = 0;

        subjects.forEach((subject) => {
          const subjectProgress = {
            name: subject.name,
            percentage: subject.progress || 0,
            completed: Math.round(((subject.progress || 0) / 100) * 10),
            total: 10,
            icon: subject.icon,
          };

          progress[subject.id] = subjectProgress;
          totalProgress += subjectProgress.percentage;
          totalTopics += subjectProgress.total;
          completedTopics += subjectProgress.completed;
        });

        return {
          totalTopics,
          completedTopics,
          totalProgress: Math.round(totalProgress / subjects.length),
          subjects: progress,
        };
      }
    } catch (error) {
      console.error("Error calculating core subjects progress:", error);
    }

    // Always use fallback data if API fails or returns no data
    const topicsMap = {
      1: { name: "DBMS", icon: "🗄️", topics: DBMS_TOPICS },
      2: { name: "Operating Systems", icon: "💻", topics: OS_TOPICS },
      3: { name: "Computer Networks", icon: "🌐", topics: CN_TOPICS },
      4: { name: "OOP Concepts", icon: "🔧", topics: OOP_TOPICS },
    };

    const progress = {};
    let totalProgress = 0;
    let totalTopics = 0;
    let completedTopics = 0;

    Object.keys(topicsMap).forEach((subjectId) => {
      const subjectData = topicsMap[subjectId];
      const subjectProgress = ProgressManager.getSubjectProgress(
        parseInt(subjectId),
        subjectData.topics
      );

      // Enhanced progress object with name and icon
      const enhancedProgress = {
        ...subjectProgress,
        name: subjectData.name,
        icon: subjectData.icon,
      };

      progress[subjectId] = enhancedProgress;
      totalProgress += enhancedProgress.percentage;
      totalTopics += enhancedProgress.total;
      completedTopics += enhancedProgress.completed;
    });

    return {
      totalTopics,
      completedTopics,
      totalProgress: Math.round(totalProgress / 4),
      subjects: progress,
    };
  };

  const refreshProgressData = async () => {
    if (isRefreshing) return;

    try {
      setIsRefreshing(true);

      // Refresh DSA stats
      const statsResponse = await api.get("/api/dsa/progress/stats");
      if (statsResponse.data.success) {
        setDsaStats((prevStats) => {
          const newStats = statsResponse.data.stats;
          // Only update if there are actual changes
          if (JSON.stringify(prevStats) !== JSON.stringify(newStats)) {
            setLastUpdated(new Date());
            return newStats;
          }
          return prevStats;
        });
      }

      // Refresh activity data
      const activityResponse = await api.get("/api/dsa/progress/activity");
      if (activityResponse.data.success) {
        setDsaActivity((prevActivity) => {
          const newActivity = activityResponse.data.activity || [];
          if (JSON.stringify(prevActivity) !== JSON.stringify(newActivity)) {
            return newActivity;
          }
          return prevActivity;
        });
      }

      // Update career insights based on new data
      const coreSubjectsProgress = await calculateCoreSubjectsProgress();
      const insights = generateCareerInsights(
        [],
        dsaStats,
        coreSubjectsProgress
      );
      setCareerInsights(insights);
    } catch (error) {
      console.error("Error refreshing progress data:", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleManualRefresh = async () => {
    setIsRefreshing(true);
    await fetchDashboardData();
    setLastUpdated(new Date());
    setIsRefreshing(false);
  };

  const StatCard = ({
    title,
    value,
    icon,
    color,
    delay,
    subtitle,
    progress,
  }) => (
    <div
      className={`group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl hover:shadow-cyan-500/25 transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 overflow-hidden animate-fade-in-up`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="absolute -top-2 -right-2 w-12 h-12 bg-gradient-to-br from-cyan-400/20 to-blue-600/20 rounded-full blur-lg group-hover:scale-125 transition-transform duration-500"></div>
      <div className="absolute -bottom-1 -left-1 w-8 h-8 bg-gradient-to-br from-purple-400/15 to-pink-600/15 rounded-full blur-md group-hover:scale-110 transition-transform duration-300"></div>

      <div className="relative z-10 h-full flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="text-3xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 filter drop-shadow-lg">
              {icon}
            </div>
            <div className="flex space-x-1">
              <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse"></div>
              <div
                className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"
                style={{ animationDelay: "0.2s" }}
              ></div>
              <div
                className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse"
                style={{ animationDelay: "0.4s" }}
              ></div>
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

          <div className="text-white/80 font-medium text-sm uppercase tracking-wider mb-1">
            {title}
          </div>

          {subtitle && <div className="text-white/60 text-xs">{subtitle}</div>}
        </div>

        {progress !== undefined && (
          <div className="mt-4 w-full bg-white/10 rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transition-all duration-700"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}
      </div>
    </div>
  );

  const QuickActionCard = ({
    title,
    description,
    icon,
    to,
    color,
    delay,
    onClick,
  }) => (
    <div
      className={`group cursor-pointer animate-fade-in-up`}
      style={{ animationDelay: `${delay}ms` }}
      onClick={onClick}
    >
      {to ? (
        <Link to={to} className="block">
          <ActionCardContent
            title={title}
            description={description}
            icon={icon}
            color={color}
          />
        </Link>
      ) : (
        <ActionCardContent
          title={title}
          description={description}
          icon={icon}
          color={color}
        />
      )}
    </div>
  );

  const ActionCardContent = ({ title, description, icon, color }) => (
    <div className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 shadow-lg hover:shadow-xl hover:shadow-cyan-500/20 transform hover:scale-101 hover:-translate-y-0.2 transition-all duration-300 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <div className="absolute top-2 right-2 w-2 h-2 bg-cyan-400/60 rounded-full animate-bounce"></div>
      <div
        className="absolute bottom-3 left-3 w-1.5 h-1.5 bg-purple-400/60 rounded-full animate-bounce"
        style={{ animationDelay: "0.5s" }}
      ></div>

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

  const CoreSubjectCard = ({ subject, progress, icon, color }) => (
    <div className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all duration-300 transform hover:scale-102 cursor-pointer">
      <div
        className={`absolute inset-0 rounded-xl bg-gradient-to-r ${color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm`}
      ></div>
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <div className="text-2xl">{icon}</div>
          <div className="text-xs text-gray-400 bg-white/10 px-2 py-1 rounded-full">
            {progress.percentage}%
          </div>
        </div>
        <h3 className="text-white font-semibold mb-2 group-hover:text-cyan-200 transition-colors text-sm">
          {subject}
        </h3>
        <div className="text-xs text-gray-400 mb-2">
          {progress.completed}/{progress.total} topics
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div
            className="h-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-500"
            style={{ width: `${progress.percentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );

  const getActivityColor = (level) => {
    switch (level) {
      case 0:
        return "bg-gray-600/50";
      case 1:
        return "bg-green-300";
      case 2:
        return "bg-green-500";
      case 3:
        return "bg-green-700";
      case 4:
        return "bg-green-900";
      default:
        return "bg-gray-600/50";
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col relative overflow-hidden">
      {/* Enhanced animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute -bottom-32 -left-32 w-80 h-80 bg-gradient-to-br from-purple-500/15 to-pink-600/15 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 w-48 h-48 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "4s" }}
        ></div>

        <div className="absolute top-20 left-20 w-2 h-2 bg-cyan-400/30 rounded-full animate-bounce"></div>
        <div
          className="absolute top-40 right-32 w-1.5 h-1.5 bg-purple-400/30 rounded-full animate-bounce"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-32 left-1/3 w-1 h-1 bg-blue-400/30 rounded-full animate-bounce"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <Navbar />

      <div className="flex-grow container mx-auto px-4 py-4 pt-32 pb-8 relative z-10">
        {/* Progress Tracking Notifications */}
        {lastUpdated && (
          <div className="mb-6">
            <div className="relative bg-gradient-to-r from-green-500/10 to-blue-500/10 backdrop-blur-xl border border-green-500/20 rounded-lg p-4 shadow-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-blue-500/5"></div>

              <div className="relative z-10 flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-green-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-white">
                    Progress Updated
                  </p>
                  <p className="text-xs text-gray-400">
                    Your learning progress has been synchronized at{" "}
                    {new Date(lastUpdated).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Welcome Section */}
        <div className="mb-6 animate-fade-in">
          <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 shadow-xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/5 to-purple-500/10"></div>
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500"></div>

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white via-cyan-200 to-blue-200 bg-clip-text text-transparent mb-2">
                  {greeting}, {user?.name}!
                  <span className="inline-block animate-bounce ml-2"></span>
                </h1>
                <p className="text-gray-300 text-lg font-medium mb-3">
                  Welcome to your{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 font-bold">
                    {user?.role?.toLowerCase()}
                  </span>{" "}
                  dashboard
                </p>

                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center space-x-2 bg-green-500/20 backdrop-blur-sm px-3 py-1.5 rounded-full border border-green-400/30">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-green-300 text-sm font-medium">
                      Online
                    </span>
                  </div>
                  <div className="text-gray-400 text-sm bg-white/5 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    Last login: {new Date().toLocaleDateString()}
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        isRefreshing
                          ? "bg-yellow-400 animate-pulse"
                          : "bg-green-400"
                      }`}
                    ></div>
                    <span>{isRefreshing ? "Syncing..." : "Live"}</span>
                    {lastUpdated && (
                      <span className="text-xs">
                        Updated {new Date(lastUpdated).toLocaleTimeString()}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-4 lg:mt-0">
                <button
                  onClick={handleManualRefresh}
                  disabled={loading}
                  className={`group relative px-6 py-3 bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 text-white rounded-xl transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-cyan-500/25 transform hover:scale-105 hover:-translate-y-0.5 ${
                    loading
                      ? "opacity-70 cursor-not-allowed"
                      : "hover:border-cyan-400/50"
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <div className="relative z-10 flex items-center space-x-2">
                    <span
                      className={`text-lg ${
                        loading ? "animate-spin" : "group-hover:rotate-180"
                      } transition-transform duration-500`}
                    >
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

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
          <StatCard
            title="Total Courses"
            value={stats.totalCourses}
            icon="📚"
            delay={100}
            subtitle="Available courses"
          />
          <StatCard
            title={isInstructor || isAdmin ? "Total Students" : "Enrolled"}
            value={
              isInstructor || isAdmin
                ? stats.totalStudents
                : stats.enrolledCourses
            }
            icon={isInstructor || isAdmin ? "👥" : "📖"}
            delay={200}
            subtitle={
              isInstructor || isAdmin
                ? "Across all courses"
                : "Your enrollments"
            }
          />
          <StatCard
            title="Completed"
            value={stats.completedCourses}
            icon="✅"
            delay={300}
            subtitle="Finished courses"
          />
          <StatCard
            title="Core Progress"
            value={`${stats.overallCoreProgress || 0}%`}
            icon="🧠"
            delay={400}
            subtitle="Overall core subjects"
            progress={stats.overallCoreProgress || 0}
          />
        </div>

        {/* Core Subjects Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">
              Core Subjects Progress
            </h2>
            <button
              onClick={() => navigate("/core-subject")}
              className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors duration-200 flex items-center space-x-1"
            >
              <span>View All Subjects</span>
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
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(stats.coreSubjectsProgress || {}).map(
              ([subjectId, progress]) => (
                <div
                  key={subjectId}
                  className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg p-4 shadow-xl overflow-hidden hover:bg-white/15 transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10"></div>

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl">{progress.icon || ""}</span>
                        <span className="text-sm font-medium text-white truncate">
                          {progress.name}
                        </span>
                      </div>
                      <span className="text-xs text-gray-400">
                        {Math.round(progress.percentage || 0)}%
                      </span>
                    </div>

                    <div className="w-full bg-gray-700 rounded-full h-2 mb-3">
                      <div
                        className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${progress.percentage || 0}%` }}
                      ></div>
                    </div>

                    <div className="flex justify-between items-center text-xs text-gray-400">
                      <span>
                        {progress.completed || 0}/{progress.total || 0} topics
                      </span>
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          (progress.percentage || 0) >= 80
                            ? "bg-green-500/20 text-green-400"
                            : (progress.percentage || 0) >= 50
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {(progress.percentage || 0) >= 80
                          ? "Advanced"
                          : (progress.percentage || 0) >= 50
                          ? "Intermediate"
                          : "Beginner"}
                      </span>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        {/* DSA Sheet Progress Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">
              DSA Sheet Progress
            </h2>
            <button
              onClick={() => navigate("/dsa-sheet")}
              className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors duration-200 flex items-center space-x-1"
            >
              <span>View Full Sheet</span>
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
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* DSA Overview Stats */}
            <div className="lg:col-span-2">
              <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg p-6 shadow-xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-blue-500/10"></div>

                <div className="relative z-10">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Progress Overview
                  </h3>

                  {/* Main Progress Circle */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-6">
                      <div className="relative w-20 h-20">
                        <svg
                          className="w-20 h-20 transform -rotate-90"
                          viewBox="0 0 36 36"
                        >
                          <path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="rgba(255,255,255,0.1)"
                            strokeWidth="2"
                          />
                          <path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="url(#dsaGradient)"
                            strokeWidth="2"
                            strokeDasharray={`${
                              dsaStats.totalProblems > 0
                                ? (dsaStats.completedProblems /
                                    dsaStats.totalProblems) *
                                  100
                                : 0
                            }, 100`}
                            strokeLinecap="round"
                          />
                          <defs>
                            <linearGradient
                              id="dsaGradient"
                              x1="0%"
                              y1="0%"
                              x2="100%"
                              y2="100%"
                            >
                              <stop offset="0%" stopColor="#10B981" />
                              <stop offset="100%" stopColor="#3B82F6" />
                            </linearGradient>
                          </defs>
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-lg font-bold text-white">
                            {dsaStats.totalProblems > 0
                              ? Math.round(
                                  (dsaStats.completedProblems /
                                    dsaStats.totalProblems) *
                                    100
                                )
                              : 0}
                            %
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="text-2xl font-bold text-white">
                          {dsaStats.completedProblems} /{" "}
                          {dsaStats.totalProblems}
                        </div>
                        <div className="text-sm text-gray-300">
                          Problems Solved
                        </div>
                        <div className="flex items-center space-x-4 text-sm">
                          <span className="text-yellow-400">
                            🔖 {dsaStats.bookmarkedProblems} Bookmarked
                          </span>
                          <span className="text-orange-400">
                            🔥 {dsaStats.currentStreak} Day Streak
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Difficulty Breakdown */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-white/5 rounded-lg">
                      <div className="text-green-400 font-semibold">Easy</div>
                      <div className="text-lg font-bold text-white">
                        {dsaStats.difficultyStats?.Easy?.completed || 0}
                      </div>
                      <div className="text-xs text-gray-400">
                        / {dsaStats.difficultyStats?.Easy?.total || 0}
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-1.5 mt-2">
                        <div
                          className="bg-green-400 h-1.5 rounded-full transition-all duration-300"
                          style={{
                            width: `${
                              dsaStats.difficultyStats?.Easy?.total > 0
                                ? (dsaStats.difficultyStats.Easy.completed /
                                    dsaStats.difficultyStats.Easy.total) *
                                  100
                                : 0
                            }%`,
                          }}
                        ></div>
                      </div>
                    </div>

                    <div className="text-center p-3 bg-white/5 rounded-lg">
                      <div className="text-yellow-400 font-semibold">
                        Medium
                      </div>
                      <div className="text-lg font-bold text-white">
                        {dsaStats.difficultyStats?.Medium?.completed || 0}
                      </div>
                      <div className="text-xs text-gray-400">
                        / {dsaStats.difficultyStats?.Medium?.total || 0}
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-1.5 mt-2">
                        <div
                          className="bg-yellow-400 h-1.5 rounded-full transition-all duration-300"
                          style={{
                            width: `${
                              dsaStats.difficultyStats?.Medium?.total > 0
                                ? (dsaStats.difficultyStats.Medium.completed /
                                    dsaStats.difficultyStats.Medium.total) *
                                  100
                                : 0
                            }%`,
                          }}
                        ></div>
                      </div>
                    </div>

                    <div className="text-center p-3 bg-white/5 rounded-lg">
                      <div className="text-red-400 font-semibold">Hard</div>
                      <div className="text-lg font-bold text-white">
                        {dsaStats.difficultyStats?.Hard?.completed || 0}
                      </div>
                      <div className="text-xs text-gray-400">
                        / {dsaStats.difficultyStats?.Hard?.total || 0}
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-1.5 mt-2">
                        <div
                          className="bg-red-400 h-1.5 rounded-full transition-all duration-300"
                          style={{
                            width: `${
                              dsaStats.difficultyStats?.Hard?.total > 0
                                ? (dsaStats.difficultyStats.Hard.completed /
                                    dsaStats.difficultyStats.Hard.total) *
                                  100
                                : 0
                            }%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* DSA Activity */}
            <div className="space-y-6">
              {/* Mini Activity Grid */}
              <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg p-4 shadow-xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10"></div>

                <div className="relative z-10">
                  <h4 className="text-sm font-semibold text-white mb-3">
                    Recent Activity
                  </h4>

                  {/* Mini activity grid - last 7 weeks */}
                  <div className="space-y-1">
                    {Array.from({ length: 7 }, (_, weekIndex) => (
                      <div key={weekIndex} className="flex space-x-1">
                        {Array.from({ length: 7 }, (_, dayIndex) => {
                          const dayOffset =
                            (6 - weekIndex) * 7 + (6 - dayIndex);
                          const activityDay =
                            dsaActivity[dsaActivity.length - 1 - dayOffset];
                          const level = activityDay?.level || 0;

                          return (
                            <div
                              key={dayIndex}
                              className={`w-3 h-3 rounded-sm ${getActivityColor(
                                level
                              )}`}
                              title={
                                activityDay
                                  ? `${activityDay.date}: ${activityDay.count} problems`
                                  : "No activity"
                              }
                            />
                          );
                        })}
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-center text-xs text-gray-400">
                    <span>Less</span>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 rounded-sm bg-gray-600/50"></div>
                      <div className="w-2 h-2 rounded-sm bg-green-300"></div>
                      <div className="w-2 h-2 rounded-sm bg-green-500"></div>
                      <div className="w-2 h-2 rounded-sm bg-green-700"></div>
                      <div className="w-2 h-2 rounded-sm bg-green-900"></div>
                    </div>
                    <span>More</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Career Coach Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Career Coach</h2>
            <button
              onClick={() => navigate("/careers")}
              className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors duration-200 flex items-center space-x-1"
            >
              <span>View Career Paths</span>
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
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Career Progress & Level */}
            <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg p-6 shadow-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10"></div>

              <div className="relative z-10">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Your Career Journey
                </h3>

                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="text-2xl font-bold text-white mb-1">
                      {careerInsights.currentLevel}
                    </div>
                    <div className="text-sm text-gray-300">
                      {careerInsights.careerPath}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                      {careerInsights.completionRate}%
                    </div>
                    <div className="text-xs text-gray-400">
                      Overall Progress
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-700 rounded-full h-3 mb-4">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${careerInsights.completionRate}%` }}
                  ></div>
                </div>

                {/* Next Milestone */}
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-yellow-400">🎯</span>
                    <span className="text-sm font-medium text-white">
                      Next Milestone
                    </span>
                  </div>
                  <p className="text-sm text-gray-300">
                    {careerInsights.nextMilestone}
                  </p>
                </div>
              </div>
            </div>

            {/* Skill Recommendations */}
            <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg p-6 shadow-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10"></div>

              <div className="relative z-10">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Recommended Skills
                </h3>

                <div className="space-y-3">
                  {careerInsights.recommendedSkills.map((skill, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            skill.priority === "High"
                              ? "bg-red-400"
                              : skill.priority === "Medium"
                              ? "bg-yellow-400"
                              : "bg-green-400"
                          }`}
                        ></div>
                        <span className="text-sm font-medium text-white">
                          {skill.skill}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-gray-700 rounded-full h-1.5">
                          <div
                            className="bg-gradient-to-r from-indigo-400 to-purple-400 h-1.5 rounded-full transition-all duration-300"
                            style={{ width: `${skill.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-400">
                          {skill.progress}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Suggested Courses */}
                <div>
                  <h4 className="text-sm font-semibold text-white mb-4 mt-4">
                    Suggested Courses
                  </h4>
                  <div className="space-y-2">
                    {careerInsights.suggestedCourses.map((course, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 bg-white/5 rounded text-sm"
                      >
                        <span className="text-gray-300">{course.title}</span>
                        <span
                          className={`px-2 py-1 rounded text-xs ${
                            course.difficulty === "Beginner"
                              ? "bg-green-500/20 text-green-400"
                              : course.difficulty === "Intermediate"
                              ? "bg-yellow-500/20 text-yellow-400"
                              : "bg-red-500/20 text-red-400"
                          }`}
                        >
                          {course.difficulty}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Career Tips */}
                <div className="mt-6 bg-white/5 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="text-blue-400">💡</span>
                    <span className="text-sm font-medium text-white">
                      Career Tip
                    </span>
                  </div>
                  <p className="text-sm text-gray-300">
                    {careerInsights.currentLevel === "Beginner"
                      ? "Focus on building a strong foundation in programming fundamentals and data structures. Practice coding daily and work on small projects."
                      : careerInsights.currentLevel === "Intermediate"
                      ? "Start building portfolio projects and contribute to open source. Practice system design interviews."
                      : "Focus on leadership skills, system architecture, and mentoring others. Stay updated with industry trends."}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Suggested Learning Path */}
          <div className="mt-6">
            <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg p-6 shadow-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10"></div>

              <div className="relative z-10">
                <h4 className="text-lg font-semibold text-white mb-4">
                  Personalized Learning Path
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {careerInsights.suggestedCourses.map((course, index) => (
                    <div
                      key={index}
                      className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-all duration-200"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="text-sm font-medium text-white">
                          {course.title}
                        </h5>
                        <span
                          className={`text-xs px-2 py-1 rounded ${
                            course.difficulty === "Beginner"
                              ? "bg-green-500/20 text-green-400"
                              : course.difficulty === "Intermediate"
                              ? "bg-yellow-500/20 text-yellow-400"
                              : "bg-red-500/20 text-red-400"
                          }`}
                        >
                          {course.difficulty}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 mb-3">
                        {course.type} Development
                      </p>
                      <button className="w-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 hover:from-indigo-500/30 hover:to-purple-500/30 border border-indigo-500/30 text-indigo-400 py-1.5 px-3 rounded text-xs transition-all duration-200">
                        Start Course
                      </button>
                    </div>
                  ))}
                </div>

                {/* Career Tips */}
                <div className="mt-6 bg-white/5 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="text-blue-400">💡</span>
                    <span className="text-sm font-medium text-white">
                      Career Tip
                    </span>
                  </div>
                  <p className="text-sm text-gray-300">
                    {careerInsights.currentLevel === "Beginner"
                      ? "Focus on building a strong foundation in programming fundamentals and data structures. Practice coding daily and work on small projects."
                      : careerInsights.currentLevel === "Intermediate"
                      ? "Start building portfolio projects and contribute to open source. Practice system design interviews."
                      : "Consider mentoring others and exploring leadership opportunities. Stay updated with industry trends."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Instructor Application Section */}
        {!isInstructor && !isAdmin && (
          <div className="mb-6">
            <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg p-4 shadow-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-white">
                    Become an Instructor
                  </h3>
                  <button
                    onClick={() => setShowInstructorApp(true)}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-200"
                  >
                    Apply Now
                  </button>
                </div>
                <p className="text-sm text-gray-300 mb-3">
                  Share your knowledge by creating courses and mentoring
                  students.
                </p>
                <div className="grid grid-cols-3 gap-3 text-xs">
                  <div className="text-center p-2 bg-white/5 rounded">
                    <div className="text-green-400 mb-1">📚</div>
                    <div className="text-gray-300">Create Courses</div>
                  </div>
                  <div className="text-center p-2 bg-white/5 rounded">
                    <div className="text-blue-400 mb-1">👥</div>
                    <div className="text-gray-300">Mentor Students</div>
                  </div>
                  <div className="text-center p-2 bg-white/5 rounded">
                    <div className="text-yellow-400 mb-1">💰</div>
                    <div className="text-gray-300">Earn Revenue</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {showInstructorApp && (
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowInstructorApp(false)}
          >
            <div
              className="relative bg-gray-800 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-gray-800 flex justify-end p-3 border-b border-gray-700">
                <button
                  onClick={() => setShowInstructorApp(false)}
                  className="bg-red-500 hover:bg-red-600 text-white rounded-full p-2 transition-all duration-200 shadow-lg"
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="p-6">
                <InstructorApplication />
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
