import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../utils/api';
import Navbar from "../Components/Navbar";
import MediaUpload from '../components/MediaUpload';

const CreateCourse = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('basic');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    thumbnail: '',
    sections: [
      {
        title: 'Introduction',
        description: '',
        order: 1,
        videos: [{ title: '', url: '', description: '' }]
      }
    ]
  });

  const [uploadProgress, setUploadProgress] = useState({});
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSectionChange = (sectionIndex, field, value) => {
    const newSections = [...formData.sections];
    newSections[sectionIndex] = { ...newSections[sectionIndex], [field]: value };
    setFormData(prev => ({ ...prev, sections: newSections }));
  };

  const handleVideoChange = (sectionIndex, videoIndex, field, value) => {
    const newSections = [...formData.sections];
    newSections[sectionIndex].videos[videoIndex] = {
      ...newSections[sectionIndex].videos[videoIndex],
      [field]: value
    };
    setFormData(prev => ({ ...prev, sections: newSections }));
  };

  const addSection = () => {
    setFormData(prev => ({
      ...prev,
      sections: [...prev.sections, {
        title: `Section ${prev.sections.length + 1}`,
        description: '',
        order: prev.sections.length + 1,
        videos: [{ title: '', url: '', description: '' }]
      }]
    }));
  };

  const removeSection = (sectionIndex) => {
    if (formData.sections.length > 1) {
      const newSections = formData.sections.filter((_, i) => i !== sectionIndex);
      newSections.forEach((section, index) => { section.order = index + 1; });
      setFormData(prev => ({ ...prev, sections: newSections }));
    }
  };

  const addVideoToSection = (sectionIndex) => {
    const newSections = [...formData.sections];
    newSections[sectionIndex].videos.push({ title: '', url: '', description: '' });
    setFormData(prev => ({ ...prev, sections: newSections }));
  };

  const removeVideoFromSection = (sectionIndex, videoIndex) => {
    if (formData.sections[sectionIndex].videos.length > 1) {
      const newSections = [...formData.sections];
      newSections[sectionIndex].videos = newSections[sectionIndex].videos.filter((_, i) => i !== videoIndex);
      setFormData(prev => ({ ...prev, sections: newSections }));
    }
  };

  const handleFileUpload = async (event, sectionIndex, videoIndex) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      setUploading(true);
      setUploadProgress(prev => ({ ...prev, [`${sectionIndex}-${videoIndex}`]: 0 }));
      
      const videoUrl = await api.uploadVideo(file);
      handleVideoChange(sectionIndex, videoIndex, 'url', videoUrl);
      
      setUploadProgress(prev => ({ ...prev, [`${sectionIndex}-${videoIndex}`]: 100 }));
      setTimeout(() => {
        setUploadProgress(prev => {
          const newProgress = { ...prev };
          delete newProgress[`${sectionIndex}-${videoIndex}`];
          return newProgress;
        });
      }, 2000);
    } catch (error) {
      console.error('Upload failed:', error);
      setError('Failed to upload video. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleThumbnailUpload = (url) => {
    setFormData(prev => ({ ...prev, thumbnail: url }));
  };

  const handleVideoUpload = (sectionIndex, videoIndex) => (url) => {
    handleVideoChange(sectionIndex, videoIndex, 'url', url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setError('Course title is required');
      return;
    }

    try {
      setLoading(true);
      setError('');
      await api.post('/api/courses/add', formData);
      navigate('/courses');
    } catch (error) {
      console.error('Error creating course:', error);
      setError(error.response?.data?.error || 'Failed to create course');
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'basic', label: 'Basic Info', icon: '📝' },
    { id: 'content', label: 'Content', icon: '🎥' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <Navbar />
      
      <div className="relative min-h-screen">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-blue-900/30 to-purple-900/20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.1),transparent_50%)]"></div>

        <div className="relative z-10 flex-grow container mx-auto px-2 sm:px-4 py-4 sm:py-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-6 sm:mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Create New Course</h1>
              <p className="text-gray-300 text-sm sm:text-base">Share your knowledge with the world</p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-500/20 border border-red-500 rounded-lg">
                <p className="text-red-200 text-sm sm:text-base">{error}</p>
              </div>
            )}

            {/* Form Card */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden">
              {/* Tabs */}
              <div className="flex border-b border-gray-700">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium transition-colors touch-manipulation ${
                      activeTab === tab.id
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                    }`}
                  >
                    <span className="mr-1 sm:mr-2">{tab.icon}</span>
                    <span className="hidden sm:inline">{tab.label}</span>
                    <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
                  </button>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="p-6">
                {/* Basic Info Tab */}
                {activeTab === 'basic' && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Course Title *
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Enter course title"
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Course Description
                      </label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Describe what students will learn"
                        rows={4}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Course Thumbnail
                      </label>
                      <MediaUpload 
                        type="thumbnail"
                        onSuccess={handleThumbnailUpload}
                        onError={(error) => setError(`Thumbnail upload failed: ${error}`)}
                        placeholder="Enter image URL or YouTube video URL..."
                      />
                    </div>

                    {/* <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Course Thumbnail
                      </label>
                      <div className="flex items-center space-x-4">
                        <div className="w-24 h-16 bg-gray-700 rounded-lg overflow-hidden">
                          <img
                            src={formData.thumbnail || "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=500&q=80"}
                            alt="Thumbnail preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="relative">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleThumbnailUpload}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          />
                          <button
                            type="button"
                            className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg transition-colors"
                          >
                            Upload Image
                          </button>
                        </div>
                      </div>
                    </div> */}
                  </div>
                )}

                {/* Content Tab */}
                {activeTab === 'content' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-white">Course Sections</h3>
                      <button
                        type="button"
                        onClick={addSection}
                        className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm"
                      >
                        + Add Section
                      </button>
                    </div>

                    <div className="space-y-4">
                      {formData.sections.map((section, sectionIndex) => (
                        <div key={sectionIndex} className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="text-white font-medium">Section {sectionIndex + 1}</h4>
                            {formData.sections.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeSection(sectionIndex)}
                                className="text-red-400 hover:text-red-300 transition-colors"
                              >
                                🗑️
                              </button>
                            )}
                          </div>

                          <div className="grid grid-cols-1 gap-4 mb-4">
                            <input
                              type="text"
                              value={section.title}
                              onChange={(e) => handleSectionChange(sectionIndex, 'title', e.target.value)}
                              placeholder="Section title"
                              className="px-3 py-3 bg-gray-600 border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors text-base"
                            />
                            <input
                              type="text"
                              value={section.description}
                              onChange={(e) => handleSectionChange(sectionIndex, 'description', e.target.value)}
                              placeholder="Section description"
                              className="px-3 py-3 bg-gray-600 border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors text-base"
                            />
                          </div>

                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-300">Videos</span>
                              <button
                                type="button"
                                onClick={() => addVideoToSection(sectionIndex)}
                                className="text-blue-400 hover:text-blue-300 transition-colors text-sm px-2 py-1 rounded touch-manipulation"
                              >
                                + Add Video
                              </button>
                            </div>

                            {section.videos.map((video, videoIndex) => (
                              <div key={videoIndex} className="bg-gray-600/50 rounded-lg p-3 space-y-3">
                                <div className="flex items-center justify-between">
                                  <span className="text-xs text-gray-400">Video {videoIndex + 1}</span>
                                  {section.videos.length > 1 && (
                                    <button
                                      type="button"
                                      onClick={() => removeVideoFromSection(sectionIndex, videoIndex)}
                                      className="text-red-400 hover:text-red-300 transition-colors text-sm px-2 py-1 rounded touch-manipulation"
                                    >
                                      ✕
                                    </button>
                                  )}
                                </div>

                                <input
                                  type="text"
                                  value={video.title}
                                  onChange={(e) => handleVideoChange(sectionIndex, videoIndex, 'title', e.target.value)}
                                  placeholder="Video title"
                                  className="w-full px-3 py-3 bg-gray-500 border border-gray-400 rounded text-white placeholder-gray-300 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-colors text-base"
                                />

                                <div className="flex flex-col sm:flex-row gap-2">
                                  <input
                                    type="url"
                                    value={video.url}
                                    onChange={(e) => handleVideoChange(sectionIndex, videoIndex, 'url', e.target.value)}
                                    placeholder="Video URL or upload file"
                                    className="flex-1 px-3 py-3 bg-gray-500 border border-gray-400 rounded text-white placeholder-gray-300 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-colors text-base"
                                  />
                                  <div className="flex-shrink-0">
                                    <MediaUpload 
                                      type="video"
                                      onSuccess={handleVideoUpload(sectionIndex, videoIndex)}
                                      onError={(error) => setError(`Video upload failed: ${error}`)}
                                      placeholder="Enter video URL or YouTube URL..."
                                    />
                                  </div>
                                </div>

                                {uploadProgress[`${sectionIndex}-${videoIndex}`] > 0 && uploadProgress[`${sectionIndex}-${videoIndex}`] < 100 && (
                                  <div className="w-full bg-gray-400 rounded-full h-1">
                                    <div
                                      className="bg-blue-600 h-1 rounded-full transition-all duration-300"
                                      style={{ width: `${uploadProgress[`${sectionIndex}-${videoIndex}`]}%` }}
                                    />
                                  </div>
                                )}

                                <textarea
                                  value={video.description}
                                  onChange={(e) => handleVideoChange(sectionIndex, videoIndex, 'description', e.target.value)}
                                  placeholder="Video description (optional)"
                                  rows={2}
                                  className="w-full px-3 py-3 bg-gray-500 border border-gray-400 rounded text-white placeholder-gray-300 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-colors text-base resize-none"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-4 pt-6 border-t border-gray-700">
                  <Link
                    to="/courses"
                    className="px-6 py-3 bg-gray-600 hover:bg-gray-500 text-white rounded-lg transition-colors"
                  >
                    Cancel
                  </Link>
                  <button
                    type="submit"
                    disabled={loading}
                    className={`flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium ${
                      loading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {loading ? 'Creating Course...' : 'Create Course'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative bg-gray-900/80 backdrop-blur-sm text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                NextEra
              </h3>
              <p className="text-gray-400 mb-6">
                Empowering developers worldwide with cutting-edge education and hands-on experience.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                  <span className="text-white font-bold">f</span>
                </a>
                <a href="#" className="w-10 h-10 bg-sky-500 rounded-full flex items-center justify-center hover:bg-sky-600 transition-colors">
                  <span className="text-white font-bold">t</span>
                </a>
                <a href="#" className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center hover:bg-blue-800 transition-colors">
                  <span className="text-white font-bold">in</span>
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Courses</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/courses" className="hover:text-cyan-400 transition-colors">Full Stack Development</Link></li>
                <li><Link to="/courses" className="hover:text-cyan-400 transition-colors">AI & Machine Learning</Link></li>
                <li><Link to="/courses" className="hover:text-cyan-400 transition-colors">DevOps & Cloud</Link></li>
                <li><Link to="/courses" className="hover:text-cyan-400 transition-colors">Mobile Development</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/about" className="hover:text-cyan-400 transition-colors">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-cyan-400 transition-colors">Contact</Link></li>
                <li><Link to="/careers" className="hover:text-cyan-400 transition-colors">Careers</Link></li>
                <li><Link to="/blog" className="hover:text-cyan-400 transition-colors">Blog</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/help" className="hover:text-cyan-400 transition-colors">Help Center</Link></li>
                <li><Link to="/community" className="hover:text-cyan-400 transition-colors">Community</Link></li>
                <li><Link to="/privacy" className="hover:text-cyan-400 transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-cyan-400 transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-gray-400 mb-4 md:mb-0">
                <p>
                  &copy; {new Date().getFullYear()} NextEra. Developed &
                  Designed by &nbsp;
                  <a
                    href="https://khyruddin-hashanulla.github.io/MY-PORTFOLIO/"
                    target="_blank"
                    className="text-blue-400 hover:text-blue-600 transition-colors duration-200"
                  >
                    Khyruddin Hashanulla
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CreateCourse;