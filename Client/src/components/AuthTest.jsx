import { useState } from 'react';
import api from '../utils/api';

const AuthTest = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const testAuth = async () => {
    setLoading(true);
    try {
      const response = await api.get('/api/courses/test-auth');
      setResult({ success: true, data: response.data });
    } catch (error) {
      setResult({ 
        success: false, 
        error: error.response?.data?.error || error.message 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h3 className="font-bold mb-2">Authentication Test</h3>
      <button
        onClick={testAuth}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Testing...' : 'Test Auth'}
      </button>
      
      {result && (
        <div className={`mt-4 p-3 rounded ${result.success ? 'bg-green-100' : 'bg-red-100'}`}>
          <pre className="text-sm">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default AuthTest;
