const express = require("express");
const router = express.Router();
const User = require("../Models/User");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const { sendVerificationOTP, sendPasswordResetEmail } = require("../utils/emailService");
const passport = require("passport");
const { requireAuth } = require("../middleware/auth");

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
    if (!user) return res.status(400).json({ error: "No account found with this email address. Please check your email or sign up." });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ error: "Incorrect password. Please try again or reset your password." });

    // Check if email is verified - this is now mandatory
    if (!user.isEmailVerified) {
      return res.status(400).json({ 
        error: "Please verify your email first. Check your inbox for the verification link.",
        requiresEmailVerification: true 
      });
    }

    // Create session instead of JWT token
    req.session.userId = user._id.toString();
    req.session.userRole = user.role;
    req.session.userName = user.name;
    req.session.userEmail = user.email;
    req.session.loginTime = new Date();
    req.session.isAuthenticated = true;

    // Handle remember me with session maxAge
    if (rememberMe) {
      req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000; // 30 days
      req.session.rememberMe = true;
      
      const rememberMeToken = crypto.randomBytes(32).toString("hex");
      user.rememberMeToken = rememberMeToken;
      await user.save();
    } else {
      req.session.cookie.maxAge = 7 * 24 * 60 * 60 * 1000; // 7 days
      req.session.rememberMe = false;
    }

    // Save session explicitly to ensure it's written to MongoDB
    req.session.save((err) => {
      if (err) {
        console.error('Session save error:', err);
        return res.status(500).json({ error: "Session creation failed" });
      }

      // Log the user data being sent
      console.log('Login successful:', {
        userId: user._id,
        role: user.role,
        name: user.name,
        email: user.email,
        sessionId: req.sessionID,
        sessionData: req.session
      });

      res.json({ 
        success: true,
        user: { 
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          isEmailVerified: user.isEmailVerified 
        },
        sessionId: req.sessionID // Optional: for debugging
      });
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: "Server error: " + error.message });
  }
});

// Logout route - destroy session
router.post("/logout", (req, res) => {
  if (!req.session) {
    return res.status(400).json({ error: "No active session" });
  }

  const sessionId = req.sessionID;
  
  req.session.destroy((err) => {
    if (err) {
      console.error('Session destruction error:', err);
      return res.status(500).json({ error: "Logout failed" });
    }
    
    res.clearCookie('connect.sid'); // Clear session cookie
    console.log('Session destroyed:', sessionId);
    
    res.json({ 
      success: true, 
      message: "Logged out successfully" 
    });
  });
});

// Test route to verify session-based middleware
router.get("/test-auth", requireAuth, (req, res) => {
  res.json({
    message: "Session-based authentication working!",
    user: req.user,
    sessionId: req.sessionID,
    sessionData: {
      userId: req.session.userId,
      userRole: req.session.userRole,
      isAuthenticated: req.session.isAuthenticated
    }
  });
});

// Session status endpoint for debugging (no auth required)
router.get("/session-status", (req, res) => {
  res.json({
    hasSession: !!req.session,
    sessionId: req.sessionID,
    isAuthenticated: req.session?.isAuthenticated || false,
    userId: req.session?.userId || null,
    userRole: req.session?.userRole || null,
    userName: req.session?.userName || null,
    loginTime: req.session?.loginTime || null,
    cookieMaxAge: req.session?.cookie?.maxAge || null,
    sessionData: req.session || null
  });
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
      // Create session instead of JWT token
      req.session.userId = req.user._id.toString();
      req.session.userRole = req.user.role;
      req.session.userName = req.user.name;
      req.session.userEmail = req.user.email;
      req.session.loginTime = new Date();
      req.session.isAuthenticated = true;
      req.session.rememberMe = false;
      
      // Save session explicitly
      req.session.save((err) => {
        if (err) {
          console.error('Google OAuth session save error:', err);
          return res.redirect('/login?error=session_failed');
        }
        
        console.log('Google OAuth login successful:', {
          userId: req.user._id,
          role: req.user.role,
          sessionId: req.sessionID
        });
        
        // Include user info in the URL (no token needed)
        const userInfo = encodeURIComponent(JSON.stringify({
          id: req.user._id,
          name: req.user.name,
          email: req.user.email,
          role: req.user.role,
          isEmailVerified: req.user.isEmailVerified
        }));
        
        const redirectUrl = process.env.CLIENT_URL || 'http://localhost:5173';
        res.redirect(`${redirectUrl}/auth/success?user=${userInfo}&sessionId=${req.sessionID}`);
      });
    }
  );
}

// Update user role
router.put("/update-role/:userId", requireAuth, async (req, res) => {
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

    // Update session with new role if this is the current user
    if (req.session.userId === userId) {
      req.session.userRole = properRole;
      
      // Save session with updated role
      req.session.save((err) => {
        if (err) {
          console.error('Session update error after role change:', err);
        } else {
          console.log('Session updated with new role:', properRole);
        }
      });
    }

    res.json({
      message: "Role updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isEmailVerified: user.isEmailVerified
      },
      sessionUpdated: req.session.userId === userId
    });
  } catch (error) {
    console.error("Error updating role:", error);
    res.status(500).json({ error: "Error updating role" });
  }
});

module.exports = router;
