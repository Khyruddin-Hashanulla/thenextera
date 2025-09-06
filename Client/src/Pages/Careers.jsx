import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';  

const Careers = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');

  const jobOpenings = [
    {
      id: 1,
      title: "Senior Full Stack Developer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      experience: "3-5 years",
      description: "Build and maintain our learning platform using React, Node.js, and MongoDB."
    },
    {
      id: 2,
      title: "UI/UX Designer",
      department: "Design",
      location: "San Francisco, CA",
      type: "Full-time",
      experience: "2-4 years",
      description: "Design intuitive and engaging user experiences for our educational platform."
    },
    {
      id: 3,
      title: "Content Creator - DSA",
      department: "Content",
      location: "Remote",
      type: "Contract",
      experience: "1-3 years",
      description: "Create high-quality educational content for Data Structures and Algorithms courses."
    },
    {
      id: 4,
      title: "DevOps Engineer",
      department: "Engineering",
      location: "New York, NY",
      type: "Full-time",
      experience: "3-6 years",
      description: "Manage cloud infrastructure and deployment pipelines for our platform."
    },
    {
      id: 5,
      title: "Marketing Manager",
      department: "Marketing",
      location: "Remote",
      type: "Full-time",
      experience: "2-5 years",
      description: "Lead marketing campaigns and growth strategies for NextEra platform."
    }
  ];

  const benefits = [
    {
      icon: "💰",
      title: "Competitive Salary",
      description: "Industry-leading compensation packages with equity options"
    },
    {
      icon: "🏥",
      title: "Health & Wellness",
      description: "Comprehensive health insurance and wellness programs"
    },
    {
      icon: "🏠",
      title: "Remote Work",
      description: "Flexible remote work options with modern home office setup"
    },
    {
      icon: "📚",
      title: "Learning Budget",
      description: "Annual learning budget for courses, conferences, and books"
    },
    {
      icon: "🌴",
      title: "Unlimited PTO",
      description: "Take time off when you need it with unlimited vacation policy"
    },
    {
      icon: "🚀",
      title: "Growth Opportunities",
      description: "Clear career progression paths and mentorship programs"
    }
  ];

  const departments = ['all', 'Engineering', 'Design', 'Content', 'Marketing'];
  const locations = ['all', 'Remote', 'San Francisco, CA', 'New York, NY'];

  const filteredJobs = jobOpenings.filter(job => {
    const deptMatch = selectedDepartment === 'all' || job.department === selectedDepartment;
    const locMatch = selectedLocation === 'all' || job.location === selectedLocation;
    return deptMatch && locMatch;
  });

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      
      {/* Animated Background Elements - matching Home page */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/40 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/40 rounded-full blur-xl animate-pulse" style={{ animationDelay: "1s" }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/30 rounded-full blur-2xl animate-ping" style={{ animationDuration: "4s" }}></div>
      </div>
      
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-4 pt-32 pb-8">
          {/* Header Section */}
          <div className="max-w-7xl mx-auto text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-6">
              Join NextEra
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Help us revolutionize education technology and empower millions of learners worldwide. 
              Build the future of learning with a passionate team of innovators.
            </p>
          </div>

          {/* Company Culture Section */}
          <div className="mb-16">
            <div className="max-w-7xl mx-auto">
              <div className="backdrop-blur-sm bg-white/5 rounded-2xl border border-white/10 p-8">
                <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  Why Work at NextEra?
                </h2>
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="text-4xl mb-4">🚀</div>
                    <h3 className="text-xl font-semibold mb-2 text-cyan-300">Innovation First</h3>
                    <p className="text-gray-300">Work on cutting-edge educational technology that impacts millions of students globally.</p>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl mb-4">🤝</div>
                    <h3 className="text-xl font-semibold mb-2 text-purple-300">Collaborative Team</h3>
                    <p className="text-gray-300">Join a diverse, inclusive team where every voice matters and collaboration drives success.</p>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl mb-4">📈</div>
                    <h3 className="text-xl font-semibold mb-2 text-cyan-300">Growth Mindset</h3>
                    <p className="text-gray-300">Continuous learning and professional development are at the core of our culture.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="mb-16">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Benefits & Perks
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="backdrop-blur-sm bg-white/5 rounded-xl border border-white/10 p-6 hover:bg-white/10 transition-all duration-300">
                    <div className="text-3xl mb-4">{benefit.icon}</div>
                    <h3 className="text-xl font-semibold mb-2 text-cyan-300">{benefit.title}</h3>
                    <p className="text-gray-300">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Job Openings Section */}
          <div className="mb-16">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Open Positions
              </h2>
              
              {/* Filters */}
              <div className="flex flex-wrap gap-4 mb-8 justify-center">
                <select 
                  value={selectedDepartment} 
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                >
                  {departments.map(dept => (
                    <option key={dept} value={dept}>
                      {dept === 'all' ? 'All Departments' : dept}
                    </option>
                  ))}
                </select>
                
                <select 
                  value={selectedLocation} 
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                >
                  {locations.map(loc => (
                    <option key={loc} value={loc}>
                      {loc === 'all' ? 'All Locations' : loc}
                    </option>
                  ))}
                </select>
              </div>

              {/* Job Listings */}
              <div className="space-y-6">
                {filteredJobs.map(job => (
                  <div key={job.id} className="backdrop-blur-sm bg-white/5 rounded-xl border border-white/10 p-6 hover:bg-white/10 transition-all duration-300">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                      <div className="flex-1">
                        <h3 className="text-2xl font-semibold mb-2 text-cyan-300">{job.title}</h3>
                        <div className="flex flex-wrap gap-4 mb-3 text-sm text-gray-300">
                          <span className="bg-purple-600/20 px-3 py-1 rounded-full">{job.department}</span>
                          <span className="bg-cyan-600/20 px-3 py-1 rounded-full">{job.location}</span>
                          <span className="bg-gray-600/20 px-3 py-1 rounded-full">{job.type}</span>
                          <span className="bg-gray-600/20 px-3 py-1 rounded-full">{job.experience}</span>
                        </div>
                        <p className="text-gray-300">{job.description}</p>
                      </div>
                      <div className="mt-4 lg:mt-0 lg:ml-6">
                        <button className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                          Apply Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredJobs.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-400 text-lg">No positions match your current filters.</p>
                </div>
              )}
            </div>
          </div>

          {/* Contact Section */}
          <div className="pb-16">
            <div className="max-w-4xl mx-auto text-center">
              <div className="backdrop-blur-sm bg-white/5 rounded-2xl border border-white/10 p-8">
                <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  Don't See Your Role?
                </h2>
                <p className="text-gray-300 mb-6 text-lg">
                  We're always looking for talented individuals to join our team. 
                  Send us your resume and tell us how you'd like to contribute to NextEra's mission.
                </p>
                <button className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                  Send Your Resume
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Careers;
