import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const blogPosts = [
    {
      id: 1,
      title: "Mastering Data Structures: A Complete Guide for Beginners",
      excerpt: "Learn the fundamentals of data structures and how they form the backbone of efficient programming. From arrays to trees, we cover it all.",
      category: "Programming",
      author: "Sarah Chen",
      date: "2024-01-15",
      readTime: "8 min read",
      image: "",
      tags: ["Data Structures", "Programming", "Beginner"]
    },
    {
      id: 2,
      title: "The Future of Online Learning: AI-Powered Education",
      excerpt: "Explore how artificial intelligence is revolutionizing education and creating personalized learning experiences for students worldwide.",
      category: "Technology",
      author: "Dr. Michael Rodriguez",
      date: "2024-01-12",
      readTime: "6 min read",
      image: "",
      tags: ["AI", "Education", "Technology"]
    },
    {
      id: 3,
      title: "Building Your First React Application: Step by Step",
      excerpt: "A comprehensive tutorial for creating your first React app, covering components, state management, and best practices.",
      category: "Programming",
      author: "Alex Johnson",
      date: "2024-01-10",
      readTime: "12 min read",
      image: "",
      tags: ["React", "JavaScript", "Web Development"]
    },
    {
      id: 4,
      title: "Study Tips for Coding Interviews: Land Your Dream Job",
      excerpt: "Essential strategies and techniques to ace your coding interviews at top tech companies. Practice problems and solutions included.",
      category: "Career",
      author: "Jennifer Park",
      date: "2024-01-08",
      readTime: "10 min read",
      image: "",
      tags: ["Interview", "Career", "Coding"]
    },
    {
      id: 5,
      title: "Understanding Big O Notation: Algorithm Efficiency Made Simple",
      excerpt: "Demystify Big O notation and learn how to analyze algorithm efficiency. Essential knowledge for every programmer.",
      category: "Programming",
      author: "David Kim",
      date: "2024-01-05",
      readTime: "7 min read",
      image: "",
      tags: ["Algorithms", "Big O", "Performance"]
    },
    {
      id: 6,
      title: "The Rise of Remote Learning: Challenges and Opportunities",
      excerpt: "Examining the shift to remote education, its impact on students and educators, and what the future holds.",
      category: "Education",
      author: "Lisa Thompson",
      date: "2024-01-03",
      readTime: "9 min read",
      image: "",
      tags: ["Remote Learning", "Education", "Future"]
    }
  ];

  const categories = ['all', 'Programming', 'Technology', 'Career', 'Education'];

  const filteredPosts = blogPosts.filter(post => {
    const categoryMatch = selectedCategory === 'all' || post.category === selectedCategory;
    const searchMatch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return categoryMatch && searchMatch;
  });

  const featuredPost = blogPosts[0];

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
              NextEra Blog
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Insights, tutorials, and stories from the world of technology and education. 
              Stay updated with the latest trends and best practices.
            </p>
          </div>

          {/* Featured Post */}
          <div className="px-4 sm:px-6 lg:px-8 mb-16">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Featured Post
              </h2>
              <div className="backdrop-blur-sm bg-white/5 rounded-2xl border border-white/10 p-8 hover:bg-white/10 transition-all duration-300">
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="text-6xl mb-4">{featuredPost.image}</div>
                    <div className="flex items-center gap-4 mb-4 text-sm text-gray-400">
                      <span className="bg-purple-600/20 px-3 py-1 rounded-full">{featuredPost.category}</span>
                      <span>{featuredPost.author}</span>
                      <span>{featuredPost.date}</span>
                      <span>{featuredPost.readTime}</span>
                    </div>
                    <h3 className="text-3xl font-bold mb-4 text-cyan-300">{featuredPost.title}</h3>
                    <p className="text-gray-300 mb-6 text-lg leading-relaxed">{featuredPost.excerpt}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {featuredPost.tags.map(tag => (
                        <span key={tag} className="bg-gray-700/50 px-3 py-1 rounded-full text-sm text-gray-300">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <button className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                      Read Full Article
                    </button>
                  </div>
                  <div className="lg:text-right">
                    <div className="text-8xl opacity-50">{featuredPost.image}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="mb-12">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex-1 max-w-md">
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                      selectedCategory === category
                        ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    {category === 'all' ? 'All Posts' : category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Blog Posts Grid */}
          <div className="px-4 sm:px-6 lg:px-8 mb-16">
            <div className="max-w-7xl mx-auto">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.slice(1).map(post => (
                  <article key={post.id} className="backdrop-blur-sm bg-white/5 rounded-xl border border-white/10 p-6 hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
                    <div className="text-4xl mb-4">{post.image}</div>
                    <div className="flex items-center gap-2 mb-3 text-sm text-gray-400">
                      <span className="bg-purple-600/20 px-2 py-1 rounded-full">{post.category}</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-cyan-300 line-clamp-2">{post.title}</h3>
                    <p className="text-gray-300 mb-4 text-sm leading-relaxed line-clamp-3">{post.excerpt}</p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {post.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="bg-gray-700/50 px-2 py-1 rounded-full text-xs text-gray-400">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-400">
                        <div>{post.author}</div>
                        <div>{post.date}</div>
                      </div>
                      <button className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors duration-300">
                        Read More →
                      </button>
                    </div>
                  </article>
                ))}
              </div>

              {filteredPosts.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-400 text-lg">No articles match your search criteria.</p>
                </div>
              )}
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="px-4 sm:px-6 lg:px-8 pb-16">
            <div className="max-w-4xl mx-auto">
              <div className="backdrop-blur-sm bg-white/5 rounded-2xl border border-white/10 p-8 text-center">
                <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  Stay Updated
                </h2>
                <p className="text-gray-300 mb-6 text-lg">
                  Subscribe to our newsletter and never miss the latest insights, tutorials, and updates from NextEra.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  />
                  <button className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Blog;
