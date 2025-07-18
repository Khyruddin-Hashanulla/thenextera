import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import Navbar from '../components/Navbar';

const CourseView = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [completedVideos, setCompletedVideos] = useState([]);
  const [progress, setProgress] = useState(0);
  const [expandedSections, setExpandedSections] = useState({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourse();
  }, [courseId]);

  const updateProgress = async () => {
    try {
      if (!course || !course.sections || course.sections.length === 0) {
        console.error('Cannot update progress: Course data is not available');
        return;
      }

      // Calculate current video's overall index
      let currentOverallIndex = 0;
      for (let i = 0; i < currentSectionIndex; i++) {
        currentOverallIndex += course.sections[i].videos.length;
      }
      currentOverallIndex += currentVideoIndex;

      // Add to completed videos if not already completed
      let newCompletedVideos = [...completedVideos];
      if (!completedVideos.includes(currentOverallIndex)) {
        newCompletedVideos.push(currentOverallIndex);
        setCompletedVideos(newCompletedVideos);
      }

      // Calculate total videos and new progress
      const totalVideos = course.sections.reduce((total, section) => total + section.videos.length, 0);
      const newProgress = Math.round((newCompletedVideos.length / totalVideos) * 100);
      setProgress(newProgress);

      // Update progress on server
      await api.post(`/api/courses/${courseId}/progress`, {
        completedVideos: newCompletedVideos,
        progress: newProgress,
        lastWatched: currentOverallIndex
      });

      console.log('Progress updated:', {
        completedVideos: newCompletedVideos,
        progress: newProgress,
        lastWatched: currentOverallIndex
      });
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  };

  const handleVideoEnd = () => {
    updateProgress();
    // Auto-advance to next video if available
    if (!course || !course.sections || course.sections.length === 0) return;
    
    const currentSection = course.sections[currentSectionIndex];
    if (!currentSection || !currentSection.videos) return;
    
    if (currentVideoIndex < currentSection.videos.length - 1) {
      setCurrentVideoIndex(prev => prev + 1);
    } else if (currentSectionIndex < course.sections.length - 1) {
      setCurrentSectionIndex(prev => prev + 1);
      setCurrentVideoIndex(0);
    }
  };

  // Effect to handle welcome message
  useEffect(() => {
    if (course) {
      // setShowWelcomeMessage(true); // This line was removed as per the edit hint
      const timer = setTimeout(() => {
        // setShowWelcomeMessage(false); // This line was removed as per the edit hint
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [course]);

  // Initialize expanded sections when course data is loaded
  useEffect(() => {
    if (course?.sections) {
      const initialExpanded = {};
      course.sections.forEach((_, index) => {
        initialExpanded[index] = index === currentSectionIndex;
      });
      setExpandedSections(initialExpanded);
    }
  }, [course, currentSectionIndex]);

  const toggleSection = (sectionIndex) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionIndex]: !prev[sectionIndex]
    }));
  };

  const fetchCourse = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log('Fetching course:', courseId);

      const response = await api.get(`/api/courses/${courseId}`);
      
      console.log('Received course data:', {
        id: response.data._id,
        title: response.data.title,
        sections: response.data.sections?.map(s => ({
          title: s.title,
          videosCount: s.videos?.length || 0,
        })),
        totalSections: response.data.sections?.length || 0,
      });

      if (!response.data || !response.data._id) {
        throw new Error('Invalid course data received');
      }

      let processedCourse = {
        ...response.data,
        sections: response.data.sections?.map(section => ({
          ...section,
          videos: section.videos?.filter(video => video && video.url) || [],
        })).filter(section => section.videos?.length > 0) || [],
      };

      console.log('Processed course data:', {
        id: processedCourse._id,
        title: processedCourse.title,
        sections: processedCourse.sections?.map(s => ({
          title: s.title,
          videosCount: s.videos?.length || 0,
        })),
        totalSections: processedCourse.sections?.length || 0,
      });

      if (!processedCourse.sections || processedCourse.sections.length === 0) {
        console.warn('No valid sections found in course data');
      }

      setCourse(processedCourse);
      
      // Initialize expanded sections
      if (processedCourse.sections?.length > 0) {
        const initialExpanded = {};
        processedCourse.sections.forEach((_, index) => {
          initialExpanded[index] = index === 0;
        });
        setExpandedSections(initialExpanded);
      }
      
      // Fetch progress after setting course
      fetchProgress(processedCourse);
    } catch (err) {
      console.error('Error fetching course:', {
        error: err.message,
        response: err.response?.data,
        status: err.response?.status,
      });

      let errorMessage = 'Failed to load course';
      
      if (err.response) {
        switch (err.response.status) {
          case 400:
            errorMessage = err.response.data?.error || 'Invalid course ID';
            break;
          case 401:
            errorMessage = 'Please log in to view this course';
            navigate('/login');
            break;
          case 403:
            errorMessage = 'You are not enrolled in this course';
            navigate('/courses');
            break;
          case 404:
            errorMessage = 'Course not found';
            navigate('/courses');
            break;
          default:
            errorMessage = err.response.data?.error || 'Failed to load course';
        }
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const fetchProgress = async (courseData) => {
    try {
      const response = await api.get(`/api/courses/${courseId}/progress`);
      setCompletedVideos(response.data.completedVideos || []);
      setProgress(response.data.progress || 0);
      
      // Set initial video position based on last watched
      if (response.data.lastWatched && courseData) {
        let totalVideos = 0;
        let found = false;
        
        for (let i = 0; i < courseData.sections?.length && !found; i++) {
          if (totalVideos + courseData.sections[i].videos.length > response.data.lastWatched) {
            setCurrentSectionIndex(i);
            setCurrentVideoIndex(response.data.lastWatched - totalVideos);
            found = true;
          }
          totalVideos += courseData.sections[i].videos.length;
        }
      }
    } catch (error) {
      console.error('Error fetching progress:', error);
    }
  };

  const handleEnroll = async () => {
    try {
      setEnrolling(true);
      const response = await api.post(`/api/courses/enroll/${courseId}`);
      console.log('Enrollment response:', response.data);
      setShowSuccessMessage(true);
      // Hide success message after 5 seconds
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 5000);
      await fetchCourse();
    } catch (err) {
      console.error('Error enrolling in course:', err);
      setError(err.response?.data?.error || 'Failed to enroll in course');
    } finally {
      setEnrolling(false);
    }
  };

  const getCurrentVideo = () => {
    if (!course || !course.sections || course.sections.length === 0) return null;
    
    // Ensure indices are within bounds
    const validSectionIndex = Math.min(currentSectionIndex, course.sections.length - 1);
    if (validSectionIndex < 0) return null;
    
    const currentSection = course.sections[validSectionIndex];
    if (!currentSection || !currentSection.videos || currentSection.videos.length === 0) return null;
    
    const validVideoIndex = Math.min(currentVideoIndex, currentSection.videos.length - 1);
    if (validVideoIndex < 0) return null;
    
    return currentSection.videos[validVideoIndex];
  };

  const getVideoEmbedUrl = (url) => {
    if (!url) return '';
    
    // Handle YouTube URLs
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      // Extract video ID
      let videoId = '';
      if (url.includes('youtube.com/watch')) {
        const urlParams = new URLSearchParams(new URL(url).search);
        videoId = urlParams.get('v');
      } else if (url.includes('youtu.be/')) {
        videoId = url.split('youtu.be/')[1].split('?')[0];
      } else if (url.includes('youtube.com/embed/')) {
        videoId = url.split('youtube.com/embed/')[1].split('?')[0];
      }
      
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }
    }
    
    // Handle Vimeo URLs
    if (url.includes('vimeo.com')) {
      const vimeoId = url.split('vimeo.com/')[1].split('?')[0];
      if (vimeoId) {
        return `https://player.vimeo.com/video/${vimeoId}`;
      }
    }
    
    // Return the original URL for direct video files
    return url;
  };

  const handleSectionChange = (sectionIndex) => {
    setCurrentSectionIndex(sectionIndex);
    setCurrentVideoIndex(0);
  };

  const handleVideoChange = (videoIndex) => {
    setCurrentVideoIndex(videoIndex);
  };

  // Get current video
  const currentVideo = getCurrentVideo();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-200 via-red-400 to-pink-600 flex items-center justify-center">
        <div className="bg-white/30 backdrop-blur-md p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Loading course...</h2>
          <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-200 via-red-400 to-pink-600 flex items-center justify-center">
        <div className="bg-white/30 backdrop-blur-md p-8 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Error</h2>
          <p className="text-gray-800 mb-6">{error}</p>
          <div className="flex justify-center">
            <button
              onClick={() => navigate('/courses')}
              className="px-4 py-2 bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white rounded-md transition-colors"
            >
              Back to Courses
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-200 via-red-400 to-pink-600 flex items-center justify-center">
        <div className="bg-white/30 backdrop-blur-md p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Course not found</h2>
          <div className="flex justify-center">
            <button
              onClick={() => navigate('/courses')}
              className="px-4 py-2 bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white rounded-md transition-colors"
            >
              Back to Courses
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-orange-200 via-red-400 to-pink-600">
      {/* Back Button Only in Top Area */}
      <div className="fixed top-0 left-0 z-50 p-4">
        <Link
          to="/courses"
          className="flex items-center text-gray-900 hover:text-black transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="ml-2 font-medium">Back to Courses</span>
        </Link>
      </div>

      {/* Hamburger Menu Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-4 right-4 z-50 p-2 rounded-lg bg-white/30 backdrop-blur-md lg:hidden"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-gray-900"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {isSidebarOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:sticky top-0 left-0 h-screen w-80 bg-gradient-to-br from-orange-200 via-red-400 to-pink-600 shadow-lg transform transition-transform duration-300 ease-in-out z-40 
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
          lg:translate-x-0 lg:transform-none`}
      >
        <div className="h-full p-4 pt-16 overflow-y-auto">
          {/* Course Title */}
          <h2 className="text-xl font-bold mb-2 text-gray-900">{course?.title}</h2>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-gray-900">Course Progress</span>
              <span className="text-sm font-medium text-gray-900">{progress}%</span>
            </div>
            <div className="h-2 bg-gray-200/50 rounded-full w-full">
              <div
                className="h-full bg-green-500 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="mt-1 text-sm text-gray-700 flex justify-between">
              <span>Video {currentVideoIndex + 1} of {course?.sections?.reduce((total, section) => total + (section.videos?.length || 0), 0) || 0}</span>
              <span>Section {currentSectionIndex + 1} of {course?.sections?.length || 0}</span>
            </div>
          </div>
          
          {/* Sections and Videos List */}
          <div className="space-y-4">
            {course?.sections?.length > 0 ? (
              course.sections.map((section, sectionIndex) => {
                // Calculate starting video index for this section
                let sectionStartIndex = 0;
                for (let i = 0; i < sectionIndex; i++) {
                  sectionStartIndex += course.sections[i].videos.length;
                }

                return (
                  <div key={sectionIndex} className="space-y-2">
                    <div 
                      className="text-lg font-semibold text-gray-900 cursor-pointer hover:text-gray-700 flex items-center justify-between p-2 rounded-lg hover:bg-white/10"
                      onClick={() => toggleSection(sectionIndex)}
                    >
                      <div className="flex items-center gap-2">
                        <svg
                          className={`w-5 h-5 transform transition-transform ${expandedSections[sectionIndex] ? 'rotate-90' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                        <span>{section.title}</span>
                      </div>
                      <span className="text-sm text-gray-700 bg-white/20 px-2 py-1 rounded">
                        {section.videos?.length || 0} videos
                      </span>
                    </div>
                    <div 
                      className={`pl-2 space-y-2 transition-all duration-300 ${
                        expandedSections[sectionIndex] 
                          ? 'max-h-[1000px] opacity-100' 
                          : 'max-h-0 opacity-0 overflow-hidden'
                      }`}
                    >
                      {section.videos?.map((video, videoIndex) => {
                        const overallVideoIndex = sectionStartIndex + videoIndex;
                        const isCompleted = completedVideos.includes(overallVideoIndex);
                        const isActive = currentSectionIndex === sectionIndex && currentVideoIndex === videoIndex;

                        return (
                          <button
                            key={videoIndex}
                            onClick={() => {
                              handleSectionChange(sectionIndex);
                              handleVideoChange(videoIndex);
                              setIsSidebarOpen(false);
                            }}
                            className={`w-full p-3 text-left rounded-lg transition-all duration-200 ${
                              isActive
                                ? 'bg-white/30 text-gray-900'
                                : 'hover:bg-white/20 text-gray-800'
                            }`}
                          >
                            <div className="flex items-center">
                              <div className={`w-8 h-8 flex items-center justify-center rounded-full border-2 mr-3 transition-colors ${
                                isCompleted 
                                  ? 'border-green-500 bg-green-500/20 text-green-700'
                                  : 'border-current text-gray-700'
                              }`}>
                                <span>{videoIndex + 1}</span>
                              </div>
                              <span className="flex-1 line-clamp-2">{video.title}</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center text-gray-700 p-4 bg-white/10 rounded-lg">
                No sections available
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 min-h-screen">
        <div className="p-4 pt-16 lg:p-6 lg:pt-16">
          <div className="max-w-4xl mx-auto">
            {/* Video Player */}
            <div className="relative bg-black rounded-lg overflow-hidden mb-6" style={{ paddingTop: '56.25%' }}>
              {currentVideo ? (
                currentVideo.url.includes('/uploads/') ? (
                  <video
                    src={getVideoEmbedUrl(currentVideo.url)}
                    className="absolute inset-0 w-full h-full"
                    controls
                    controlsList="nodownload"
                    playsInline
                    onEnded={handleVideoEnd}
                  >
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <iframe
                    src={getVideoEmbedUrl(currentVideo.url)}
                    className="absolute inset-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={currentVideo.title}
                  />
                )
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                  <p className="text-white">No video selected</p>
                </div>
              )}
            </div>

            {/* Video Info */}
            {currentVideo && (
              <div className="bg-white/20 backdrop-blur-md rounded-lg p-4 mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2">{currentVideo.title}</h2>
                {currentVideo.description && (
                  <p className="text-gray-800">{currentVideo.description}</p>
                )}
              </div>
            )}

            {/* Navigation Controls */}
            <div className="flex justify-between">
              <button
                onClick={() => {
                  if (currentVideoIndex > 0) {
                    setCurrentVideoIndex(prev => prev - 1);
                  } else if (currentSectionIndex > 0) {
                    const prevSectionIndex = currentSectionIndex - 1;
                    setCurrentSectionIndex(prevSectionIndex);
                    setCurrentVideoIndex(course.sections[prevSectionIndex].videos.length - 1);
                  }
                }}
                disabled={currentSectionIndex === 0 && currentVideoIndex === 0}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                  currentSectionIndex === 0 && currentVideoIndex === 0
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-white/20 hover:bg-white/30 text-gray-900'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Previous
              </button>
              
              <button
                onClick={handleVideoEnd} // Reuse the video end handler for next button
                disabled={
                  currentSectionIndex === course.sections.length - 1 && 
                  currentVideoIndex === course.sections[currentSectionIndex].videos.length - 1
                }
                className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                  currentSectionIndex === course.sections.length - 1 && 
                  currentVideoIndex === course.sections[currentSectionIndex].videos.length - 1
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-white/20 hover:bg-white/30 text-gray-900'
                }`}
              >
                Next
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Add these styles to your CSS file (src/index.css)
const styles = `
@keyframes fadeInOut {
  0% { opacity: 0; transform: translateY(-20px); }
  5% { opacity: 1; transform: translateY(0); }
  95% { opacity: 1; transform: translateY(0); }
  100% { opacity: 0; transform: translateY(-20px); }
}

.animate-fade-in-out {
  animation: fadeInOut 5s forwards;
}
`;

export default CourseView; 