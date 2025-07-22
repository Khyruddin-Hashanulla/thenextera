const axios = require('axios');

// Test session persistence by simulating login and then checking session
async function testSessionPersistence() {
  try {
    console.log('Testing session persistence...\n');
    
    // Create axios instance with cookie jar
    const api = axios.create({
      baseURL: 'http://localhost:8080',
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'Origin': 'http://localhost:5174'
      }
    });

    // Step 1: Check initial session status
    console.log('1. Checking initial session status...');
    const initialSession = await api.get('/auth/session-status');
    console.log('Initial session:', JSON.stringify(initialSession.data, null, 2));
    console.log('Set-Cookie headers:', initialSession.headers['set-cookie']);
    
    // Step 2: Attempt login
    console.log('\n2. Attempting login...');
    const loginData = {
      email: 'khyruddin.working@gmail.com', // Use your actual email
      password: 'your-password-here', // You'll need to update this
      rememberMe: false
    };
    
    try {
      const loginResponse = await api.post('/auth/login', loginData);
      console.log('Login response:', JSON.stringify(loginResponse.data, null, 2));
      console.log('Login Set-Cookie headers:', loginResponse.headers['set-cookie']);
    } catch (loginError) {
      console.log('Login failed:', loginError.response?.data || loginError.message);
      return;
    }
    
    // Step 3: Check session status after login
    console.log('\n3. Checking session status after login...');
    const postLoginSession = await api.get('/auth/session-status');
    console.log('Post-login session:', JSON.stringify(postLoginSession.data, null, 2));
    
    // Step 4: Test protected route
    console.log('\n4. Testing protected route...');
    try {
      const protectedResponse = await api.get('/api/courses/test-auth');
      console.log('Protected route response:', JSON.stringify(protectedResponse.data, null, 2));
    } catch (protectedError) {
      console.log('Protected route failed:', protectedError.response?.data || protectedError.message);
    }
    
  } catch (error) {
    console.error('Test failed:', error.message);
  }
}

testSessionPersistence();
