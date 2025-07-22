const axios = require('axios');

// Configuration
const BASE_URL = 'http://localhost:8080'; // Adjust port if needed
const API_URL = `${BASE_URL}/api`;
const AUTH_URL = `${BASE_URL}/auth`;

// Test credentials
const testUser = {
  email: 'test@example.com',
  password: 'testpassword123'
};

// Create axios instance with cookie jar
const axiosWithCookies = axios.create({
  withCredentials: true,
  timeout: 10000
});

async function debugSessionFlow() {
  console.log('🔍 Starting Session Authentication Debug Flow\n');
  
  try {
    // Step 1: Check server health
    console.log('1️⃣ Checking server health...');
    const healthCheck = await axiosWithCookies.get(`${BASE_URL}/debug/session`);
    console.log('✅ Server is running');
    console.log('Session info:', JSON.stringify(healthCheck.data, null, 2));
    console.log('');

    // Step 2: Login
    console.log('2️⃣ Attempting login...');
    const loginResponse = await axiosWithCookies.post(`${AUTH_URL}/login`, testUser);
    console.log('✅ Login successful');
    console.log('Login response:', JSON.stringify(loginResponse.data, null, 2));
    
    // Check cookies received
    const cookies = loginResponse.headers['set-cookie'];
    console.log('Cookies received:', cookies);
    console.log('');

    // Step 3: Check session after login
    console.log('3️⃣ Checking session after login...');
    const sessionAfterLogin = await axiosWithCookies.get(`${BASE_URL}/debug/session`);
    console.log('✅ Session check successful');
    console.log('Session after login:', JSON.stringify(sessionAfterLogin.data, null, 2));
    console.log('');

    // Step 4: Test protected route - Get all courses
    console.log('4️⃣ Testing protected route - GET /api/courses...');
    try {
      const coursesResponse = await axiosWithCookies.get(`${API_URL}/courses`);
      console.log('✅ Courses fetch successful');
      console.log('Courses response status:', coursesResponse.status);
      console.log('Number of courses:', coursesResponse.data.courses?.length || 0);
    } catch (error) {
      console.log('❌ Courses fetch failed');
      console.log('Error status:', error.response?.status);
      console.log('Error data:', JSON.stringify(error.response?.data, null, 2));
      console.log('Request headers:', JSON.stringify(error.config?.headers, null, 2));
    }
    console.log('');

    // Step 5: Test another protected route - Create course
    console.log('5️⃣ Testing protected route - POST /api/courses/add...');
    const testCourse = {
      title: 'Debug Test Course',
      description: 'This is a test course for debugging session authentication',
      thumbnail: 'https://via.placeholder.com/300x200',
      sections: []
    };
    
    try {
      const createResponse = await axiosWithCookies.post(`${API_URL}/courses/add`, testCourse);
      console.log('✅ Course creation successful');
      console.log('Create response status:', createResponse.status);
      console.log('Created course ID:', createResponse.data.course?.id);
    } catch (error) {
      console.log('❌ Course creation failed');
      console.log('Error status:', error.response?.status);
      console.log('Error data:', JSON.stringify(error.response?.data, null, 2));
      console.log('Request headers:', JSON.stringify(error.config?.headers, null, 2));
    }
    console.log('');

    // Step 6: Final session check
    console.log('6️⃣ Final session check...');
    const finalSession = await axiosWithCookies.get(`${BASE_URL}/debug/session`);
    console.log('✅ Final session check successful');
    console.log('Final session:', JSON.stringify(finalSession.data, null, 2));

  } catch (error) {
    console.error('❌ Debug flow failed:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', JSON.stringify(error.response.data, null, 2));
    }
    if (error.config) {
      console.error('Request URL:', error.config.url);
      console.error('Request method:', error.config.method);
      console.error('Request headers:', JSON.stringify(error.config.headers, null, 2));
    }
  }
}

// Helper function to debug cookie handling
function debugCookies(response) {
  const cookies = response.headers['set-cookie'];
  if (cookies) {
    console.log('🍪 Cookies in response:');
    cookies.forEach(cookie => {
      console.log(`  - ${cookie}`);
    });
  } else {
    console.log('🍪 No cookies in response');
  }
}

// Run the debug flow
debugSessionFlow().catch(console.error);
