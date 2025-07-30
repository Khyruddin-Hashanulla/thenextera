import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import MockInterviewChat from './MockInterviewChat';

const CareerCoach = () => {
  const [activeSection, setActiveSection] = useState('skills');
  const [skillRecommendations, setSkillRecommendations] = useState(null);
  const [jobRecommendations, setJobRecommendations] = useState(null);
  const [interviewPrep, setInterviewPrep] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (activeSection === 'skills') {
      fetchSkillRecommendations();
    } else if (activeSection === 'jobs') {
      fetchJobRecommendations();
    } else if (activeSection === 'interview') {
      fetchInterviewPrep();
    }
  }, [activeSection]);

  const fetchSkillRecommendations = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('Fetching skill recommendations...');
      const response = await api.get('/api/resume/career-coach/skills');
      console.log('Skills response:', response.data);
      if (response.data && response.data.success) {
        setSkillRecommendations(response.data.data);
      } else {
        setError('No skill data available');
      }
    } catch (err) {
      console.error('Skills fetch error:', err);
      setError('Failed to fetch skill recommendations. Using demo data.');
      // Set demo data so something shows
      setSkillRecommendations({
        currentSkills: {
          technical: ['JavaScript', 'React', 'Node.js'],
          tools: ['Git', 'VS Code', 'Docker'],
          soft: ['Communication', 'Problem Solving']
        },
        recommendedSkills: [
          { name: 'TypeScript', demand: 'High', description: 'Strongly typed JavaScript' },
          { name: 'AWS', demand: 'High', description: 'Cloud computing platform' }
        ]
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchJobRecommendations = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('Fetching job recommendations...');
      const response = await api.get('/api/resume/career-coach/jobs');
      console.log('Jobs response:', response.data);
      if (response.data && response.data.success) {
        setJobRecommendations(response.data.data);
      } else {
        setError('No job data available');
      }
    } catch (err) {
      console.error('Jobs fetch error:', err);
      setError('Failed to fetch job recommendations. Using demo data.');
      // Set demo data
      setJobRecommendations({
        recommendedRoles: [
          { title: 'Frontend Developer', match: '85%', company: 'Tech Corp' },
          { title: 'Full Stack Developer', match: '78%', company: 'StartupXYZ' }
        ]
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchInterviewPrep = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('Fetching interview prep...');
      const response = await api.get('/api/resume/career-coach/interview');
      console.log('Interview response:', response.data);
      if (response.data && response.data.success) {
        setInterviewPrep(response.data.data);
      } else {
        setError('No interview data available');
      }
    } catch (err) {
      console.error('Interview fetch error:', err);
      setError('Failed to fetch interview preparation. Using demo data.');
      // Set demo data
      setInterviewPrep({
        questions: [
          { question: 'Tell me about yourself', type: 'behavioral' },
          { question: 'What is closure in JavaScript?', type: 'technical' }
        ]
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full px-2 sm:px-4 lg:px-6 py-4 sm:py-6">
      {/* Simple Header */}
      <div className="text-center mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-4">
          🤖 AI Career Coach
        </h1>
        <p className="text-lg sm:text-xl text-gray-300">
          Personalized career guidance powered by AI
        </p>
      </div>

      {/* Simple Navigation */}
      <div className="flex justify-center mb-6 sm:mb-8">
        <div className="bg-gray-800 rounded-lg p-1 sm:p-2 w-full max-w-md sm:max-w-lg">
          <div className="grid grid-cols-4 gap-1 sm:gap-2">
            {[
              { id: 'skills', label: 'Skills', icon: '🎯' },
              { id: 'jobs', label: 'Jobs', icon: '💼' },
              { id: 'interview', label: 'Interview', icon: '🎤' },
              { id: 'mock-interview', label: 'Mock', icon: '🗣️' }
            ].map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`px-2 sm:px-4 py-2 rounded transition-colors text-xs sm:text-sm ${
                  activeSection === section.id
                    ? 'bg-cyan-600 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                }`}
              >
                <span className="block sm:inline mr-0 sm:mr-2">{section.icon}</span>
                <span className="hidden sm:inline">{section.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="w-full">
        {/* Loading */}
        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
            <p className="text-white">Loading AI insights...</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="text-center py-8">
            <div className="bg-red-900/50 rounded-lg p-4 sm:p-6 mx-2 sm:mx-0">
              <p className="text-red-300">⚠️ {error}</p>
            </div>
          </div>
        )}

        {/* Content Sections */}
        {!loading && !error && (
          <div className="w-full">
            {activeSection === 'skills' && (
              <div className="w-full">
                <h2 className="text-xl sm:text-2xl font-bold text-cyan-400 mb-3 sm:mb-4 px-3 sm:px-4 lg:px-6">Skill Recommendations</h2>
                {skillRecommendations ? (
                  <SkillRecommendations data={skillRecommendations} />
                ) : (
                  <p className="text-gray-300 px-3 sm:px-4 lg:px-6">Click to load skill recommendations...</p>
                )}
              </div>
            )}

            {activeSection === 'jobs' && (
              <div className="w-full">
                <h2 className="text-xl sm:text-2xl font-bold text-green-400 mb-3 sm:mb-4 px-3 sm:px-4 lg:px-6">Job Matching</h2>
                {jobRecommendations ? (
                  <JobRecommendations data={jobRecommendations} />
                ) : (
                  <p className="text-gray-300 px-3 sm:px-4 lg:px-6">Click to load job recommendations...</p>
                )}
              </div>
            )}

            {activeSection === 'interview' && (
              <div className="w-full">
                <h2 className="text-xl sm:text-2xl font-bold text-purple-400 mb-3 sm:mb-4 px-3 sm:px-4 lg:px-6">Interview Preparation</h2>
                {interviewPrep ? (
                  <InterviewPrep data={interviewPrep} />
                ) : (
                  <p className="text-gray-300 px-3 sm:px-4 lg:px-6">Click to load interview preparation...</p>
                )}
              </div>
            )}

            {activeSection === 'mock-interview' && (
              <div className="w-full">
                <h2 className="text-xl sm:text-2xl font-bold text-orange-400 mb-3 sm:mb-4 px-3 sm:px-4 lg:px-6">Mock Interview</h2>
                <MockInterviewChat />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const SkillRecommendations = ({ data }) => {
  // Handle the actual API response structure
  const { trending = [], highDemand = [], emerging = [], userStrengths = {} } = data || {};
  
  // Extract current skills from userStrengths or provide defaults
  const currentSkills = userStrengths || {
    technical: ['JavaScript', 'React', 'Node.js'],
    tools: ['Git', 'VS Code', 'Docker'],
    soft: ['Communication', 'Problem Solving']
  };

  // Combine all skill recommendations
  const allRecommendations = [
    ...(trending || []).map(skill => ({ ...skill, category: 'Trending' })),
    ...(highDemand || []).map(skill => ({ ...skill, category: 'High Demand' })),
    ...(emerging || []).map(skill => ({ ...skill, category: 'Emerging' }))
  ];

  return (
    <div className="w-full space-y-4 sm:space-y-6 lg:space-y-8">
      {/* Current Skills Overview */}
      <div className="bg-gradient-to-r from-gray-800/50 via-gray-800/30 to-transparent backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-gray-700/50 shadow-2xl animate-fade-in-up">
        <div className="flex items-center mb-4 sm:mb-6">
          <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mr-3 sm:mr-4 shadow-lg">
            <span className="text-lg sm:text-2xl">🎯</span>
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Your Current Skills
          </h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
          {/* Technical Skills */}
          <div className="group animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-blue-700/30 hover:border-blue-500/50 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 shadow-lg hover:shadow-blue-500/25">
              <div className="flex items-center mb-3 sm:mb-4">
                <span className="text-xl sm:text-2xl mr-2 sm:mr-3">💻</span>
                <h3 className="text-lg sm:text-xl font-bold text-blue-400">Technical</h3>
              </div>
              <div className="flex flex-wrap gap-1 sm:gap-2">
                {currentSkills.technical?.map((skill, index) => (
                  <span key={index} className="bg-blue-600/30 text-blue-300 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium border border-blue-500/30">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Tools */}
          <div className="group animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="bg-gradient-to-br from-green-900/30 to-green-800/20 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-green-700/30 hover:border-green-500/50 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 shadow-lg hover:shadow-green-500/25">
              <div className="flex items-center mb-3 sm:mb-4">
                <span className="text-xl sm:text-2xl mr-2 sm:mr-3">🛠️</span>
                <h3 className="text-lg sm:text-xl font-bold text-green-400">Tools</h3>
              </div>
              <div className="flex flex-wrap gap-1 sm:gap-2">
                {currentSkills.tools?.map((skill, index) => (
                  <span key={index} className="bg-green-600/30 text-green-300 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium border border-green-500/30">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Soft Skills */}
          <div className="group animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <div className="bg-gradient-to-br from-purple-900/30 to-purple-800/20 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-purple-700/30 hover:border-purple-500/50 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 shadow-lg hover:shadow-purple-500/25">
              <div className="flex items-center mb-3 sm:mb-4">
                <span className="text-xl sm:text-2xl mr-2 sm:mr-3">�</span>
                <h3 className="text-lg sm:text-xl font-bold text-purple-400">Soft Skills</h3>
              </div>
              <div className="flex flex-wrap gap-1 sm:gap-2">
                {currentSkills.soft?.map((skill, index) => (
                  <span key={index} className="bg-purple-600/30 text-purple-300 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium border border-purple-500/30">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Skill Recommendations */}
      {allRecommendations.length > 0 && (
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-700/50">
          <div className="flex items-center mb-4 sm:mb-6">
            <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mr-3 sm:mr-4 shadow-lg">
              <span className="text-lg sm:text-2xl">�</span>
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              Recommended Skills to Learn
            </h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {allRecommendations.slice(0, 6).map((skill, index) => (
              <div key={index} className="bg-gray-700/50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-gray-600/50 hover:border-cyan-500/50 transition-all duration-300 hover:bg-gray-700/70">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm sm:text-base font-semibold text-white">{skill.name || skill.skill}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    skill.category === 'Trending' ? 'bg-orange-600/30 text-orange-300' :
                    skill.category === 'High Demand' ? 'bg-red-600/30 text-red-300' :
                    'bg-cyan-600/30 text-cyan-300'
                  }`}>
                    {skill.category}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-gray-300 mb-2">{skill.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">Market Demand</span>
                  <span className="text-xs font-medium text-cyan-400">{skill.demand || 'High'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const JobRecommendations = ({ data }) => {
  const { recommendedRoles = [], learningPath = {}, careerAdvice = [] } = data || {};

  return (
    <div className="w-full space-y-4 sm:space-y-6 lg:space-y-8">
      {/* Job Recommendations */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-700/50">
        <div className="flex items-center mb-4 sm:mb-6">
          <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mr-3 sm:mr-4 shadow-lg">
            <span className="text-lg sm:text-2xl">💼</span>
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
            Recommended Job Roles
          </h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {recommendedRoles.slice(0, 6).map((role, index) => (
            <div key={index} className="bg-gray-700/50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-gray-600/50 hover:border-green-500/50 transition-all duration-300 hover:bg-gray-700/70">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm sm:text-base font-semibold text-white">{role.title || role.role}</h3>
                <span className="bg-green-600/30 text-green-300 px-2 py-1 rounded-full text-xs font-medium">
                  {role.match || '85%'}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-gray-300 mb-2">{role.company || 'Various Companies'}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">Match Score</span>
                <span className="text-xs font-medium text-green-400">{role.match || '85%'}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Learning Path */}
      {learningPath.dominantTrack && (
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-700/50">
          <div className="flex items-center mb-4 sm:mb-6">
            <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mr-3 sm:mr-4 shadow-lg">
              <span className="text-lg sm:text-2xl">🎓</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-cyan-400">Your Learning Path</h2>
          </div>
          
          <div className="mb-4 sm:mb-6">
            <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">
              Dominant Track: <span className="text-cyan-400">{learningPath.dominantTrack}</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {Object.entries(learningPath.skillProgression || {}).map(([track, score]) => (
                <div key={track} className="text-center bg-gray-700/30 rounded-lg p-2 sm:p-3">
                  <div className="text-lg sm:text-2xl font-bold text-cyan-400">{score}</div>
                  <div className="text-gray-300 text-xs sm:text-sm">{track}</div>
                </div>
              ))}
            </div>
          </div>
          
          <h3 className="text-base sm:text-lg font-semibold text-white mb-2 sm:mb-3">Recommended Next Courses:</h3>
          <div className="flex flex-wrap gap-1 sm:gap-2">
            {(learningPath.recommendations || []).map((course, index) => (
              <span key={index} className="bg-cyan-600 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">
                {course}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Career Advice */}
      {careerAdvice.length > 0 && (
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-700/50">
          <div className="flex items-center mb-4 sm:mb-6">
            <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mr-3 sm:mr-4 shadow-lg">
              <span className="text-lg sm:text-2xl">🎯</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-purple-400">Career Advice</h2>
          </div>
          
          <div className="space-y-2 sm:space-y-3">
            {careerAdvice.map((advice, index) => (
              <div key={index} className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 bg-gray-700/50 rounded-lg">
                <span className="text-purple-400 text-base sm:text-xl mt-0.5">💡</span>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">{advice}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const InterviewPrep = ({ data }) => {
  const { topSkills = [], technicalQuestions = [], behavioralQuestions = [], interviewTips = [] } = data || {};

  return (
    <div className="w-full space-y-4 sm:space-y-6 lg:space-y-8">
      {/* Top Skills Focus */}
      {topSkills.length > 0 && (
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-700/50">
          <div className="flex items-center mb-4 sm:mb-6">
            <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mr-3 sm:mr-4 shadow-lg">
              <span className="text-lg sm:text-2xl">🎯</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-purple-400">Interview Focus Areas</h2>
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {topSkills.map((skill, index) => (
              <span key={index} className="bg-purple-600 text-white px-3 sm:px-4 py-1 sm:py-2 rounded-lg font-semibold text-xs sm:text-sm">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Technical Questions */}
      {technicalQuestions.length > 0 && (
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-700/50">
          <div className="flex items-center mb-4 sm:mb-6">
            <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mr-3 sm:mr-4 shadow-lg">
              <span className="text-lg sm:text-2xl">💻</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-cyan-400">Technical Questions</h2>
          </div>
          <div className="space-y-3 sm:space-y-4">
            {technicalQuestions.map((q, index) => (
              <div key={index} className="bg-gray-700/50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-gray-600/50">
                <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-white mb-2">{q.question}</h3>
                <div className="text-xs sm:text-sm text-gray-300 mb-2 flex flex-wrap gap-2">
                  <span className="text-cyan-400">Difficulty:</span> 
                  <span>{q.difficulty}</span>
                  <span className="text-cyan-400">| Type:</span> 
                  <span>{q.type}</span>
                </div>
                {q.answer && (
                  <div className="bg-gray-800/50 p-2 sm:p-3 rounded mb-2">
                    <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">{q.answer}</p>
                  </div>
                )}
                {q.tips && (
                  <p className="text-yellow-400 text-xs sm:text-sm">💡 {q.tips}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Behavioral Questions */}
      {behavioralQuestions.length > 0 && (
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-700/50">
          <div className="flex items-center mb-4 sm:mb-6">
            <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mr-3 sm:mr-4 shadow-lg">
              <span className="text-lg sm:text-2xl">🗣️</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-green-400">Behavioral Questions</h2>
          </div>
          <div className="space-y-3 sm:space-y-4">
            {behavioralQuestions.map((q, index) => (
              <div key={index} className="bg-gray-700/50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-gray-600/50">
                <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-white mb-2">{q.question}</h3>
                <div className="text-xs sm:text-sm text-green-400 mb-2">Category: {q.category}</div>
                {q.tips && (
                  <p className="text-yellow-400 text-xs sm:text-sm">💡 {q.tips}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Interview Tips */}
      {interviewTips.length > 0 && (
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-700/50">
          <div className="flex items-center mb-4 sm:mb-6">
            <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center mr-3 sm:mr-4 shadow-lg">
              <span className="text-lg sm:text-2xl">📝</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-orange-400">Interview Tips</h2>
          </div>
          <div className="space-y-2 sm:space-y-3">
            {interviewTips.map((tip, index) => (
              <div key={index} className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 bg-gray-700/50 rounded-lg">
                <span className="text-orange-400 text-base sm:text-xl mt-0.5">✓</span>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CareerCoach;
