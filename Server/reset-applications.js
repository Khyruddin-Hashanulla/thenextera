const mongoose = require('mongoose');
const User = require('./Models/User');
require('dotenv').config();

// Database connection
const dbUrl = process.env.ATLASDB_URL || "mongodb://localhost:27017/thenextera";

async function resetInstructorApplications() {
  try {
    await mongoose.connect(dbUrl);
    console.log('✅ Connected to database');

    const action = process.argv[2]; // 'all', 'user', or 'list'
    const userIdentifier = process.argv[3]; // email or user ID

    if (action === 'list') {
      // List all users with instructor applications
      const usersWithApplications = await User.find({
        'instructorApplication': { $exists: true }
      }).select('name email role instructorApplication');

      console.log('\n📋 Users with instructor applications:');
      usersWithApplications.forEach(user => {
        console.log(`👤 ${user.name} (${user.email})`);
        console.log(`   Role: ${user.role}`);
        console.log(`   Application Status: ${user.instructorApplication?.status}`);
        console.log(`   Request Date: ${user.instructorApplication?.requestDate}`);
        console.log('');
      });

      console.log(`Total: ${usersWithApplications.length} users with applications`);
      
    } else if (action === 'user' && userIdentifier) {
      // Reset specific user's application
      let user;
      if (userIdentifier.includes('@')) {
        user = await User.findOne({ email: userIdentifier });
      } else {
        user = await User.findById(userIdentifier);
      }

      if (!user) {
        console.log('❌ User not found');
        process.exit(1);
      }

      console.log(`👤 Found user: ${user.name} (${user.email})`);
      console.log(`📋 Current role: ${user.role}`);
      console.log(`📋 Current application status: ${user.instructorApplication?.status}`);

      // Remove instructor application
      user.instructorApplication = undefined;
      await user.save();

      console.log('✅ Instructor application removed successfully!');
      console.log(`🔄 ${user.name} can now apply for instructor role again`);

    } else if (action === 'all') {
      // Reset all instructor applications (use with caution!)
      const result = await User.updateMany(
        { 'instructorApplication': { $exists: true } },
        { $unset: { 'instructorApplication': 1 } }
      );

      console.log(`✅ Removed instructor applications from ${result.modifiedCount} users`);
      console.log('🔄 All users can now apply for instructor role again');

    } else {
      console.log('❌ Invalid usage');
      console.log('Usage:');
      console.log('  node reset-applications.js list                    # List all applications');
      console.log('  node reset-applications.js user <email>           # Reset specific user by email');
      console.log('  node reset-applications.js user <userId>          # Reset specific user by ID');
      console.log('  node reset-applications.js all                    # Reset ALL applications (careful!)');
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from database');
  }
}

resetInstructorApplications();
