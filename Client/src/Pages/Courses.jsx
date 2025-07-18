import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";

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
      console.log('Enrolling in course:', courseId);
      console.log('User:', user);

      const response = await api.post(`/api/courses/enroll/${courseId}`);
      console.log('Enrollment response:', response.data);
      
      // Show success message
      const successMessage = response.data.message || "Successfully enrolled in the course!";
      alert(successMessage);
      
      // Refresh course data
      await fetchCourses();
    } catch (err) {
      console.error("Error enrolling:", {
        error: err,
        response: err.response,
        user: user
      });
      
      // Handle specific error cases
      let errorMessage = "Failed to enroll. Please try again.";
      if (err.response?.status === 401) {
        errorMessage = "Please log in to enroll in this course.";
      } else if (err.response?.status === 403) {
        errorMessage = "You don't have permission to enroll in this course.";
      } else if (err.response?.status === 400) {
        errorMessage = err.response.data?.error || "You are already enrolled in this course.";
      }
      
      alert(errorMessage);
    } finally {
      setEnrolling(false);
    }
  };

  const isEnrolled = (course) => {
    if (!course.studentsEnrolled || !user) return false;
    return course.studentsEnrolled.some(student => {
      const studentId = typeof student === 'string' ? student : student._id;
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
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
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
    <div className="min-h-screen bg-gradient-to-br from-orange-200 via-red-400 to-pink-600">
      <DeleteConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, courseId: null })}
        onConfirm={confirmDelete}
      />
      <nav className="shadow-lg mb-4">
        <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center">
              <img src="/src/assets/logo.png" alt="NextEra Logo" className="w-14 h-14" />
              <h1 className="text-xl font-bold text-gray-900 ml-2">Courses</h1>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/')}
                className="px-4 py-2 bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 rounded-md shadow-sm text-sm font-medium text-white transition-colors"
              >
                Home
              </button>
              <Link
                to="/dashboard"
                className="px-4 py-2 bg-gradient-to-r from-rose-500 via-pink-500 to-red-500 hover:from-pink-500 hover:to-orange-500 rounded-md shadow-sm text-sm font-medium text-black"
              >
                Dashboard
              </Link>
              {isInstructor && (
                <button
                  onClick={() => navigate("/courses/create")}
                  className="px-4 py-2 bg-gradient-to-r from-rose-500 via-pink-500 to-red-500 hover:from-pink-500 hover:to-orange-500 rounded-md shadow-sm text-sm font-medium text-black"
                >
                  Create Course
                </button>
              )}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg transition-colors text-gray-900 font-medium"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 3a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h5.5a.5.5 0 0 1 0 1H3a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h5.5a.5.5 0 0 1 0 1H3zm11.646 4.646a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L17.293 11H6.5a.5.5 0 0 1 0-1h10.793l-2.647-2.646a.5.5 0 0 1 0-.708z" clipRule="evenodd"/>
                </svg>
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {courses.map((course) => {
            const enrolled = isEnrolled(course);
            const canModify = canModifyCourse(course);

            return (
              <div
                key={course._id}
                className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg overflow-hidden flex flex-col h-[480px]"
              >
                <div className="relative h-72 rounded-t-xl overflow-hidden">
                  <img
                    src={course.thumbnail || "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=500&q=80"}
                    alt={course.title}
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=500&q=80";
                    }}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 flex flex-col h-full">
                  <h2 className="text-lg font-bold mb-2 text-gray-900 line-clamp-2">
                    {course.title}
                  </h2>
                  <div className="flex-grow overflow-hidden">
                    <p className="text-gray-800 text-sm leading-relaxed line-clamp-5">
                      {course.description}
                    </p>
                  </div>

                  <div className="mt-auto pt-3">
                    <div className="text-sm text-gray-700 flex items-center border-t border-gray-200 pt-3 mb-7">
                      <span className="mr-2">👨‍🏫</span>
                      <span className="font-medium">Created by:</span>
                      <span className="ml-1 text-gray-900 truncate">{course.creatorId?.name || "Unknown Instructor"}</span>
                    </div>

                    {canModify ? (
                      <div className="flex gap-2">
                        <button
                          onClick={() => navigate(`/courses/edit/${course._id}`)}
                          className="flex-1 bg-blue-500 text-white py-2 px-3 rounded-lg hover:bg-blue-600 transition-colors text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(course._id)}
                          className="flex-1 bg-red-500 text-white py-2 px-3 rounded-lg hover:bg-red-600 transition-colors text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    ) : enrolled ? (
                      <div className="flex gap-2">
                        <button
                          onClick={() => navigate(`/courses/${course._id}`)}
                          className="flex-1 bg-red-500 text-white py-2 px-3 rounded-lg hover:bg-red-600 transition-colors text-sm"
                        >
                          View Course
                        </button>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <button
                          onClick={() => enroll(course._id)}
                          disabled={enrolling}
                          className={`flex-1 py-2 px-3 rounded-lg text-sm text-white ${
                            enrolling
                              ? 'bg-gray-400 cursor-not-allowed'
                              : 'bg-green-500 hover:bg-green-600 transition-colors'
                          }`}
                        >
                          {enrolling ? 'Enrolling...' : 'Enroll Now'}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Courses;
