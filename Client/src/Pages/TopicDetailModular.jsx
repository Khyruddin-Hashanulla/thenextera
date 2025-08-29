import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaCheckCircle, FaCircle, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import ModularContentRouter from '../CoreSubjects/ModularContentRouter';
import ContentManager from '../CoreSubjects/ContentManager';
import ProgressManager from '../CoreSubjects/ProgressManager';

const TopicDetailModular = () => {
  const { subjectId, topicId, subtopicId } = useParams();
  const navigate = useNavigate();
  const [navigationData, setNavigationData] = useState(null);
  const [currentSubtopic, setCurrentSubtopic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const loadContent = () => {
      setLoading(true);
      try {
        // Validate path
        if (!ContentManager.isValidPath(subjectId, topicId, subtopicId)) {
          setError("Content not found");
          return;
        }

        // Get navigation data
        const navData = ContentManager.getTopicNavigation(subjectId, topicId);
        if (!navData) {
          setError("Topic not found");
          return;
        }

        setNavigationData(navData);

        // Get current subtopic if specified
        if (subtopicId) {
          const subtopic = ContentManager.getSubtopic(navData.subject.key, navData.topic.key, subtopicId);
          if (subtopic) {
            setCurrentSubtopic(subtopic);
            // Get real completion status from ProgressManager
            const isCompleted = ProgressManager.getSubtopicCompletion(parseInt(subjectId), parseInt(topicId), subtopicId);
            setProgress(isCompleted ? 100 : 0);
          } else {
            setError("Subtopic not found");
            return;
          }
        } else {
          // Default to first subtopic
          const firstSubtopic = navData.topic.subtopics?.[0];
          if (firstSubtopic) {
            const subtopicId = typeof firstSubtopic === 'string' ? firstSubtopic : firstSubtopic.id;
            navigate(`/subject/${subjectId}/topic/${topicId}/subtopic/${subtopicId}`, { replace: true });
            return;
          }
        }

        setError(null);
      } catch (err) {
        console.error('Error loading content:', err);
        setError("Failed to load content");
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [subjectId, topicId, subtopicId, navigate]);

  const handleMarkComplete = () => {
    if (currentSubtopic) {
      // Use ProgressManager to mark as complete with persistence
      ProgressManager.markSubtopicComplete(parseInt(subjectId), parseInt(topicId), subtopicId);
      setCurrentSubtopic(prev => ({ ...prev, completed: true }));
      setProgress(100);
    }
  };

  const handleSubtopicNavigation = (subtopicId) => {
    navigate(`/subject/${subjectId}/topic/${topicId}/subtopic/${subtopicId}`);
  };

  const handlePreviousTopic = () => {
    if (navigationData?.previousTopic) {
      navigate(`/subject/${subjectId}/topic/${navigationData.previousTopic.id}`);
    }
  };

  const handleNextTopic = () => {
    if (navigationData?.nextTopic) {
      navigate(`/subject/${subjectId}/topic/${navigationData.nextTopic.id}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-red-400 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={() => navigate(`/subject/${subjectId}`)}
            className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors duration-300"
          >
            <FaArrowLeft className="w-5 h-5" />
            <span>Back to {navigationData?.subject?.name}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
              {/* Topic Header */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">{navigationData?.topic?.name}</h1>
                {currentSubtopic && (
                  <h2 className="text-xl text-gray-300 mb-4">{currentSubtopic.title}</h2>
                )}
                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <span>Duration: {currentSubtopic?.duration || '30 min'}</span>
                  <span>•</span>
                  <span>Progress: {progress}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2 mt-4">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Modular Content */}
              {subtopicId && (
                <ModularContentRouter 
                  subjectId={parseInt(subjectId)}
                  topicId={parseInt(topicId)}
                  subtopicId={subtopicId}
                />
              )}

              {/* Action Button */}
              {currentSubtopic && progress < 100 && (
                <div className="mt-8 text-center">
                  <button
                    onClick={handleMarkComplete}
                    className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-300 flex items-center gap-2 mx-auto"
                  >
                    <FaCheckCircle className="w-5 h-5" />
                    Mark as Complete
                  </button>
                </div>
              )}

              {/* Completed Status */}
              {currentSubtopic && progress === 100 && (
                <div className="mt-8 text-center">
                  <div className="inline-flex items-center gap-2 px-6 py-3 bg-green-500/20 border border-green-500/30 text-green-400 rounded-lg">
                    <FaCheckCircle className="w-5 h-5" />
                    <span className="font-semibold">Completed!</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-white mb-4">
                {navigationData?.topic?.name} Subtopics
              </h3>

              <div className="space-y-3">
                {navigationData?.topic?.subtopics?.map((subtopic, index) => {
                  const subtopicId = typeof subtopic === 'string' ? subtopic : subtopic.id;
                  const subtopicTitle = typeof subtopic === 'string' 
                    ? ContentManager.formatTitle(subtopic) 
                    : subtopic.title;
                  const isActive = subtopicId === currentSubtopic?.id;
                  const isCompleted = ProgressManager.getSubtopicCompletion(parseInt(subjectId), parseInt(topicId), subtopicId);

                  return (
                    <button
                      key={subtopicId}
                      onClick={() => handleSubtopicNavigation(subtopicId)}
                      className={`w-full text-left p-3 rounded-lg transition-all duration-300 ${
                        isActive
                          ? 'bg-blue-500/20 border border-blue-500/30 text-blue-400'
                          : isCompleted
                          ? 'bg-green-500/10 border border-green-500/20 text-green-300 hover:bg-green-500/20'
                          : 'bg-gray-700/30 hover:bg-gray-700/50 text-gray-300 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-sm font-medium">{index + 1}</span>
                        {isCompleted ? (
                          <FaCheckCircle className="w-4 h-4 text-green-400" />
                        ) : (
                          <FaCircle className="w-4 h-4 text-gray-500" />
                        )}
                        <span className="text-sm">{subtopicTitle}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Navigation Buttons */}
              <div className="mt-6 space-y-3">
                {navigationData?.previousTopic && (
                  <button
                    onClick={handlePreviousTopic}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 hover:text-white transition-all duration-300"
                  >
                    <FaChevronLeft className="w-4 h-4" />
                    <span>Previous Topic</span>
                  </button>
                )}
                
                {navigationData?.nextTopic && (
                  <button
                    onClick={handleNextTopic}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300"
                  >
                    <span>Next Topic</span>
                    <FaChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Topic Info */}
              {navigationData && (
                <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <h4 className="text-sm font-semibold text-blue-400 mb-2">Current Topic</h4>
                  <p className="text-xs text-gray-300">{navigationData.topic.name}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Topic {navigationData.currentIndex + 1} of {navigationData.totalTopics}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicDetailModular;
