import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';
import { getAllPublishedPosts, getFeaturedPosts, getPostsByCategory } from '../data/blogPosts';
import api from '../utils/api';

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [email, setEmail] = useState('');
  const [subscriptionStatus, setSubscriptionStatus] = useState('');
  const [subscriptionMessage, setSubscriptionMessage] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);
  
  const allPosts = getAllPublishedPosts();
  const featuredPosts = getFeaturedPosts();
  
  // Get unique categories
  const categories = ['All', ...new Set(allPosts.map(post => post.category))];

  useEffect(() => {
    let posts = selectedCategory === 'All' ? allPosts : getPostsByCategory(selectedCategory);
    
    if (searchTerm) {
      posts = posts.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    setFilteredPosts(posts);
  }, [selectedCategory, searchTerm, allPosts]);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "NextEra Blog",
    "description": "Insights, tutorials, and stories about learning, coding, and building projects with NextEra platform",
    "url": "https://thenextera.in/blog",
    "publisher": {
      "@type": "Organization",
      "name": "NextEra",
      "logo": {
        "@type": "ImageObject",
        "url": "https://thenextera.in/logo.png"
      }
    },
    "blogPost": allPosts.map(post => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.metaDescription,
      "url": `https://thenextera.in/blog/${post.slug}`,
      "datePublished": post.publishDate,
      "author": {
        "@type": "Person",
        "name": post.author
      }
    }))
  };

  // Newsletter subscription handler
  const handleNewsletterSubscription = async () => {
    if (!email || subscriptionStatus === 'loading') return;

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setSubscriptionStatus('error');
      setSubscriptionMessage('Please enter a valid email address');
      return;
    }

    setSubscriptionStatus('loading');
    setSubscriptionMessage('');

    try {
      const response = await api.post('/api/newsletter/subscribe', { email });
      
      if (response.data.success) {
        setSubscriptionStatus('success');
        setSubscriptionMessage(response.data.message);
        setEmail(''); // Clear email field on success
      } else {
        setSubscriptionStatus('error');
        setSubscriptionMessage(response.data.message || 'Subscription failed');
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      setSubscriptionStatus('error');
      if (error.response?.data?.message) {
        setSubscriptionMessage(error.response.data.message);
      } else {
        setSubscriptionMessage('Failed to subscribe. Please try again later.');
      }
    }

    // Clear status after 5 seconds
    setTimeout(() => {
      setSubscriptionStatus('');
      setSubscriptionMessage('');
    }, 5000);
  };

  return (
    <>
      <SEOHead 
        title="NextEra Blog - Learning, Coding & Project Building Insights"
        description="Discover insights, tutorials, and stories about learning, coding, DSA, core subjects, and building real-world projects with NextEra platform by Khyruddin Hashanulla."
        keywords="NextEra blog, coding tutorials, DSA learning, computer science, project building, programming insights, Khyruddin Hashanulla"
        author="Khyruddin Hashanulla"
        robots="index, follow"
        canonical="https://thenextera.in/blog"
        structuredData={structuredData}
      />

      <div className="min-h-screen bg-gray-900 flex flex-col relative overflow-hidden">
        {/* Enhanced animated background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-gradient-to-br from-purple-500/15 to-pink-600/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }}></div>
          <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "4s" }}></div>

          <div className="absolute top-20 left-20 w-2 h-2 bg-cyan-400/30 rounded-full animate-bounce"></div>
          <div className="absolute top-40 right-32 w-1.5 h-1.5 bg-purple-400/30 rounded-full animate-bounce" style={{ animationDelay: "1s" }}></div>
          <div className="absolute bottom-32 left-1/3 w-1 h-1 bg-blue-400/30 rounded-full animate-bounce" style={{ animationDelay: "2s" }}></div>
        </div>
        
        <Navbar />
        
        <div className="container mx-auto px-4 py-4 pt-32 pb-8 flex-grow max-w-7xl relative z-10">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              NextEra{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                Blog
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Insights, tutorials, and stories about learning, coding, and building projects that matter
            </p>
            
            {/* Search Bar */}
            <div className="max-w-md mx-auto mb-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-6 py-4 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none backdrop-blur-sm"
                />
                <svg className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                      : 'bg-slate-800/50 text-gray-300 hover:bg-slate-700/50 border border-slate-700/50'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Featured Posts */}
          {featuredPosts.length > 0 && selectedCategory === 'All' && !searchTerm && (
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">Featured Articles</h2>
              <div className="grid lg:grid-cols-2 gap-8">
                {featuredPosts.map((post) => (
                  <Link
                    key={post.id}
                    to={`/blog/${post.slug}`}
                    className="group block bg-slate-800/30 border border-slate-700/50 rounded-2xl overflow-hidden hover:bg-slate-700/30 transition-all duration-300 backdrop-blur-sm"
                  >
                    {post.featuredImage && (
                      <div className="aspect-video overflow-hidden">
                        <img 
                          src={post.featuredImage} 
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="p-8">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="px-3 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full text-purple-300 text-sm font-medium">
                          {post.category}
                        </span>
                        <span className="text-gray-400 text-sm">{post.readTime}</span>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-300 mb-6 line-clamp-3 leading-relaxed">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                            {post.author.charAt(0)}
                          </div>
                          <div>
                            <p className="text-white font-medium text-sm">{post.author}</p>
                            <p className="text-gray-400 text-xs">
                              {new Date(post.publishDate).toLocaleDateString('en-US', { 
                                year: 'numeric', 
                                month: 'short', 
                                day: 'numeric' 
                              })}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {post.tags.slice(0, 2).map((tag, index) => (
                            <span key={index} className="px-2 py-1 bg-slate-700/50 rounded text-xs text-gray-400">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* All Posts */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-white">
                {selectedCategory === 'All' ? 'All Articles' : `${selectedCategory} Articles`}
              </h2>
              <span className="text-gray-400">
                {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''}
              </span>
            </div>

            {filteredPosts.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">No articles found</h3>
                <p className="text-gray-400 mb-6">Try adjusting your search or filter criteria</p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('All');
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
                >
                  Show All Articles
                </button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
                  <Link
                    key={post.id}
                    to={`/blog/${post.slug}`}
                    className="group block bg-slate-800/30 border border-slate-700/50 rounded-xl overflow-hidden hover:bg-slate-700/30 transition-all duration-300 backdrop-blur-sm hover:transform hover:scale-105"
                  >
                    {post.featuredImage && (
                      <div className="aspect-video overflow-hidden">
                        <img 
                          src={post.featuredImage} 
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="px-2 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full text-purple-300 text-xs font-medium">
                          {post.category}
                        </span>
                        <span className="text-gray-400 text-xs">{post.readTime}</span>
                      </div>
                      <h3 className="text-lg font-bold text-white mb-3 group-hover:text-purple-300 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-300 text-sm mb-4 line-clamp-3 leading-relaxed">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                            {post.author.charAt(0)}
                          </div>
                          <div>
                            <p className="text-white font-medium text-xs">{post.author}</p>
                            <p className="text-gray-400 text-xs">
                              {new Date(post.publishDate).toLocaleDateString('en-US', { 
                                month: 'short', 
                                day: 'numeric' 
                              })}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          {post.tags.slice(0, 2).map((tag, index) => (
                            <span key={index} className="px-2 py-1 bg-slate-700/50 rounded text-xs text-gray-400">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Newsletter Subscription */}
          <div className="mt-20 text-center p-8 bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-500/30 rounded-2xl backdrop-blur-sm">
            <h3 className="text-3xl font-bold text-white mb-4">Stay Updated</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Get the latest articles, tutorials, and insights delivered straight to your inbox. 
              Join our community of learners and builders.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-6">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={subscriptionStatus === 'loading'}
                className="flex-1 px-6 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none disabled:opacity-50"
              />
              <button 
                onClick={handleNewsletterSubscription}
                disabled={subscriptionStatus === 'loading' || !email}
                className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {subscriptionStatus === 'loading' ? 'Subscribing...' : 'Subscribe'}
              </button>
            </div>
            
            {/* Subscription Status Messages */}
            {subscriptionMessage && (
              <div className={`mb-4 p-3 rounded-lg ${
                subscriptionStatus === 'success' 
                  ? 'bg-green-500/20 border border-green-500/30 text-green-300' 
                  : 'bg-red-500/20 border border-red-500/30 text-red-300'
              }`}>
                {subscriptionMessage}
              </div>
            )}
            
            <p className="text-gray-400 text-sm">
              No spam, unsubscribe at any time. Read our{" "}
              <Link to="/privacy" className="text-purple-400 hover:text-purple-300 underline">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Blog;
