import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { 
  FaArrowLeft, 
  FaCheckCircle, 
  FaCircle, 
  FaBook, 
  FaClock, 
  FaGraduationCap,
  FaChevronLeft,
  FaChevronRight,
  FaSpinner,
  FaExclamationTriangle,
  FaDatabase,
  FaDesktop,
  FaNetworkWired,
  FaCode,
  FaPlay,
  FaUsers,
  FaStar,
  FaBookmark,
  FaShare
} from 'react-icons/fa';

// Import actual modular subjects
import { DBMS_TOPICS } from '../CoreSubjects/DBMS';
import { OS_TOPICS } from '../CoreSubjects/OS';
import { CN_TOPICS } from '../CoreSubjects/CN';
import { OOP_TOPICS } from '../CoreSubjects/OOP';
import ProgressManager from '../CoreSubjects/ProgressManager';

const SubjectDetail = () => {
  const { subjectId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [subject, setSubject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState(null);

  // Convert modular topics to display format with real completion data
  const convertTopicsToSections = (topicsObj, subjectId) => {
    return Object.entries(topicsObj).map(([key, topic]) => ({
      id: topic.id,
      title: topic.name,
      topics: topic.subtopics.map((subtopic, index) => {
        const subtopicId = typeof subtopic === 'string' ? subtopic : subtopic.id;
        return {
          id: `${topic.id}_${index + 1}`,
          title: formatSubtopicTitle(subtopicId),
          completed: ProgressManager.getSubtopicCompletion(subjectId, topic.id, subtopicId),
          subtopicId: subtopicId
        };
      })
    }));
  };

  // Format subtopic ID to readable title
  const formatSubtopicTitle = (subtopicId) => {
    // Special handling for acronyms
    const acronymMap = {
      'fcfs': 'FCFS',
      'sjf': 'SJF',
      'FCFS': 'FCFS',
      'SJF': 'SJF'
    };
    
    if (acronymMap[subtopicId]) {
      return acronymMap[subtopicId];
    }
    
    return subtopicId
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Real subjects data using modular structure
  const realSubjects = {
    1: {
      id: 1,
      name: "Database Management Systems (DBMS)",
      icon: FaDatabase,
      description: "Comprehensive database fundamentals, design, and implementation covering all essential concepts for placement preparation and technical interviews.",
      estimatedTime: "12-15 hours",
      difficulty: "Intermediate",
      sections: convertTopicsToSections(DBMS_TOPICS, 1)
    },
    2: {
      id: 2,
      name: "Operating Systems",
      icon: FaDesktop,
      description: "Core operating system concepts including process management, memory management, file systems, and synchronization mechanisms.",
      estimatedTime: "10-12 hours", 
      difficulty: "Intermediate",
      sections: convertTopicsToSections(OS_TOPICS, 2)
    },
    3: {
      id: 3,
      name: "Computer Networks",
      icon: FaNetworkWired,
      description: "Comprehensive study of computer networking concepts covering OSI model, TCP/IP, routing protocols, and network security.",
      estimatedTime: "8-10 hours",
      difficulty: "Intermediate", 
      sections: convertTopicsToSections(CN_TOPICS, 3)
    },
    4: {
      id: 4,
      name: "Object-Oriented Programming (OOPS)",
      icon: FaCode,
      description: "Fundamental object-oriented programming concepts including encapsulation, inheritance, polymorphism, and abstraction.",
      estimatedTime: "6-8 hours",
      difficulty: "Beginner to Intermediate",
      sections: convertTopicsToSections(OOP_TOPICS, 4)
    }
  };

  useEffect(() => {
    const subjectData = realSubjects[parseInt(subjectId)];
    if (subjectData) {
      setSubject(subjectData);
      setActiveSection(subjectData.sections[0]?.id);
      
      // Calculate progress using ProgressManager
      const topicsMap = {
        1: DBMS_TOPICS,
        2: OS_TOPICS,
        3: CN_TOPICS,
        4: OOP_TOPICS
      };
      
      const progressData = ProgressManager.getSubjectProgress(parseInt(subjectId), topicsMap[parseInt(subjectId)]);
      setProgress(progressData.percentage);
    } else {
      setError('Subject not found');
    }
    setLoading(false);
  }, [subjectId]);

  // Listen for progress updates
  useEffect(() => {
    const handleProgressUpdate = (event) => {
      if (event.detail.subjectId === parseInt(subjectId)) {
        // Refresh progress data
        const topicsMap = {
          1: DBMS_TOPICS,
          2: OS_TOPICS,
          3: CN_TOPICS,
          4: OOP_TOPICS
        };
        
        const progressData = ProgressManager.getSubjectProgress(parseInt(subjectId), topicsMap[parseInt(subjectId)]);
        setProgress(progressData.percentage);
        
        // Update subject sections with new completion status
        const updatedSubject = { ...subject };
        updatedSubject.sections = convertTopicsToSections(topicsMap[parseInt(subjectId)], parseInt(subjectId));
        setSubject(updatedSubject);
      }
    };

    window.addEventListener('progressUpdated', handleProgressUpdate);
    return () => window.removeEventListener('progressUpdated', handleProgressUpdate);
  }, [subjectId, subject]);

  const handleTopicClick = (sectionId, topicId, subtopicId) => {
    navigate(`/subject/${subjectId}/topic/${sectionId}/subtopic/${subtopicId}`);
  };

  const handleContinueLearning = () => {
    // Find the first incomplete topic to continue learning
    for (const section of subject.sections) {
      for (const topic of section.topics) {
        if (!topic.completed) {
          navigate(`/subject/${subjectId}/topic/${section.id}/subtopic/${topic.subtopicId}`);
          return;
        }
      }
    }
    
    // If all topics are completed, go to the first topic
    if (subject.sections.length > 0 && subject.sections[0].topics.length > 0) {
      const firstSection = subject.sections[0];
      const firstTopic = firstSection.topics[0];
      navigate(`/subject/${subjectId}/topic/${firstSection.id}/subtopic/${firstTopic.subtopicId}`);
    }
  };

  const handleSave = () => {
    // Save subject to user's saved/bookmarked subjects
    const savedSubjects = JSON.parse(localStorage.getItem('savedSubjects') || '[]');
    const subjectData = {
      id: subject.id,
      name: subject.name,
      progress: progress,
      savedAt: new Date().toISOString()
    };
    
    // Check if already saved
    const existingIndex = savedSubjects.findIndex(s => s.id === subject.id);
    if (existingIndex >= 0) {
      savedSubjects[existingIndex] = subjectData;
    } else {
      savedSubjects.push(subjectData);
    }
    
    localStorage.setItem('savedSubjects', JSON.stringify(savedSubjects));
    
    // Show success feedback
    alert('Subject saved to your bookmarks!');
  };

  const handleShare = () => {
    const shareData = {
      title: `${subject.name} - NextEra Learning Platform`,
      text: `Check out this ${subject.name} course on NextEra! ${subject.description}`,
      url: window.location.href
    };

    // Use Web Share API if available
    if (navigator.share) {
      navigator.share(shareData).catch(err => {
        console.log('Error sharing:', err);
        fallbackShare();
      });
    } else {
      fallbackShare();
    }
  };

  const fallbackShare = () => {
    // Fallback: Copy link to clipboard
    navigator.clipboard.writeText(window.location.href).then(() => {
      alert('Course link copied to clipboard!');
    }).catch(() => {
      // Final fallback: Show share modal or prompt
      const shareText = `Check out this ${subject.name} course: ${window.location.href}`;
      prompt('Copy this link to share:', shareText);
    });
  };

  const handleEnrollClick = () => {
    // Same as continue learning for now
    handleContinueLearning();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center h-screen pt-32">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-300 text-lg">Loading subject...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !subject) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center h-screen pt-32">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Subject Not Found</h2>
            <p className="text-gray-300 mb-6">{error || 'The requested subject could not be found.'}</p>
            <button
              onClick={() => navigate('/core-subject')}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
            >
              Back to Core Subjects
            </button>
          </div>
        </div>
      </div>
    );
  }

  const IconComponent = subject.icon;
  const completedTopics = subject.sections.reduce((acc, section) => 
    acc + section.topics.filter(topic => topic.completed).length, 0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/30 flex flex-col">
      <Navbar />
      
      <div className="flex-grow flex flex-col">
        {/* Main Content Layout */}
        <div className="pt-32 px-4 pb-8 max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left Sidebar - Navigation */}
            <div className="lg:col-span-3">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-4 sm:p-6 sticky top-24">
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <IconComponent className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" />
                  <h3 className="text-base sm:text-lg font-semibold text-white">Course Content</h3>
                </div>
                
                <div className="space-y-3 sm:space-y-4">
                  {subject.sections.map((section) => (
                    <div key={section.id} className="space-y-2">
                      <button
                        onClick={() => setActiveSection(activeSection === section.id ? null : section.id)}
                        className="w-full flex items-center justify-between p-2 sm:p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300 text-left"
                      >
                        <span className="text-white font-medium text-sm sm:text-base">{section.title}</span>
                        <FaChevronRight 
                          className={`w-3 h-3 sm:w-4 sm:h-4 text-gray-400 transition-transform duration-300 ${
                            activeSection === section.id ? 'rotate-90' : ''
                          }`} 
                        />
                      </button>
                      
                      {activeSection === section.id && (
                        <div className="ml-2 sm:ml-4 space-y-1">
                          {section.topics.map((topic) => (
                            <button
                              key={topic.id}
                              onClick={() => handleTopicClick(section.id, topic.id, topic.subtopicId)}
                              className={`w-full flex items-center gap-2 sm:gap-3 p-2 rounded-lg text-left transition-all duration-300 ${
                                topic.completed 
                                  ? 'bg-green-500/20 text-green-300 hover:bg-green-500/30' 
                                  : 'bg-white/5 text-gray-300 hover:bg-white/10'
                              }`}
                            >
                              {topic.completed ? (
                                <FaCheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-400 flex-shrink-0" />
                              ) : (
                                <FaCircle className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 flex-shrink-0" />
                              )}
                              <span className="text-xs sm:text-sm">{topic.title}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-6">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-4 sm:p-6 lg:p-8">
                {/* Subject Header */}
                <div className="text-center mb-6 sm:mb-8">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">{subject.name}</h1>
                  <p className="text-gray-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
                    {subject.description}
                  </p>
                </div>

                {/* Subject Icon */}
                <div className="flex justify-center mb-6 sm:mb-8">
                  <div className={`w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-3xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-2xl`}>
                    <IconComponent className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 text-white" />
                  </div>
                </div>

                {/* Progress Section */}
                <div className="bg-white/5 rounded-xl p-4 sm:p-6 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg sm:text-xl font-semibold text-white">Your Progress</h3>
                    <span className="text-xl sm:text-2xl font-bold text-blue-400">{progress}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3 mb-4">
                    <div 
                      className={`h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500`}
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <div className="flex flex-col sm:flex-row justify-between gap-2 text-sm text-gray-400">
                    <span>{completedTopics} of {subject.sections.reduce((acc, section) => acc + section.topics.length, 0)} topics completed</span>
                    <span>{subject.estimatedTime} remaining</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                  <button
                    onClick={handleContinueLearning}
                    className={`w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2`}
                  >
                    <FaPlay className="w-4 h-4 sm:w-5 sm:h-5" />
                    Continue Learning
                  </button>
                  <button
                    onClick={handleSave}
                    className="w-full sm:w-auto px-4 sm:px-6 py-3 sm:py-4 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <FaBookmark className="w-4 h-4 sm:w-5 sm:h-5" />
                    Save
                  </button>
                  <button
                    onClick={handleShare}
                    className="w-full sm:w-auto px-4 sm:px-6 py-3 sm:py-4 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <FaShare className="w-4 h-4 sm:w-5 sm:h-5" />
                    Share
                  </button>
                </div>
              </div>
            </div>

            {/* Right Sidebar - Course Info */}
            <div className="lg:col-span-3">
              <div className="space-y-4 sm:space-y-6">
                {/* Course Stats */}
                <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-4 sm:p-6">
                  <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Course Details</h3>
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-center gap-3">
                      <FaClock className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 flex-shrink-0" />
                      <div>
                        <p className="text-gray-300 text-xs sm:text-sm">Duration</p>
                        <p className="text-white font-medium text-sm sm:text-base">{subject.estimatedTime}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <FaUsers className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0" />
                      <div>
                        <p className="text-gray-300 text-xs sm:text-sm">Difficulty</p>
                        <p className="text-white font-medium text-sm sm:text-base">{subject.difficulty}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <FaStar className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 flex-shrink-0" />
                      <div>
                        <p className="text-gray-300 text-xs sm:text-sm">Topics</p>
                        <p className="text-white font-medium text-sm sm:text-base">{subject.sections.reduce((acc, section) => acc + section.topics.length, 0)} lessons</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Enrollment CTA */}
                <div className={`bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl p-4 sm:p-6 text-white`}>
                  <h3 className="text-lg sm:text-xl font-bold mb-2">Ready to Start?</h3>
                  <p className="text-white/90 text-xs sm:text-sm mb-3 sm:mb-4">
                    Join thousands of students mastering {subject.name}
                  </p>
                  <button 
                    onClick={handleContinueLearning}
                    className="w-full py-2 sm:py-3 bg-white/20 hover:bg-white/30 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300"
                  >
                    Enroll Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SubjectDetail;
