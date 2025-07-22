// Deployment Debug Script
// Run this to check if all dependencies can be loaded

console.log('🔍 Checking deployment dependencies...\n');

// Check environment variables
const requiredEnvVars = [
  'SESSION_SECRET',
  'ATLASDB_URL',
  'EMAIL_USER',
  'EMAIL_PASSWORD',
  'NODE_ENV'
];

console.log('📋 Environment Variables:');
requiredEnvVars.forEach(varName => {
  const value = process.env[varName];
  console.log(`  ${varName}: ${value ? '✅ Set' : '❌ Missing'}`);
});

console.log('\n📦 Testing Module Imports:');

// Test each dependency
const dependencies = [
  { name: 'User Model', path: './Models/User' },
  { name: 'Course Model', path: './Models/Course' },
  { name: 'Email Service', path: './utils/emailService' },
  { name: 'Auth Middleware', path: './Middleware/auth' },
  { name: 'Cloudinary Config', path: './config/cloudinary' },
  { name: 'Passport Config', path: './config/passport' },
  { name: 'Auth Routes', path: './Routes/Auth' },
  { name: 'Course Routes', path: './Routes/Courses' }
];

dependencies.forEach(dep => {
  try {
    require(dep.path);
    console.log(`  ${dep.name}: ✅ Loaded successfully`);
  } catch (error) {
    console.log(`  ${dep.name}: ❌ Failed to load`);
    console.log(`    Error: ${error.message}`);
  }
});

console.log('\n🏁 Debug complete');
