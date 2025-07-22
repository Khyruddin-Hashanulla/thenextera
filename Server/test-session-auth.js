#!/usr/bin/env node

/**
 * Session Authentication Test Script
 * 
 * This script tests session-based authentication for your deployed application.
 * It simulates the login flow and tests protected routes to verify session persistence.
 */

// Use Node.js built-in modules instead of axios
const https = require('https');
const http = require('http');
const { URL } = require('url');

// Configuration - Update these URLs for your deployment
const CONFIG = {
  // Backend API URL (your Render deployment)
  API_URL: process.env.API_URL || 'https://nextera-vaaq.onrender.com',
  
  // Test credentials - use a real test account
  TEST_EMAIL: process.env.TEST_EMAIL || 'test@example.com',
  TEST_PASSWORD: process.env.TEST_PASSWORD || 'testpassword123',
  
  // Frontend URL (for CORS testing)
  FRONTEND_URL: process.env.FRONTEND_URL || 'https://thenextera.in'
};

// Create axios instance with session support
const api = axios.create({
  baseURL: CONFIG.API_URL,
  withCredentials: true, // Essential for session cookies
  headers: {
    'Origin': CONFIG.FRONTEND_URL,
    'Referer': CONFIG.FRONTEND_URL,
    'User-Agent': 'SessionAuthTest/1.0'
  },
  timeout: 10000
});

// Store cookies manually (for Node.js testing)
let sessionCookie = null;

// Add request interceptor to include session cookie
api.interceptors.request.use((config) => {
  if (sessionCookie) {
    config.headers.Cookie = sessionCookie;
  }
  console.log(`🔄 ${config.method?.toUpperCase()} ${config.url}`);
  return config;
});

// Add response interceptor to capture session cookie
api.interceptors.response.use((response) => {
  const setCookie = response.headers['set-cookie'];
  if (setCookie) {
    const connectSid = setCookie.find(cookie => cookie.startsWith('connect.sid='));
    if (connectSid) {
      sessionCookie = connectSid.split(';')[0];
      console.log('🍪 Session cookie captured:', sessionCookie.substring(0, 50) + '...');
    }
  }
  return response;
}, (error) => {
  console.error(`❌ ${error.config?.method?.toUpperCase()} ${error.config?.url} - ${error.response?.status} ${error.response?.statusText}`);
  if (error.response?.data) {
    console.error('Error details:', error.response.data);
  }
  return Promise.reject(error);
});

async function testSessionAuth() {
  console.log('🚀 Starting Session Authentication Test');
  console.log('📍 API URL:', CONFIG.API_URL);
  console.log('🌐 Frontend URL:', CONFIG.FRONTEND_URL);
  console.log('');

  try {
    // Step 1: Test debug endpoint before login
    console.log('1️⃣ Testing session debug endpoint (before login)...');
    const debugBefore = await api.get('/debug/session');
    console.log('Session state before login:', {
      hasSession: debugBefore.data.hasSession,
      sessionId: debugBefore.data.sessionId,
      isAuthenticated: debugBefore.data.sessionData?.isAuthenticated
    });
    console.log('');

    // Step 2: Login
    console.log('2️⃣ Attempting login...');
    const loginResponse = await api.post('/auth/login', {
      email: CONFIG.TEST_EMAIL,
      password: CONFIG.TEST_PASSWORD
    });
    
    console.log('✅ Login successful!');
    console.log('Login response:', {
      message: loginResponse.data.message,
      user: loginResponse.data.user?.email,
      hasToken: !!loginResponse.data.token
    });
    console.log('');

    // Step 3: Test debug endpoint after login
    console.log('3️⃣ Testing session debug endpoint (after login)...');
    const debugAfter = await api.get('/debug/session');
    console.log('Session state after login:', {
      hasSession: debugAfter.data.hasSession,
      sessionId: debugAfter.data.sessionId,
      isAuthenticated: debugAfter.data.sessionData?.isAuthenticated,
      userId: debugAfter.data.sessionData?.userId,
      sessionCookie: debugAfter.data.cookies?.sessionCookie ? 'Present' : 'Missing'
    });
    console.log('');

    // Step 4: Test protected route - Get all courses
    console.log('4️⃣ Testing protected route (GET /api/courses)...');
    const coursesResponse = await api.get('/api/courses');
    console.log('✅ Protected route accessible!');
    console.log(`Found ${coursesResponse.data.length} courses`);
    console.log('');

    // Step 5: Test another protected route if courses exist
    if (coursesResponse.data.length > 0) {
      const firstCourse = coursesResponse.data[0];
      console.log('5️⃣ Testing specific course route...');
      const courseResponse = await api.get(`/api/courses/${firstCourse.id}`);
      console.log('✅ Specific course route accessible!');
      console.log(`Course: ${courseResponse.data.title}`);
    }

    console.log('');
    console.log('🎉 All tests passed! Session authentication is working correctly.');
    
  } catch (error) {
    console.log('');
    console.log('❌ Test failed!');
    
    if (error.response?.status === 401) {
      console.log('🔐 Authentication Error: Session not persisting properly');
      console.log('This indicates the session cookie is not being sent or recognized.');
      console.log('');
      console.log('Possible causes:');
      console.log('- CORS configuration issues');
      console.log('- Cookie SameSite/Secure settings');
      console.log('- Domain/subdomain mismatch');
      console.log('- Session store connection issues');
    } else if (error.response?.status === 404) {
      console.log('🔍 Route Not Found: Check if the API endpoints are correct');
    } else if (error.code === 'ECONNREFUSED') {
      console.log('🌐 Connection Error: Backend server is not accessible');
    } else {
      console.log('Unexpected error:', error.message);
    }
    
    process.exit(1);
  }
}

// Run the test
if (require.main === module) {
  testSessionAuth().catch(console.error);
}

module.exports = { testSessionAuth, CONFIG };
