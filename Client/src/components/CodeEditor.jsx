import React, { useState, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { FiPlay, FiSave, FiRefreshCw, FiMaximize2, FiMinimize2 } from 'react-icons/fi';
import api from '../utils/api';

const CodeEditor = ({ problem, onSave, initialCode = '' }) => {
  const [code, setCode] = useState(initialCode || getDefaultCode(problem?.codeEditorConfig?.defaultLanguage || 'javascript'));
  const [language, setLanguage] = useState(problem?.codeEditorConfig?.defaultLanguage || 'javascript');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [theme, setTheme] = useState('vs-dark');
  const editorRef = useRef(null);

  const languages = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'cpp', label: 'C++' },
    { value: 'c', label: 'C' }
  ];

  const themes = [
    { value: 'vs-dark', label: 'Dark' },
    { value: 'light', label: 'Light' },
    { value: 'hc-black', label: 'High Contrast' }
  ];

  function getDefaultCode(lang) {
    const templates = {
      javascript: `// JavaScript Solution
function solve() {
    // Write your solution here
    
    return result;
}

// Test your solution
console.log(solve());`,
      python: `# Python Solution
def solve():
    # Write your solution here
    
    return result

# Test your solution
print(solve())`,
      java: `// Java Solution
public class Solution {
    public static void main(String[] args) {
        Solution sol = new Solution();
        // Test your solution
        System.out.println(sol.solve());
    }
    
    public int solve() {
        // Write your solution here
        
        return result;
    }
}`,
      cpp: `// C++ Solution
#include <iostream>
#include <vector>
using namespace std;

class Solution {
public:
    int solve() {
        // Write your solution here
        
        return result;
    }
};

int main() {
    Solution sol;
    cout << sol.solve() << endl;
    return 0;
}`,
      c: `// C Solution
#include <stdio.h>

int solve() {
    // Write your solution here
    
    return result;
}

int main() {
    printf("%d\\n", solve());
    return 0;
}`
    };
    return templates[lang] || templates.javascript;
  }

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    
    // Configure editor options
    editor.updateOptions({
      fontSize: 14,
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      automaticLayout: true,
      wordWrap: 'on'
    });
  };

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    setCode(getDefaultCode(newLanguage));
  };

  const runCode = async () => {
    setIsRunning(true);
    setOutput('Running code...');
    
    try {
      // This is a placeholder for code execution
      // In a real implementation, you'd send the code to a backend service
      // that can safely execute code in a sandboxed environment
      
      setTimeout(() => {
        setOutput(`Code executed successfully!\n\nLanguage: ${language}\nCode length: ${code.length} characters\n\nNote: This is a demo output. In production, this would execute your code in a secure sandbox.`);
        setIsRunning(false);
      }, 2000);
      
    } catch (error) {
      setOutput(`Error: ${error.message}`);
      setIsRunning(false);
    }
  };

  const saveCode = async () => {
    try {
      if (onSave) {
        await onSave(code, language);
      }
      
      if (problem) {
        await api.post('/api/dsa/progress/save-code', {
          problemId: problem._id,
          code,
          language
        });
      }
      
      setOutput('Code saved successfully!');
    } catch (error) {
      setOutput(`Save error: ${error.message}`);
    }
  };

  const resetCode = () => {
    setCode(getDefaultCode(language));
    setOutput('');
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className={`bg-gray-900 rounded-lg overflow-hidden ${isFullscreen ? 'fixed inset-4 z-50' : 'h-96'}`}>
      {/* Header */}
      <div className="bg-gray-800 px-4 py-2 flex items-center justify-between border-b border-gray-700">
        <div className="flex items-center space-x-4">
          <select
            value={language}
            onChange={(e) => handleLanguageChange(e.target.value)}
            className="bg-gray-700 text-white px-3 py-1 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
          >
            {languages.map(lang => (
              <option key={lang.value} value={lang.value}>{lang.label}</option>
            ))}
          </select>
          
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="bg-gray-700 text-white px-3 py-1 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
          >
            {themes.map(t => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={runCode}
            disabled={isRunning}
            className="flex items-center space-x-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white px-3 py-1 rounded transition-colors"
          >
            {isRunning ? <FiRefreshCw className="animate-spin" /> : <FiPlay />}
            <span>{isRunning ? 'Running...' : 'Run'}</span>
          </button>
          
          <button
            onClick={saveCode}
            className="flex items-center space-x-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded transition-colors"
          >
            <FiSave />
            <span>Save</span>
          </button>
          
          <button
            onClick={resetCode}
            className="flex items-center space-x-1 bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded transition-colors"
          >
            <FiRefreshCw />
            <span>Reset</span>
          </button>
          
          <button
            onClick={toggleFullscreen}
            className="flex items-center space-x-1 bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded transition-colors"
          >
            {isFullscreen ? <FiMinimize2 /> : <FiMaximize2 />}
          </button>
        </div>
      </div>
      
      {/* Editor and Output */}
      <div className={`flex ${isFullscreen ? 'h-full' : 'h-80'}`}>
        {/* Code Editor */}
        <div className="flex-1 border-r border-gray-700">
          <Editor
            height="100%"
            language={language}
            value={code}
            theme={theme}
            onChange={setCode}
            onMount={handleEditorDidMount}
            options={{
              fontSize: 14,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              automaticLayout: true,
              wordWrap: 'on',
              lineNumbers: 'on',
              roundedSelection: false,
              scrollbar: {
                vertical: 'visible',
                horizontal: 'visible'
              }
            }}
          />
        </div>
        
        {/* Output Panel */}
        <div className="w-80 bg-gray-800 flex flex-col">
          <div className="bg-gray-700 px-3 py-2 text-white text-sm font-medium border-b border-gray-600">
            Output
          </div>
          <div className="flex-1 p-3 text-gray-300 text-sm font-mono overflow-auto">
            <pre className="whitespace-pre-wrap">{output || 'Run your code to see output here...'}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
