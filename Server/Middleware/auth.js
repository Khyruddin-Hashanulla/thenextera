const requireAuth = (req, res, next) => {
  // iPhone Safari session persistence fix
  const userAgent = req.headers['user-agent'] || '';
  const isIPhoneSafari = /iPhone/.test(userAgent) && /Safari/.test(userAgent) && !/Chrome/.test(userAgent);
  
  if (isIPhoneSafari) {
    console.log('🍎 iPhone Safari auth check - Session details:', {
      sessionExists: !!req.session,
      sessionId: req.sessionID,
      isAuthenticated: req.session?.isAuthenticated,
      userId: req.session?.userId,
      cookies: req.headers.cookie,
      allSessionKeys: req.session ? Object.keys(req.session) : []
    });
    
    // Force session touch and save for iPhone Safari
    if (req.session) {
      req.session.touch();
      req.session.lastAuthCheck = new Date().toISOString();
      
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
  
  if (!req.session || !req.session.isAuthenticated || !req.session.userId) {
    console.log('❌ Authentication failed:', {
      sessionExists: !!req.session,
      isAuthenticated: req.session?.isAuthenticated,
      userId: req.session?.userId,
      userAgent: isIPhoneSafari ? 'iPhone Safari' : 'Other',
      sessionId: req.sessionID
    });
    
    return res.status(401).json({ 
      error: "Authentication required. Please log in.",
      requiresAuth: true,
      isIPhoneSafari,
      sessionDebug: {
        sessionExists: !!req.session,
        sessionId: req.sessionID,
        hasAuthFlag: req.session?.isAuthenticated,
        hasUserId: !!req.session?.userId
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
    req.session.save((err) => {
      if (err) {
        console.error('iPhone Safari session save error:', err);
      } else {
        console.log('✅ iPhone Safari session saved successfully');
      }
    });
  }
  
  next();
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
  requireRole,
  requireAdmin,
  requireTeacher,
  requireInstructor,
  requireStudent
};