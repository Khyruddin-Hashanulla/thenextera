import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, isInstructor, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(1deg,_rgba(34,143,186,1)_0%,_rgba(0,0,0,1)_69%,_rgba(0,0,0,1)_100%)]">
      <Navbar />

      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-black backdrop-blur-md rounded-xl shadow-lg p-6 border-2 border-gray-800 shadow-2xl">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white">Welcome, {user?.name}!</h2>
            <p className="text-gray-400 mt-2">You are logged in as: {user?.role}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-[linear-gradient(1deg,_rgba(34,143,186,1)_0%,_rgba(0,0,0,1)_69%,_rgba(0,0,0,1)_100%)] backdrop-blur-sm rounded-lg p-6 shadow-2xl">
              <h3 className="text-xl font-semibold text-gray-100 mb-4">Quick Actions</h3>
              <div className="space-y-4">
                <Link
                  to="/courses"
                  className="block w-full text-center px-4 py-2 bg-transparent border-2 border-white text-white font-medium rounded-lg hover:bg-white/10 transition-colors"
                >
                  Browse Courses
                </Link>
                {isInstructor && (
                  <Link
                    to="/courses/create"
                    className="block w-full block w-full text-center px-4 py-2 bg-transparent border-2 border-white text-white font-medium rounded-lg hover:bg-white/10 transition-colors"
                  >
                    Create New Course
                  </Link>
                )}
              </div>
            </div>

            <div className="bg-[linear-gradient(1deg,_rgba(34,143,186,1)_0%,_rgba(0,0,0,1)_69%,_rgba(0,0,0,1)_100%)] backdrop-blur-sm rounded-lg p-6 shadow-2xl">
              <h3 className="text-xl font-semibold text-gray-100 mb-4">Account Info</h3>
              <div className="space-y-2">
                <p className="text-gray-200"><span className="font-medium">Name:</span> {user?.name}</p>
                <p className="text-gray-200"><span className="font-medium">Email:</span> {user?.email}</p>
                <p className="text-gray-200"><span className="font-medium">Role:</span> {user?.role}</p>
              </div>
            </div>

            {isInstructor && (
              <div className="bg-[linear-gradient(1deg,_rgba(34,143,186,1)_0%,_rgba(0,0,0,1)_69%,_rgba(0,0,0,1)_100%)] backdrop-blur-sm rounded-lg p-6 shadow-2xl">
                <h3 className="text-xl font-semibold text-gray-100 mb-4">Instructor Tools</h3>
                <div className="space-y-4">
                  <Link
                    to="/courses"
                    className="block w-full block w-full text-center px-4 py-2 bg-transparent border-2 border-white text-white font-medium rounded-lg hover:bg-white/10 transition-colors"
                  >
                    Manage Courses
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard; 