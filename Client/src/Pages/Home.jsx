import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import Navbar from '../components/Navbar';

const Home = () => {
  const [featuredCourses, setFeaturedCourses] = useState([]);
  const [categories, setCategories] = useState([
    { name: 'Web Development', courseCount: 12 },
    { name: 'Mobile Development', courseCount: 8 },
    { name: 'Data Science', courseCount: 10 },
    { name: 'UI/UX Design', courseCount: 6 },
    { name: 'Machine Learning', courseCount: 9 },
    { name: 'Business', courseCount: 7 }
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await api.get('/api/courses');
        if (response.data && Array.isArray(response.data)) {
          setFeaturedCourses(response.data.slice(0, 3));
        } else {
          setFeaturedCourses([]);
        }
      } catch (err) {
        console.error('Error fetching home page data:', err);
        setError('Failed to load content. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCourseClick = (courseId) => {
    if (user) {
      navigate(`/courses/${courseId}`);
    } else {
      navigate('/login', { state: { redirectTo: `/courses/${courseId}` } });
    }
  };

  const handleEnrollClick = (e, courseId) => {
    e.stopPropagation();
    if (user) {
      navigate(`/courses/${courseId}`);
    } else {
      navigate('/login', { state: { redirectTo: `/courses/${courseId}` } });
    }
  };

  const handleViewAllCourses = (e) => {
    e.preventDefault();
    if (user) {
      navigate('/courses');
    } else {
      navigate('/login', { state: { redirectTo: '/courses' } });
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <div className="text-white bg-[linear-gradient(1deg,_rgba(34,143,186,1)_0%,_rgba(0,0,0,1)_69%,_rgba(0,0,0,1)_100%)] min-h-screen">
        <div className="container mx-auto px-4 py-4 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Unlock Your Potential with NextEra</h1>
            <p className="text-lg md:text-xl mb-8">
              Discover expert-led courses designed to help you master new skills and advance your career.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleViewAllCourses}
                className="px-6 py-3 bg-black border-2 border-white text-white font-medium rounded-lg hover:bg-white/10 transition-colors"
              >
                Explore Courses
              </button>
              {!user && (
                <Link
                  to="/register"
                  className="px-6 py-3 bg-transparent border-2 border-white text-white font-medium rounded-lg hover:bg-white/10 transition-colors"
                >
                  Sign Up Free
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Featured Courses Section */}
      <div className="bg-[linear-gradient(1deg,_rgba(34,143,186,1)_0%,_rgba(0,0,0,1)_69%,_rgba(0,0,0,1)_100%)] text-white min-h-screen">
        <div className="container mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold text-center mb-8">Featured Courses</h2>

          {loading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
            </div>
          ) : error ? (
            <div className="text-center text-red-300">{error}</div>
          ) : featuredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {featuredCourses.map((course) => (
                <div
                  key={course._id}
                  className="bg-[linear-gradient(1deg,_rgba(34,143,186,1)_0%,_rgba(0,0,0,1)_69%,_rgba(0,0,0,1)_100%)] text-black rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow h-full flex flex-col border-2 border-gray-900 shadow-2xl"
                  onClick={() => handleCourseClick(course._id)}
                >
                  <div className="relative h-48">
                    <img
                      src={course.thumbnail || 'https://via.placeholder.com/400x200?text=Course+Thumbnail'}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-lg font-bold mb-2 text-gray-100 line-clamp-2 hover:text-gray-400 cursor-pointer transition-colors duration-300">{course.title}</h3>
                    <p className="text-gray-300 mb-9 line-clamp-3 flex-grow">{course.description}</p>
                    <div className="flex justify-between items-center mt-auto">
                      <span className="text-indigo-600 font-semibold">
                        {course.price > 0 ? `$${course.price?.toFixed(2)}` : 'Free'}
                      </span>
                      <button
                        onClick={(e) => handleEnrollClick(e, course._id)}
                        className="px-6 py-3 bg-black border-2 border-white text-white font-medium rounded-lg hover:bg-white/10 transition-colors"
                      >
                        {user ? 'View Course' : 'Sign In to View'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-300">No courses available at the moment.</div>
          )}

          <div className="text-center mt-8">
            <button
              onClick={handleViewAllCourses}
              className="px-6 py-3 bg-transparent border-2 border-white text-white font-medium rounded-lg hover:bg-white/10 transition-colors"
            >
              View All Courses
            </button>
          </div>
        </div>
      </div>

    {/* Categories Section */}
    <div className="bg-[linear-gradient(1deg,_rgba(34,143,186,1)_0%,_rgba(0,0,0,1)_69%,_rgba(0,0,0,1)_100%)] text-white py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {categories.map((category, index) => (
              <div
                key={index}
                onClick={(e) => {
                  e.preventDefault();
                  if (user) {
                    navigate(`/courses?category=${encodeURIComponent(category.name)}`);
                  } else {
                    navigate('/login', { state: { redirectTo: `/courses?category=${encodeURIComponent(category.name)}` } });
                  }
                }}
                className="bg-[linear-gradient(1deg,_rgba(34,143,186,1)_0%,_rgba(0,0,0,1)_69%,_rgba(0,0,0,1)_100%)] text-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow cursor-pointer"
              >
                <h3 className="text-lg font-semibold text-gray-100">{category.name}</h3>
                <p className="text-gray-300 mt-2">{category.courseCount || 0} Courses</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Why Choose Us Section */}
      <div className="mx-auto px-4 py-16 bg-[linear-gradient(1deg,_rgba(34,143,186,1)_0%,_rgba(0,0,0,1)_69%,_rgba(0,0,0,1)_100%)]">
        <h2 className="text-3xl font-bold text-center text-white mb-12">Why Choose NextEra</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="text-center p-6 bg-[linear-gradient(1deg,_rgba(34,143,186,1)_0%,_rgba(0,0,0,1)_69%,_rgba(0,0,0,1)_100%)] rounded-lg shadow-sm">
            <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-xl text-white font-semibold mb-3">Expert Instructors</h3>
            <p className="text-gray-300">Learn from industry professionals with years of real-world experience.</p>
          </div>
          <div className="text-center p-6 bg-[linear-gradient(1deg,_rgba(34,143,186,1)_0%,_rgba(0,0,0,1)_69%,_rgba(0,0,0,1)_100%)] rounded-lg shadow-sm">
            <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl text-white font-semibold mb-3">Learn at Your Own Pace</h3>
            <p className="text-gray-300">Access course materials anytime, anywhere, and progress at your own speed.</p>
          </div>
          <div className="text-center p-6 bg-[linear-gradient(1deg,_rgba(34,143,186,1)_0%,_rgba(0,0,0,1)_69%,_rgba(0,0,0,1)_100%)] rounded-lg shadow-sm">
            <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl text-white font-semibold mb-3">Secure & Reliable</h3>
            <p className="text-gray-300">Our platform ensures your data is protected and courses are always accessible.</p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-[linear-gradient(1deg,_rgba(34,143,186,1)_0%,_rgba(0,0,0,1)_69%,_rgba(0,0,0,1)_100%)] text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Learning?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of students already learning on NextEra. Get started today!
          </p>
          {user ? (
            <button
              onClick={() => navigate('/courses')}
              className="px-8 py-4 bg-black border-2 border-white text-white font-medium rounded-lg hover:bg-white/10 transition-colors"
            >
              Browse Courses
            </button>
          ) : (
            <Link
              to="/register"
              className="px-8 py-4 bg-black border-2 border-white text-white font-medium rounded-lg hover:bg-white/10 transition-colors"
            >
              Sign Up Now
            </Link>
          )}
        </div>
      </div>
      {/* Footer */}
      <footer className="bg-[linear-gradient(1deg,_rgba(34,143,186,1)_0%,_rgba(0,0,0,1)_69%,_rgba(0,0,0,1)_100%)] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div>
              <h3 className="text-xl font-bold mb-4">NextEra</h3>
              <p className="text-gray-400">
                Empowering learners worldwide with high-quality online education.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-400 hover:text-white">Home</Link></li>
                <li>
                  <button 
                    onClick={handleViewAllCourses}
                    className="text-gray-400 hover:text-white bg-transparent border-none p-0 cursor-pointer"
                  >
                    Courses
                  </button>
                </li>
                <li><Link to="/login" className="text-gray-400 hover:text-white">Login</Link></li>
                <li><Link to="/register" className="text-gray-400 hover:text-white">Register</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Contact Us</h3>
              <p className="text-gray-400">
                Email: support@nextera.com<br />
                Phone: (123) 456-7890
              </p>
            </div>
          </div>
          <div className="border-t border-gray-300 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} NextEra. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;