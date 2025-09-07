import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../utils/api";
import founderImage from "../assets/founder.png";

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Animated typing effect for code editor
  const [codeLines, setCodeLines] = useState([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  // Newsletter subscription state
  const [email, setEmail] = useState('');
  const [subscriptionStatus, setSubscriptionStatus] = useState(''); // 'loading', 'success', 'error'
  const [subscriptionMessage, setSubscriptionMessage] = useState('');

  // Courses section state
  const [courses, setCourses] = useState([]);
  const [coursesLoading, setCoursesLoading] = useState(true);
  const [coursesError, setCoursesError] = useState(null);
  const [likedCourses, setLikedCourses] = useState(new Set());

  const codeToType = [
    "// Welcome to NextEra - Learn. Build. Earn.",
    "class Developer {",
    "  constructor(name) {",
    "    this.name = name;",
    "    this.skills = [];",
    "    this.dreams = 'unlimited';",
    "  }",
    "",
    "  learn(course) {",
    "    this.skills.push(course);",
    "    console.log(`${this.name} mastered ${course}!`);",
    "  }",
    "}",
    "",
    "const student = new Developer('Khyruddin Hashanulla');",
    "student.learn('Full Stack Development');",
    "student.learn('React & Node.js');",
    "student.learn('AI & Machine Learning');",
    "",
    "console.log('🚀 Ready to transform your career?');",
    "console.log('Join thousands of developers worldwide!');",
  ];

  // Typing animation effect
  useEffect(() => {
    const typeCode = () => {
      if (currentLine < codeToType.length) {
        const line = codeToType[currentLine];
        if (currentChar < line.length) {
          setCodeLines(prev => {
            const newLines = [...prev];
            if (!newLines[currentLine]) newLines[currentLine] = '';
            newLines[currentLine] = line.substring(0, currentChar + 1);
            return newLines;
          });
          setCurrentChar(prev => prev + 1);
        } else {
          // Move to next line
          setTimeout(() => {
            setCurrentLine(prev => prev + 1);
            setCurrentChar(0);
          }, 500);
        }
      }
    };

    const timer = setTimeout(typeCode, 50);
    return () => clearTimeout(timer);
  }, [currentLine, currentChar]);

  // Cursor blinking effect
  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(cursorTimer);
  }, []);

  const handleGetStarted = () => {
    if (user) {
      navigate("/courses");
    } else {
      navigate("/login", { state: { redirectTo: "/courses" } });
    }
  };

  // Handle course like/unlike
  const handleLikeCourse = (courseId) => {
    setLikedCourses(prev => {
      const newLikedCourses = new Set(prev);
      if (newLikedCourses.has(courseId)) {
        newLikedCourses.delete(courseId);
      } else {
        newLikedCourses.add(courseId);
      }
      return newLikedCourses;
    });
  };

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Full Stack Developer",
      company: "Google",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      quote: "NextEra transformed my career completely. From zero coding knowledge to landing my dream job at Google in just 8 months!"
    },
    {
      id: 2,
      name: "Marcus Johnson",
      role: "Senior React Developer",
      company: "Microsoft",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      quote: "The hands-on projects and expert mentorship at NextEra gave me the confidence to tackle complex real-world applications."
    },
    {
      id: 3,
      name: "Priya Sharma",
      role: "AI Engineer",
      company: "Tesla",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
      quote: "NextEra's AI courses are cutting-edge. I went from curious beginner to building production ML models at Tesla!"
    },
    {
      id: 4,
      name: "Alex Rivera",
      role: "DevOps Engineer",
      company: "Netflix",
      image: "https://randomuser.me/api/portraits/men/75.jpg",
      quote: "The practical approach and industry connections through NextEra helped me transition into DevOps seamlessly."
    }
  ];

  // Fetch courses data
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setCoursesLoading(true);
        setCoursesError(null);
        const response = await api.get('/api/courses');
        
        if (response.data && Array.isArray(response.data)) {
          // Get first 6 courses for home page display
          setCourses(response.data.slice(0, 6));
        } else {
          throw new Error('Invalid courses data format');
        }
      } catch (error) {
        console.error('Error fetching courses for home page:', error);
        setCoursesError(error.response?.data?.message || error.message || 'Failed to load courses');
      } finally {
        setCoursesLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setSubscriptionStatus('loading');
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (data.success) {
        setSubscriptionStatus('success');
        setSubscriptionMessage('Thank you for subscribing!');
        setEmail(''); // Clear the input field after successful subscription
      } else {
        setSubscriptionStatus('error');
        setSubscriptionMessage('Error subscribing. Please try again.');
      }
    } catch (error) {
      setSubscriptionStatus('error');
      setSubscriptionMessage('Error subscribing. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />

      {/* Hero Section with Animated Code Editor */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20 pt-32 overflow-hidden">
        <div className="relative z-30 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/40 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/40 rounded-full blur-xl animate-pulse" style={{ animationDelay: "1s" }}></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/30 rounded-full blur-2xl animate-ping" style={{ animationDuration: "4s" }}></div>
          </div>

          {/* Left Side - Hero Content */}
          <div className="text-center lg:text-left space-y-8 relative z-10">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                Learn.{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                  Build.
                </span>{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                  Earn.
                </span>
              </h1>
              <p className="text-xl lg:text-2xl text-gray-300 max-w-2xl">
                Master cutting-edge technologies with hands-on projects, expert mentorship, and real-world experience. Join the next generation of developers.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={handleGetStarted}
                className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/25"
              >
                <span className="relative z-10">Get Started Free</span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </button>
              <button
                onClick={handleGetStarted}
                className="px-8 py-4 border-2 border-gray-600 text-gray-300 font-semibold rounded-xl hover:border-cyan-400 hover:text-cyan-400 transition-all duration-300 transform hover:scale-105"
              >
                Explore Courses
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-col sm:flex-row items-center gap-6 pt-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">10K+</div>
                <div className="text-gray-400">Students Worldwide</div>
              </div>
              <div className="hidden sm:block w-px h-12 bg-gray-600"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">95%</div>
                <div className="text-gray-400">Job Placement Rate</div>
              </div>
              <div className="hidden sm:block w-px h-12 bg-gray-600"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">50+</div>
                <div className="text-gray-400">Expert Instructors</div>
              </div>
            </div>
          </div>

          {/* Right Side - Animated Code Editor */}
          <div className="relative z-10">
            <div className="bg-gray-900/90 backdrop-blur-sm rounded-2xl border border-gray-700/50 shadow-2xl overflow-hidden">
              {/* Editor Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-gray-800/80 border-b border-gray-700/50">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="text-gray-400 text-sm font-mono">NextEra-IDE</div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border border-gray-600 rounded"></div>
                  <div className="w-4 h-4 border border-gray-600 rounded"></div>
                </div>
              </div>

              {/* Editor Content */}
              <div className="p-6 font-mono text-sm leading-relaxed h-[500px] overflow-hidden">
                {codeLines.map((line, index) => (
                  <div key={index} className="flex">
                    <span className="text-gray-500 w-8 text-right mr-4 select-none">
                      {index + 1}
                    </span>
                    <span className="flex-1">
                      {line && line.includes('//') ? (
                        <span className="text-green-400">{line}</span>
                      ) : line && (line.includes('class') || line.includes('const') || line.includes('constructor')) ? (
                        <span className="text-purple-400">{line}</span>
                      ) : line && line.includes('console.log') ? (
                        <span className="text-yellow-400">{line}</span>
                      ) : line && line.includes('Khyruddin Hashanulla') ? (
                        <span className="text-cyan-400 font-bold">{line}</span>
                      ) : line && (line.includes("'") || line.includes('"')) ? (
                        <span className="text-green-300">{line}</span>
                      ) : (
                        <span className="text-gray-300">{line || ''}</span>
                      )}
                      {index === currentLine && showCursor && (
                        <span className="bg-cyan-400 text-gray-900 ml-1">|</span>
                      )}
                    </span>
                  </div>
                ))}
              </div>

              {/* Terminal Output */}
              <div className="bg-black/50 p-4 border-t border-gray-700/50">
                <div className="text-green-400 font-mono text-sm">
                  <div>$ npm run dev</div>
                  <div className="text-gray-400">Starting development server...</div>
                  <div className="text-cyan-400">✓ Server running on http://localhost:3000</div>
                  <div className="text-yellow-400">🚀 Ready to transform your career?</div>
                  <div className="text-purple-400">Join thousands of developers worldwide!</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Decorative Border */}
      <div className="relative">
        <div className="relative flex justify-center">
          <div className="bg-gray-900/50 backdrop-blur-sm px-6">
            <div className="w-16 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Why Choose NextEra Section */}
      <section className="relative py-20 px-4 bg-gray-900/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">NextEra</span>?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover what makes NextEra the premier choice for aspiring developers worldwide
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1 - Expert Instructors */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative bg-gray-800/40 backdrop-blur-md border border-gray-700/50 rounded-2xl p-8 hover:border-cyan-400/50 transition-all duration-300 transform hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors">Expert Instructors</h3>
                <p className="text-gray-400 leading-relaxed">
                  Learn from industry veterans with years of real-world experience at top tech companies like Google, Microsoft, and Tesla.
                </p>
              </div>
            </div>

            {/* Card 2 - Hands-on Projects */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative bg-gray-800/40 backdrop-blur-md border border-gray-700/50 rounded-2xl p-8 hover:border-purple-400/50 transition-all duration-300 transform hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M17 20H7m10 0v-2a3 3 0 00-5.356-1.857M17 20H2v-2a3 3 0 015.356-1.857M7 20H2v-2c0-.656-.126-1.283-.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-400 transition-colors">Hands-on Projects</h3>
                <p className="text-gray-400 leading-relaxed">
                  Build real-world applications and portfolios that showcase your skills to potential employers and clients.
                </p>
              </div>
            </div>

            {/* Card 3 - Career Support */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative bg-gray-800/40 backdrop-blur-md border border-gray-700/50 rounded-2xl p-8 hover:border-green-400/50 transition-all duration-300 transform hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-green-400 transition-colors">Career Support</h3>
                <p className="text-gray-400 leading-relaxed">
                  Get personalized career guidance, resume reviews, interview prep, and direct connections to hiring partners.
                </p>
              </div>
            </div>

            {/* Card 4 - Flexible Learning */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative bg-gray-800/40 backdrop-blur-md border border-gray-700/50 rounded-2xl p-8 hover:border-orange-400/50 transition-all duration-300 transform hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-red-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-orange-400 transition-colors">Flexible Learning</h3>
                <p className="text-gray-400 leading-relaxed">
                  Learn at your own pace with 24/7 access to course materials, live sessions, and community support.
                </p>
              </div>
            </div>

            {/* Card 5 - Industry Recognition */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-blue-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative bg-gray-800/40 backdrop-blur-md border border-gray-700/50 rounded-2xl p-8 hover:border-indigo-400/50 transition-all duration-300 transform hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-400 to-blue-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-indigo-400 transition-colors">Industry Recognition</h3>
                <p className="text-gray-400 leading-relaxed">
                  Earn certificates recognized by top employers and showcase your achievements with verifiable credentials.
                </p>
              </div>
            </div>

            {/* Card 6 - Community Support */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-rose-500/20 to-pink-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative bg-gray-800/40 backdrop-blur-md border border-gray-700/50 rounded-2xl p-8 hover:border-rose-400/50 transition-all duration-300 transform hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-r from-rose-400 to-pink-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-rose-400 transition-colors">Community Support</h3>
                <p className="text-gray-400 leading-relaxed">
                  Join a vibrant community of learners, mentors, and industry professionals for networking and collaboration.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Decorative Border */}
      <div className="relative">
        <div className="relative flex justify-center">
          <div className="bg-gray-900/50 backdrop-blur-sm px-6">
            <div className="w-16 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Featured Courses Section */}
      <section className="relative py-20 px-4 bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                Featured Courses
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover our most popular courses designed by industry experts to accelerate your career
            </p>
          </div>

          {coursesLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-cyan-400"></div>
            </div>
          ) : coursesError ? (
            <div className="text-center py-20">
              <div className="text-red-400 mb-4">
                <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Unable to load courses</h3>
              <p className="text-gray-400 mb-6">{coursesError}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : courses.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No courses available</h3>
              <p className="text-gray-400">Check back soon for new courses!</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {courses.map((course, index) => (
                  <div 
                    key={course.id || course._id} 
                    className="group relative bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 border border-gray-700/50 hover:border-cyan-400/50"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Course Thumbnail */}
                    <div className="relative h-48 overflow-hidden">
                      {course.thumbnail ? (
                        <img 
                          src={course.thumbnail} 
                          alt={course.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/400x200/1f2937/60a5fa?text=Course+Thumbnail';
                          }}
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center">
                          <svg className="w-16 h-16 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                          </svg>
                        </div>
                      )}
                      
                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      {/* Course duration badge */}
                      <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                        {course.sections?.length || 0} sections
                      </div>
                    </div>

                    {/* Course Content */}
                    <div className="p-6">
                      {/* Course Title */}
                      <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-cyan-400 transition-colors">
                        {course.title || 'Untitled Course'}
                      </h3>

                      {/* Course Description */}
                      <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                        {course.description || 'No description available for this course.'}
                      </p>

                      {/* Creator Info */}
                      <div className="flex items-center mb-4">
                        <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
                          {course.creatorId?.name?.charAt(0) || 'I'}
                        </div>
                        <div>
                          <p className="text-white text-sm font-medium">
                            {course.creatorId?.name || 'Instructor'}
                          </p>
                          <p className="text-gray-500 text-xs">Course Creator</p>
                        </div>
                      </div>

                      {/* Enrollment Info */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center text-gray-400 text-sm">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                          </svg>
                          {course.studentsEnrolled?.length || 0} students
                        </div>
                        <div className="flex items-center text-green-400 text-sm font-medium">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                          Free
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        <Link
                          to={`/courses/${course.id || course._id}`}
                          className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white py-3 px-4 rounded-lg font-medium text-center transition-all duration-300 transform hover:scale-105"
                        >
                          View Course
                        </Link>
                        <button
                          onClick={() => handleLikeCourse(course.id || course._id)}
                          className={`px-4 py-3 border rounded-lg transition-all duration-300 transform hover:scale-105 ${
                            likedCourses.has(course.id || course._id)
                              ? 'bg-gradient-to-r from-purple-500 to-pink-500 border-purple-500 text-white hover:from-purple-600 hover:to-pink-600 hover:border-purple-600'
                              : 'border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-white'
                          }`}
                          title={likedCourses.has(course.id || course._id) ? 'Remove from favorites' : 'Add to favorites'}
                        >
                          <svg 
                            className="w-5 h-5" 
                            fill={likedCourses.has(course.id || course._id) ? "currentColor" : "none"} 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* View All Courses Button */}
              <div className="text-center mt-12">
                <Link
                  to="/courses"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
                >
                  <span>View All Courses</span>
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Decorative Border */}
      <div className="relative">
        <div className="relative flex justify-center">
          <div className="bg-gray-900/50 backdrop-blur-sm px-6">
            <div className="w-16 h-0.5 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Learning Journey Section */}
      <section className="relative py-20 px-4 bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Learning Journey</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From beginner to professional - follow our proven path to success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="group relative">
              <div className="text-center bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/30 hover:border-cyan-400/50 transition-all duration-300 hover:bg-gray-800/50">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                    1
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Choose Your Path</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Browse our curated courses and select the perfect learning path for your career goals
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="group relative">
              <div className="text-center bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/30 hover:border-purple-400/50 transition-all duration-300 hover:bg-gray-800/50">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1a3 3 0 000-6h-1m1 6V4a3 3 0 013-3m-3 9a3 3 0 000 6m0-6h3m0 0a3 3 0 013 3v1M9 16v5h3m3 0h3" />
                    </svg>
                  </div>
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                    2
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Learn by Doing</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Follow hands-on tutorials and build real projects with expert guidance and mentorship
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="group relative">
              <div className="text-center bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/30 hover:border-pink-400/50 transition-all duration-300 hover:bg-gray-800/50">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-pink-400 to-rose-500 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                    3
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Get Certified</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Complete assessments and earn industry-recognized certificates to showcase your skills
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="group relative">
              <div className="text-center bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/30 hover:border-green-400/50 transition-all duration-300 hover:bg-gray-800/50">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                    4
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Launch Career</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Land your dream job with our career support, portfolio reviews, and industry connections
                </p>
              </div>
            </div>
          </div>

          {/* Success Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-2 group-hover:scale-110 transition-transform duration-300">
                10K+
              </div>
              <p className="text-gray-400 text-sm">Students Enrolled</p>
            </div>
            <div className="text-center group">
              <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600 mb-2 group-hover:scale-110 transition-transform duration-300">
                95%
              </div>
              <p className="text-gray-400 text-sm">Completion Rate</p>
            </div>
            <div className="text-center group">
              <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-500 mb-2 group-hover:scale-110 transition-transform duration-300">
                8.5K+
              </div>
              <p className="text-gray-400 text-sm">Certificates Issued</p>
            </div>
            <div className="text-center group">
              <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500 mb-2 group-hover:scale-110 transition-transform duration-300">
                87%
              </div>
              <p className="text-gray-400 text-sm">Job Placement</p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <button
              onClick={handleGetStarted}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 hover:from-cyan-600 hover:via-purple-600 hover:to-pink-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
            >
              <span>Start Your Journey Today</span>
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Decorative Border */}
      <div className="relative">
        <div className="relative flex justify-center">
          <div className="bg-gray-900/50 backdrop-blur-sm px-6">
            <div className="w-16 h-0.5 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <section className="relative py-20 px-4 bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Trusted by{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                Developers Worldwide
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Join thousands of successful developers who transformed their careers with NextEra
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="group bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:bg-gray-700/50 hover:border-cyan-500/30 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/10"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full border-2 border-cyan-500/30 mr-4"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/100x100/1f2937/60a5fa?text=Testimonial+Image';
                    }}
                  />
                  <div>
                    <h4 className="text-white font-semibold">{testimonial.name}</h4>
                    <p className="text-cyan-400 text-sm">{testimonial.role}</p>
                    <p className="text-gray-500 text-xs">{testimonial.company}</p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div className="flex text-yellow-400 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                    </svg>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Decorative Border */}
      <div className="relative">
        <div className="relative flex justify-center">
          <div className="bg-gray-900/50 backdrop-blur-sm px-6">
            <div className="w-16 h-0.5 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Founder/Testimonial Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                Meet Our Founder
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Learn from the visionary behind NextEra's revolutionary approach to education
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="group relative">
              {/* Glowing background effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              
              {/* Main card */}
              <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-12 text-center hover:bg-white/10 transition-all duration-500 transform hover:scale-[1.02]">
                {/* Founder Image */}
                <div className="relative inline-block mb-8">
                  <div className="w-48 h-48 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400 p-1.5 shadow-2xl shadow-cyan-500/30 group-hover:shadow-cyan-500/50 transition-all duration-500">
                    <img 
                      src={founderImage} 
                      alt="Khyruddin Hashanulla" 
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  {/* Floating elements */}
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-bounce"></div>
                  <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-full animate-pulse"></div>
                </div>

                {/* Content */}
                <h3 className="text-3xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-400 transition-all duration-300">
                  Khyruddin Hashanulla
                </h3>
                <p className="text-cyan-400 text-xl mb-6 font-semibold">Founder & CEO</p>
                
                <blockquote className="text-gray-300 text-lg leading-relaxed max-w-3xl mx-auto mb-8 italic">
                  "Education should be accessible, engaging, and transformative. At NextEra, we're not just teaching code—we're building the future leaders of technology."
                </blockquote>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-cyan-400 mb-1">10K+</div>
                    <div className="text-gray-400 text-sm">Students Mentored</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400 mb-1">5+</div>
                    <div className="text-gray-400 text-sm">Years Experience</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400 mb-1">95%</div>
                    <div className="text-gray-400 text-sm">Success Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-400 mb-1">50+</div>
                    <div className="text-gray-400 text-sm">Courses Created</div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex justify-center space-x-6">
                  <a 
                    href="https://www.linkedin.com/in/khyruddin-hashanulla" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group/link flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    <span className="font-medium">LinkedIn</span>
                  </a>
                  <a 
                    href="https://khyruddin-hashanulla.github.io/MY-PORTFOLIO/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group/link flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                    </svg>
                    <span className="font-medium">Portfolio</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Decorative Border */}
      <div className="relative">
        <div className="relative flex justify-center">
          <div className="bg-gray-900/50 backdrop-blur-sm px-6">
            <div className="w-16 h-0.5 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <section className="relative py-16 px-4 pb-8 bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Stay Updated with{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              Latest Courses
            </span>
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Get notified about new courses, exclusive offers, and developer insights
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none"
            />
            <button
              onClick={handleSubscribe}
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-xl hover:from-cyan-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
            >
              {subscriptionStatus === 'loading' ? (
                <svg className="w-6 h-6 animate-spin" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                </svg>
              ) : (
                'Subscribe'
              )}
            </button>
          </div>
          {subscriptionStatus === 'success' && (
            <p className="text-green-400 mt-4">{subscriptionMessage}</p>
          )}
          {subscriptionStatus === 'error' && (
            <p className="text-red-400 mt-4">{subscriptionMessage}</p>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
