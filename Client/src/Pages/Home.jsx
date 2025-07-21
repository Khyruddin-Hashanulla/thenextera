import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../utils/api";
import Navbar from "../components/Navbar";
import "../animations.css";
import logo from "../assets/logo.png";

const Home = () => {
  const [featuredCourses, setFeaturedCourses] = useState([]);
  const [categories, setCategories] = useState([
    { name: "Web Development", courseCount: 12 },
    { name: "Mobile Development", courseCount: 8 },
    { name: "Data Science", courseCount: 10 },
    { name: "UI/UX Design", courseCount: 6 },
    { name: "Machine Learning", courseCount: 9 },
    { name: "Business", courseCount: 7 },
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await api.get("/api/courses");
        if (response.data && Array.isArray(response.data)) {
          setFeaturedCourses(response.data.slice(0, 3));
        } else {
          setFeaturedCourses([]);
        }
      } catch (err) {
        console.error("Error fetching home page data:", err);
        setError("Failed to load content. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCourseClick = (courseId) => {
    if (user) {
      navigate(`/courses/${courseId}`);
    } else {
      navigate("/login", { state: { redirectTo: `/courses/${courseId}` } });
    }
  };

  const handleEnrollClick = (e, courseId) => {
    e.stopPropagation();
    if (user) {
      navigate(`/courses/${courseId}`);
    } else {
      navigate("/login", { state: { redirectTo: `/courses/${courseId}` } });
    }
  };

  const handleViewAllCourses = (e) => {
    e.preventDefault();
    if (user) {
      navigate("/courses");
    } else {
      navigate("/login", { state: { redirectTo: "/courses" } });
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <div className="relative text-white bg-[linear-gradient(1deg,_rgba(34,143,186,1)_0%,_rgba(0,0,0,1)_69%,_rgba(0,0,0,1)_100%)] min-h-screen overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute top-40 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-bounce"
            style={{ animationDuration: "3s" }}
          ></div>
          <div
            className="absolute bottom-20 left-1/4 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/30 rounded-full animate-ping"
            style={{ animationDelay: "0s" }}
          ></div>
          <div
            className="absolute top-1/3 right-1/3 w-1 h-1 bg-blue-300/50 rounded-full animate-ping"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute bottom-1/3 left-1/2 w-1.5 h-1.5 bg-purple-300/40 rounded-full animate-ping"
            style={{ animationDelay: "4s" }}
          ></div>
          <div
            className="absolute top-2/3 right-1/4 w-1 h-1 bg-pink-300/50 rounded-full animate-ping"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        <div className="relative container mx-auto px-4 py-4 md:py-24 flex items-center min-h-screen">
          <div className="max-w-4xl mx-auto text-center">
            <div
              className="animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient-x">
                Unlock Your Potential with NextEra
              </h1>
            </div>
            <div
              className="animate-fade-in-up"
              style={{ animationDelay: "0.4s" }}
            >
              <p className="text-xl md:text-2xl mb-8 text-gray-200 leading-relaxed">
                Discover expert-led courses designed to help you master new
                skills and advance your career.
              </p>
            </div>
            <div
              className="animate-fade-in-up flex flex-col sm:flex-row gap-4 justify-center"
              style={{ animationDelay: "0.6s" }}
            >
              <button
                onClick={handleViewAllCourses}
                className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25"
              >
                <span className="flex items-center justify-center gap-2">
                  Explore Courses
                  <svg
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </span>
              </button>
              {!user && (
                <Link
                  to="/register"
                  className="group px-8 py-4 bg-transparent border-2 border-white/30 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/10 hover:border-white/50 transition-all duration-300 transform hover:scale-105"
                >
                  <span className="flex items-center justify-center gap-2">
                    Sign Up Free
                    <svg
                      className="w-5 h-5 group-hover:rotate-12 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                      />
                    </svg>
                  </span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Featured Courses Section */}
      <div className="bg-gradient-to-b from-gray-900 to-black text-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent animate-fade-in-up">
              Featured Courses
            </h2>
            <p
              className="text-xl text-gray-300 animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              Handpicked courses to accelerate your learning journey
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
            </div>
          ) : error ? (
            <div className="text-center text-red-300">{error}</div>
          ) : featuredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {featuredCourses.map((course, index) => (
                <div
                  key={course._id}
                  className="group bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-blue-500/30 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 animate-fade-in-up flex flex-col h-[520px]"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  {/* Course Thumbnail */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={
                        course.thumbnail ||
                        "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=500&q=80"
                      }
                      alt={course.title}
                      onError={(e) => {
                        e.target.src =
                          "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=500&q=80";
                      }}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  {/* Course Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold mb-3 text-white group-hover:text-blue-300 transition-colors line-clamp-2">
                      {course.title}
                    </h3>

                    <div className="flex-grow overflow-hidden mb-4">
                      <p className="text-gray-400 text-sm leading-relaxed line-clamp-4 group-hover:text-gray-300 transition-colors">
                        {course.description}
                      </p>
                    </div>

                    {/* Course Info */}
                    <div className="mt-auto">
                      <div className="flex items-center text-sm text-gray-500 border-t border-gray-700/50 pt-4 mb-4">
                        <span className="mr-2">👨‍🏫</span>
                        <span className="text-gray-400 font-medium">
                          Created by:
                        </span>
                        <span className="ml-1 text-gray-300 truncate font-semibold">
                          {course.instructor?.name ||
                            course.creatorId?.name ||
                            "Unknown Instructor"}
                        </span>
                      </div>

                      {/* Action Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEnrollClick(e, course._id);
                        }}
                        className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25 flex items-center justify-center gap-2"
                      >
                        {user ? (
                          <>
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              />
                            </svg>
                            View Course
                          </>
                        ) : (
                          <>
                            <svg
                              className="w-5 h-5"
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
                            Enroll Now
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-300">
              No courses available at the moment.
            </div>
          )}

          <div
            className="text-center mt-12 animate-fade-in-up"
            style={{ animationDelay: "0.8s" }}
          >
            <button
              onClick={handleViewAllCourses}
              className="group px-8 py-4 bg-transparent border-2 border-white/30 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/10 hover:border-white/50 transition-all duration-300 transform hover:scale-105"
            >
              <span className="flex items-center justify-center gap-2">
                View All Courses
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="text-white py-20 bg-[linear-gradient(1deg,_rgba(34,143,186,1)_0%,_rgba(0,0,0,1)_69%,_rgba(0,0,0,1)_100%)]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent animate-fade-in-up">
              Browse by Category
            </h2>
            <p
              className="text-xl text-gray-300 animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              Explore our diverse range of learning paths
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {categories.map((category, index) => (
              <div
                key={index}
                onClick={(e) => {
                  e.preventDefault();
                  if (user) {
                    navigate(
                      `/courses?category=${encodeURIComponent(category.name)}`
                    );
                  } else {
                    navigate("/login", {
                      state: {
                        redirectTo: `/courses?category=${encodeURIComponent(
                          category.name
                        )}`,
                      },
                    });
                  }
                }}
                className="group bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 text-white p-6 rounded-2xl text-center hover:from-green-900/30 hover:to-blue-900/30 hover:border-green-500/30 transition-all duration-500 cursor-pointer transform hover:scale-105 hover:shadow-2xl hover:shadow-green-500/20 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl font-bold text-white">
                    {category.name.charAt(0)}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-white group-hover:text-green-300 transition-colors mb-2">
                  {category.name}
                </h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                  {category.courseCount || 0} Courses
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Why Choose Us Section */}
      <div className="bg-gradient-to-b from-gray-900 to-black py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent animate-fade-in-up">
              Why Choose NextEra
            </h2>
            <p
              className="text-xl text-gray-300 animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              Experience the difference with our premium learning platform
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="group text-center p-8 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl hover:from-yellow-900/30 hover:to-orange-900/30 hover:border-yellow-500/30 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/20 animate-fade-in-up">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 animate-float">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 className="text-2xl text-white font-bold mb-4 group-hover:text-yellow-300 transition-colors">
                Expert Instructors
              </h3>
              <p className="text-gray-400 group-hover:text-gray-300 transition-colors leading-relaxed">
                Learn from industry professionals with years of real-world
                experience and proven track records.
              </p>
            </div>
            <div
              className="group text-center p-8 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl hover:from-yellow-900/30 hover:to-orange-900/30 hover:border-yellow-500/30 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/20 animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              <div
                className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 animate-float"
                style={{ animationDelay: "1s" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl text-white font-bold mb-4 group-hover:text-yellow-300 transition-colors">
                Learn at Your Own Pace
              </h3>
              <p className="text-gray-400 group-hover:text-gray-300 transition-colors leading-relaxed">
                Access course materials anytime, anywhere, and progress at your
                own comfortable speed.
              </p>
            </div>
            <div
              className="group text-center p-8 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl hover:from-yellow-900/30 hover:to-orange-900/30 hover:border-yellow-500/30 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/20 animate-fade-in-up"
              style={{ animationDelay: "0.4s" }}
            >
              <div
                className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 animate-float"
                style={{ animationDelay: "2s" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl text-white font-bold mb-4 group-hover:text-yellow-300 transition-colors">
                Secure & Reliable
              </h3>
              <p className="text-gray-400 group-hover:text-gray-300 transition-colors leading-relaxed">
                Our platform ensures your data is protected and courses are
                always accessible when you need them.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="relative bg-gradient-to-br from-purple-900 via-blue-900 to-black text-white py-24 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-10 left-10 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden bg-[linear-gradient(1deg,_rgba(34,143,186,1)_0%,_rgba(0,0,0,1)_69%,_rgba(0,0,0,1)_100%)]">
          <div
            className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/40 rounded-full animate-ping"
            style={{ animationDelay: "0s" }}
          ></div>
          <div
            className="absolute top-1/3 right-1/3 w-1 h-1 bg-purple-300/60 rounded-full animate-ping"
            style={{ animationDelay: "3s" }}
          ></div>
          <div
            className="absolute bottom-1/4 right-1/4 w-1.5 h-1.5 bg-blue-300/50 rounded-full animate-ping"
            style={{ animationDelay: "1.5s" }}
          ></div>
        </div>

        <div className="relative container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="animate-fade-in-up">
              <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-gradient-x">
                Ready to Start Learning?
              </h2>
            </div>
            <div
              className="animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto text-gray-200 leading-relaxed">
                Join thousands of students already transforming their careers
                with NextEra. Your learning journey starts here!
              </p>
            </div>

            {/* Stats Section */}
            <div
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 animate-fade-in-up"
              style={{ animationDelay: "0.4s" }}
            >
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-purple-400 mb-2">
                  10,000+
                </div>
                <div className="text-gray-300">Active Students</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-pink-400 mb-2">
                  500+
                </div>
                <div className="text-gray-300">Expert Courses</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">
                  95%
                </div>
                <div className="text-gray-300">Success Rate</div>
              </div>
            </div>

            <div
              className="animate-fade-in-up"
              style={{ animationDelay: "0.6s" }}
            >
              {user ? (
                <button
                  onClick={() => navigate("/courses")}
                  className="group px-12 py-5 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold text-lg rounded-2xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/25 flex items-center justify-center gap-3 mx-auto"
                >
                  <svg
                    className="w-6 h-6 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                  Browse Courses
                  <svg
                    className="w-6 h-6 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </button>
              ) : (
                <Link
                  to="/register"
                  className="group px-12 py-5 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold text-lg rounded-2xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/25 flex items-center justify-center gap-3 mx-auto"
                >
                  <svg
                    className="w-6 h-6 group-hover:rotate-12 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                    />
                  </svg>
                  Start Your Journey
                  <svg
                    className="w-6 h-6 group-hover:rotate-12 transition-transform"
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
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer className="relative bg-gradient-to-t from-black via-gray-900 to-gray-800 text-white py-16 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        <div className="relative container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-7xl mx-auto mb-12">
            {/* Brand Section */}
            <div className="md:col-span-2 animate-fade-in-up">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-[linear-gradient(1deg,_rgba(34,143,186,1)_0%,_rgba(0,0,0,1)_69%,_rgba(0,0,0,1)_100%)] rounded-xl flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-xl">
                    <img src={logo} alt="" srcset="" />
                  </span>
                </div>
                <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  NextEra
                </h3>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                Empowering learners worldwide with high-quality online
                education. Transform your career with expert-led courses and
                cutting-edge learning experiences.
              </p>

              {/* Social Links */}
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="group w-12 h-12 bg-[linear-gradient(1deg,_rgba(34,143,186,1)_0%,_rgba(0,0,0,1)_69%,_rgba(0,0,0,1)_100%)] rounded-full flex items-center justify-center hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-110"
                >
                  <svg
                    className="w-6 h-6 text-white group-hover:scale-110 transition-transform"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="group w-12 h-12 bg-[linear-gradient(1deg,_rgba(34,143,186,1)_0%,_rgba(0,0,0,1)_69%,_rgba(0,0,0,1)_100%)] rounded-full flex items-center justify-center hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-110"
                >
                  <svg
                    className="w-6 h-6 text-white group-hover:scale-110 transition-transform"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M7.75 2A5.75 5.75 0 002 7.75v8.5A5.75 5.75 0 007.75 22h8.5A5.75 5.75 0 0022 16.25v-8.5A5.75 5.75 0 0016.25 2h-8.5zm0 1.5h8.5A4.25 4.25 0 0120.5 7.75v8.5a4.25 4.25 0 01-4.25 4.25h-8.5A4.25 4.25 0 013.5 16.25v-8.5A4.25 4.25 0 017.75 3.5zm8.75 2a.75.75 0 100 1.5.75.75 0 000-1.5zM12 7a5 5 0 100 10 5 5 0 000-10zm0 1.5a3.5 3.5 0 110 7 3.5 3.5 0 010-7z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="group w-12 h-12 bg-[linear-gradient(1deg,_rgba(34,143,186,1)_0%,_rgba(0,0,0,1)_69%,_rgba(0,0,0,1)_100%)] rounded-full flex items-center justify-center hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-110"
                >
                  <svg
                    className="w-6 h-6 text-white group-hover:scale-110 transition-transform"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div
              className="animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              <h3 className="text-xl font-bold mb-6 text-white">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/"
                    className="group flex items-center text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    <svg
                      className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                    Home
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleViewAllCourses}
                    className="group flex items-center text-gray-400 hover:text-white bg-transparent border-none p-0 cursor-pointer transition-colors duration-200"
                  >
                    <svg
                      className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                    Courses
                  </button>
                </li>
                <li>
                  <Link
                    to="/login"
                    className="group flex items-center text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    <svg
                      className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className="group flex items-center text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    <svg
                      className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                    Register
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div
              className="animate-fade-in-up"
              style={{ animationDelay: "0.4s" }}
            >
              <h3 className="text-xl font-bold mb-6 text-white">
                Get in Touch
              </h3>
              <div className="space-y-4">
                <div className="flex items-center text-gray-300">
                  <svg
                    className="w-5 h-5 mr-3 text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <a
                    href="mailto:support@nextera.com"
                    className="hover:text-white transition-colors"
                  >
                    support@nextera.com
                  </a>
                </div>
                <div className="flex items-center text-gray-300">
                  <svg
                    className="w-5 h-5 mr-3 text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <a
                    href="tel:+11234567890"
                    className="hover:text-white transition-colors"
                  >
                    (91) 9432364608
                  </a>
                </div>
                <div className="flex items-center text-gray-300">
                  <svg
                    className="w-5 h-5 mr-3 text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span>Kolkata, India</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div
            className="border-t border-gray-700/50 pt-8 animate-fade-in-up"
            style={{ animationDelay: "0.6s" }}
          >
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
              <div className="flex space-x-6 text-sm">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Privacy Policy
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Terms of Service
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
