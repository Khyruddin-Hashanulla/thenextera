import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";

const DeleteConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  courseTitle,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
        <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
        <p className="mb-6">
          Are you sure you want to delete this course? This action cannot be
          undone.
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [enrolling, setEnrolling] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    courseId: null,
  });
  const navigate = useNavigate();
  const { user, isInstructor } = useAuth();

  console.log("Courses component render:", {
    user,
    userRole: user?.role,
    isInstructor,
    authData: {
      hasUser: !!user,
      role: user?.role,
      id: user?._id || user?.id,
    },
  });

  const canModifyCourse = (course) => {
    if (!isInstructor) {
      console.log("Not an instructor:", {
        userRole: user.role,
        isInstructor,
      });
      return false;
    }

    if (user.role === "Admin") {
      console.log("Admin access granted");
      return true;
    }

    // Handle both populated and unpopulated creatorId
    const courseCreatorId = course.creatorId?._id || course.creatorId;
    const userId = user._id || user.id || user.userId; // Handle both _id and id fields

    return courseCreatorId === userId;
  };

  useEffect(() => {
    console.log("Courses useEffect:", {
      user,
      isInstructor,
      role: user?.role,
      storedUser: JSON.parse(localStorage.getItem("user") || "{}"),
    });
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.get("/api/courses");

      if (!res.data) {
        throw new Error("No data received from server");
      }

      if (!Array.isArray(res.data)) {
        console.error("Invalid courses data format:", res.data);
        throw new Error("Invalid data format received from server");
      }

      setCourses(res.data);
    } catch (err) {
      console.error("Error fetching courses:", {
        error: err,
        response: err.response,
        status: err.response?.status,
        data: err.response?.data,
      });

      setError(
        err.response?.data?.error ||
          err.response?.data?.message ||
          err.message ||
          "Failed to load courses. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  const enroll = async (courseId) => {
    try {
      setEnrolling(true);
      console.log("Enrolling in course:", courseId);
      console.log("User:", user);

      const response = await api.post(`/api/courses/enroll/${courseId}`);
      console.log("Enrollment response:", response.data);

      // Show success message
      const successMessage =
        response.data.message || "Successfully enrolled in the course!";
      alert(successMessage);

      // Refresh course data
      await fetchCourses();
    } catch (err) {
      console.error("Error enrolling:", {
        error: err,
        response: err.response,
        user: user,
      });

      // Handle specific error cases
      let errorMessage = "Failed to enroll. Please try again.";
      if (err.response?.status === 401) {
        errorMessage = "Please log in to enroll in this course.";
      } else if (err.response?.status === 403) {
        errorMessage = "You don't have permission to enroll in this course.";
      } else if (err.response?.status === 400) {
        errorMessage =
          err.response.data?.error ||
          "You are already enrolled in this course.";
      }

      alert(errorMessage);
    } finally {
      setEnrolling(false);
    }
  };

  const isEnrolled = (course) => {
    if (!course.studentsEnrolled || !user) return false;
    return course.studentsEnrolled.some((student) => {
      const studentId = typeof student === "string" ? student : student._id;
      const userId = user._id || user.id || user.userId;
      return studentId === userId;
    });
  };

  const handleDelete = async (courseId) => {
    console.log("Delete button clicked for course:", courseId);
    setDeleteModal({ isOpen: true, courseId });
  };

  const confirmDelete = async () => {
    const courseId = deleteModal.courseId;
    try {
      setDeleting(true);

      console.log("Delete attempt:", {
        courseId,
        userId: user._id || user.id,
        userRole: user.role,
      });

      const response = await api.delete(`/api/courses/${courseId}`);

      console.log("Delete response:", {
        status: response.status,
        data: response.data,
      });

      alert("Course deleted successfully");
      fetchCourses(); // Refresh the course list
    } catch (err) {
      console.error("Delete error details:", {
        error: err.message,
        response: err.response?.data,
        status: err.response?.status,
        userId: user._id || user.id,
        userRole: user.role,
      });

      if (err.response?.status === 403) {
        alert(
          "You are not authorized to delete this course. Only the course creator can delete it."
        );
      } else if (err.response?.status === 401) {
        alert("Your session has expired. Please log in again.");
        navigate("/login");
      } else {
        alert(
          err.response?.data?.error ||
            "Failed to delete course. Please try again."
        );
      }
    } finally {
      setDeleting(false);
      setDeleteModal({ isOpen: false, courseId: null });
    }
  };

  const handleLogout = async () => {
    try {
      // The original code had logout() here, but logout is not imported.
      // Assuming it was intended to be removed or handled differently if logout was a global function.
      // For now, removing it as per the new_code.
      // await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Add debug log for initial user data
  console.log("Current user data:", {
    user,
    isInstructor,
    localStorage: {
      user: JSON.parse(localStorage.getItem("user") || "{}"),
      hasToken: !!localStorage.getItem("token"),
    },
  });

  return (
    <div className="min-h-screen bg-gray-900 relative">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/20 via-gray-900/30 to-gray-900/20"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.1),transparent_50%)]"></div>
      
      <Navbar onLogout={handleLogout} />
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Main content area that grows to fill available space */}
        <div className="flex-grow flex flex-col">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-fade-in-up">
              Explore Our Courses
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
              Discover a world of knowledge with our expertly crafted courses
            </p>
          </div>

          {loading && (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            </div>
          )}

          {error && (
            <div className="text-center py-20">
              <div className="bg-red-500/20 border border-red-500 rounded-lg p-6 max-w-md mx-auto">
                <p className="text-red-200 mb-4">{error}</p>
                <button
                  onClick={fetchCourses}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}

          {!loading && !error && courses.length === 0 && (
            <div className="text-center py-20">
              <div className="bg-gray-800/50 rounded-lg p-8 max-w-md mx-auto">
                <h3 className="text-2xl font-semibold text-white mb-4">
                  No Courses Available
                </h3>
                {isInstructor ? (
                  <>
                    <p className="text-gray-300 mb-6">
                      You haven't created any courses yet. Start building your
                      first course to share your knowledge with students.
                    </p>
                    <div className="flex gap-3 justify-center">
                      <button
                        onClick={() => navigate("/courses/create")}
                        className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-medium"
                      >
                        Create Course
                      </button>
                      <button
                        onClick={fetchCourses}
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                      >
                        Refresh
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="text-gray-300 mb-6">
                      There are currently no courses available. Check back later
                      or contact us for more information.
                    </p>
                    <button
                      onClick={fetchCourses}
                      className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                    >
                      Refresh
                    </button>
                  </>
                )}
              </div>
            </div>
          )}

          {!loading && !error && courses.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course) => {
                const canModify = canModifyCourse(course);
                const enrolled = isEnrolled(course);

                return (
                  <div
                    key={course._id}
                    className="group bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-blue-500/30 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 animate-fade-in-up flex flex-col"
                    style={{ height: '580px' }} // Increased height for better proportions
                  >
                    {/* Course Thumbnail - Fixed Height */}
                    <div className="relative overflow-hidden" style={{ height: '220px' }}>
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
                    
                    {/* Course Content - Flexible with fixed structure */}
                    <div className="p-6 flex flex-col flex-grow" style={{ height: 'calc(580px - 220px)' }}>
                      {/* Title - Fixed Height */}
                      <div style={{ height: '70px' }} className="mb-4 overflow-hidden">
                        <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors line-clamp-2 leading-tight">
                          {course.title}
                        </h3>
                      </div>

                      {/* Description - Fixed Height with scroll */}
                      <div style={{ height: '100px' }} className="mb-4 overflow-hidden">
                        <p className="text-gray-400 text-sm leading-relaxed line-clamp-5 group-hover:text-gray-300 transition-colors">
                          {course.description}
                        </p>
                      </div>

                      {/* Course Info and Actions - Fixed at bottom */}
                      <div className="mt-auto">
                        {/* Course Creator Info - Fixed Height */}
                        <div className="flex items-center text-sm text-gray-500 border-t border-gray-700/50 pt-4 mb-4" style={{ height: '60px' }}>
                          <span className="mr-2">👨‍🏫</span>
                          <span className="text-gray-400 font-medium">
                            Created by:
                          </span>
                          <span className="ml-1 text-gray-300 truncate font-semibold">
                            {course.creatorId?.name || "Unknown Instructor"}
                          </span>
                        </div>

                        {/* Action Buttons - Fixed Height */}
                        <div style={{ height: '50px' }}>
                          {canModify ? (
                            <div className="flex gap-3 h-full">
                              <button
                                onClick={() =>
                                  navigate(`/courses/edit/${course._id}`)
                                }
                                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25 flex items-center justify-center gap-2"
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
                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                  />
                                </svg>
                                Edit
                              </button>
                              <button
                                onClick={() => handleDelete(course._id)}
                                className="px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-500/25 flex items-center justify-center gap-2"
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
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                  />
                                </svg>
                              </button>
                            </div>
                          ) : enrolled ? (
                            <button
                              onClick={() => navigate(`/courses/${course._id}`)}
                              className="w-full h-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25 flex items-center justify-center gap-2"
                            >
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
                            </button>
                          ) : (
                            <button
                              onClick={() => enroll(course._id)}
                              disabled={enrolling}
                              className={`w-full h-full px-6 py-3 font-semibold rounded-xl transition-all duration-300 transform shadow-lg flex items-center justify-center gap-2 ${
                                enrolling
                                  ? "bg-gray-600 cursor-not-allowed text-gray-300"
                                  : "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white hover:scale-105 hover:shadow-green-500/25"
                              }`}
                            >
                              {enrolling ? (
                                <>
                                  <svg
                                    className="w-5 h-5 animate-spin"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                    />
                                  </svg>
                                  Enrolling...
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
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="relative bg-gray-900/80 backdrop-blur-sm text-white py-16 px-4">
        {/* Gradient Divider */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
        
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

      <DeleteConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, courseId: null })}
        onConfirm={confirmDelete}
        courseTitle={
          courses.find((c) => c._id === deleteModal.courseId)?.title || ""
        }
      />
    </div>
  );
};

export default Courses;
