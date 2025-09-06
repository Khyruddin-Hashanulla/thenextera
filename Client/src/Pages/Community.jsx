import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Community = () => {
  const [activeTab, setActiveTab] = useState('discussions');

  const discussions = [
    {
      id: 1,
      title: "Best practices for learning React hooks?",
      author: "Alex Chen",
      replies: 23,
      likes: 45,
      category: "React",
      timestamp: "2 hours ago",
      avatar: "👨‍💻",
      excerpt: "I'm struggling with useEffect and useState. Any tips for mastering React hooks?"
    },
    {
      id: 2,
      title: "Data Structures study group - Week 3",
      author: "Sarah Kim",
      replies: 67,
      likes: 89,
      category: "DSA",
      timestamp: "4 hours ago",
      avatar: "👩‍🎓",
      excerpt: "This week we're covering binary trees. Join us for collaborative problem solving!"
    },
    {
      id: 3,
      title: "Interview experience at Google - AMA",
      author: "Michael Rodriguez",
      replies: 156,
      likes: 234,
      category: "Career",
      timestamp: "1 day ago",
      avatar: "🚀",
      excerpt: "Just completed my Google interview process. Happy to answer questions!"
    },
    {
      id: 4,
      title: "JavaScript vs TypeScript for beginners",
      author: "Jennifer Park",
      replies: 34,
      likes: 67,
      category: "JavaScript",
      timestamp: "2 days ago",
      avatar: "💡",
      excerpt: "Debating whether to start with JS or jump straight to TS. Thoughts?"
    }
  ];

  const events = [
    {
      id: 1,
      title: "Weekly Coding Challenge",
      date: "Every Friday",
      time: "7:00 PM EST",
      participants: 245,
      type: "Challenge",
      description: "Join our weekly coding challenges and compete with fellow learners!"
    },
    {
      id: 2,
      title: "React Study Group",
      date: "Jan 20, 2024",
      time: "6:00 PM EST",
      participants: 89,
      type: "Study Group",
      description: "Deep dive into React concepts with experienced mentors."
    },
    {
      id: 3,
      title: "Career Fair - Tech Companies",
      date: "Jan 25, 2024",
      time: "2:00 PM EST",
      participants: 567,
      type: "Career",
      description: "Connect with recruiters from top tech companies."
    },
    {
      id: 4,
      title: "Algorithm Workshop",
      date: "Jan 28, 2024",
      time: "4:00 PM EST",
      participants: 123,
      type: "Workshop",
      description: "Master common algorithms with hands-on practice."
    }
  ];

  const leaderboard = [
    { rank: 1, name: "David Chen", points: 2450, badge: "🏆" },
    { rank: 2, name: "Sarah Johnson", points: 2380, badge: "🥈" },
    { rank: 3, name: "Mike Rodriguez", points: 2290, badge: "🥉" },
    { rank: 4, name: "Lisa Park", points: 2150, badge: "⭐" },
    { rank: 5, name: "Alex Kim", points: 2080, badge: "⭐" }
  ];

  const mentors = [
    {
      id: 1,
      name: "Dr. Emily Watson",
      expertise: "Machine Learning & AI",
      experience: "10+ years",
      rating: 4.9,
      students: 234,
      avatar: "👩‍🏫"
    },
    {
      id: 2,
      name: "James Liu",
      expertise: "Full Stack Development",
      experience: "8+ years",
      rating: 4.8,
      students: 189,
      avatar: "👨‍💼"
    },
    {
      id: 3,
      name: "Maria Garcia",
      expertise: "Data Structures & Algorithms",
      experience: "6+ years",
      rating: 4.9,
      students: 156,
      avatar: "👩‍💻"
    }
  ];

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
              NextEra Community
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Connect, learn, and grow with thousands of passionate learners and industry experts. 
              Join discussions, attend events, and accelerate your learning journey.
            </p>
          </div>

          {/* Community Stats */}
          <div className="mb-16">
            <div className="max-w-7xl mx-auto">
              <div className="grid md:grid-cols-4 gap-6">
                <div className="backdrop-blur-sm bg-white/5 rounded-xl border border-white/10 p-6 text-center">
                  <div className="text-3xl mb-2">👥</div>
                  <div className="text-2xl font-bold text-cyan-300">25,000+</div>
                  <div className="text-gray-400">Active Members</div>
                </div>
                <div className="backdrop-blur-sm bg-white/5 rounded-xl border border-white/10 p-6 text-center">
                  <div className="text-3xl mb-2">💬</div>
                  <div className="text-2xl font-bold text-purple-300">1,200+</div>
                  <div className="text-gray-400">Daily Discussions</div>
                </div>
                <div className="backdrop-blur-sm bg-white/5 rounded-xl border border-white/10 p-6 text-center">
                  <div className="text-3xl mb-2">🎯</div>
                  <div className="text-2xl font-bold text-cyan-300">500+</div>
                  <div className="text-gray-400">Weekly Events</div>
                </div>
                <div className="backdrop-blur-sm bg-white/5 rounded-xl border border-white/10 p-6 text-center">
                  <div className="text-3xl mb-2">🏆</div>
                  <div className="text-2xl font-bold text-purple-300">95%</div>
                  <div className="text-gray-400">Success Rate</div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="mb-8">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-wrap gap-2 justify-center">
                {['discussions', 'events', 'leaderboard', 'mentors'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 capitalize ${
                      activeTab === tab
                        ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Content Sections */}
          <div className="mb-16">
            <div className="max-w-7xl mx-auto">
              
              {/* Discussions Tab */}
              {activeTab === 'discussions' && (
                <div>
                  <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                      Recent Discussions
                    </h2>
                    <button className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                      Start Discussion
                    </button>
                  </div>
                  <div className="space-y-6">
                    {discussions.map(discussion => (
                      <div key={discussion.id} className="backdrop-blur-sm bg-white/5 rounded-xl border border-white/10 p-6 hover:bg-white/10 transition-all duration-300">
                        <div className="flex items-start gap-4">
                          <div className="text-3xl">{discussion.avatar}</div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-xl font-semibold text-cyan-300">{discussion.title}</h3>
                              <span className="bg-purple-600/20 px-3 py-1 rounded-full text-sm text-gray-300">{discussion.category}</span>
                            </div>
                            <p className="text-gray-300 mb-3">{discussion.excerpt}</p>
                            <div className="flex items-center gap-6 text-sm text-gray-400">
                              <span>by {discussion.author}</span>
                              <span>{discussion.timestamp}</span>
                              <span>💬 {discussion.replies} replies</span>
                              <span>❤️ {discussion.likes} likes</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Events Tab */}
              {activeTab === 'events' && (
                <div>
                  <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    Upcoming Events
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {events.map(event => (
                      <div key={event.id} className="backdrop-blur-sm bg-white/5 rounded-xl border border-white/10 p-6 hover:bg-white/10 transition-all duration-300">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="bg-cyan-600/20 px-3 py-1 rounded-full text-sm text-cyan-300">{event.type}</span>
                          <span className="text-gray-400 text-sm">👥 {event.participants} participants</span>
                        </div>
                        <h3 className="text-xl font-semibold mb-2 text-cyan-300">{event.title}</h3>
                        <p className="text-gray-300 mb-4">{event.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-gray-400">
                            <div>📅 {event.date}</div>
                            <div>🕐 {event.time}</div>
                          </div>
                          <button className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300">
                            Join Event
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Leaderboard Tab */}
              {activeTab === 'leaderboard' && (
                <div>
                  <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    Community Leaderboard
                  </h2>
                  <div className="backdrop-blur-sm bg-white/5 rounded-xl border border-white/10 p-6">
                    <div className="space-y-4">
                      {leaderboard.map(user => (
                        <div key={user.rank} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-all duration-300">
                          <div className="flex items-center gap-4">
                            <div className="text-2xl">{user.badge}</div>
                            <div className="text-lg font-medium text-gray-300">#{user.rank}</div>
                            <div className="text-lg font-semibold text-cyan-300">{user.name}</div>
                          </div>
                          <div className="text-xl font-bold text-purple-300">{user.points} pts</div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 text-center">
                      <button className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                        View Full Leaderboard
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Mentors Tab */}
              {activeTab === 'mentors' && (
                <div>
                  <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    Expert Mentors
                  </h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mentors.map(mentor => (
                      <div key={mentor.id} className="backdrop-blur-sm bg-white/5 rounded-xl border border-white/10 p-6 hover:bg-white/10 transition-all duration-300 text-center">
                        <div className="text-4xl mb-4">{mentor.avatar}</div>
                        <h3 className="text-xl font-semibold mb-2 text-cyan-300">{mentor.name}</h3>
                        <p className="text-purple-300 mb-2">{mentor.expertise}</p>
                        <p className="text-gray-400 mb-4">{mentor.experience}</p>
                        <div className="flex items-center justify-center gap-4 mb-4 text-sm text-gray-300">
                          <span>⭐ {mentor.rating}</span>
                          <span>👥 {mentor.students} students</span>
                        </div>
                        <button className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 w-full">
                          Connect
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Join Community CTA */}
          <div className="pb-16">
            <div className="max-w-4xl mx-auto">
              <div className="backdrop-blur-sm bg-white/5 rounded-2xl border border-white/10 p-8 text-center">
                <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  Ready to Join Our Community?
                </h2>
                <p className="text-gray-300 mb-6 text-lg">
                  Connect with like-minded learners, get help from experts, and accelerate your growth in tech.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                    Join Community
                  </button>
                  <button className="border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-gray-900 px-8 py-3 rounded-lg font-semibold transition-all duration-300">
                    Learn More
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

export default Community;
