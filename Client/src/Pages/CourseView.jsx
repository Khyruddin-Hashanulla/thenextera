import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';

const CourseView = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [enrolling, setEnrolling] = useState(false);
  const [expandedSections, setExpandedSections] = useState({});
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [completedVideos, setCompletedVideos] = useState([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    fetchCourse();
    fetchProgress();
  }, [courseId]);

  const fetchProgress = async () => {
    try {
      const response = await api.get(`/api/courses/${courseId}/progress`);
      setCompletedVideos(response.data.completedVideos || []);
      setProgress(response.data.progress || 0);
      
      // Set initial video position based on last watched
      if (response.data.lastWatched) {
        let totalVideos = 0;
        let found = false;
        for (let i = 0; i < course?.sections?.length && !found; i++) {
          if (totalVideos + course.sections[i].videos.length > response.data.lastWatched) {
            setCurrentSectionIndex(i);
            setCurrentVideoIndex(response.data.lastWatched - totalVideos);
            found = true;
          }
          totalVideos += course.sections[i].videos.length;
        }
      }
    } catch (error) {
      console.error('Error fetching progress:', error);
    }
  };

  const updateProgress = async () => {
    try {
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
    const currentSection = course.sections[currentSectionIndex];
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
            break;
          case 403:
            errorMessage = 'Access denied. Please enroll in the course to view content.';
            break;
          case 404:
            errorMessage = 'Course not found';
            break;
          case 500:
            errorMessage = 'Server error. Please try again later.';
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
    try {
      if (!course?.sections || course.sections.length === 0) {
        console.log('No sections available in getCurrentVideo');
        return null;
      }
      
      // Ensure valid section index
      const validSectionIndex = Math.min(currentSectionIndex, course.sections.length - 1);
      const currentSection = course.sections[validSectionIndex];
      
      if (!currentSection?.videos || currentSection.videos.length === 0) {
        console.log('No videos in current section:', {
          sectionIndex: validSectionIndex,
          sectionTitle: currentSection?.title
        });
        return null;
      }
      
      // Ensure valid video index
      const validVideoIndex = Math.min(currentVideoIndex, currentSection.videos.length - 1);
      const video = currentSection.videos[validVideoIndex];
      
      console.log('Current video:', {
        sectionIndex: validSectionIndex,
        videoIndex: validVideoIndex,
        videoTitle: video?.title,
        videoUrl: video?.url
      });
      
      return video;
    } catch (error) {
      console.error('Error getting current video:', error);
      return null;
    }
  };

  const getVideoEmbedUrl = (url) => {
    if (!url) return null;
    try {
      // Handle direct video files from our server
      if (url.includes('/uploads/')) {
        return url;
      }

      const videoUrl = new URL(url);
      if (videoUrl.hostname.includes('youtube.com') || videoUrl.hostname.includes('youtu.be')) {
        let videoId;
        if (videoUrl.hostname.includes('youtu.be')) {
          videoId = videoUrl.pathname.slice(1);
        } else {
          videoId = videoUrl.searchParams.get('v');
        }
        if (!videoId) return null;
        return `https://www.youtube.com/embed/${videoId}`;
      }
      if (videoUrl.hostname.includes('vimeo.com')) {
        const videoId = videoUrl.pathname.split('/').pop();
        if (!videoId) return null;
        return `https://player.vimeo.com/video/${videoId}`;
      }
      if (url.match(/\.(mp4|webm|ogg|mov|avi|mkv)$/i)) {
        return url;
      }
      return null;
    } catch (e) {
      console.error('Invalid video URL:', e);
      return null;
    }
  };

  const handleSectionChange = (sectionIndex) => {
    setCurrentSectionIndex(sectionIndex);
    setExpandedSections(prev => ({
      ...prev,
      [sectionIndex]: true
    }));
    setCurrentVideoIndex(0);
  };

  const handleVideoChange = (videoIndex) => {
    setCurrentVideoIndex(videoIndex);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-200 via-red-400 to-pink-600 flex items-center justify-center">
        <div className="text-xl font-semibold text-gray-800">Loading course content...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-200 via-red-400 to-pink-600 flex items-center justify-center">
        <div className="bg-white/30 backdrop-blur-md p-8 rounded-lg shadow-md max-w-md w-full">
          <div className="text-red-600 text-center mb-4">{error}</div>
          <div className="text-center">
            <Link
              to="/courses"
              className="text-gray-900 hover:text-black transition-colors"
            >
              ← Back to Courses
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-200 via-red-400 to-pink-600 flex items-center justify-center">
        <div className="bg-white/30 backdrop-blur-md p-8 rounded-lg shadow-md max-w-md w-full">
          <div className="text-red-600 text-center mb-4">Course not found</div>
          <div className="text-center">
            <Link
              to="/courses"
              className="text-gray-900 hover:text-black transition-colors"
            >
              ← Back to Courses
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const currentVideo = getCurrentVideo();
  console.log('Rendering with:', {
    courseTitle: course.title,
    sectionsCount: course.sections?.length,
    currentSectionIndex,
    currentVideoIndex,
    hasCurrentVideo: Boolean(currentVideo)
  });

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-orange-200 via-red-400 to-pink-600">
      {/* Success Message */}
      {showSuccessMessage && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in-out">
          <div className="flex items-center">
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Successfully enrolled! Welcome to the course.</span>
            <button 
              onClick={() => setShowSuccessMessage(false)}
              className="ml-2 text-white hover:text-gray-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Welcome Message for First Access */}
      {/* This block was removed as per the edit hint */}

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
                    src={`${getVideoEmbedUrl(currentVideo.url)}?enablejsapi=1`}
                    className="absolute inset-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    onLoad={(e) => {
                      // Add event listener for video end if it's a YouTube video
                      if (currentVideo.url.includes('youtube.com')) {
                        e.target.addEventListener('onStateChange', (event) => {
                          if (event.data === 0) { // Video ended
                            handleVideoEnd();
                          }
                        });
                      }
                    }}
                  />
                )
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-white">
                  No video available
                </div>
              )}
            </div>

            {/* Video Info */}
            <div className="bg-white/30 backdrop-blur-md rounded-lg p-6 shadow-lg">
              <h1 className="text-2xl font-bold mb-2 text-gray-900">
                {course?.sections[currentSectionIndex]?.title || 'No section title'}
              </h1>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                {currentVideo?.title || 'No video title'}
              </h2>
              <p className="text-gray-800 mb-4">{currentVideo?.description || course?.sections[currentSectionIndex]?.description || 'No description available'}</p>
              
              {/* Navigation buttons */}
              <div className="flex justify-between mt-6">
                <button
                  onClick={() => {
                    if (currentVideoIndex > 0) {
                      setCurrentVideoIndex(prev => prev - 1);
                    } else if (currentSectionIndex > 0) {
                      const prevSection = course.sections[currentSectionIndex - 1];
                      setCurrentSectionIndex(prev => prev - 1);
                      setCurrentVideoIndex(prevSection.videos.length - 1);
                    }
                  }}
                  disabled={currentSectionIndex === 0 && currentVideoIndex === 0}
                  className={`px-4 py-2 rounded-lg ${
                    currentSectionIndex === 0 && currentVideoIndex === 0
                      ? 'bg-gray-300 cursor-not-allowed'
                      : 'bg-red-400 hover:bg-red-500 text-white'
                  }`}
                >
                  Previous Video
                </button>
                <button
                  onClick={() => {
                    const currentSection = course.sections[currentSectionIndex];
                    if (currentVideoIndex < currentSection.videos.length - 1) {
                      setCurrentVideoIndex(prev => prev + 1);
                    } else if (currentSectionIndex < course.sections.length - 1) {
                      setCurrentSectionIndex(prev => prev + 1);
                      setCurrentVideoIndex(0);
                    }
                  }}
                  disabled={
                    currentSectionIndex === course.sections.length - 1 &&
                    currentVideoIndex === course.sections[currentSectionIndex].videos.length - 1
                  }
                  className={`px-4 py-2 rounded-lg ${
                    currentSectionIndex === course.sections.length - 1 &&
                    currentVideoIndex === course.sections[currentSectionIndex].videos.length - 1
                      ? 'bg-gray-300 cursor-not-allowed'
                      : 'bg-red-400 hover:bg-red-500 text-white'
                  }`}
                >
                  Next Video
                </button>
              </div>
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