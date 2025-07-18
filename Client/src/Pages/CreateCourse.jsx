import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../utils/api';

const CreateCourse = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    thumbnail: '',
    sections: [
      {
        title: 'Section 1',
        description: '',
        order: 1,
        videos: [{ title: '', url: '', description: '' }]
      }
    ]
  });

  const defaultThumbnail = "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=500&q=80";

  const [uploadProgress, setUploadProgress] = useState({});
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSectionChange = (sectionIndex, field, value) => {
    const newSections = [...formData.sections];
    newSections[sectionIndex] = {
      ...newSections[sectionIndex],
      [field]: value
    };
    setFormData(prev => ({
      ...prev,
      sections: newSections
    }));
  };

  const handleVideoChange = (sectionIndex, videoIndex, field, value) => {
    const newSections = [...formData.sections];
    newSections[sectionIndex].videos[videoIndex] = {
      ...newSections[sectionIndex].videos[videoIndex],
      [field]: value
    };
    setFormData(prev => ({
      ...prev,
      sections: newSections
    }));
  };

  const addSection = () => {
    setFormData(prev => ({
      ...prev,
      sections: [
        ...prev.sections,
        {
          title: `Section ${prev.sections.length + 1}`,
          description: '',
          order: prev.sections.length + 1,
          videos: [{ title: '', url: '', description: '' }]
        }
      ]
    }));
  };

  const removeSection = (sectionIndex) => {
    if (formData.sections.length > 1) {
      const newSections = formData.sections.filter((_, i) => i !== sectionIndex);
      // Update order of remaining sections
      newSections.forEach((section, index) => {
        section.order = index + 1;
      });
      setFormData(prev => ({
        ...prev,
        sections: newSections
      }));
    }
  };

  const addVideoToSection = (sectionIndex) => {
    const newSections = [...formData.sections];
    newSections[sectionIndex].videos.push({ title: '', url: '', description: '' });
    setFormData(prev => ({
      ...prev,
      sections: newSections
    }));
  };

  const removeVideoFromSection = (sectionIndex, videoIndex) => {
    if (formData.sections[sectionIndex].videos.length > 1) {
      const newSections = [...formData.sections];
      newSections[sectionIndex].videos = newSections[sectionIndex].videos.filter((_, i) => i !== videoIndex);
      setFormData(prev => ({
        ...prev,
        sections: newSections
      }));
    }
  };

  const validateVideoUrl = (url) => {
    try {
      // Handle URLs from our own server (both relative and absolute)
      if (url.startsWith('/uploads/') || url.includes('/uploads/')) {
        return url.match(/\.(mp4|webm|ogg|mov|avi|mkv)$/i) !== null;
      }

      // Handle absolute URLs
      const videoUrl = new URL(url);
      return (
        videoUrl.hostname.includes('youtube.com') ||
        videoUrl.hostname.includes('youtu.be') ||
        videoUrl.hostname.includes('vimeo.com') ||
        url.match(/\.(mp4|webm|ogg|mov|avi|mkv)$/i)
      );
    } catch (e) {
      console.error('URL validation error:', {
        url,
        error: e.message
      });
      return false;
    }
  };

  const handleFileUpload = async (event, sectionIndex, videoIndex) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      setUploading(true);
      setUploadProgress(prev => ({
        ...prev,
        [`${sectionIndex}-${videoIndex}`]: 0
      }));

      // Upload video file
      console.log('Uploading video file:', file.name);
      const videoUrl = await api.uploadVideo(file);
      console.log('Received video URL:', videoUrl);

      // Validate the URL
      const isValid = validateVideoUrl(videoUrl);
      console.log('URL validation result:', {
        url: videoUrl,
        isValid,
        startsWithUploads: videoUrl.startsWith('/uploads/'),
        hasVideoExtension: videoUrl.match(/\.(mp4|webm|ogg)$/i) !== null
      });

      // Update form data with video URL
      const newSections = [...formData.sections];
      newSections[sectionIndex].videos[videoIndex] = {
        ...newSections[sectionIndex].videos[videoIndex],
        url: videoUrl,
        title: newSections[sectionIndex].videos[videoIndex].title || file.name.replace(/\.[^/.]+$/, '')
      };
      setFormData(prev => ({
        ...prev,
        sections: newSections
      }));
    } catch (error) {
      console.error('Video upload error:', error);
      setError(error.message || 'Failed to upload video');
    } finally {
      setUploading(false);
      setUploadProgress(prev => ({
        ...prev,
        [`${sectionIndex}-${videoIndex}`]: 100
      }));
    }
  };

  const handleThumbnailUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      setUploading(true);
      const thumbnailUrl = await api.uploadFile(file, 'image');
      setFormData(prev => ({
        ...prev,
        thumbnail: thumbnailUrl
      }));
    } catch (error) {
      setError(error.message || 'Failed to upload thumbnail');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Basic validation
      if (!formData.title.trim()) {
        throw new Error('Course title is required');
      }

      // Process and validate sections
      const processedSections = formData.sections.map((section, index) => {
        // Validate section
        if (!section.title.trim()) {
          throw new Error(`Section ${index + 1} title is required`);
        }

        // Filter and validate videos
        const validVideos = section.videos
          .map(video => ({
            ...video,
            title: video.title.trim(),
            url: video.url.trim(),
            description: video.description.trim()
          }))
          .filter(video => video.url !== '');

        // Validate each video
        validVideos.forEach((video, videoIndex) => {
          if (!video.title) {
            throw new Error(`Video title is required in section ${index + 1}, video ${videoIndex + 1}`);
          }
          if (!validateVideoUrl(video.url)) {
            throw new Error(`Invalid video URL in section ${index + 1}, video ${videoIndex + 1}. Please provide valid YouTube, Vimeo, or direct video URLs.`);
          }
        });

        if (validVideos.length === 0) {
          throw new Error(`Section ${index + 1} must have at least one video`);
        }

        return {
          ...section,
          title: section.title.trim(),
          description: section.description.trim(),
          order: index + 1,
          videos: validVideos
        };
      });

      // Ensure at least one section exists
      if (processedSections.length === 0) {
        throw new Error('Course must have at least one section');
      }

      const courseData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        thumbnail: formData.thumbnail.trim() || defaultThumbnail,
        sections: processedSections
      };

      console.log('Submitting course data:', courseData);

      const response = await api.post('/api/courses/add', courseData);
      console.log('Course created successfully:', response.data);
      
      navigate('/courses');
    } catch (err) {
      console.error('Error creating course:', err);
      setError(err.response?.data?.error || err.message || 'Failed to create course');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-200 via-red-400 to-pink-600 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/30 backdrop-blur-md shadow-lg rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Create New Course</h2>
            <Link
              to="/courses"
              className="flex items-center text-gray-700 hover:text-gray-900 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L4.414 9H17a1 1 0 110 2H4.414l5.293 5.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Courses
            </Link>
          </div>

          {error && (
            <div className="bg-red-100/80 backdrop-blur-sm text-red-700 p-4 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Course Title */}
              <div className="col-span-2">
                <label className="block text-sm font-semibold text-gray-900 mb-1">
                  Course Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                  placeholder="Enter course title"
                />
              </div>

              {/* Course Description */}
              <div className="col-span-2">
                <label className="block text-sm font-semibold text-gray-900 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  required
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                  placeholder="Enter course description"
                />
              </div>

              {/* Course Thumbnail */}
              <div className="col-span-2">
                <label className="block text-sm font-semibold text-gray-900 mb-1">
                  Course Thumbnail
                </label>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <div className="flex gap-2 mb-2">
                      <input
                        type="url"
                        name="thumbnail"
                        value={formData.thumbnail}
                        onChange={handleChange}
                        placeholder="Enter thumbnail URL"
                        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                      />
                      <div className="relative">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleThumbnailUpload}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          disabled={uploading}
                        />
                        <button
                          type="button"
                          className={`px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors ${
                            uploading ? 'opacity-50 cursor-not-allowed' : ''
                          }`}
                          disabled={uploading}
                        >
                          Upload
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">
                      Enter URL or upload an image
                    </p>
                  </div>
                  <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-100 shadow-sm">
                    <img
                      src={formData.thumbnail || defaultThumbnail}
                      alt="Thumbnail preview"
                      onError={(e) => {
                        e.target.src = defaultThumbnail;
                      }}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Course Sections */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="block text-lg font-semibold text-gray-900">
                  Course Sections
                </label>
                <button
                  type="button"
                  onClick={addSection}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
                >
                  Add Section
                </button>
              </div>

              {formData.sections.map((section, sectionIndex) => (
                <div key={sectionIndex} className="bg-white/20 backdrop-blur-sm rounded-lg p-4 space-y-4">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1 space-y-3">
                      <input
                        type="text"
                        value={section.title}
                        onChange={(e) => handleSectionChange(sectionIndex, 'title', e.target.value)}
                        placeholder="Section Title"
                        required
                        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                      />
                      <textarea
                        value={section.description}
                        onChange={(e) => handleSectionChange(sectionIndex, 'description', e.target.value)}
                        placeholder="Section Description"
                        rows={2}
                        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                      />
                    </div>
                    {formData.sections.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeSection(sectionIndex)}
                        className="text-red-500 hover:text-red-600 transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    )}
                  </div>

                  {/* Videos */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <h4 className="text-sm font-semibold text-gray-900">Videos</h4>
                      <button
                        type="button"
                        onClick={() => addVideoToSection(sectionIndex)}
                        className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
                      >
                        Add Video
                      </button>
                    </div>

                    {section.videos.map((video, videoIndex) => (
                      <div key={videoIndex} className="bg-white/10 backdrop-blur-sm rounded-lg p-3 space-y-3">
                        <div className="flex justify-between items-start gap-2">
                          <div className="flex-1 space-y-3">
                            <input
                              type="text"
                              value={video.title}
                              onChange={(e) => handleVideoChange(sectionIndex, videoIndex, 'title', e.target.value)}
                              placeholder="Video Title"
                              required
                              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                            />
                            <div className="flex gap-2">
                              <input
                                type="url"
                                value={video.url}
                                onChange={(e) => handleVideoChange(sectionIndex, videoIndex, 'url', e.target.value)}
                                placeholder="Video URL (YouTube, Vimeo, or direct link)"
                                required
                                className="flex-1 rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                              />
                              <div className="relative">
                                <input
                                  type="file"
                                  accept="video/*"
                                  onChange={(e) => handleFileUpload(e, sectionIndex, videoIndex)}
                                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                  disabled={uploading}
                                />
                                <button
                                  type="button"
                                  className={`px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 ${
                                    uploading ? 'opacity-50 cursor-not-allowed' : ''
                                  }`}
                                  disabled={uploading}
                                >
                                  Upload
                                </button>
                              </div>
                            </div>
                            {uploadProgress[`${sectionIndex}-${videoIndex}`] > 0 && uploadProgress[`${sectionIndex}-${videoIndex}`] < 100 && (
                              <div className="w-full bg-gray-200 rounded-full h-1.5">
                                <div
                                  className="bg-red-600 h-1.5 rounded-full transition-all duration-300"
                                  style={{ width: `${uploadProgress[`${sectionIndex}-${videoIndex}`]}%` }}
                                ></div>
                              </div>
                            )}
                            <textarea
                              value={video.description}
                              onChange={(e) => handleVideoChange(sectionIndex, videoIndex, 'description', e.target.value)}
                              placeholder="Video Description"
                              rows={2}
                              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                            />
                          </div>
                          {section.videos.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeVideoFromSection(sectionIndex, videoIndex)}
                              className="text-red-500 hover:text-red-600 transition-colors"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                              </svg>
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-4 pt-4">
              <Link
                to="/courses"
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={loading}
                className={`flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm ${
                  loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {loading ? 'Creating...' : 'Create Course'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCourse; 