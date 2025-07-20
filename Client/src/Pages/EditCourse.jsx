import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import api from "../utils/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const EditCourse = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState('basic');
  const [uploadProgress, setUploadProgress] = useState({});
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    thumbnail: "",
    sections: [
      {
        title: "Introduction",
        description: "",
        order: 1,
        videos: [{ title: "", url: "", description: "" }]
      }
    ]
  });

  useEffect(() => {
    fetchCourse();
  }, [courseId]);

  const fetchCourse = async () => {
    try {
      const response = await api.get(`/api/courses/${courseId}`);
      const course = response.data;
      
      // Handle old course format
      if (course.videoLinks && !course.sections) {
        const convertedSections = [{
          title: "Main Section",
          description: course.description || "",
          order: 1,
          videos: course.videoLinks.map((video, index) => ({
            title: typeof video === 'string' ? `Video ${index + 1}` : video.title,
            url: typeof video === 'string' ? video : video.url,
            description: typeof video === 'string' ? '' : (video.description || '')
          }))
        }];
        setFormData({
          title: course.title,
          description: course.description || "",
          thumbnail: course.thumbnail || "",
          sections: convertedSections
        });
      } else {
        setFormData({
          title: course.title,
          description: course.description || "",
          thumbnail: course.thumbnail || "",
          sections: course.sections?.length > 0 ? course.sections : [
            {
              title: "Introduction",
              description: "",
              order: 1,
              videos: [{ title: "", url: "", description: "" }]
            }
          ]
        });
      }
    } catch (err) {
      console.error('Error fetching course:', err);
      setError(err.response?.data?.error || "Failed to fetch course");
    } finally {
      setLoading(false);
    }
  };

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
        description: "",
        order: prev.sections.length + 1,
        videos: [{ title: "", url: "", description: "" }]
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
    newSections[sectionIndex].videos.push({ title: "", url: "", description: "" });
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

  const handleThumbnailUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const thumbnailUrl = await api.uploadImage(file);
      setFormData(prev => ({ ...prev, thumbnail: thumbnailUrl }));
    } catch (error) {
      console.error('Thumbnail upload failed:', error);
      setError('Failed to upload thumbnail. Please try again.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setError('Course title is required');
      return;
    }

    try {
      setSaving(true);
      setError('');
      await api.put(`/api/courses/${courseId}`, formData);
      navigate('/courses');
    } catch (error) {
      console.error('Error updating course:', error);
      setError(error.response?.data?.error || 'Failed to update course');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this course? This action cannot be undone.')) {
      try {
        await api.delete(`/api/courses/${courseId}`);
        navigate('/courses');
      } catch (error) {
        console.error('Error deleting course:', error);
        setError(error.response?.data?.error || 'Failed to delete course');
      }
    }
  };

  const tabs = [
    { id: 'basic', label: 'Basic Info', icon: '📝' },
    { id: 'content', label: 'Content', icon: '🎥' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white">Loading course...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex flex-col">
      <Navbar />
      
      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Edit Course</h1>
            <p className="text-gray-300">Update your course content and information</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500 rounded-lg">
              <p className="text-red-200">{error}</p>
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
                  className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
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
                  </div>
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

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <input
                            type="text"
                            value={section.title}
                            onChange={(e) => handleSectionChange(sectionIndex, 'title', e.target.value)}
                            placeholder="Section title"
                            className="px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                          />
                          <input
                            type="text"
                            value={section.description}
                            onChange={(e) => handleSectionChange(sectionIndex, 'description', e.target.value)}
                            placeholder="Section description"
                            className="px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                          />
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-300">Videos</span>
                            <button
                              type="button"
                              onClick={() => addVideoToSection(sectionIndex)}
                              className="text-blue-400 hover:text-blue-300 transition-colors text-sm"
                            >
                              + Add Video
                            </button>
                          </div>

                          {section.videos.map((video, videoIndex) => (
                            <div key={videoIndex} className="bg-gray-600/50 rounded-lg p-3 space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-400">Video {videoIndex + 1}</span>
                                {section.videos.length > 1 && (
                                  <button
                                    type="button"
                                    onClick={() => removeVideoFromSection(sectionIndex, videoIndex)}
                                    className="text-red-400 hover:text-red-300 transition-colors text-sm"
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
                                className="w-full px-3 py-2 bg-gray-500 border border-gray-400 rounded text-white placeholder-gray-300 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-colors text-sm"
                              />

                              <div className="flex gap-2">
                                <input
                                  type="url"
                                  value={video.url}
                                  onChange={(e) => handleVideoChange(sectionIndex, videoIndex, 'url', e.target.value)}
                                  placeholder="Video URL or upload file"
                                  className="flex-1 px-3 py-2 bg-gray-500 border border-gray-400 rounded text-white placeholder-gray-300 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-colors text-sm"
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
                                    className={`px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm transition-colors ${
                                      uploading ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                                    disabled={uploading}
                                  >
                                    📁
                                  </button>
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
                                className="w-full px-3 py-2 bg-gray-500 border border-gray-400 rounded text-white placeholder-gray-300 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-colors text-sm resize-none"
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
                  type="button"
                  onClick={handleDelete}
                  className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                >
                  Delete Course
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className={`flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium ${
                    saving ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {saving ? 'Saving Changes...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default EditCourse;
