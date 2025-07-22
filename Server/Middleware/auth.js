const requireAuth = (req, res, next) => {
  if (!req.session || !req.session.isAuthenticated || !req.session.userId) {
    return res.status(401).json({ 
      error: "Authentication required. Please log in.",
      requiresAuth: true 
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

module.exports = {
  requireAuth,
  requireRole,
  requireAdmin,
  requireTeacher
};