const mongoose = require('mongoose');
const User = require('./Models/User');
require('dotenv').config();

// Database connection
const dbUrl = process.env.ATLASDB_URL || "mongodb://localhost:27017/thenextera";

async function cleanStudentApplications() {
  try {
    await mongoose.connect(dbUrl);
    console.log('✅ Connected to database');

    // Find all students who have instructor applications but shouldn't
    const studentsWithApplications = await User.find({
      role: 'Student',
      'instructorApplication': { $exists: true }
    }).select('name email role instructorApplication');

    console.log(`\n🔍 Found ${studentsWithApplications.length} students with instructor applications:`);
    
    for (const student of studentsWithApplications) {
      console.log(`👤 ${student.name} (${student.email})`);
      console.log(`   Application Status: ${student.instructorApplication?.status}`);
      console.log(`   Request Date: ${student.instructorApplication?.requestDate}`);
    }

    if (studentsWithApplications.length === 0) {
      console.log('✅ No cleanup needed - all students are clean');
      return;
    }

    // Ask for confirmation
    const action = process.argv[2];
    if (action !== 'confirm') {
      console.log('\n⚠️  To clean up these applications, run:');
      console.log('node clean-student-applications.js confirm');
      return;
    }

    // Clean up the applications
    console.log('\n🧹 Cleaning up instructor applications for students...');
    
    const result = await User.updateMany(
      { 
        role: 'Student',
        'instructorApplication': { $exists: true }
      },
      { 
        $unset: { 'instructorApplication': 1 }
      }
    );

    console.log(`✅ Cleaned up ${result.modifiedCount} student accounts`);
    console.log('🎯 Students can now apply for instructor manually when they choose to');

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Disconnected from database');
  }
}

cleanStudentApplications();
