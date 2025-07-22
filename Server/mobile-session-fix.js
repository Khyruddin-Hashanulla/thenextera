// Mobile Browser Session Compatibility Fix
// This middleware addresses mobile browser cookie and session issues

const mobileSessionFix = (req, res, next) => {
  // Detect mobile browsers
  const userAgent = req.headers['user-agent'] || '';
  const isMobile = /Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  
  if (isMobile) {
    // Add mobile-specific headers for better cookie handling
    res.header('Vary', 'User-Agent');
    
    // For mobile browsers, we need to ensure cookies are handled properly
    // Override some session settings for mobile compatibility
    if (req.session) {
      // Force session save for mobile browsers
      req.session.touch();
      
      // Add mobile browser flag to session
      req.session.isMobileSession = true;
      req.session.mobileUserAgent = userAgent.substring(0, 200);
    }
    
    // Add CORS headers specifically for mobile browsers
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Expose-Headers', 'Set-Cookie');
    
    // Log mobile session access for debugging
    console.log('📱 Mobile browser session access:', {
      timestamp: new Date().toISOString(),
      userAgent: userAgent.substring(0, 100),
      hasSession: !!req.session,
      sessionId: req.session?.id,
      isAuthenticated: req.session?.isAuthenticated,
      path: req.path,
      method: req.method
    });
  }
  
  next();
};

module.exports = mobileSessionFix;
