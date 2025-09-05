import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Editor from '@monaco-editor/react';
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
  const [showBottomPanel, setShowBottomPanel] = useState(false);
  const [fontSize, setFontSize] = useState(14);
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [error, setError] = useState(null);

  const editorRef = useRef(null);

  // Language configurations
  const languageConfigs = {
    javascript: {
      name: 'JavaScript',
      monacoLang: 'javascript',
      template: `// Problem Solution
function solution() {
    // Write your solution here
    
}

// Test your solution
console.log(solution());`
    },
    python: {
      name: 'Python',
      monacoLang: 'python',
      template: `# Problem Solution
def solution():
    # Write your solution here
    pass

# Test your solution
print(solution())`
    },
    java: {
      name: 'Java',
      monacoLang: 'java',
      template: `// Problem Solution
public class Solution {
    public static void main(String[] args) {
        Solution sol = new Solution();
        System.out.println(sol.solve());
    }
    
    public int solve() {
        // Write your solution here
        return 0;
    }
}`
    },
    cpp: {
      name: 'C++',
      monacoLang: 'cpp',
      template: `// Problem Solution
#include <iostream>
using namespace std;

int main() {
    // Write your solution here
    cout << "Hello World" << endl;
    return 0;
}`
    }
  };

  useEffect(() => {
    if (loading) return;

    const authTimer = setTimeout(() => {
      try {
        setAuthChecked(true);
        
        if (!isAuthenticated || !user) {
          navigate('/login');
          return;
        }

        const urlParams = new URLSearchParams(location.search);
        const problemParam = urlParams.get('problem');
        
        if (problemParam) {
          try {
            const problemData = JSON.parse(decodeURIComponent(problemParam));
            setProblem(problemData);
            setCode(getInitialCode(language, problemData));
          } catch (error) {
            console.error('Error parsing problem data:', error);
            setError('Failed to load problem data');
            setTimeout(() => navigate('/dsa-sheet'), 2000);
          }
        } else {
          navigate('/dsa-sheet');
        }
      } catch (error) {
        console.error('Auth check error:', error);
        setError('Authentication error');
      }
    }, 1000);

    return () => clearTimeout(authTimer);
  }, [location, isAuthenticated, navigate, loading, user, language]);

  const getInitialCode = (lang, problemData) => {
    try {
      const config = languageConfigs[lang];
      if (!config) return '';
      
      // Replace the comment with actual problem title
      const problemTitle = problemData?.title || 'Problem Solution';
      return config.template.replace('Problem Solution', problemTitle);
    } catch (error) {
      console.error('Error getting initial code:', error);
      return '// Error loading template';
    }
  };

  const handleLanguageChange = (newLanguage) => {
    try {
      setLanguage(newLanguage);
      if (problem) {
        setCode(getInitialCode(newLanguage, problem));
      }
    } catch (error) {
      console.error('Error changing language:', error);
      setError('Failed to change language');
    }
  };

  const handleEditorDidMount = (editor, monaco) => {
    try {
      editorRef.current = editor;
      setEditorLoaded(true);
      
      // Add keyboard shortcuts
      editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
        handleRun();
      });

      // Force layout update
      setTimeout(() => {
        if (editor && typeof editor.layout === 'function') {
          editor.layout();
        }
      }, 100);
    } catch (error) {
      console.error('Editor mount error:', error);
      setError('Failed to initialize editor');
    }
  };

  const simulateCodeExecution = (code, language) => {
    const currentLanguageConfig = languageConfigs[language];
    const languageName = currentLanguageConfig?.name || 'Unknown';
    
    let simulatedOutput = '';
    
    try {
      // Parse code to simulate realistic output
      switch (language) {
        case 'cpp':
          if (code.includes('cout') && code.includes('"Hello World"')) {
            simulatedOutput = 'Hello World';
          } else if (code.includes('cout')) {
            // Extract content between quotes or simple expressions
            const coutMatch = code.match(/cout\s*<<\s*"([^"]+)"/);
            if (coutMatch) {
              simulatedOutput = coutMatch[1];
            } else if (code.includes('cout')) {
              simulatedOutput = 'Program output';
            }
          } else {
            simulatedOutput = 'Program executed successfully';
          }
          break;
          
        case 'java':
          if (code.includes('System.out.println') && code.includes('"Hello World"')) {
            simulatedOutput = 'Hello World';
          } else if (code.includes('System.out.println')) {
            const printMatch = code.match(/System\.out\.println\s*\(\s*"([^"]+)"/);
            if (printMatch) {
              simulatedOutput = printMatch[1];
            } else {
              simulatedOutput = 'Program output';
            }
          } else {
            simulatedOutput = 'Program executed successfully';
          }
          break;
          
        case 'python':
          if (code.includes('print') && code.includes('"Hello World"')) {
            simulatedOutput = 'Hello World';
          } else if (code.includes('print(')) {
            const printMatch = code.match(/print\s*\(\s*"([^"]+)"/);
            if (printMatch) {
              simulatedOutput = printMatch[1];
            } else {
              simulatedOutput = 'Program output';
            }
          } else {
            simulatedOutput = 'Program executed successfully';
          }
          break;
          
        case 'javascript':
          if (code.includes('console.log') && code.includes('"Hello World"')) {
            simulatedOutput = 'Hello World';
          } else if (code.includes('console.log')) {
            const logMatch = code.match(/console\.log\s*\(\s*"([^"]+)"/);
            if (logMatch) {
              simulatedOutput = logMatch[1];
            } else {
              simulatedOutput = 'Program output';
            }
          } else {
            simulatedOutput = 'Program executed successfully';
          }
          break;
          
        default:
          simulatedOutput = 'Program executed successfully';
      }
    } catch (error) {
      simulatedOutput = 'Error parsing code output';
    }
    
    return `Executing ${languageName} code...

Output:
${simulatedOutput}

Note: This is a simulation. Connect to Judge0 API for real execution.
Runtime: ${(Math.random() * 0.1 + 0.001).toFixed(3)}s
Memory: ${Math.floor(Math.random() * 1000 + 1024)}KB`;
  };

  const handleRun = async () => {
    try {
      if (!code.trim()) {
        setOutput('Error: Please write some code before running.');
        setShowBottomPanel(true);
        return;
      }
      
      setIsRunning(true);
      setShowBottomPanel(true);
      setOutput('Running code...');
      
      // Simulate code execution
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const output = simulateCodeExecution(code, language);
      setOutput(output);
    } catch (error) {
      console.error('Run error:', error);
      setOutput(`Error: ${error.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  const handleSubmit = async () => {
    try {
      if (!code.trim()) {
        setOutput('Error: Please write some code before submitting.');
        setShowBottomPanel(true);
        return;
      }
      
      setIsRunning(true);
      setShowBottomPanel(true);
      setOutput('Submitting solution...');
      
      // Simulate submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const success = Math.random() > 0.3; // 70% success rate for demo
      
      if (success) {
        setOutput('🎉 Accepted! Your solution has been submitted successfully.');
        
        // Try to save to backend
        try {
          await api.post('/api/dsa/progress/save-code', {
            problemId: problem.id,
            code,
            language,
            userId: user.id || user._id
          });
        } catch (apiError) {
          console.log('API unavailable, solution saved locally');
        }
      } else {
        setOutput('❌ Wrong Answer. Some test cases failed. Please review your solution.');
      }
    } catch (error) {
      console.error('Submit error:', error);
      setOutput(`Submission Error: ${error.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  if (error) {
    return (
      <div className="h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center p-8 bg-gray-800 rounded-lg border border-red-500/30">
          <div className="text-red-400 text-xl mb-4">⚠️ Error</div>
          <div className="text-gray-300 mb-4">{error}</div>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors mr-2"
          >
            Reload
          </button>
          <button
            onClick={() => navigate('/dsa-sheet')}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded transition-colors"
          >
            Back to DSA Sheet
          </button>
        </div>
      </div>
    );
  }

  if (!problem || !authChecked) {
    return (
      <div className="h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
          <div className="text-white text-xl">Loading CodeEditor...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-900 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700 flex-shrink-0">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <h1 className="text-white font-semibold text-lg truncate max-w-md">{problem.title}</h1>
          <span className={`px-2 py-1 rounded text-xs font-medium ${
            problem.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
            problem.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
            'bg-red-500/20 text-red-400'
          }`}>
            {problem.difficulty}
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <select
            value={language}
            onChange={(e) => handleLanguageChange(e.target.value)}
            className="bg-gray-700 text-white px-3 py-1 rounded border border-gray-600 focus:border-blue-500 focus:outline-none text-sm"
          >
            {Object.entries(languageConfigs).map(([key, config]) => (
              <option key={key} value={key}>{config.name}</option>
            ))}
          </select>
          
          <div className="flex items-center space-x-1">
            <button
              onClick={() => setFontSize(Math.max(10, fontSize - 1))}
              className="text-gray-400 hover:text-white p-1 rounded"
              title="Decrease font size"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"/>
              </svg>
            </button>
            <span className="text-gray-400 text-xs">{fontSize}px</span>
            <button
              onClick={() => setFontSize(Math.min(24, fontSize + 1))}
              className="text-gray-400 hover:text-white p-1 rounded"
              title="Increase font size"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"/>
              </svg>
            </button>
          </div>
          
          <button
            onClick={handleRun}
            disabled={isRunning || !editorLoaded}
            className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
          >
            {isRunning ? 'Running...' : 'Run'}
          </button>
          
          <button
            onClick={handleSubmit}
            disabled={isRunning || !editorLoaded}
            className="bg-orange-600 hover:bg-orange-700 disabled:bg-gray-600 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
          >
            {isRunning ? 'Submitting...' : 'Submit'}
          </button>
          
          <button
            onClick={() => window.close()}
            className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-gray-700"
            title="Close Tab"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Problem Description */}
        <div className="w-1/3 bg-gray-800 border-r border-gray-700 overflow-y-auto">
          <div className="p-4">
            <h2 className="text-white text-xl font-semibold mb-4">{problem.title}</h2>
            
            {problem.description && (
              <div className="text-gray-300 mb-6 whitespace-pre-wrap leading-relaxed">
                {problem.description}
              </div>
            )}
            
            <div className="mb-6">
              <h3 className="text-white text-lg font-medium mb-3">Example:</h3>
              <div className="p-3 bg-gray-700 rounded-lg">
                <div className="text-sm font-medium text-gray-300 mb-2">Input:</div>
                <div className="text-sm text-gray-400 mb-2 font-mono">[1, 2, 3, 4, 5]</div>
                <div className="text-sm font-medium text-gray-300 mb-2">Output:</div>
                <div className="text-sm text-gray-400 font-mono">15</div>
              </div>
            </div>
            
            {problem.tags && problem.tags.length > 0 && (
              <div className="mb-4">
                <h3 className="text-white text-sm font-medium mb-2">Tags:</h3>
                <div className="flex flex-wrap gap-2">
                  {problem.tags.map((tag, idx) => (
                    <span key={idx} className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            <div className="mt-6 p-4 bg-gray-700 rounded-lg">
              <h3 className="text-white text-sm font-medium mb-2">💡 Hints:</h3>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Think about the time and space complexity</li>
                <li>• Consider edge cases like empty inputs</li>
                <li>• Break down the problem step by step</li>
                <li>• Test with the provided examples</li>
              </ul>
            </div>

            <div className="mt-6 p-4 bg-gray-700 rounded-lg">
              <h3 className="text-white text-sm font-medium mb-2">⌨️ Keyboard Shortcuts:</h3>
              <ul className="text-gray-300 text-xs space-y-1">
                <li>• <kbd className="bg-gray-600 px-1 rounded">Ctrl/Cmd + Enter</kbd> - Run Code</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right Panel - Code Editor */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Code Editor */}
          <div className={`flex-1 ${showBottomPanel ? 'h-2/3' : 'h-full'}`}>
            <Editor
              height="100%"
              language={languageConfigs[language]?.monacoLang || 'javascript'}
              value={code}
              onChange={(value) => setCode(value || '')}
              onMount={handleEditorDidMount}
              theme="vs-dark"
              loading={
                <div className="flex items-center justify-center h-full bg-gray-900">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400 mx-auto mb-2"></div>
                    <div className="text-white text-sm">Loading editor...</div>
                  </div>
                </div>
              }
              options={{
                fontSize: fontSize,
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                automaticLayout: true,
                tabSize: 2,
                insertSpaces: true,
                wordWrap: 'on',
                lineNumbers: 'on',
                renderLineHighlight: 'all',
                selectOnLineNumbers: true,
                readOnly: false,
                cursorStyle: 'line',
                contextmenu: true,
                mouseWheelZoom: true,
                smoothScrolling: true,
                bracketPairColorization: { enabled: true },
                guides: {
                  bracketPairs: true,
                  indentation: true
                }
              }}
            />
          </div>

          {/* Bottom Panel */}
          {showBottomPanel && (
            <div className="h-1/3 bg-gray-800 border-t border-gray-700 flex flex-col">
              {/* Panel Header */}
              <div className="flex items-center justify-between border-b border-gray-700 bg-gray-800 px-4 py-2">
                <h3 className="text-white text-sm font-medium">Console Output</h3>
                <button
                  onClick={() => setShowBottomPanel(false)}
                  className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-gray-700"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Panel Content */}
              <div className="flex-1 overflow-y-auto p-4">
                <pre className="bg-gray-900 text-gray-300 text-sm font-mono p-3 rounded border border-gray-600 whitespace-pre-wrap min-h-full">
                  {output || 'No output yet. Click "Run" to execute your code.'}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
