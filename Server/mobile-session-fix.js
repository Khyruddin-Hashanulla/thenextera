// Enhanced Mobile Browser Session Compatibility Fix
// This middleware addresses mobile browser cookie and session issues

const mobileSessionFix = (req, res, next) => {
  // Detect mobile browsers
  const userAgent = req.headers['user-agent'] || '';
  const isMobile = /Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  
  if (isMobile) {
    // Add mobile-specific headers for better cookie handling
    res.header('Vary', 'User-Agent');
    res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
    
    // Enhanced CORS headers for mobile browsers
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Expose-Headers', 'Set-Cookie');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control');
    
    // For mobile browsers, we need to ensure cookies are handled properly
    if (req.session) {
      // Force session save for mobile browsers
      req.session.touch();
      
      // Add mobile browser flag to session
      req.session.isMobileSession = true;
      req.session.mobileUserAgent = userAgent.substring(0, 200);
      req.session.lastMobileAccess = new Date().toISOString();
      
      // Enhanced mobile session persistence
      req.session.save((err) => {
        if (err) {
          console.error('📱 Mobile session save error:', err);
        }
      });
    }
    
    // Enhanced mobile debugging for course actions
    const isCourseAction = req.path.includes('/api/courses') && ['POST', 'PUT', 'DELETE'].includes(req.method);
    const isAuthAction = req.path.includes('/api/auth');
    
    if (isCourseAction || isAuthAction || req.path.includes('/debug')) {
      console.log('📱 Mobile browser critical action:', {
        timestamp: new Date().toISOString(),
        userAgent: userAgent.substring(0, 100),
        path: req.path,
        method: req.method,
        hasSession: !!req.session,
        sessionId: req.session?.id,
        isAuthenticated: req.session?.isAuthenticated,
        userId: req.session?.userId,
        userRole: req.session?.userRole,
        cookies: {
          received: !!req.headers.cookie,
          sessionCookie: !!req.cookies['nextera.sid'],
          cookieCount: req.headers.cookie ? req.headers.cookie.split(';').length : 0
        },
        headers: {
          origin: req.headers.origin,
          referer: req.headers.referer,
          contentType: req.headers['content-type']
        },
        isCourseAction,
        isAuthAction
      });
    }
  }
  
  next();
};

module.exports = mobileSessionFix;
