const jwt = require('jsonwebtoken');
const User = require('../Models/User');

// JWT secret from environment or fallback
const JWT_SECRET = process.env.JWT_SECRET || process.env.SESSION_SECRET || 'fallback-jwt-secret';

// Generate JWT token
const generateJWT = (user) => {
  return jwt.sign(
    {
      userId: user._id.toString(),
      userRole: user.role,
      userName: user.name,
      userEmail: user.email,
      isEmailVerified: user.isEmailVerified
    },
    JWT_SECRET,
    { 
      expiresIn: '30d', // 30 days to match session duration
      issuer: 'thenextera',
      audience: 'thenextera-client'
    }
  );
};

// Verify JWT token
const verifyJWT = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET, {
      issuer: 'thenextera',
      audience: 'thenextera-client'
    });
  } catch (error) {
    console.error('JWT verification error:', error.message);
    return null;
  }
};

// iPhone Safari detection
const isIPhoneSafari = (userAgent) => {
  return /iPhone/.test(userAgent) && /Safari/.test(userAgent) && !/Chrome/.test(userAgent);
};

// Hybrid authentication middleware - uses JWT for iPhone Safari, sessions for others
const requireHybridAuth = (req, res, next) => {
  const userAgent = req.headers['user-agent'] || '';
  const isIPhoneSafariBrowser = isIPhoneSafari(userAgent);
  
  console.log('🔐 Hybrid Auth Check:', {
    userAgent: userAgent.substring(0, 100),
    isIPhoneSafari: isIPhoneSafariBrowser,
    hasSession: !!req.session,
    hasAuthHeader: !!req.headers.authorization
  });

  if (isIPhoneSafariBrowser) {
    // Use JWT authentication for iPhone Safari
    return requireJWTAuth(req, res, next);
  } else {
    // Use session authentication for other browsers
    return requireSessionAuth(req, res, next);
  }
};

// JWT-only authentication (for iPhone Safari)
const requireJWTAuth = (req, res, next) => {
  console.log('🍎 iPhone Safari: Using JWT authentication');
  
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.startsWith('Bearer ') 
    ? authHeader.slice(7) 
    : req.headers['x-auth-token'] || req.query.token;

  if (!token) {
    console.log('🍎 iPhone Safari: No JWT token provided');
    return res.status(401).json({ 
      error: "Authentication required",
      authType: "jwt",
      message: "Please provide a valid JWT token in Authorization header or x-auth-token"
    });
  }

  const decoded = verifyJWT(token);
  if (!decoded) {
    console.log('🍎 iPhone Safari: Invalid JWT token');
    return res.status(401).json({ 
      error: "Invalid or expired token",
      authType: "jwt",
      message: "Please login again to get a new token"
    });
  }

  // Set user info from JWT payload
  req.user = {
    id: decoded.userId,
    _id: decoded.userId,
    userId: decoded.userId,
    role: decoded.userRole,
    name: decoded.userName,
    email: decoded.userEmail,
    isEmailVerified: decoded.isEmailVerified
  };

  // Mark request as JWT authenticated
  req.authType = 'jwt';
  req.isIPhoneSafari = true;

  console.log('🍎 iPhone Safari: JWT authentication successful:', {
    userId: decoded.userId,
    role: decoded.userRole,
    name: decoded.userName
  });

  next();
};

// Session-based authentication (for other browsers)
const requireSessionAuth = (req, res, next) => {
  console.log('🖥️ Regular browser: Using session authentication');
  
  if (!req.session || !req.session.isAuthenticated) {
    console.log('🖥️ Regular browser: No valid session');
    return res.status(401).json({ 
      error: "Authentication required",
      authType: "session",
      message: "Please login to create a session"
    });
  }

  // Set user info from session
  req.user = {
    id: req.session.userId,
    _id: req.session.userId,
    userId: req.session.userId,
    role: req.session.userRole,
    name: req.session.userName,
    email: req.session.userEmail
  };

  // Mark request as session authenticated
  req.authType = 'session';
  req.isIPhoneSafari = false;

  console.log('🖥️ Regular browser: Session authentication successful:', {
    userId: req.session.userId,
    role: req.session.userRole,
    sessionId: req.sessionID
  });

  next();
};

// Role-based authorization middleware (works with both JWT and session)
const requireRole = (roles) => {
  return (req, res, next) => {
    // First ensure user is authenticated (should be called after requireHybridAuth)
    if (!req.user) {
      return res.status(401).json({ error: "Authentication required" });
    }
    
    const userRole = req.user.role;
    const allowedRoles = Array.isArray(roles) ? roles : [roles];
    
    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({ 
        error: `Access denied. Required role: ${allowedRoles.join(' or ')}`,
        userRole,
        authType: req.authType
      });
    }
    
    next();
  };
};

// Admin only middleware
const requireAdmin = requireRole(['Admin']);

// Teacher, Instructor, or Admin middleware
const requireTeacher = requireRole(['Teacher', 'Instructor', 'Admin']);

module.exports = {
  generateJWT,
  verifyJWT,
  requireHybridAuth,
  requireJWTAuth,
  requireSessionAuth,
  requireRole,
  requireAdmin,
  requireTeacher,
  isIPhoneSafari
};
