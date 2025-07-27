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
    <div className="w-full p-6">
      {/* Simple Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-4">
          🤖 AI Career Coach
        </h1>
        <p className="text-xl text-gray-300">
          Personalized career guidance powered by AI
        </p>
      </div>

      {/* Simple Navigation */}
      <div className="flex justify-center mb-8">
        <div className="bg-gray-800 rounded-lg p-2">
          {[
            { id: 'skills', label: 'Skills', icon: '🎯' },
            { id: 'jobs', label: 'Jobs', icon: '💼' },
            { id: 'interview', label: 'Interview', icon: '🎤' },
            { id: 'mock-interview', label: 'Mock', icon: '🗣️' }
          ].map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`px-4 py-2 mx-1 rounded transition-colors ${
                activeSection === section.id
                  ? 'bg-cyan-600 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-gray-700'
              }`}
            >
              <span className="mr-2">{section.icon}</span>
              <span className="hidden sm:inline">{section.label}</span>
            </button>
          ))}
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
            <div className="bg-red-900/50 rounded-lg p-6">
              <p className="text-red-300">⚠️ {error}</p>
            </div>
          </div>
        )}

        {/* Content Sections */}
        {!loading && !error && (
          <div className="bg-gray-800 rounded-lg p-6">
            {activeSection === 'skills' && (
              <div>
                <h2 className="text-2xl font-bold text-cyan-400 mb-4">Skill Recommendations</h2>
                {skillRecommendations ? (
                  <SkillRecommendations data={skillRecommendations} />
                ) : (
                  <p className="text-gray-300">Click to load skill recommendations...</p>
                )}
              </div>
            )}

            {activeSection === 'jobs' && (
              <div>
                <h2 className="text-2xl font-bold text-green-400 mb-4">Job Matching</h2>
                {jobRecommendations ? (
                  <JobRecommendations data={jobRecommendations} />
                ) : (
                  <p className="text-gray-300">Click to load job recommendations...</p>
                )}
              </div>
            )}

            {activeSection === 'interview' && (
              <div>
                <h2 className="text-2xl font-bold text-purple-400 mb-4">Interview Preparation</h2>
                {interviewPrep ? (
                  <InterviewPrep data={interviewPrep} />
                ) : (
                  <p className="text-gray-300">Click to load interview preparation...</p>
                )}
              </div>
            )}

            {activeSection === 'mock-interview' && (
              <div>
                <h2 className="text-2xl font-bold text-orange-400 mb-4">Mock Interview</h2>
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
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Current Skills Overview */}
      <div className="bg-gradient-to-r from-gray-800/50 via-gray-800/30 to-transparent backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50 shadow-2xl animate-fade-in-up">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mr-4 shadow-lg">
            <span className="text-2xl">🎯</span>
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Your Current Skills
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Technical Skills */}
          <div className="group animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 backdrop-blur-sm rounded-2xl p-6 border border-blue-700/30 hover:border-blue-500/50 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 shadow-lg hover:shadow-blue-500/25">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <span className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center mr-3">
                  💻
                </span>
                Technical ({(currentSkills.technical || []).length})
              </h3>
              <div className="flex flex-wrap gap-2">
                {(currentSkills.technical || []).map((skill, index) => (
                  <span 
                    key={index} 
                    className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-200 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          {/* Tools */}
          <div className="group animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="bg-gradient-to-br from-green-900/30 to-green-800/20 backdrop-blur-sm rounded-2xl p-6 border border-green-700/30 hover:border-green-500/50 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 shadow-lg hover:shadow-green-500/25">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <span className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center mr-3">
                  🛠️
                </span>
                Tools ({(currentSkills.tools || []).length})
              </h3>
              <div className="flex flex-wrap gap-2">
                {(currentSkills.tools || []).map((tool, index) => (
                  <span 
                    key={index} 
                    className="bg-gradient-to-r from-green-600 to-green-700 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg hover:shadow-green-500/25 transform hover:scale-105 transition-all duration-200 cursor-default"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          {/* Soft Skills */}
          <div className="group animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <div className="bg-gradient-to-br from-purple-900/30 to-purple-800/20 backdrop-blur-sm rounded-2xl p-6 border border-purple-700/30 hover:border-purple-500/50 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 shadow-lg hover:shadow-purple-500/25">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <span className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center mr-3">
                  🧠
                </span>
                Soft Skills ({(currentSkills.soft || []).length})
              </h3>
              <div className="flex flex-wrap gap-2">
                {(currentSkills.soft || []).map((skill, index) => (
                  <span 
                    key={index} 
                    className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-200 cursor-default"
                  >
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
        <div className="bg-gradient-to-r from-gray-800/50 via-gray-800/30 to-transparent backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50 shadow-2xl animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center mr-4 shadow-lg animate-pulse">
              <span className="text-2xl">🚀</span>
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
              Recommended Skills to Learn
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {allRecommendations.slice(0, 9).map((skill, index) => (
              <div 
                key={index} 
                className="group bg-gradient-to-br from-gray-800/60 to-gray-900/40 backdrop-blur-sm rounded-2xl p-6 border border-gray-600/50 hover:border-cyan-500/50 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 shadow-lg hover:shadow-cyan-500/25 animate-fade-in-up"
                style={{ animationDelay: `${0.5 + index * 0.1}s` }}
              >
                {/* Skill Header */}
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors duration-300">
                    {skill.name || skill.skill || 'Unknown Skill'}
                  </h3>
                  <div className="relative">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-lg ${
                      skill.category === 'High Demand' 
                        ? 'bg-gradient-to-r from-red-500 to-red-600 text-white' 
                        : skill.category === 'Trending'
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                        : 'bg-gradient-to-r from-green-500 to-green-600 text-white'
                    }`}>
                      {skill.category}
                    </span>
                  </div>
                </div>
                
                {/* Description */}
                <p className="text-gray-300 text-sm mb-4 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                  {skill.description || skill.reason || 'Learn this skill to advance your career.'}
                </p>
                
                {/* Details */}
                <div className="space-y-3">
                  {skill.demand && (
                    <div className="flex justify-between items-center p-3 bg-gray-700/30 rounded-lg border border-gray-600/30">
                      <span className="text-gray-400 font-medium">Demand:</span>
                      <span className="text-cyan-300 font-semibold">{skill.demand}</span>
                    </div>
                  )}
                  {skill.averageRate && (
                    <div className="flex justify-between items-center p-3 bg-gray-700/30 rounded-lg border border-gray-600/30">
                      <span className="text-gray-400 font-medium">Avg Rate:</span>
                      <span className="text-green-400 font-bold">{skill.averageRate}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Debug Info */}
      <div className="bg-gray-800/50 rounded-lg p-4 text-sm text-gray-400">
        <p>Debug: API returned {Object.keys(data || {}).join(', ')}</p>
        <p>Recommendations found: {allRecommendations.length}</p>
      </div>
    </div>
  );
};

const JobRecommendations = ({ data }) => {
  const { recommendedRoles, learningPath, careerAdvice, skillGaps } = data;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Job Matches */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6">
        <h2 className="text-2xl font-bold text-cyan-400 mb-4">💼 Best Job Matches</h2>
        <div className="space-y-6">
          {recommendedRoles.map((role, index) => (
            <div key={index} className="bg-gray-700/50 rounded-lg p-6 border border-gray-600">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-white">{role.title}</h3>
                  <p className="text-gray-300">{role.description}</p>
                </div>
                <div className="text-right">
                  <div className={`text-2xl font-bold ${
                    role.match >= 80 ? 'text-green-400' :
                    role.match >= 60 ? 'text-yellow-400' : 'text-orange-400'
                  }`}>
                    {role.match}%
                  </div>
                  <p className="text-gray-400 text-sm">Match</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">Salary Range:</span>
                  <p className="text-green-400 font-semibold">{role.salaryRange}</p>
                </div>
                <div>
                  <span className="text-gray-400">Demand Level:</span>
                  <p className="text-white">{role.demandLevel}</p>
                </div>
                <div>
                  <span className="text-gray-400">Remote Work:</span>
                  <p className="text-white">{role.remoteOpportunities}</p>
                </div>
                <div>
                  <span className="text-gray-400">Requirements:</span>
                  <p className="text-white">{role.requirements.slice(0, 2).join(', ')}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Learning Path */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6">
        <h2 className="text-2xl font-bold text-cyan-400 mb-4">🎓 Your Learning Path</h2>
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-white mb-2">Dominant Track: {learningPath.dominantTrack}</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(learningPath.skillProgression).map(([track, score]) => (
              <div key={track} className="text-center">
                <div className="text-2xl font-bold text-cyan-400">{score}</div>
                <div className="text-gray-300 text-sm">{track}</div>
              </div>
            ))}
          </div>
        </div>
        
        <h3 className="text-lg font-semibold text-white mb-3">Recommended Next Courses:</h3>
        <div className="flex flex-wrap gap-2">
          {learningPath.recommendations.map((course, index) => (
            <span key={index} className="bg-cyan-600 text-white px-3 py-1 rounded-full text-sm">
              {course}
            </span>
          ))}
        </div>
      </div>

      {/* Career Advice */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6">
        <h2 className="text-2xl font-bold text-cyan-400 mb-4">🎯 Career Advice</h2>
        <div className="space-y-3">
          {careerAdvice.map((advice, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-gray-700/50 rounded-lg">
              <span className="text-cyan-400 text-xl">💡</span>
              <p className="text-gray-300">{advice}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const InterviewPrep = ({ data }) => {
  const { topSkills, technicalQuestions, behavioralQuestions, interviewTips } = data;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Top Skills Focus */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6">
        <h2 className="text-2xl font-bold text-cyan-400 mb-4">🎯 Interview Focus Areas</h2>
        <div className="flex flex-wrap gap-3">
          {topSkills.map((skill, index) => (
            <span key={index} className="bg-cyan-600 text-white px-4 py-2 rounded-lg font-semibold">
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Technical Questions */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6">
        <h2 className="text-2xl font-bold text-cyan-400 mb-4">💻 Technical Questions</h2>
        <div className="space-y-4">
          {technicalQuestions.map((q, index) => (
            <div key={index} className="bg-gray-700/50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-2">{q.question}</h3>
              <div className="text-sm text-gray-300 mb-2">
                <span className="text-cyan-400">Difficulty:</span> {q.difficulty} | 
                <span className="text-cyan-400"> Type:</span> {q.type}
              </div>
              <div className="bg-gray-800/50 p-3 rounded mb-2">
                <p className="text-gray-300 text-sm">{q.answer}</p>
              </div>
              <p className="text-yellow-400 text-sm">💡 {q.tips}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Behavioral Questions */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6">
        <h2 className="text-2xl font-bold text-cyan-400 mb-4">🗣️ Behavioral Questions</h2>
        <div className="space-y-4">
          {behavioralQuestions.map((q, index) => (
            <div key={index} className="bg-gray-700/50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-2">{q.question}</h3>
              <div className="text-sm text-cyan-400 mb-2">Category: {q.category}</div>
              <p className="text-yellow-400 text-sm">💡 {q.tips}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Interview Tips */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6">
        <h2 className="text-2xl font-bold text-cyan-400 mb-4">📝 Interview Tips</h2>
        <div className="space-y-3">
          {interviewTips.map((tip, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-gray-700/50 rounded-lg">
              <span className="text-cyan-400 text-xl">✓</span>
              <p className="text-gray-300">{tip}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CareerCoach;
