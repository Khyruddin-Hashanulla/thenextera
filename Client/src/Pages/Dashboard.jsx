import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

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
    <div className="min-h-screen bg-gradient-to-br from-orange-200 via-red-400 to-pink-600">
      <nav className="shadow-lg mb-4">
        <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center">
              <img src="/src/assets/logo.png" alt="NextEra Logo" className="w-14 h-14" />
              <h1 className="text-xl font-bold text-gray-900 ml-2">Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/')}
                className="px-4 py-2 bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 rounded-md shadow-sm text-sm font-medium text-white transition-colors"
              >
                Home
              </button>
              <Link
                to="/courses"
                className="px-4 py-2 bg-gradient-to-r from-rose-500 via-pink-500 to-red-500 hover:from-pink-500 hover:to-orange-500 rounded-md shadow-sm text-sm font-medium text-black"
              >
                View Courses
              </Link>
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
        <div className="bg-white/30 backdrop-blur-md rounded-xl shadow-lg p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Welcome, {user?.name}!</h2>
            <p className="text-gray-800 mt-2">You are logged in as: {user?.role}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-4">
                <Link
                  to="/courses"
                  className="block w-full text-center px-4 py-2 bg-gradient-to-r from-rose-500 via-pink-500 to-red-500 hover:from-pink-500 hover:to-orange-500 text-black rounded-lg transition-colors"
                >
                  Browse Courses
                </Link>
                {isInstructor && (
                  <Link
                    to="/courses/create"
                    className="block w-full text-center px-4 py-2 bg-gradient-to-r from-rose-500 via-pink-500 to-red-500 hover:from-pink-500 hover:to-orange-500 text-black rounded-lg transition-colors"
                  >
                    Create New Course
                  </Link>
                )}
              </div>
            </div>

            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Account Info</h3>
              <div className="space-y-2">
                <p className="text-gray-800"><span className="font-medium">Name:</span> {user?.name}</p>
                <p className="text-gray-800"><span className="font-medium">Email:</span> {user?.email}</p>
                <p className="text-gray-800"><span className="font-medium">Role:</span> {user?.role}</p>
              </div>
            </div>

            {isInstructor && (
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Instructor Tools</h3>
                <div className="space-y-4">
                  <Link
                    to="/courses"
                    className="block w-full text-center px-4 py-2 bg-gradient-to-r from-rose-500 via-pink-500 to-red-500 hover:from-pink-500 hover:to-orange-500 text-black rounded-lg transition-colors"
                  >
                    Manage Courses
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 