const express = require("express");
const router = express.Router();
const User = require("../Models/User");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { sendVerificationOTP, sendPasswordResetEmail } = require("../utils/emailService");
const passport = require("passport");
const Course = require("../Models/Course");

// Generate 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role, wantsToBeInstructor } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      // Check if user wants to change role
      const properRole = role ? (role.charAt(0).toUpperCase() + role.slice(1).toLowerCase()) : 'Student';
      
      if (existing.role !== properRole) {
        // Allow role change for existing user and update password
        const hash = await bcrypt.hash(password, 10);
        existing.role = properRole;
        existing.password = hash; // Update password to the new one provided
        
        // Handle instructor intent for existing user
        if (wantsToBeInstructor && properRole === 'Student') {
          existing.wantsToBeInstructor = true;
        }
        
        await existing.save();
        
        return res.status(200).json({
          success: true,
          message: `Account already exists. Role updated to ${properRole} and password updated. Please log in with your new credentials.`,
          user: {
            id: existing._id,
            name: existing.name,
            email: existing.email,
            role: existing.role,
            isEmailVerified: existing.isEmailVerified,
            wantsToBeInstructor: existing.wantsToBeInstructor
          },
          roleUpdated: true
        });
      } else {
        // Same role, just inform user
        return res.status(400).json({
          error: `Account with this email already exists as ${existing.role}. Please log in instead.`,
          existingRole: existing.role
        });
      }
    }

    // Generate 6-digit OTP
    const emailVerificationOTP = generateOTP();
    const emailVerificationExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

    // Ensure proper case for role - always create as Student
    const properRole = 'Student'; // Force all new registrations to be students

    const hash = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hash,
      role: properRole,
      wantsToBeInstructor: wantsToBeInstructor || false, // Track instructor intent
      emailVerificationOTP,
      emailVerificationExpires
    });
    await newUser.save();

    console.log(' New user registered:', {
      email: newUser.email,
      role: newUser.role,
      wantsToBeInstructor: newUser.wantsToBeInstructor
    });

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
      success: true,
      message: "Registration successful! Please check your email for the 6-digit OTP code to verify your account.",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        isEmailVerified: newUser.isEmailVerified,
        wantsToBeInstructor: newUser.wantsToBeInstructor
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

    // Handle instructor application for users who want to be instructors
    let instructorApplicationCreated = false;
    if (user.wantsToBeInstructor && user.role === 'Student') {
      // Check if they don't already have an instructor application
      if (!user.instructorApplication || !user.instructorApplication.status) {
        user.instructorApplication = {
          requestDate: new Date(),
          status: 'pending'
        };
        user.role = 'pending_instructor'; // Update role to pending_instructor
        instructorApplicationCreated = true;
        
        console.log(' Instructor application created for user:', {
          email: user.email,
          status: 'pending',
          requestDate: new Date()
        });
      }
    }

    await user.save();

    let message = "Email verified successfully! You can now log in.";
    if (instructorApplicationCreated) {
      message = "Email verified successfully! Your instructor application has been submitted and is pending admin approval. You can log in to check your status.";
    }

    res.json({ 
      success: true,
      message,
      instructorApplicationCreated
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
      return res.status(400).json({ 
        error: "Email is already verified. Please log in with your existing credentials.",
        isAlreadyVerified: true,
        userRole: user.role
      });
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
        success: true,
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
        error: "Please verify your email address before logging in. Check your inbox for the verification code.",
        requiresEmailVerification: true,
        email: user.email
      });
    }

    // Pure JWT authentication for ALL platforms
    console.log('🔐 JWT-based login for all platforms');
    
    // Generate JWT token with user data
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        role: user.role,
        name: user.name,
        isEmailVerified: user.isEmailVerified
      },
      process.env.JWT_SECRET,
      { 
        expiresIn: rememberMe ? "30d" : "7d",
        issuer: "nextera-app",
        audience: "nextera-users"
      }
    );

    // Handle remember me with longer token expiry (already set above)
    if (rememberMe) {
      const rememberMeToken = crypto.randomBytes(32).toString("hex");
      user.rememberMeToken = rememberMeToken;
      await user.save();
    }

    // Log the user data being sent
    console.log('✅ JWT login successful:', {
      userId: user._id,
      role: user.role,
      name: user.name,
      email: user.email,
      tokenExpiry: rememberMe ? "30d" : "7d"
    });

    res.json({ 
      success: true,
      authType: 'jwt',
      token: token,
      user: { 
        id: user._id,
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

// Check remember me token
router.get("/check-remember-me", async (req, res) => {
  try {
    // No valid session found
    res.status(401).json({ error: "No valid session found" });
  } catch (error) {
    console.error('Check remember me error:', error);
    res.status(500).json({ error: "Server error checking authentication" });
  }
});

// Logout route - destroy session
router.post("/logout", (req, res) => {
  res.json({ 
    success: true, 
    message: "Logged out successfully" 
  });
});

// Test route to verify session-based middleware
router.get("/test-auth", async (req, res) => {
  res.json({
    message: "No session-based authentication working!",
    user: null,
    sessionId: null,
    sessionData: null
  });
});

// Session status endpoint for debugging (no auth required)
router.get("/session-status", (req, res) => {
  res.json({
    hasSession: false,
    sessionId: null,
    isAuthenticated: false,
    userId: null,
    userRole: null,
    userName: null,
    loginTime: null,
    cookieMaxAge: null,
    sessionData: null
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
        success: true,
        message: "Password reset email sent successfully. Please check your inbox." 
      });
    } catch (emailError) {
      console.error("Failed to send password reset email:", emailError);
      return res.status(500).json({ 
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
      success: true,
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
      // Generate JWT token with user data
      const userId = req.user.id || req.user._id;
      const token = jwt.sign(
        {
          userId: userId,
          email: req.user.email,
          role: req.user.role,
          name: req.user.name,
          isEmailVerified: req.user.isEmailVerified
        },
        process.env.JWT_SECRET,
        { 
          expiresIn: "7d",
          issuer: "nextera-app",
          audience: "nextera-users"
        }
      );

      // Log the user data being sent
      console.log('✅ JWT login successful:', {
        userId: userId,
        role: req.user.role,
        name: req.user.name,
        email: req.user.email,
        tokenExpiry: "7d"
      });

      res.json({ 
        success: true,
        authType: 'jwt',
        token: token,
        user: { 
          id: userId,
          name: req.user.name,
          email: req.user.email,
          role: req.user.role,
          isEmailVerified: req.user.isEmailVerified 
        }
      });
    }
  );
}

// JWT Authentication Middleware
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: "No valid JWT token provided" });
  }
  
  const token = authHeader.substring(7);
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      id: decoded.userId,
      userId: decoded.userId,
      name: decoded.name,
      email: decoded.email,
      role: decoded.role,
      isEmailVerified: decoded.isEmailVerified
    };
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid JWT token" });
  }
};

// Update user role
router.put("/update-role/:userId", authenticateJWT, async (req, res) => {
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

    res.json({
      success: true,
      message: "Role updated successfully",
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

// Apply to become an instructor
router.post("/apply-instructor", authenticateJWT, async (req, res) => {
  try {
    console.log(' Instructor application request:', {
      userId: req.user.userId,
      userRole: req.user.role,
      sessionId: req.user.sessionId
    });

    const userId = req.user.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    console.log(' User applying for instructor:', {
      userId: user._id,
      name: user.name,
      email: user.email,
      currentRole: user.role,
      hasApplication: !!user.instructorApplication,
      applicationStatus: user.instructorApplication?.status
    });

    // Check if user is already an instructor or admin
    if (user.role === 'Instructor' || user.role === 'Admin') {
      console.log(' User already has instructor privileges or higher');
      return res.status(400).json({ 
        error: "You already have instructor privileges or higher" 
      });
    }

    // Check if user already has a pending application
    if (user.instructorApplication?.status === 'pending') {
      console.log(' User already has a pending application');
      return res.status(400).json({ 
        error: "You already have a pending instructor application",
        applicationDate: user.instructorApplication?.requestDate
      });
    }

    // Check if user was previously rejected and resubmission is not allowed
    if (user.instructorApplication?.status === 'rejected' && 
        !user.instructorApplication?.resubmissionAllowed) {
      console.log(' User was rejected and resubmission not allowed');
      return res.status(400).json({ 
        error: "Your previous instructor application was rejected and resubmission is not allowed" 
      });
    }

    // Create or update instructor application (keep user role as Student)
    user.instructorApplication = {
      requestDate: new Date(),
      status: 'pending', // Explicitly set to pending when user applies
      resubmissionAllowed: true
    };

    // Set wantsToBeInstructor to true so admin can find this application
    user.wantsToBeInstructor = true;

    await user.save();

    console.log(' Instructor application submitted successfully:', {
      userId: user._id,
      name: user.name,
      applicationDate: user.instructorApplication.requestDate,
      status: user.instructorApplication.status
    });

    res.json({ 
      success: true,
      message: "Instructor application submitted successfully! Please wait for admin approval.",
      applicationDate: user.instructorApplication.requestDate,
      status: user.instructorApplication.status
    });

  } catch (error) {
    console.error(" Error submitting instructor application:", error);
    res.status(500).json({ error: "Error submitting instructor application" });
  }
});

// Get all pending instructor applications (Admin only)
router.get("/pending-instructors", authenticateJWT, async (req, res) => {
  try {
    // Check if user is admin
    if (!req.user.role || req.user.role !== 'Admin') {
      return res.status(403).json({ error: "Access denied. Admin privileges required." });
    }

    console.log(' Admin fetching pending instructor applications...');
    
    const pendingApplications = await User.find({
      wantsToBeInstructor: true,
      role: 'Student',
      'instructorApplication.status': 'pending'
    }).select('name email instructorApplication createdAt');

    console.log(` Found ${pendingApplications.length} pending instructor applications`);
    console.log('Pending applications:', pendingApplications);

    res.json({
      success: true,
      applications: pendingApplications,
      count: pendingApplications.length
    });
  } catch (error) {
    console.error('Error fetching pending instructor applications:', error);
    res.status(500).json({ error: "Failed to fetch pending applications" });
  }
});

// Get all instructors with course counts - Admin only
router.get("/all-instructors", authenticateJWT, async (req, res) => {
  try {
    console.log(' All instructors request from user:', {
      userId: req.user.userId,
      userRole: req.user.role
    });

    // Check if user is admin
    if (!req.user.role || req.user.role !== 'Admin') {
      return res.status(403).json({ error: "Access denied. Admin privileges required." });
    }

    // Get all instructors
    const instructors = await User.find({ 
      role: { $in: ['Instructor', 'Admin'] } 
    }).select('name email role createdAt');

    console.log(` Found ${instructors.length} instructors`);

    // Get course counts for each instructor using actual Course model queries
    const instructorsWithCourses = await Promise.all(
      instructors.map(async (instructor) => {
        // Count courses created by this instructor
        const courseCount = await Course.countDocuments({ 
          creatorId: instructor._id 
        });
        
        console.log(` Instructor ${instructor.name}: ${courseCount} courses`);
        
        return {
          _id: instructor._id,
          name: instructor.name,
          email: instructor.email,
          role: instructor.role,
          createdAt: instructor.createdAt,
          courseCount: courseCount
        };
      })
    );

    // Calculate comprehensive stats
    const totalInstructors = instructors.length;
    const totalCourses = await Course.countDocuments();
    const totalStudents = await User.countDocuments({ role: 'Student' });
    
    // Find top instructor by course count
    const instructorCourses = instructorsWithCourses.map(i => ({ 
      name: i.name, 
      courses: i.courseCount 
    }));
    
    const topInstructorData = instructorCourses.reduce((max, current) => 
      current.courses > max.courses ? current : max, 
      { name: 'None', courses: 0 }
    );

    console.log(' Sending comprehensive admin stats:', {
      totalInstructors,
      totalCourses,
      totalStudents,
      topInstructor: topInstructorData.name,
      topInstructorCourses: topInstructorData.courses
    });

    res.json({
      success: true,
      instructors: instructorsWithCourses,
      stats: {
        totalInstructors,
        totalCourses,
        totalStudents,
        topInstructor: topInstructorData.name,
        topInstructorCourses: topInstructorData.courses
      }
    });
  } catch (error) {
    console.error('Error fetching instructors:', error);
    res.status(500).json({ error: "Failed to fetch instructors data" });
  }
});

// Approve or reject instructor application (Admin only)
router.post("/manage-instructor-application", authenticateJWT, async (req, res) => {
  try {
    const { userId, action, reason } = req.body; // action: 'approve' or 'reject'
    
    // Check if user is admin
    if (!req.user.role || req.user.role !== 'Admin') {
      return res.status(403).json({ error: "Access denied. Admin privileges required." });
    }

    if (!userId || !action) {
      return res.status(400).json({ error: "User ID and action are required" });
    }

    if (!['approve', 'reject'].includes(action)) {
      return res.status(400).json({ error: "Invalid action. Use 'approve' or 'reject'" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if user has a pending instructor application
    if (!user.instructorApplication || user.instructorApplication.status !== 'pending') {
      return res.status(400).json({ 
        error: "User does not have a pending instructor application",
        currentStatus: user.instructorApplication?.status || 'none',
        userRole: user.role
      });
    }

    console.log(' Processing instructor application:', {
      userId: user._id,
      userName: user.name,
      currentRole: user.role,
      applicationStatus: user.instructorApplication.status,
      action: action
    });

    const adminId = req.user.userId;

    if (action === 'approve') {
      // Approve the application
      user.role = 'Instructor';
      user.instructorApplication.status = 'approved';
      user.instructorApplication.adminDecision = {
        decidedBy: adminId,
        decisionDate: new Date(),
        reason: reason || 'Application approved'
      };
    } else {
      // Reject the application
      user.role = 'Student';
      user.instructorApplication.status = 'rejected';
      user.instructorApplication.adminDecision = {
        decidedBy: adminId,
        decisionDate: new Date(),
        reason: reason || 'Application rejected'
      };
      user.instructorApplication.resubmissionAllowed = true; // Allow resubmission by default
    }

    await user.save();

    res.json({
      success: true,
      message: `Instructor application ${action}d successfully`,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        applicationStatus: user.instructorApplication.status,
        decisionDate: user.instructorApplication.adminDecision.decisionDate
      }
    });

    // TODO: Send email notification to user about the decision
    // This can be implemented later using the existing email service

  } catch (error) {
    console.error("Error managing instructor application:", error);
    res.status(500).json({ error: "Error processing instructor application" });
  }
});

// Get user's instructor application status
router.get("/instructor-application-status", authenticateJWT, async (req, res) => {
  try {
    console.log(' Instructor application status request:', {
      userId: req.user.userId,
      userRole: req.user.role
    });

    const userId = req.user.userId;
    const user = await User.findById(userId).select('role instructorApplication wantsToBeInstructor');

    if (!user) {
      console.log(' User not found for ID:', userId);
      return res.status(404).json({ error: "User not found" });
    }

    console.log(' User found:', {
      userId: user._id,
      role: user.role,
      wantsToBeInstructor: user.wantsToBeInstructor,
      hasInstructorApplication: !!user.instructorApplication,
      applicationStatus: user.instructorApplication?.status
    });

    // Determine if user can apply and what message to show
    let canApply = false;
    let message = null;
    let showApplicationForm = false;
    
    if (user.role === 'Student') {
      // Check if user has a pending application
      if (user.instructorApplication?.status === 'pending') {
        canApply = false;
        showApplicationForm = false;
        message = "Your instructor application is pending admin approval. Please wait for a decision.";
        console.log(' User has pending instructor application');
      }
      // Check if user wants to be instructor but hasn't applied yet
      else if (user.wantsToBeInstructor && (!user.instructorApplication || !user.instructorApplication.status)) {
        canApply = true;
        showApplicationForm = true;
        message = "You registered with intent to teach. Click below to submit your instructor application.";
        console.log(' User wants to be instructor - showing application form');
      } 
      // New student who has never applied and didn't register with instructor intent
      else if (!user.instructorApplication || !user.instructorApplication.status) {
        canApply = true;
        showApplicationForm = true;
        console.log(' New student - can apply');
      } 
      // Student who was previously rejected and resubmission is not allowed
      else if (user.instructorApplication?.status === 'rejected') {
        canApply = user.instructorApplication.resubmissionAllowed !== false;
        showApplicationForm = canApply;
        message = canApply ? 
          "Your previous application was rejected. You can reapply." :
          "Your previous application was rejected and resubmission is not allowed.";
        console.log(' Previous application rejected:', {
          status: user.instructorApplication.status,
          resubmissionAllowed: user.instructorApplication.resubmissionAllowed,
          canApply
        });
      }
      // Student who was approved (shouldn't happen, but handle it)
      else if (user.instructorApplication?.status === 'approved') {
        canApply = false;
        showApplicationForm = false;
        message = "Your instructor application was approved! Your role should be updated soon.";
        console.log(' Application approved but role not updated');
      }
    }
    // User is already an instructor or admin
    else {
      canApply = false;
      showApplicationForm = false;
      message = "You are already an instructor or admin!";
      console.log(' User is already an instructor or admin');
    }

    console.log('Application status check:', {
      userId,
      userRole: user.role,
      wantsToBeInstructor: user.wantsToBeInstructor,
      hasApplication: !!user.instructorApplication,
      applicationStatus: user.instructorApplication?.status || 'none',
      resubmissionAllowed: user.instructorApplication?.resubmissionAllowed,
      canApply,
      showApplicationForm,
      message
    });

    const responseData = {
      role: user.role,
      canApply,
      showApplicationForm,
      message,
      wantsToBeInstructor: user.wantsToBeInstructor || false,
      applicationStatus: user.instructorApplication?.status || null,
      requestDate: user.instructorApplication?.requestDate || null,
      decisionDate: user.instructorApplication?.adminDecision?.decisionDate || null,
      rejectionReason: user.instructorApplication?.adminDecision?.reason || null
    };

    console.log(' Sending response:', responseData);
    res.json(responseData);
  } catch (error) {
    console.error(" Error fetching application status:", error);
    res.status(500).json({ error: "Error fetching application status" });
  }
});

// Get all instructors with course counts - Admin only
router.get("/all-instructors", authenticateJWT, async (req, res) => {
  try {
    console.log(' All instructors request from user:', {
      userId: req.user.userId,
      userRole: req.user.role
    });

    // Check if user is admin
    if (!req.user.role || req.user.role !== 'Admin') {
      return res.status(403).json({ error: "Access denied. Admin privileges required." });
    }

    // Get all instructors
    const instructors = await User.find({ 
      role: { $in: ['Instructor', 'Admin'] } 
    }).select('name email role createdAt');

    console.log(` Found ${instructors.length} instructors`);

    // Get course counts for each instructor (if you have a Course model)
    // For now, we'll just return basic instructor data
    const instructorsWithCourses = instructors.map(instructor => ({
      _id: instructor._id,
      name: instructor.name,
      email: instructor.email,
      role: instructor.role,
      createdAt: instructor.createdAt,
      courseCount: 0 // TODO: Add actual course count when Course model is available
    }));

    // Calculate stats
    const totalInstructors = instructors.length;
    const topInstructor = instructors.length > 0 ? instructors[0].name : 'None';
    const topInstructorCourses = 0; // TODO: Add actual course count

    console.log(' Sending instructors data:', {
      totalInstructors,
      topInstructor,
      topInstructorCourses
    });

    res.json({
      success: true,
      instructors: instructorsWithCourses,
      stats: {
        totalInstructors,
        topInstructor,
        topInstructorCourses
      }
    });
  } catch (error) {
    console.error('Error fetching instructors:', error);
    res.status(500).json({ error: "Failed to fetch instructors data" });
  }
});

// Check authentication status - used by AuthContext to initialize user state
router.get("/me", authenticateJWT, async (req, res) => {
  try {
    console.log(' Auth check request:', {
      hasAuthHeader: !!req.headers.authorization
    });

    const user = {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
      isEmailVerified: req.user.isEmailVerified
    };

    console.log(' JWT auth successful:', {
      userId: user.id,
      role: user.role
    });

    return res.json({
      success: true,
      user: user,
      authType: 'jwt',
      authenticated: true
    });
  } catch (error) {
    console.error('Auth check error:', error);
    res.status(500).json({ 
      success: false, 
      error: "Authentication check failed" 
    });
  }
});

// Simple JWT test endpoint to verify authentication is working
router.get("/test-jwt", authenticateJWT, async (req, res) => {
  try {
    console.log(' JWT Test endpoint hit:', {
      userId: req.user.id,
      role: req.user.role,
      name: req.user.name
    });

    res.json({
      success: true,
      message: "JWT authentication is working!",
      user: {
        id: req.user.id,
        name: req.user.name,
        role: req.user.role,
        email: req.user.email
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('JWT test error:', error);
    res.status(500).json({ 
      success: false, 
      error: "JWT test failed" 
    });
  }
});

module.exports = router;
