const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  role: { 
    type: String, 
    enum: ['Student', 'Admin', 'Instructor', 'pending_instructor'], 
    default: 'Student' 
  },
  profilePic: { type: String, default: '' },
  
  // Profile Information Fields
  phone: { type: String, default: '' },
  location: { type: String, default: '' },
  bio: { type: String, default: '' },
  education: { type: String, default: '' },
  occupation: { type: String, default: '' },
  
  // Social Media Links
  github: { type: String, default: '' },
  linkedin: { type: String, default: '' },
  twitter: { type: String, default: '' },
  website: { type: String, default: '' },
  
  // Authentication Fields
  isEmailVerified: { type: Boolean, default: false },
  emailVerificationOTP: String,
  emailVerificationExpires: Date,
  resetPasswordToken: String,
  resetPasswordOTP: String,
  resetPasswordExpires: Date,
  rememberMeOTP: String,
  googleId: String,
  githubId: String,
  
  // Track user intent during registration
  wantsToBeInstructor: { type: Boolean, default: false },
  // Instructor application tracking
  instructorApplication: {
    requestDate: { type: Date },
    status: { 
      type: String, 
      enum: ['pending', 'approved', 'rejected']
      // Removed default: 'pending' to prevent automatic pending status
    },
    adminDecision: {
      decidedBy: { type: Schema.Types.ObjectId, ref: 'User' },
      decisionDate: { type: Date },
      reason: { type: String } // Optional reason for rejection
    },
    resubmissionAllowed: { type: Boolean, default: true }
  }
}, {
  timestamps: true
});

const User = mongoose.model("User", userSchema);
module.exports = User;