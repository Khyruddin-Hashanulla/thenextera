import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';

const CodeEditor = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, loading } = useAuth();
  const [problem, setProblem] = useState(null);
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState('');
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    // Wait for auth context to load before checking authentication
    if (loading) return;

    // Give some time for authentication state to sync in new tab
    const authTimer = setTimeout(() => {
      setAuthChecked(true);
      
      if (!isAuthenticated || !user) {
        console.log('Authentication failed, redirecting to login');
        navigate('/login');
        return;
      }

      // Get problem data from URL params
      const urlParams = new URLSearchParams(location.search);
      const problemParam = urlParams.get('problem');
      
      if (problemParam) {
        try {
          const problemData = JSON.parse(decodeURIComponent(problemParam));
          setProblem(problemData);
          
          // Set initial code template based on language
          setCode(getInitialCode(language, problemData));
        } catch (error) {
          console.error('Error parsing problem data:', error);
          navigate('/dsa-sheet');
        }
      } else {
        navigate('/dsa-sheet');
      }
    }, 1000); // Wait 1 second for auth state to sync

    return () => clearTimeout(authTimer);
  }, [location, isAuthenticated, navigate, language, loading, user]);

  const getInitialCode = (lang, problemData) => {
    const templates = {
      javascript: `// ${problemData?.title || 'Problem Solution'}
function solution() {
    // Write your solution here
    
}

// Test your solution
console.log(solution());`,
      python: `# ${problemData?.title || 'Problem Solution'}
def solution():
    # Write your solution here
    pass

# Test your solution
print(solution())`,
      java: `// ${problemData?.title || 'Problem Solution'}
public class Solution {
    public static void main(String[] args) {
        Solution sol = new Solution();
        // Test your solution
        System.out.println(sol.solve());
    }
    
    public int solve() {
        // Write your solution here
        return 0;
    }
}`,
      cpp: `// ${problemData?.title || 'Problem Solution'}
#include <iostream>
#include <vector>
using namespace std;

class Solution {
public:
    int solve() {
        // Write your solution here
        return 0;
    }
};

int main() {
    Solution sol;
    cout << sol.solve() << endl;
    return 0;
}`
    };
    return templates[lang] || templates.javascript;
  };

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    setCode(getInitialCode(newLanguage, problem));
  };

  const handleSubmit = async () => {
    if (!code.trim()) return;
    
    setIsRunning(true);
    try {
      const response = await api.post('/api/dsa/progress/save-code', {
        problemId: problem.id,
        code,
        language,
        userId: user.id || user._id
      });
      
      if (response.data.success) {
        setOutput('✅ Code saved successfully!');
        // Mark problem as practiced
        await api.post('/api/dsa/progress/mark', { 
          problemId: problem.id, 
          action: 'practiced',
          userId: user.id || user._id 
        });
      }
    } catch (error) {
      console.error('Error saving code:', error);
      setOutput('❌ Failed to save code. Please try again.');
    } finally {
      setIsRunning(false);
    }
  };

  const handleRun = () => {
    setOutput('🚀 Code execution simulation...\n\nNote: This is a practice environment. For actual code execution, please use the platform link.');
  };

  if (!problem || !authChecked) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <h1 className="text-white font-semibold text-lg">{problem.title}</h1>
          <span className={`px-2 py-1 rounded text-xs font-medium ${
            problem.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
            problem.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
            'bg-red-500/20 text-red-400'
          }`}>
            {problem.difficulty}
          </span>
        </div>
        
        <div className="flex items-center space-x-3">
          <select
            value={language}
            onChange={(e) => handleLanguageChange(e.target.value)}
            className="bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="cpp">C++</option>
          </select>
          
          <button
            onClick={handleRun}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
          >
            Run
          </button>
          
          <button
            onClick={handleSubmit}
            disabled={isRunning}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
          >
            {isRunning ? 'Saving...' : 'Save'}
          </button>
          
          <button
            onClick={() => window.close()}
            className="text-gray-400 hover:text-white p-2 rounded-lg hover:bg-gray-700"
            title="Close Tab"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Problem Description */}
        <div className="w-1/3 bg-gray-800 border-r border-gray-700 overflow-y-auto">
          <div className="p-6">
            <h2 className="text-white text-xl font-semibold mb-4">Problem Description</h2>
            
            {problem.description && (
              <div className="text-gray-300 mb-6 whitespace-pre-wrap">
                {problem.description}
              </div>
            )}
            
            {problem.tags && problem.tags.length > 0 && (
              <div className="mb-4">
                <h3 className="text-white text-sm font-medium mb-2">Tags:</h3>
                <div className="flex flex-wrap gap-2">
                  {problem.tags.map((tag, idx) => (
                    <span key={idx} className="bg-indigo-500 text-white px-2 py-1 rounded text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            <div className="mt-6 p-4 bg-gray-700 rounded-lg">
              <h3 className="text-white text-sm font-medium mb-2">💡 Hints:</h3>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Break down the problem into smaller parts</li>
                <li>• Consider the time and space complexity</li>
                <li>• Think about edge cases</li>
                <li>• Test with sample inputs</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Code Editor */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 p-4">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-full bg-gray-900 text-gray-100 font-mono text-sm p-4 border border-gray-700 rounded-lg focus:border-blue-500 focus:outline-none resize-none"
              placeholder="Write your solution here..."
              spellCheck={false}
            />
          </div>
          
          {/* Output Panel */}
          {output && (
            <div className="h-32 bg-gray-800 border-t border-gray-700 p-4">
              <h3 className="text-white text-sm font-medium mb-2">Output:</h3>
              <pre className="text-gray-300 text-sm font-mono whitespace-pre-wrap">{output}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
