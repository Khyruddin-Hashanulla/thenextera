// iPhone Safari Session Recovery Middleware
// Addresses the issue where session data is lost between requests on iPhone Safari

const iphoneSafariSessionRecovery = (req, res, next) => {
  const userAgent = req.headers['user-agent'] || '';
  const isIPhoneSafari = /iPhone/.test(userAgent) && /Safari/.test(userAgent) && !/Chrome/.test(userAgent);
  
  if (isIPhoneSafari && req.session) {
    console.log('🍎 iPhone Safari Session Recovery - Before:', {
      sessionId: req.sessionID,
      sessionExists: !!req.session,
      isAuthenticated: req.session.isAuthenticated,
      userId: req.session.userId,
      sessionKeys: Object.keys(req.session)
    });
    
    // If session exists but authentication data is missing, try to recover
    if (req.session && !req.session.isAuthenticated) {
      // Check if we have authentication cookies that can help us recover
      const cookies = req.headers.cookie;
      if (cookies && cookies.includes('nextera-auth=true')) {
        console.log('🍎 iPhone Safari: Attempting session data recovery from cookies');
        
        // Try to reload the session from the store
        req.session.reload((err) => {
          if (err) {
            console.error('🍎 iPhone Safari session reload error:', err);
          } else {
            console.log('🍎 iPhone Safari session reloaded:', {
              sessionId: req.sessionID,
              isAuthenticated: req.session.isAuthenticated,
              userId: req.session.userId,
              sessionKeys: Object.keys(req.session)
            });
          }
          next();
        });
        return;
      }
    }
    
    // Force session regeneration if data is completely missing
    if (req.session && Object.keys(req.session).length <= 2) { // Only cookie and maybe one other key
      console.log('🍎 iPhone Safari: Session data appears empty, forcing regeneration');
      
      req.session.regenerate((err) => {
        if (err) {
          console.error('🍎 iPhone Safari session regeneration error:', err);
        } else {
          console.log('🍎 iPhone Safari: New session generated:', req.sessionID);
        }
        next();
      });
      return;
    }
  }
  
  next();
};

module.exports = iphoneSafariSessionRecovery;
