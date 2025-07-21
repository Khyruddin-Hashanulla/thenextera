const express = require("express");
const router = express.Router();
const User = require("../Models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { sendVerificationOTP, sendPasswordResetEmail } = require("../utils/emailService");
const passport = require("passport");

// Ensure JWT_SECRET has a fallback value if environment variable is not set
const JWT_SECRET = process.env.JWT_SECRET || 'your-fallback-secret-key';

// Generate 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json("User already exists");

    // Generate 6-digit OTP
    const emailVerificationOTP = generateOTP();
    const emailVerificationExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

    // Ensure proper case for role
    const properRole = role ? (role.charAt(0).toUpperCase() + role.slice(1).toLowerCase()) : 'Student';

    const hash = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hash,
      role: properRole,
      emailVerificationOTP,
      emailVerificationExpires
    });
    await newUser.save();

    // Send verification OTP - this is now mandatory
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      return res.status(500).json({ 
        error: "Email service not configured. Please contact administrator." 
      });
    }

    try {
      await sendVerificationOTP(email, emailVerificationOTP);
    } catch (emailError) {
      console.error("Failed to send verification OTP:", emailError);
      return res.status(500).json({ 
        error: "Failed to send verification OTP. Please try again." 
      });
    }

    // Return success message without auto-login token
    res.status(201).json({
      message: "Registration successful! Please check your email for the 6-digit OTP code to verify your account.",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        isEmailVerified: newUser.isEmailVerified
      },
      requiresEmailVerification: true
    });
  } catch (error) {
    res.status(500).json("Server error: " + error.message);
  }
});

// Verify Email with OTP
router.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ error: "Email and OTP are required" });
    }

    const user = await User.findOne({
      email: email,
      emailVerificationOTP: otp,
      emailVerificationExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ 
        error: "Invalid or expired OTP. Please request a new one." 
      });
    }

    user.isEmailVerified = true;
    user.emailVerificationOTP = undefined;
    user.emailVerificationExpires = undefined;
    await user.save();

    res.json({ 
      message: "Email verified successfully! You can now log in.",
      success: true 
    });
  } catch (error) {
    res.status(500).json({ error: "Server error: " + error.message });
  }
});

// Resend Email Verification
router.post("/resend-verification", async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.isEmailVerified) {
      return res.status(400).json({ error: "Email is already verified" });
    }

    // Generate new verification OTP
    const emailVerificationOTP = generateOTP();
    const emailVerificationExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

    user.emailVerificationOTP = emailVerificationOTP;
    user.emailVerificationExpires = emailVerificationExpires;
    await user.save();

    // Send verification OTP
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      return res.status(500).json({ 
        error: "Email service not configured. Please contact administrator." 
      });
    }

    try {
      await sendVerificationOTP(email, emailVerificationOTP);
      res.json({ 
        message: "Verification OTP sent successfully. Please check your inbox." 
      });
    } catch (emailError) {
      console.error("Failed to send verification OTP:", emailError);
      return res.status(500).json({ 
        error: "Failed to send verification OTP. Please try again." 
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error: " + error.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password, rememberMe } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ error: "Invalid credentials" });

    // Check if email is verified - this is now mandatory
    if (!user.isEmailVerified) {
      return res.status(400).json({ 
        error: "Please verify your email first. Check your inbox for the verification link.",
        requiresEmailVerification: true 
      });
    }

    // Generate tokens
    const tokenExpiry = rememberMe ? "30d" : "7d";
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: tokenExpiry,
    });

    if (rememberMe) {
      const rememberMeToken = crypto.randomBytes(32).toString("hex");
      user.rememberMeToken = rememberMeToken;
      await user.save();
      res.cookie('rememberMe', rememberMeToken, { 
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production'
      });
    }

    // Log the user data being sent
    console.log('Login successful:', {
      userId: user._id,
      role: user.role,
      name: user.name,
      email: user.email
    });

    res.json({ 
      token, 
      user: { 
        id: user._id,  // Use _id consistently
        name: user.name,
        email: user.email,
        role: user.role,
        isEmailVerified: user.isEmailVerified 
      } 
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: "Server error: " + error.message });
  }
});

// Test route to debug token saving (remove after fixing)
router.post("/test-token-save", async (req, res) => {
  try {
    const { email } = req.body;
    console.log('TEST: Testing token save for email:', email);
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    const testToken = "test-token-123456789";
    console.log('TEST: Setting token:', testToken);
    
    user.resetPasswordToken = testToken;
    user.resetPasswordExpires = Date.now() + 3600000;
    
    await user.save();
    console.log('TEST: Token saved');
    
    // Verify by querying again
    const verifyUser = await User.findOne({ email });
    console.log('TEST: Retrieved token:', verifyUser.resetPasswordToken);
    console.log('TEST: Retrieved expiry:', verifyUser.resetPasswordExpires);
    
    // Try to find by token
    const tokenUser = await User.findOne({ resetPasswordToken: testToken });
    console.log('TEST: Found user by token:', tokenUser ? 'YES' : 'NO');
    
    res.json({
      message: "Test completed",
      tokenSaved: verifyUser.resetPasswordToken === testToken,
      foundByToken: !!tokenUser
    });
  } catch (error) {
    console.error('TEST: Error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Request Password Reset
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    console.log('Forgot password request for email:', email);
    
    const user = await User.findOne({ email });
    console.log('User found:', user ? 'YES' : 'NO');
    
    if (!user) {
      console.log('User not found, returning error');
      return res.status(404).json({ error: "User not found" });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    console.log('Generated reset token:', resetToken);
    console.log('Token expiry time:', Date.now() + 3600000);
    
    // Set the token and expiry
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    
    console.log('Before save - user.resetPasswordToken:', user.resetPasswordToken);
    console.log('Before save - user.resetPasswordExpires:', user.resetPasswordExpires);
    
    // Save the user with token
    const savedUser = await user.save();
    console.log('User saved successfully');
    console.log('After save - savedUser.resetPasswordToken:', savedUser.resetPasswordToken);
    console.log('After save - savedUser.resetPasswordExpires:', savedUser.resetPasswordExpires);
    
    // Verify the token was actually saved by querying again
    const verifyUser = await User.findOne({ email });
    console.log('Verification - user.resetPasswordToken:', verifyUser.resetPasswordToken);
    console.log('Verification - user.resetPasswordExpires:', verifyUser.resetPasswordExpires);

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      return res.status(500).json({ 
        error: "Email service not configured. Please contact administrator." 
      });
    }

    try {
      await sendPasswordResetEmail(email, resetToken);
      console.log('Password reset email sent successfully for token:', resetToken);
      res.json({ 
        message: "Password reset email sent successfully. Please check your inbox." 
      });
    } catch (emailError) {
      console.error("Failed to send password reset email:", emailError);
      res.status(500).json({ 
        error: "Failed to send password reset email. Please try again." 
      });
    }
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ error: "Server error: " + error.message });
  }
});

// Reset Password
router.post("/reset-password/:token", async (req, res) => {
  try {
    const token = req.params.token;
    console.log('Reset password attempt with token:', token);
    console.log('Current time:', Date.now());
    console.log('Request body:', req.body);
    
    // First, let's see if any user has this token (regardless of expiry)
    const userWithToken = await User.findOne({ resetPasswordToken: token });
    console.log('User found with token (ignoring expiry):', userWithToken ? 'YES' : 'NO');
    
    if (userWithToken) {
      console.log('Token expires at:', userWithToken.resetPasswordExpires);
      console.log('Token expired?', userWithToken.resetPasswordExpires < Date.now());
    }
    
    // Now check with expiry
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });
    
    console.log('User found with valid token:', user ? 'YES' : 'NO');

    if (!user) {
      console.log('Token validation failed - returning error');
      return res.status(400).json({ 
        error: "Invalid or expired reset token. Please request a new password reset." 
      });
    }

    if (!req.body.password) {
      return res.status(400).json({ error: "Password is required" });
    }

    if (req.body.password.length < 6) {
      return res.status(400).json({ 
        error: "Password must be at least 6 characters long" 
      });
    }

    console.log('Updating password for user:', user.email);
    const hash = await bcrypt.hash(req.body.password, 10);
    user.password = hash;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    console.log('Password reset successful for user:', user.email);
    res.json({ 
      message: "Password reset successful! You can now log in with your new password." 
    });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ error: "Server error: " + error.message });
  }
});

// Add social login routes only if credentials are configured
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  // Google OAuth routes
  router.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
  );

  router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
      const token = jwt.sign({ id: req.user._id, role: req.user.role }, JWT_SECRET, {
        expiresIn: "7d",
      });
      
      // Include user info in the URL
      const userInfo = encodeURIComponent(JSON.stringify({
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
        isEmailVerified: req.user.isEmailVerified
      }));
      
      // Redirect to the client with the hash route
      res.redirect(`${process.env.CLIENT_URL}/#/auth-success?token=${token}&user=${userInfo}`);
    }
  );
}

// Update user role
router.put("/update-role/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { role } = req.body;

    // Convert role to proper case
    const properRole = role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();

    // Validate role against the enum values
    if (!['Student', 'Instructor', 'Admin'].includes(properRole)) {
      return res.status(400).json({ error: "Invalid role" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.role = properRole;
    await user.save();

    // Generate new token with updated role
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      message: "Role updated successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isEmailVerified: user.isEmailVerified
      }
    });
  } catch (error) {
    console.error("Error updating role:", error);
    res.status(500).json({ error: "Error updating role" });
  }
});

// Logout
router.post("/logout", async (req, res) => {
  try {
    // Clear remember me token if it exists
    if (req.cookies.rememberMe) {
      res.clearCookie('rememberMe');
    }

    // Clear session if using session-based auth
    if (req.session) {
      req.session.destroy();
    }

    res.json({ message: "Logged out successfully" });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ error: "Error during logout" });
  }
});

module.exports = router;
