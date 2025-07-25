const mongoose = require('mongoose');
const User = require('./Models/User');
require('dotenv').config();

// Database connection
const dbUrl = process.env.ATLASDB_URL || "mongodb://localhost:27017/thenextera";

async function checkUser() {
  try {
    await mongoose.connect(dbUrl);
    console.log('✅ Connected to database');

    const userEmail = process.argv[2] || 'khyruddin.official@gmail.com';
    
    const user = await User.findOne({ email: userEmail });
    
    if (!user) {
      console.log('❌ User not found');
      process.exit(1);
    }

    console.log('\n👤 User Details:');
    console.log(`Name: ${user.name}`);
    console.log(`Email: ${user.email}`);
    console.log(`Role: ${user.role}`);
    console.log(`Created: ${user.createdAt}`);
    
    console.log('\n📋 Instructor Application Status:');
    if (user.instructorApplication) {
      console.log(`Status: ${user.instructorApplication.status}`);
      console.log(`Request Date: ${user.instructorApplication.requestDate}`);
      console.log(`Resubmission Allowed: ${user.instructorApplication.resubmissionAllowed}`);
      
      if (user.instructorApplication.adminDecision) {
        console.log(`Decision Date: ${user.instructorApplication.adminDecision.decisionDate}`);
        console.log(`Decision Reason: ${user.instructorApplication.adminDecision.reason}`);
      }
    } else {
      console.log('No instructor application found');
    }

    console.log('\n🔍 Raw instructorApplication field:');
    console.log(JSON.stringify(user.instructorApplication, null, 2));

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Disconnected from database');
  }
}

checkUser();
