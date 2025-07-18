import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

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
    <div className="min-h-screen bg-[linear-gradient(1deg,_rgba(34,143,186,1)_0%,_rgba(0,0,0,1)_69%,_rgba(0,0,0,1)_100%)]">
      <DeleteConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, courseId: null })}
        onConfirm={confirmDelete}
      />
      <Navbar />

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
                className="bg-[linear-gradient(1deg,_rgba(34,143,186,1)_0%,_rgba(0,0,0,1)_69%,_rgba(0,0,0,1)_100%)] backdrop-blur-md rounded-xl shadow-lg overflow-hidden flex flex-col h-[480px] border-2 border-gray-900 shadow-md transform hover:shadow-2xl transition-transform duration-900"
              >
                <div className="relative h-72 rounded-t-xl overflow-hidden">
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
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 flex flex-col h-full">
                  <h2 className="text-lg font-bold mb-2 text-gray-100 line-clamp-2 hover:text-gray-400 cursor-pointer transition-colors duration-300">
                    {course.title}
                  </h2>
                  <div className="flex-grow overflow-hidden">
                    <p className="text-gray-300 text-sm leading-relaxed line-clamp-5">
                      {course.description}
                    </p>
                  </div>

                  <div className="mt-auto pt-3">
                    <div className="text-sm text-gray-700 flex items-center border-t border-gray-200 pt-3 mb-7">
                      <span className="mr-2">👨‍🏫</span>
                      <span className="text-gray-100 font-bold">
                        Created by:
                      </span>
                      <span className="ml-1 text-black truncate">
                        {course.creatorId?.name || "Unknown Instructor"}
                      </span>
                    </div>

                    {canModify ? (
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            navigate(`/courses/edit/${course._id}`)
                          }
                          className="flex-1 px-6 py-3 bg-transparent border-2 border-white text-white font-medium rounded-lg hover:bg-white/10 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(course._id)}
                          className="px-6 py-3 bg-black border-2 border-white text-white font-medium rounded-lg hover:bg-white/10 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    ) : enrolled ? (
                      <div className="flex gap-2">
                        <button
                          onClick={() => navigate(`/courses/${course._id}`)}
                          className=" flex-1 px-6 py-3 bg-black border-2 border-white text-white font-medium rounded-lg hover:bg-white/10 transition-colors"
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
                              ? "bg-gray-400 cursor-not-allowed"
                              : "bg-green-500 hover:bg-green-600 transition-colors"
                          }`}
                        >
                          {enrolling ? "Enrolling..." : "Enroll Now"}
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
      <Footer />
    </div>
  );
};

export default Courses;
