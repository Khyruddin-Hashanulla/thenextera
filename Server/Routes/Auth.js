const express = require("express");
const router = express.Router();
const User = require("../Models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { sendVerificationEmail, sendPasswordResetEmail } = require("../utils/emailService");
const passport = require("passport");

// Ensure JWT_SECRET has a fallback value if environment variable is not set
const JWT_SECRET = process.env.JWT_SECRET || 'your-fallback-secret-key';

// Register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json("User already exists");

    // Generate email verification token
    const emailVerificationToken = crypto.randomBytes(32).toString("hex");
    const emailVerificationExpires = Date.now() + 24 * 60 * 60 * 1000; // 24 hours

    // Ensure proper case for role
    const properRole = role ? (role.charAt(0).toUpperCase() + role.slice(1).toLowerCase()) : 'Student';

    const hash = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hash,
      role: properRole,
      emailVerificationToken,
      emailVerificationExpires
    });
    await newUser.save();

    // Generate token for auto-login
    const token = jwt.sign({ id: newUser._id, role: newUser.role }, JWT_SECRET, {
      expiresIn: "7d",
    });

    // Send verification email only if email service is configured
    if (process.env.EMAIL_USER && process.env.EMAIL_PASSWORD) {
      try {
        await sendVerificationEmail(email, emailVerificationToken);
      } catch (emailError) {
        console.error("Failed to send verification email:", emailError);
      }
    }

    // Return user data and token for auto-login
    res.status(201).json({
      message: "Registered successfully",
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        isEmailVerified: newUser.isEmailVerified
      }
    });
  } catch (error) {
    res.status(500).json("Server error: " + error.message);
  }
});

// Verify Email
router.get("/verify-email/:token", async (req, res) => {
  try {
    const user = await User.findOne({
      emailVerificationToken: req.params.token,
      emailVerificationExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json("Invalid or expired verification token");
    }

    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;
    await user.save();

    res.json("Email verified successfully");
  } catch (error) {
    res.status(500).json("Server error: " + error.message);
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

    // Only check email verification if email service is configured
    if (process.env.EMAIL_USER && process.env.EMAIL_PASSWORD && !user.isEmailVerified) {
      return res.status(400).json({ error: "Please verify your email first" });
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

// Request Password Reset
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(404).json("User not found");
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    if (process.env.EMAIL_USER && process.env.EMAIL_PASSWORD) {
      try {
        await sendPasswordResetEmail(email, resetToken);
        res.json("Password reset email sent");
      } catch (emailError) {
        console.error("Failed to send password reset email:", emailError);
        res.status(500).json("Failed to send password reset email. Please try again later.");
      }
    } else {
      res.status(500).json("Email service is not configured. Please contact support.");
    }
  } catch (error) {
    res.status(500).json("Server error: " + error.message);
  }
});

// Reset Password
router.post("/reset-password/:token", async (req, res) => {
  try {
    const user = await User.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json("Invalid or expired reset token");
    }

    const hash = await bcrypt.hash(req.body.password, 10);
    user.password = hash;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.json("Password reset successful");
  } catch (error) {
    res.status(500).json("Server error: " + error.message);
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

