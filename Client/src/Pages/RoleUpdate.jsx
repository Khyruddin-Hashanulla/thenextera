import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

const RoleUpdate = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const userData = JSON.parse(localStorage.getItem('user') || '{}');

  const updateRole = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await api.put(`/api/auth/update-role/${userData.id}`, {
        role: 'Instructor'  // Changed to proper case
      });

      // Update local storage with new user data and token
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      alert('Role updated successfully! Please refresh the page.');
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update role');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6">Update Role</h2>

          {error && (
            <div className="bg-red-50 text-red-700 p-4 rounded-md mb-6">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <p>Current Role: {userData.role}</p>
            <button
              onClick={updateRole}
              disabled={loading}
              className={`w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Updating...' : 'Update to Instructor'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleUpdate; 