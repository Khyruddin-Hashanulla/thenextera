import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Footer = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleViewAllCourses = (e) => {
    e.preventDefault();
    if (user) {
      navigate("/courses");
    } else {
      navigate("/login", { state: { redirectTo: "/courses" } });
    }
  };

  return (
    <footer className="relative bg-gradient-to-t from-black via-gray-900 to-gray-800 text-white py-16 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="relative container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-7xl mx-auto mb-12">
          {/* Brand Section */}
          <div className="md:col-span-2 animate-fade-in-up">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-[linear-gradient(1deg,_rgba(34,143,186,1)_0%,_rgba(0,0,0,1)_69%,_rgba(0,0,0,1)_100%)] rounded-xl flex items-center justify-center mr-4">
                <span className="text-white font-bold text-xl">
                  <img src="/src/assets/logo.png" alt="NextEra Logo" />
                </span>
              </div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                NextEra
              </h3>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Empowering learners worldwide with high-quality online education.
              Transform your career with expert-led courses and cutting-edge
              learning experiences.
            </p>

            {/* Social Links */}
            <div className="flex space-x-4">
              <a
                href="#"
                className="group w-12 h-12 bg-[linear-gradient(1deg,_rgba(34,143,186,1)_0%,_rgba(0,0,0,1)_69%,_rgba(0,0,0,1)_100%)] rounded-full flex items-center justify-center hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-110"
              >
                <svg
                  className="w-6 h-6 text-white group-hover:scale-110 transition-transform"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
              <a
                href="#"
                className="group w-12 h-12 bg-[linear-gradient(1deg,_rgba(34,143,186,1)_0%,_rgba(0,0,0,1)_69%,_rgba(0,0,0,1)_100%)] rounded-full flex items-center justify-center hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-110"
              >
                <svg
                  className="w-6 h-6 text-white group-hover:scale-110 transition-transform"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7.75 2A5.75 5.75 0 002 7.75v8.5A5.75 5.75 0 007.75 22h8.5A5.75 5.75 0 0022 16.25v-8.5A5.75 5.75 0 0016.25 2h-8.5zm0 1.5h8.5A4.25 4.25 0 0120.5 7.75v8.5a4.25 4.25 0 01-4.25 4.25h-8.5A4.25 4.25 0 013.5 16.25v-8.5A4.25 4.25 0 017.75 3.5zm8.75 2a.75.75 0 100 1.5.75.75 0 000-1.5zM12 7a5 5 0 100 10 5 5 0 000-10zm0 1.5a3.5 3.5 0 110 7 3.5 3.5 0 010-7z" />
                </svg>
              </a>
              <a
                href="#"
                className="group w-12 h-12 bg-[linear-gradient(1deg,_rgba(34,143,186,1)_0%,_rgba(0,0,0,1)_69%,_rgba(0,0,0,1)_100%)] rounded-full flex items-center justify-center hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-110"
              >
                <svg
                  className="w-6 h-6 text-white group-hover:scale-110 transition-transform"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div
            className="animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            <h3 className="text-xl font-bold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="group flex items-center text-gray-400 hover:text-white transition-colors duration-200"
                >
                  <svg
                    className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                  Home
                </Link>
              </li>
              <li>
                <button
                  onClick={handleViewAllCourses}
                  className="group flex items-center text-gray-400 hover:text-white bg-transparent border-none p-0 cursor-pointer transition-colors duration-200"
                >
                  <svg
                    className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                  Courses
                </button>
              </li>
              <li>
                <Link
                  to="/login"
                  className="group flex items-center text-gray-400 hover:text-white transition-colors duration-200"
                >
                  <svg
                    className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="group flex items-center text-gray-400 hover:text-white transition-colors duration-200"
                >
                  <svg
                    className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                  Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div
            className="animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            <h3 className="text-xl font-bold mb-6 text-white">Get in Touch</h3>
            <div className="space-y-4">
              <div className="flex items-center text-gray-300">
                <svg
                  className="w-5 h-5 mr-3 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <a
                  href="mailto:support@nextera.com"
                  className="hover:text-white transition-colors"
                >
                  support@nextera.com
                </a>
              </div>
              <div className="flex items-center text-gray-300">
                <svg
                  className="w-5 h-5 mr-3 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <a
                  href="tel:+11234567890"
                  className="hover:text-white transition-colors"
                >
                  (91) 9432364608
                </a>
              </div>
              <div className="flex items-center text-gray-300">
                <svg
                  className="w-5 h-5 mr-3 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>Kolkata, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div
          className="border-t border-gray-700/50 pt-8 animate-fade-in-up"
          style={{ animationDelay: "0.6s" }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 mb-4 md:mb-0">
            <p>
                  &copy; {new Date().getFullYear()} NextEra. Developed &
                  Designed by &nbsp;
                  <a
                    href="https://khyruddin-hashanulla.github.io/MY-PORTFOLIO/"
                    target="_blank"
                    className="text-blue-400 hover:text-blue-600 transition-colors duration-200"
                  >
                    Khyruddin Hashanulla
                  </a>
                </p>
            </div>
            <div className="flex space-x-6 text-sm">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
