import React, { useState, useEffect } from 'react';
import { FiX, FiExternalLink, FiBookmark, FiCheck, FiCode } from 'react-icons/fi';
import CodeEditor from './CodeEditor';
import api from '../utils/api';

const ProblemModal = ({ problem, isOpen, onClose, onProgressUpdate }) => {
  const [activeTab, setActiveTab] = useState('description');
  const [userProgress, setUserProgress] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && problem) {
      console.log('ProblemModal opened with problem:', problem);
      console.log('Problem solution:', problem.solution);
      
      // Auto-switch to solution tab if it's a YouTube video
      if (problem.solution && problem.solution.type === 'youtube' && problem.solution.youtubeLink) {
        setActiveTab('solution');
      } else {
        setActiveTab('description');
      }
      
      fetchUserProgress();
    }
  }, [isOpen, problem]);

  useEffect(() => {
    console.log('Active tab changed to:', activeTab);
  }, [activeTab]);

  const fetchUserProgress = async () => {
    try {
      const response = await api.get(`/api/dsa/progress/user/${problem._id}`);
      if (response.data.success) {
        setUserProgress(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching user progress:', error);
    }
  };

  const handleProgressMark = async (type) => {
    setLoading(true);
    try {
      const response = await api.post('/api/dsa/progress/mark', {
        problemId: problem._id,
        type
      });

      if (response.data.success) {
        setUserProgress(response.data.data);
        if (onProgressUpdate) {
          onProgressUpdate();
        }
      }
    } catch (error) {
      console.error('Error marking progress:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCodeSave = async (code, language) => {
    try {
      await api.post('/api/dsa/progress/save-code', {
        problemId: problem._id,
        code,
        language
      });
      await fetchUserProgress();
    } catch (error) {
      console.error('Error saving code:', error);
      throw error;
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'medium': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'hard': return 'text-red-400 bg-red-400/10 border-red-400/20';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    }
  };

  if (!isOpen || !problem) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h2 className="text-xl font-bold">{problem.title}</h2>
              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(problem.difficulty)}`}>
                {problem.difficulty}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <FiX size={20} />
            </button>
          </div>
          
          {/* Progress Actions */}
          <div className="flex items-center space-x-3 mt-3">
            <button
              onClick={() => handleProgressMark('practiced')}
              disabled={loading}
              className={`flex items-center space-x-1 px-3 py-1 rounded-lg text-sm transition-colors ${
                userProgress?.practiced 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              <FiCode size={14} />
              <span>Practiced</span>
            </button>
            
            <button
              onClick={() => handleProgressMark('completed')}
              disabled={loading}
              className={`flex items-center space-x-1 px-3 py-1 rounded-lg text-sm transition-colors ${
                userProgress?.completed 
                  ? 'bg-green-500 text-white' 
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              <FiCheck size={14} />
              <span>Completed</span>
            </button>
            
            <button
              onClick={() => handleProgressMark('bookmarked')}
              disabled={loading}
              className={`flex items-center space-x-1 px-3 py-1 rounded-lg text-sm transition-colors ${
                userProgress?.bookmarked 
                  ? 'bg-yellow-500 text-white' 
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              <FiBookmark size={14} />
              <span>Bookmark</span>
            </button>
            
            {problem.practiceLink && (
              <a
                href={problem.practiceLink.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 px-3 py-1 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition-colors"
              >
                <FiExternalLink size={14} />
                <span>Practice on {problem.practiceLink.platform}</span>
              </a>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700">
          <div className="flex space-x-8 px-6">
            {['description', 'solution', 'code'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-3 px-1 border-b-2 font-medium text-sm capitalize transition-colors ${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto max-h-[calc(90vh-200px)]">
          {activeTab === 'description' && (
            <div className="p-6">
              <div className="prose dark:prose-invert max-w-none">
                <div className="whitespace-pre-wrap text-gray-700 dark:text-gray-300">
                  {problem.description}
                </div>
                
                {problem.tags && problem.tags.length > 0 && (
                  <div className="mt-6">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Tags:</h4>
                    <div className="flex flex-wrap gap-2">
                      {problem.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {problem.companies && problem.companies.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Companies:</h4>
                    <div className="flex flex-wrap gap-2">
                      {problem.companies.map((company, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300 text-xs rounded-full"
                        >
                          {company}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'solution' && (
            <div className="p-6">
              {problem.solution ? (
                <div className="space-y-6">
                  {problem.solution.type === 'youtube' && problem.solution.youtubeLink && (
                    <div>
                      <h4 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3">Video Solution</h4>
                      <div className="aspect-video rounded-lg overflow-hidden">
                        <iframe
                          src={(() => {
                            const url = problem.solution.youtubeLink;
                            console.log('Original YouTube URL:', url);
                            let videoId = '';
                            
                            if (url.includes('youtu.be/')) {
                              // Extract video ID from youtu.be/VIDEO_ID format
                              videoId = url.split('youtu.be/')[1].split('?')[0];
                              console.log('Extracted videoId from youtu.be:', videoId);
                            } else if (url.includes('youtube.com/watch?v=')) {
                              // Extract video ID from youtube.com/watch?v=VIDEO_ID format
                              videoId = url.split('v=')[1].split('&')[0];
                              console.log('Extracted videoId from youtube.com:', videoId);
                            } else if (url.includes('youtube.com/embed/')) {
                              // Already in embed format
                              console.log('URL already in embed format:', url);
                              return url;
                            }
                            
                            const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
                            console.log('Final embed URL:', embedUrl);
                            return embedUrl;
                          })()}
                          title="Video Solution"
                          className="w-full h-full"
                          allowFullScreen
                          onLoad={() => console.log('YouTube iframe loaded successfully')}
                          onError={(e) => console.error('YouTube iframe error:', e)}
                        />
                      </div>
                      <div className="mt-2 text-sm text-gray-500">
                        Debug: {problem.solution.youtubeLink}
                      </div>
                    </div>
                  )}
                  
                  {problem.solution.type === 'text' && problem.solution.textExplanation && (
                    <div>
                      <h4 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3">Text Solution</h4>
                      <div className="prose dark:prose-invert max-w-none">
                        <div className="whitespace-pre-wrap text-gray-700 dark:text-gray-300">
                          {problem.solution.textExplanation}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {problem.solution.type === 'code' && problem.solution.codeSnippet && (
                    <div>
                      <h4 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3">Code Solution ({problem.solution.codeSnippet.language})</h4>
                      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
                        <code className="text-sm text-gray-800 dark:text-gray-200">
                          {problem.solution.codeSnippet.code}
                        </code>
                      </pre>
                    </div>
                  )}
                  
                  {!problem.solution.type && (
                    <div className="text-center py-12">
                      <p className="text-gray-500 dark:text-gray-400">No solution available yet.</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500 dark:text-gray-400">No solution available yet.</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'code' && (
            <div className="p-6">
              {problem.hasCodeEditor ? (
                <CodeEditor
                  problem={problem}
                  onSave={handleCodeSave}
                  initialCode={userProgress?.lastAttemptCode?.code || ''}
                />
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500 dark:text-gray-400">Code editor is not available for this problem.</p>
                  {problem.practiceLink && (
                    <a
                      href={problem.practiceLink.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1 mt-4 text-blue-600 hover:text-blue-700 dark:text-blue-400"
                    >
                      <FiExternalLink size={16} />
                      <span>Practice on {problem.practiceLink.platform}</span>
                    </a>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProblemModal;
