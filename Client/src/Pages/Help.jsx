import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Help = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const faqCategories = [
    { id: 'all', name: 'All Topics', icon: '📚' },
    { id: 'courses', name: 'Courses', icon: '🎓' },
    { id: 'account', name: 'Account', icon: '👤' },
    { id: 'payment', name: 'Payment', icon: '💳' },
    { id: 'technical', name: 'Technical', icon: '⚙️' },
    { id: 'certificates', name: 'Certificates', icon: '🏆' }
  ];

  const faqs = [
    {
      id: 1,
      category: 'courses',
      question: 'How do I enroll in a course?',
      answer: 'To enroll in a course, simply browse our course catalog, select the course you\'re interested in, and click the "Enroll Now" button. You\'ll need to create an account if you don\'t have one already.'
    },
    {
      id: 2,
      category: 'courses',
      question: 'Can I access courses offline?',
      answer: 'Currently, our courses require an internet connection to access. However, you can download course materials and resources for offline study.'
    },
    {
      id: 3,
      category: 'account',
      question: 'How do I reset my password?',
      answer: 'Click on "Forgot Password" on the login page, enter your email address, and we\'ll send you a password reset link. Follow the instructions in the email to create a new password.'
    },
    {
      id: 4,
      category: 'account',
      question: 'Can I change my email address?',
      answer: 'Yes, you can update your email address in your profile settings. Go to Dashboard > Profile Settings > Account Information to make changes.'
    },
    {
      id: 5,
      category: 'payment',
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers. All payments are processed securely through our payment partners.'
    },
    {
      id: 6,
      category: 'payment',
      question: 'Do you offer refunds?',
      answer: 'Yes, we offer a 30-day money-back guarantee for all courses. If you\'re not satisfied with your purchase, contact our support team within 30 days for a full refund.'
    },
    {
      id: 7,
      category: 'technical',
      question: 'What are the system requirements?',
      answer: 'NextEra works on any modern web browser (Chrome, Firefox, Safari, Edge). You\'ll need a stable internet connection and speakers/headphones for video content.'
    },
    {
      id: 8,
      category: 'technical',
      question: 'I\'m having video playback issues. What should I do?',
      answer: 'Try refreshing the page, clearing your browser cache, or switching to a different browser. If issues persist, check your internet connection or contact our technical support.'
    },
    {
      id: 9,
      category: 'certificates',
      question: 'How do I get my course certificate?',
      answer: 'Certificates are automatically generated when you complete 100% of a course, including all assignments and quizzes. You can download your certificate from your dashboard.'
    },
    {
      id: 10,
      category: 'certificates',
      question: 'Are certificates recognized by employers?',
      answer: 'Our certificates demonstrate your completion of industry-relevant coursework. While recognition varies by employer, many value the practical skills and knowledge our courses provide.'
    }
  ];

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
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
          {/* Hero Section */}
          <div className="max-w-7xl mx-auto text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-6">
              Help Center
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Find answers to common questions, get support, and learn how to make the most of NextEra. 
              We're here to help you succeed on your learning journey.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-16">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for help topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border border-gray-600 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-lg"
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Quick Help Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white/5 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 text-center hover:bg-white/10 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💬</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Live Chat</h3>
              <p className="text-gray-400 mb-4">Get instant help from our support team</p>
              <button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-2 rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all duration-300">
                Start Chat
              </button>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 text-center hover:bg-white/10 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📧</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Email Support</h3>
              <p className="text-gray-400 mb-4">Send us a detailed message</p>
              <a href="/contact" className="inline-block bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-2 rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all duration-300">
                Contact Us
              </a>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 text-center hover:bg-white/10 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎥</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Video Tutorials</h3>
              <p className="text-gray-400 mb-4">Watch step-by-step guides</p>
              <button className="bg-gradient-to-r from-green-500 to-teal-600 text-white px-6 py-2 rounded-lg hover:from-green-600 hover:to-teal-700 transition-all duration-300">
                Watch Now
              </button>
            </div>
          </div>

          {/* FAQ Categories */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-center text-white mb-8">Browse by Category</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {faqCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    activeCategory === category.id
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  <span className="mr-2">{category.icon}</span>
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* FAQ Section */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-white mb-12">
              Frequently Asked Questions
            </h2>
            
            {filteredFaqs.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl text-gray-400 mb-2">No results found</h3>
                <p className="text-gray-500">Try adjusting your search terms or browse different categories</p>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredFaqs.map((faq) => (
                  <div key={faq.id} className="bg-white/5 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
                    <h3 className="text-lg font-semibold text-cyan-400 mb-3">
                      {faq.question}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {faq.answer}
                    </p>
                    <div className="mt-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        faq.category === 'courses' ? 'bg-blue-500/20 text-blue-400' :
                        faq.category === 'account' ? 'bg-green-500/20 text-green-400' :
                        faq.category === 'payment' ? 'bg-purple-500/20 text-purple-400' :
                        faq.category === 'technical' ? 'bg-orange-500/20 text-orange-400' :
                        'bg-pink-500/20 text-pink-400'
                      }`}>
                        {faqCategories.find(cat => cat.id === faq.category)?.icon} {faqCategories.find(cat => cat.id === faq.category)?.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Still Need Help Section */}
          <div className="mt-20 text-center">
            <div className="bg-white/5 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-12">
              <h2 className="text-3xl font-bold text-white mb-4">Still Need Help?</h2>
              <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                Can't find what you're looking for? Our support team is here to help you with any questions or issues.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/contact" className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-cyan-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
                  Contact Support
                </a>
                <a href="/community" className="bg-white/10 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/20 transition-all duration-300 border border-gray-600">
                  Join Community
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
    </div>
  );
};

export default Help;
