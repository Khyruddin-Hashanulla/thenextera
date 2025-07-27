import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';

const ResumeBuilder = () => {
  const { user } = useAuth();
  const [resumeData, setResumeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('preview');
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    fetchResumeData();
  }, []);

  const fetchResumeData = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/resume/data');
      if (response.data.success) {
        setResumeData(response.data.data);
      } else {
        setError('Failed to fetch resume data');
      }
    } catch (err) {
      console.error('Error fetching resume data:', err);
      setError('Failed to load resume data');
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = async () => {
    try {
      setDownloading(true);
      const response = await api.get('/api/resume/pdf', {
        responseType: 'blob'
      });
      
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${user?.name || 'resume'}_resume.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error downloading PDF:', err);
      setError('Failed to download PDF');
    } finally {
      setDownloading(false);
    }
  };

  const copyToClipboard = () => {
    if (!resumeData) return;
    
    const textContent = generateTextResume(resumeData);
    navigator.clipboard.writeText(textContent).then(() => {
      alert('Resume copied to clipboard!');
    }).catch(() => {
      setError('Failed to copy to clipboard');
    });
  };

  const generateTextResume = (data) => {
    const { profile, education, experience, skills, summary } = data;
    
    return `
${profile.name}
${profile.email} | ${profile.role}

PROFESSIONAL SUMMARY
${summary}

SKILLS
Technical: ${skills.technical.join(', ')}
Tools: ${skills.tools.join(', ')}
Soft Skills: ${skills.soft.join(', ')}

EDUCATION & CERTIFICATIONS
${education.completedCourses.map(course => 
  `• ${course.title} - ${course.instructor} (${new Date(course.completionDate).toLocaleDateString()})`
).join('\n')}

FREELANCE EXPERIENCE
${experience.freelanceProjects.map(project => 
  `• ${project.title} - $${project.payout} (${new Date(project.completedAt).toLocaleDateString()})\n  ${project.description}`
).join('\n\n')}
    `.trim();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
          <p className="text-white">Loading your resume data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black flex items-center justify-center">
        <div className="text-center text-red-400">
          <p className="text-xl mb-4">⚠️ {error}</p>
          <button 
            onClick={fetchResumeData}
            className="px-6 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            AI Resume Builder
          </h1>
          <p className="text-xl text-gray-300 mb-6">
            Auto-generated from your NextEra learning journey
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={downloadPDF}
              disabled={downloading}
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {downloading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Generating PDF...
                </>
              ) : (
                <>
                  📄 Download PDF
                </>
              )}
            </button>
            
            <button
              onClick={copyToClipboard}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all duration-300 flex items-center justify-center gap-2"
            >
              📋 Copy Text
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-1">
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-6 py-2 rounded-md transition-all duration-300 ${
                activeTab === 'preview'
                  ? 'bg-cyan-600 text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Preview
            </button>
            <button
              onClick={() => setActiveTab('data')}
              className={`px-6 py-2 rounded-md transition-all duration-300 ${
                activeTab === 'data'
                  ? 'bg-cyan-600 text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Raw Data
            </button>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'preview' && resumeData && (
          <ResumePreview data={resumeData} />
        )}
        
        {activeTab === 'data' && resumeData && (
          <RawDataView data={resumeData} />
        )}
      </div>
    </div>
  );
};

// Resume Preview Component
const ResumePreview = ({ data }) => {
  const { profile, education, experience, skills, summary, metrics } = data;

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-2xl overflow-hidden">
      <div className="p-8">
        {/* Header */}
        <div className="text-center border-b-2 border-blue-600 pb-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{profile.name}</h1>
          <p className="text-gray-600">{profile.email} | {profile.role}</p>
          <div className="mt-4 flex justify-center gap-4 text-sm text-gray-500">
            <span>Experience Level: {metrics.experienceLevel}</span>
            <span>•</span>
            <span>Total Skills: {skills.totalSkills}</span>
            <span>•</span>
            <span>Learning Streak: {metrics.learningStreak} days</span>
          </div>
        </div>

        {/* Professional Summary */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-blue-600 mb-4 border-b border-gray-200 pb-2">
            Professional Summary
          </h2>
          <p className="text-gray-700 italic leading-relaxed">{summary}</p>
        </section>

        {/* Skills */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-blue-600 mb-4 border-b border-gray-200 pb-2">
            Skills
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-600 mb-2">Technical Skills</h3>
              <div className="flex flex-wrap gap-2">
                {skills.technical.map((skill, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-600 mb-2">Tools</h3>
              <div className="flex flex-wrap gap-2">
                {skills.tools.map((tool, index) => (
                  <span key={index} className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-purple-600 mb-2">Soft Skills</h3>
              <div className="flex flex-wrap gap-2">
                {skills.soft.map((skill, index) => (
                  <span key={index} className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Education & Certifications */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-blue-600 mb-4 border-b border-gray-200 pb-2">
            Education & Certifications
          </h2>
          {education.completedCourses.map((course, index) => (
            <div key={index} className="mb-4 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900">{course.title}</h3>
              <p className="text-gray-600 text-sm">
                Instructor: {course.instructor} | Completed: {new Date(course.completionDate).toLocaleDateString()}
              </p>
              <p className="text-gray-700 mt-2">{course.description}</p>
              {course.certificateId && (
                <p className="text-blue-600 text-sm mt-1">Certificate ID: {course.certificateId}</p>
              )}
            </div>
          ))}
        </section>

        {/* Freelance Experience */}
        {experience.freelanceProjects.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-bold text-blue-600 mb-4 border-b border-gray-200 pb-2">
              Freelance Experience
            </h2>
            <div className="mb-4 text-sm text-gray-600">
              Total Projects: {experience.totalProjects} | Total Earnings: ${experience.totalEarnings} | Average Rating: {experience.averageRating}/5
            </div>
            {experience.freelanceProjects.map((project, index) => (
              <div key={index} className="mb-4 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900">{project.title}</h3>
                <p className="text-gray-600 text-sm">
                  Completed: {new Date(project.completedAt).toLocaleDateString()} | Payout: ${project.payout}
                </p>
                <p className="text-gray-700 mt-2">{project.description}</p>
                {project.feedback && (
                  <p className="text-green-600 text-sm mt-1 italic">"{project.feedback}"</p>
                )}
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
};

// Raw Data View Component
const RawDataView = ({ data }) => {
  return (
    <div className="max-w-4xl mx-auto bg-gray-900 rounded-lg shadow-2xl overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-bold text-cyan-400 mb-4">Raw Resume Data</h2>
        <pre className="bg-gray-800 p-4 rounded-lg overflow-auto text-green-400 text-sm">
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default ResumeBuilder;
