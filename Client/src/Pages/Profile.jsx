import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  FaUser, 
  FaEnvelope, 
  FaCalendar, 
  FaEdit, 
  FaSave, 
  FaTimes, 
  FaCamera,
  FaPhone,
  FaMapMarkerAlt,
  FaGraduationCap,
  FaBriefcase,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaGlobe,
  FaSpinner
} from 'react-icons/fa';
import api from '../utils/api';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    bio: '',
    education: '',
    occupation: '',
    github: '',
    linkedin: '',
    twitter: '',
    website: ''
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    // Initialize profile data with user data
    setProfileData({
      name: user.name || '',
      email: user.email || '',
      phone: user.phone || '',
      location: user.location || '',
      bio: user.bio || '',
      education: user.education || '',
      occupation: user.occupation || '',
      github: user.github || '',
      linkedin: user.linkedin || '',
      twitter: user.twitter || '',
      website: user.website || ''
    });
  }, [user, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const response = await api.put('/api/auth/profile', profileData);
      
      if (response.data.success) {
        // Update user context with new data
        updateUser(response.data.user);
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    // Reset to original user data
    setProfileData({
      name: user.name || '',
      email: user.email || '',
      phone: user.phone || '',
      location: user.location || '',
      bio: user.bio || '',
      education: user.education || '',
      occupation: user.occupation || '',
      github: user.github || '',
      linkedin: user.linkedin || '',
      twitter: user.twitter || '',
      website: user.website || ''
    });
    setIsEditing(false);
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB');
      return;
    }

    try {
      setUploadingImage(true);
      
      const formData = new FormData();
      formData.append('profilePic', file);

      const response = await api.post('/api/auth/upload-profile-pic', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        // Update user context with new profile picture
        updateUser({
          ...user,
          profilePic: response.data.profilePicUrl
        });
      }
    } catch (error) {
      console.error('Error uploading profile picture:', error);
      alert('Failed to upload profile picture. Please try again.');
    } finally {
      setUploadingImage(false);
    }
  };

  const triggerImageUpload = () => {
    fileInputRef.current?.click();
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-900 pt-20">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 left-1/2 w-20 h-20 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-full blur-xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
            Profile Settings
          </h1>
          <p className="text-gray-400 text-lg">Manage your account information and preferences</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white/5 backdrop-blur-2xl rounded-2xl border border-white/10 overflow-hidden">
            {/* Profile Header */}
            <div className="relative bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 p-8">
              <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
                {/* Profile Picture */}
                <div className="relative">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white/20 bg-gradient-to-br from-cyan-500 to-purple-600">
                    {user.profilePic ? (
                      <img 
                        src={user.profilePic} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white text-4xl font-bold">
                        {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                      </div>
                    )}
                  </div>
                  
                  {/* Hidden file input */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  
                  {/* Upload button */}
                  <button 
                    onClick={triggerImageUpload}
                    disabled={uploadingImage}
                    className="absolute bottom-2 right-2 w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center text-white hover:bg-cyan-600 transition-colors duration-200 disabled:opacity-50"
                  >
                    {uploadingImage ? (
                      <FaSpinner className="w-4 h-4 animate-spin" />
                    ) : (
                      <FaCamera className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* User Info */}
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-3xl font-bold text-white mb-2">{user.name}</h2>
                  <p className="text-gray-300 mb-2">{user.email}</p>
                  <div className="flex items-center justify-center md:justify-start space-x-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      user.role === 'Admin'
                        ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                        : user.role === 'Instructor' 
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                        : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                    }`}>
                      {user.role === 'Admin' ? 'Admin' : user.role === 'Instructor' ? 'Instructor' : 'Student'}
                    </span>
                    <span className="text-gray-400 text-sm">
                      Joined {new Date(user.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* Edit Button */}
                <div className="flex space-x-2">
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center space-x-2 px-4 py-2 bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 rounded-lg hover:bg-cyan-500/30 transition-all duration-200"
                    >
                      <FaEdit className="w-4 h-4" />
                      <span>Edit Profile</span>
                    </button>
                  ) : (
                    <div className="flex space-x-2">
                      <button
                        onClick={handleSave}
                        disabled={loading}
                        className="flex items-center space-x-2 px-4 py-2 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 rounded-lg hover:bg-emerald-500/30 transition-all duration-200 disabled:opacity-50"
                      >
                        <FaSave className="w-4 h-4" />
                        <span>{loading ? 'Saving...' : 'Save'}</span>
                      </button>
                      <button
                        onClick={handleCancel}
                        className="flex items-center space-x-2 px-4 py-2 bg-red-500/20 border border-red-500/30 text-red-400 rounded-lg hover:bg-red-500/30 transition-all duration-200"
                      >
                        <FaTimes className="w-4 h-4" />
                        <span>Cancel</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Profile Content */}
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Personal Information */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
                    <FaUser className="w-5 h-5 text-cyan-400" />
                    <span>Personal Information</span>
                  </h3>

                  {/* Name */}
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">Full Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="name"
                        value={profileData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors duration-200"
                      />
                    ) : (
                      <div className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white">
                        {profileData.name || 'Not provided'}
                      </div>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">Email Address</label>
                    <div className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-gray-400">
                      {profileData.email} (Cannot be changed)
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">Phone Number</label>
                    {isEditing ? (
                      <input
                        type="tel"
                        name="phone"
                        value={profileData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors duration-200"
                        placeholder="Enter your phone number"
                      />
                    ) : (
                      <div className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white">
                        {profileData.phone || 'Not provided'}
                      </div>
                    )}
                  </div>

                  {/* Location */}
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">Location</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="location"
                        value={profileData.location}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors duration-200"
                        placeholder="City, Country"
                      />
                    ) : (
                      <div className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white">
                        {profileData.location || 'Not provided'}
                      </div>
                    )}
                  </div>
                </div>

                {/* Professional Information */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
                    <FaBriefcase className="w-5 h-5 text-purple-400" />
                    <span>Professional Information</span>
                  </h3>

                  {/* Bio */}
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">Bio</label>
                    {isEditing ? (
                      <textarea
                        name="bio"
                        value={profileData.bio}
                        onChange={handleInputChange}
                        rows="4"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors duration-200 resize-none"
                        placeholder="Tell us about yourself..."
                      />
                    ) : (
                      <div className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white min-h-[100px]">
                        {profileData.bio || 'No bio provided'}
                      </div>
                    )}
                  </div>

                  {/* Education */}
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">Education</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="education"
                        value={profileData.education}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors duration-200"
                        placeholder="Your educational background"
                      />
                    ) : (
                      <div className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white">
                        {profileData.education || 'Not provided'}
                      </div>
                    )}
                  </div>

                  {/* Occupation */}
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">Occupation</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="occupation"
                        value={profileData.occupation}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors duration-200"
                        placeholder="Your current job title"
                      />
                    ) : (
                      <div className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white">
                        {profileData.occupation || 'Not provided'}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-8 pt-8 border-t border-white/10">
                <h3 className="text-xl font-semibold text-white mb-6 flex items-center space-x-2">
                  <FaGlobe className="w-5 h-5 text-pink-400" />
                  <span>Social Links</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* GitHub */}
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2 flex items-center space-x-2">
                      <FaGithub className="w-4 h-4" />
                      <span>GitHub</span>
                    </label>
                    {isEditing ? (
                      <input
                        type="url"
                        name="github"
                        value={profileData.github}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors duration-200"
                        placeholder="https://github.com/username"
                      />
                    ) : (
                      <div className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white">
                        {profileData.github ? (
                          <a href={profileData.github} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">
                            {profileData.github}
                          </a>
                        ) : (
                          'Not provided'
                        )}
                      </div>
                    )}
                  </div>

                  {/* LinkedIn */}
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2 flex items-center space-x-2">
                      <FaLinkedin className="w-4 h-4" />
                      <span>LinkedIn</span>
                    </label>
                    {isEditing ? (
                      <input
                        type="url"
                        name="linkedin"
                        value={profileData.linkedin}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors duration-200"
                        placeholder="https://linkedin.com/in/username"
                      />
                    ) : (
                      <div className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white">
                        {profileData.linkedin ? (
                          <a href={profileData.linkedin} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">
                            {profileData.linkedin}
                          </a>
                        ) : (
                          'Not provided'
                        )}
                      </div>
                    )}
                  </div>

                  {/* Twitter */}
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2 flex items-center space-x-2">
                      <FaTwitter className="w-4 h-4" />
                      <span>Twitter</span>
                    </label>
                    {isEditing ? (
                      <input
                        type="url"
                        name="twitter"
                        value={profileData.twitter}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors duration-200"
                        placeholder="https://twitter.com/username"
                      />
                    ) : (
                      <div className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white">
                        {profileData.twitter ? (
                          <a href={profileData.twitter} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">
                            {profileData.twitter}
                          </a>
                        ) : (
                          'Not provided'
                        )}
                      </div>
                    )}
                  </div>

                  {/* Website */}
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2 flex items-center space-x-2">
                      <FaGlobe className="w-4 h-4" />
                      <span>Website</span>
                    </label>
                    {isEditing ? (
                      <input
                        type="url"
                        name="website"
                        value={profileData.website}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors duration-200"
                        placeholder="https://yourwebsite.com"
                      />
                    ) : (
                      <div className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white">
                        {profileData.website ? (
                          <a href={profileData.website} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">
                            {profileData.website}
                          </a>
                        ) : (
                          'Not provided'
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
