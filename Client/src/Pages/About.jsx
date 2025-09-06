import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import founderImage from '../assets/founder.png';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Animated Background Elements - matching Home page */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/40 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/40 rounded-full blur-xl animate-pulse" style={{ animationDelay: "1s" }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/30 rounded-full blur-2xl animate-ping" style={{ animationDuration: "4s" }}></div>
      </div>
      
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-4 pt-32 pb-8">
          <Navbar />
          
          {/* Hero Section */}
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 mb-6">
                About NextEra
              </h1>
              <p className="text-xl sm:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Empowering the next generation of developers through innovative education and hands-on experience
              </p>
            </div>

            {/* Mission Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
              <div className="bg-white/5 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8">
                <h2 className="text-3xl font-bold text-cyan-400 mb-6">Our Mission</h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  At NextEra, we believe that quality education should be accessible to everyone. Our mission is to bridge the gap between traditional learning and industry requirements by providing cutting-edge courses, practical projects, and real-world experience.
                </p>
                <p className="text-gray-300 text-lg leading-relaxed">
                  We're committed to creating a learning ecosystem where students can grow, innovate, and become the tech leaders of tomorrow.
                </p>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8">
                <h2 className="text-3xl font-bold text-purple-400 mb-6">Our Vision</h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  To become the world's leading platform for practical technology education, where learning meets innovation and students transform into industry-ready professionals.
                </p>
                <p className="text-gray-300 text-lg leading-relaxed">
                  We envision a future where every learner has access to high-quality, hands-on education that prepares them for the rapidly evolving tech landscape.
                </p>
              </div>
            </div>

            {/* Values Section */}
            <div className="mb-20">
              <h2 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600 mb-12">
                Our Core Values
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="text-center bg-white/5 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">Excellence</h3>
                  <p className="text-gray-400">Delivering the highest quality education and learning experiences</p>
                </div>
                
                <div className="text-center bg-white/5 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🚀</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">Innovation</h3>
                  <p className="text-gray-400">Embracing cutting-edge technologies and teaching methods</p>
                </div>
                
                <div className="text-center bg-white/5 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🤝</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">Community</h3>
                  <p className="text-gray-400">Building a supportive learning community for all students</p>
                </div>
                
                <div className="text-center bg-white/5 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">💡</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">Accessibility</h3>
                  <p className="text-gray-400">Making quality education accessible to learners worldwide</p>
                </div>
              </div>
            </div>

            {/* Team Section */}
            <div className="mb-20">
              <h2 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600 mb-12">
                Meet Our Founder
              </h2>
              <div className="max-w-4xl mx-auto">
                <div className="bg-white/5 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 text-center">
                  <div className="relative inline-block mb-6">
                    <div className="w-44 h-44 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400 p-1 shadow-2xl shadow-cyan-500/30">
                      <img 
                        src={founderImage} 
                        alt="Khyruddin Hashanulla - Founder & CEO" 
                        className="w-full h-full rounded-full object-cover hover:scale-105 transition-transform duration-300" 
                      />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Khyruddin Hashanulla</h3>
                  <p className="text-cyan-400 text-lg mb-4">Founder & CEO</p>
                  <p className="text-gray-300 text-lg leading-relaxed max-w-3xl mx-auto">
                    A passionate educator and technology enthusiast with a vision to revolutionize online learning. 
                    Khyruddin combines years of industry experience with innovative teaching methodologies to create 
                    an unparalleled learning platform that prepares students for real-world challenges.
                  </p>
                  <div className="flex justify-center space-x-4 mt-6">
                    <a href="https://www.linkedin.com/in/khyruddin-hashanulla" target="_blank" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                      LinkedIn
                    </a>
                    <a href="https://khyruddin-hashanulla.github.io/MY-PORTFOLIO/" target="_blank" className="text-purple-400 hover:text-purple-300 transition-colors">
                      Portfolio
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
              <div className="text-center bg-white/5 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                <div className="text-3xl font-bold text-cyan-400 mb-2">10K+</div>
                <div className="text-gray-400">Students Enrolled</div>
              </div>
              <div className="text-center bg-white/5 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                <div className="text-3xl font-bold text-purple-400 mb-2">50+</div>
                <div className="text-gray-400">Courses Available</div>
              </div>
              <div className="text-center bg-white/5 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                <div className="text-3xl font-bold text-green-400 mb-2">95%</div>
                <div className="text-gray-400">Completion Rate</div>
              </div>
              <div className="text-center bg-white/5 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                <div className="text-3xl font-bold text-orange-400 mb-2">87%</div>
                <div className="text-gray-400">Job Placement</div>
              </div>
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
    </div>
  );
};

export default About;
