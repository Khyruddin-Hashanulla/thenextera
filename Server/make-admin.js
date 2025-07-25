const mongoose = require('mongoose');
const User = require('./Models/User');
require('dotenv').config();

// Database connection
const dbUrl = process.env.ATLASDB_URL || "mongodb://localhost:27017/thenextera";

async function makeUserAdmin() {
  try {
    await mongoose.connect(dbUrl);
    console.log('✅ Connected to database');

    // Find your user by email or ID
    // Replace with your actual email or use the user ID from logs
    const userEmail = process.argv[2]; // Pass email as command line argument
    const userId = process.argv[3]; // Or pass user ID as command line argument

    let user;
    if (userEmail) {
      user = await User.findOne({ email: userEmail });
      console.log(`🔍 Looking for user with email: ${userEmail}`);
    } else if (userId) {
      user = await User.findById(userId);
      console.log(`🔍 Looking for user with ID: ${userId}`);
    } else {
      console.log('❌ Please provide email or user ID');
      console.log('Usage: node make-admin.js <email> or node make-admin.js "" <userId>');
      process.exit(1);
    }

    if (!user) {
      console.log('❌ User not found');
      process.exit(1);
    }

    console.log(`👤 Found user: ${user.name} (${user.email})`);
    console.log(`📋 Current role: ${user.role}`);

    // Update user role to Admin
    user.role = 'Admin';
    await user.save();

    console.log('🎉 User successfully promoted to Admin!');
    console.log(`✅ ${user.name} is now an Admin`);
    console.log('🔗 You can now access the admin panel at: http://localhost:5173/#/admin');

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from database');
  }
}

makeUserAdmin();
