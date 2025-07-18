const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  role: { type: String, enum: ['Student', 'Admin', 'Instructor'], default: 'Student' },
  profilePic: { type: String, default: '' },
  isEmailVerified: { type: Boolean, default: false },
  emailVerificationToken: String,
  emailVerificationExpires: Date,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  rememberMeToken: String,
  googleId: String,
  githubId: String,
}, {
  timestamps: true
});

const User = mongoose.model("User", userSchema);
module.exports = User;