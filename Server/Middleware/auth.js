const requireAuth = (req, res, next) => {
  // iPhone Safari session persistence fix
  const userAgent = req.headers['user-agent'] || '';
  const isIPhoneSafari = /iPhone/.test(userAgent) && /Safari/.test(userAgent) && !/Chrome/.test(userAgent);
  
  if (isIPhoneSafari) {
    console.log('🍎 iPhone Safari auth check - Session details:', {
      sessionExists: !!req.session,
      sessionId: req.sessionID?.substring(0, 8) + '...',
      isAuthenticated: req.session?.isAuthenticated,
      userId: req.session?.userId,
      cookies: req.headers.cookie ? 'present' : 'missing',
      allSessionKeys: req.session ? Object.keys(req.session) : [],
      url: req.url,
      method: req.method
    });
    
    // Force session touch and save for iPhone Safari
    if (req.session) {
      req.session.touch();
      req.session.lastAuthCheck = new Date().toISOString();
      req.session.iphoneSafariAuth = true;
      
      // Force session save for iPhone Safari to ensure persistence
      req.session.save((err) => {
        if (err) {
          console.error('🍎 iPhone Safari session save error in auth middleware:', err);
        } else {
          console.log('🍎 iPhone Safari session saved in auth middleware');
        }
      });
    }
  }
  
  // Enhanced session validation
  if (!req.session || !req.session.isAuthenticated || !req.session.userId) {
    console.log('❌ Authentication failed:', {
      sessionExists: !!req.session,
      isAuthenticated: req.session?.isAuthenticated,
      userId: req.session?.userId,
      userAgent: isIPhoneSafari ? 'iPhone Safari' : 'Other',
      sessionId: req.sessionID?.substring(0, 8) + '...',
      url: req.url,
      method: req.method,
      cookies: req.headers.cookie ? 'present' : 'missing'
    });
    
    return res.status(401).json({ 
      error: "Authentication required. Please log in.",
      requiresAuth: true,
      isIPhoneSafari,
      sessionDebug: {
        sessionExists: !!req.session,
        sessionId: req.sessionID?.substring(0, 8) + '...',
        hasAuthFlag: req.session?.isAuthenticated,
        hasUserId: !!req.session?.userId,
        url: req.url,
        method: req.method
      }
    });
  }
  
  // Add user info to request object for easy access
  // Include both id and _id for compatibility with existing routes
  req.user = {
    id: req.session.userId,
    _id: req.session.userId,  // For compatibility with existing course routes
    userId: req.session.userId, // Alternative access pattern
    role: req.session.userRole,
    name: req.session.userName,
    email: req.session.userEmail
  };
  
  // iPhone Safari: Force session save after successful auth
  if (isIPhoneSafari && req.session) {
    req.session.lastSuccessfulAuth = new Date().toISOString();
    req.session.save((err) => {
      if (err) {
        console.error('🍎 iPhone Safari session save error after auth:', err);
      } else {
        console.log('✅ iPhone Safari session saved successfully after auth');
      }
    });
  }
  
  console.log('✅ Authentication successful:', {
    userId: req.user.id,
    role: req.user.role,
    userAgent: isIPhoneSafari ? 'iPhone Safari' : 'Other',
    url: req.url,
    method: req.method
  });
  
  next();
};

// Enhanced hybrid authentication middleware for iPhone Safari compatibility
const requireHybridAuth = (req, res, next) => {
  const userAgent = req.headers['user-agent'] || '';
  const isIPhoneSafari = /iPhone/.test(userAgent) && /Safari/.test(userAgent) && !/Chrome/.test(userAgent);
  
  if (isIPhoneSafari) {
    console.log('🍎 iPhone Safari hybrid auth check:', {
      sessionExists: !!req.session,
      sessionId: req.sessionID?.substring(0, 8) + '...',
      isAuthenticated: req.session?.isAuthenticated,
      userId: req.session?.userId,
      url: req.url,
      method: req.method
    });
    
    // Enhanced session handling for iPhone Safari
    if (req.session) {
      req.session.touch();
      req.session.lastHybridAuth = new Date().toISOString();
      
      // Force session save for iPhone Safari
      req.session.save((err) => {
        if (err) {
          console.error('🍎 iPhone Safari hybrid auth session save error:', err);
        }
      });
    }
  }
  
  // Use session-based authentication
  return requireAuth(req, res, next);
};

// Role-based authorization middleware
const requireRole = (roles) => {
  return (req, res, next) => {
    if (!req.session || !req.session.isAuthenticated) {
      return res.status(401).json({ error: "Authentication required" });
    }
    
    const userRole = req.session.userRole;
    const allowedRoles = Array.isArray(roles) ? roles : [roles];
    
    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({ 
        error: `Access denied. Required role: ${allowedRoles.join(' or ')}` 
      });
    }
    
    // Add user info to request object for easy access
    // Include both id and _id for compatibility with existing routes
    req.user = {
      id: req.session.userId,
      _id: req.session.userId,  // For compatibility with existing course routes
      userId: req.session.userId, // Alternative access pattern
      role: req.session.userRole,
      name: req.session.userName,
      email: req.session.userEmail
    };
    
    next();
  };
};

// Admin only middleware
const requireAdmin = requireRole(['Admin']);

// Teacher, Instructor, or Admin middleware
const requireTeacher = requireRole(['Teacher', 'Instructor', 'Admin']);

// Instructor only middleware (blocks pending_instructor)
const requireInstructor = (req, res, next) => {
  if (!req.session || !req.session.isAuthenticated) {
    return res.status(401).json({ error: "Authentication required" });
  }
  
  const userRole = req.session.userRole;
  
  // Block pending instructors from accessing instructor features
  if (userRole === 'pending_instructor') {
    return res.status(403).json({ 
      error: "Your instructor application is pending approval. Please wait for admin approval to access instructor features.",
      isPending: true
    });
  }
  
  // Allow only approved instructors and admins
  if (!['Instructor', 'Admin'].includes(userRole)) {
    return res.status(403).json({ 
      error: "Access denied. Instructor privileges required." 
    });
  }
  
  // Add user info to request object for easy access
  req.user = {
    id: req.session.userId,
    _id: req.session.userId,
    userId: req.session.userId,
    role: req.session.userRole,
    name: req.session.userName,
    email: req.session.userEmail
  };
  
  next();
};

// Student or higher middleware (excludes pending_instructor)
const requireStudent = (req, res, next) => {
  if (!req.session || !req.session.isAuthenticated) {
    return res.status(401).json({ error: "Authentication required" });
  }
  
  const userRole = req.session.userRole;
  
  // Allow all roles except pending_instructor
  if (userRole === 'pending_instructor') {
    return res.status(403).json({ 
      error: "Your instructor application is pending. Some features may be restricted.",
      isPending: true
    });
  }
  
  // Add user info to request object for easy access
  req.user = {
    id: req.session.userId,
    _id: req.session.userId,
    userId: req.session.userId,
    role: req.session.userRole,
    name: req.session.userName,
    email: req.session.userEmail
  };
  
  next();
};

module.exports = {
  requireAuth,
  requireHybridAuth,
  requireRole,
  requireAdmin,
  requireTeacher,
  requireInstructor,
  requireStudent
};