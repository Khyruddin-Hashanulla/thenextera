import React from 'react';
import { Link } from 'react-router-dom';

const TestPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-200 via-red-400 to-pink-600 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center">Test Page</h1>
        <p className="text-center">This is a test page to verify routing is working.</p>
        <div className="flex justify-center space-x-4 mt-6">
          <Link 
            to="/login"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Go to Login
          </Link>
          <Link 
            to="/dashboard"
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TestPage; 