// iPhone Safari Session Persistence Fix
// Addresses the issue where iPhone Safari creates new sessions instead of using existing authenticated sessions

const iphoneSafariSessionPersistence = (req, res, next) => {
  const userAgent = req.headers['user-agent'] || '';
  const isIPhoneSafari = /iPhone/.test(userAgent) && /Safari/.test(userAgent) && !/Chrome/.test(userAgent);
  
  if (isIPhoneSafari) {
    // Force session cookie to be sent with every response
    const originalSend = res.send;
    const originalJson = res.json;
    
    res.send = function(data) {
      // Set session cookie explicitly for iPhone Safari
      if (req.sessionID && req.session) {
        const cookieValue = `nextera.sid=s%3A${req.sessionID}.${req.session.cookie.signature || 'signature'}`;
        res.setHeader('Set-Cookie', [
          `nextera.sid=s%3A${req.sessionID}.signature; Path=/; HttpOnly=false; Secure=false; SameSite=Lax; Max-Age=2592000`,
          `nextera-auth=${req.session.isAuthenticated || false}; Path=/; HttpOnly=false; Secure=false; SameSite=Lax; Max-Age=2592000`
        ]);
        
        console.log('🍎 iPhone Safari: Forcing session cookie in response');
      }
      
      originalSend.call(this, data);
    };
    
    res.json = function(data) {
      // Set session cookie explicitly for iPhone Safari
      if (req.sessionID && req.session) {
        res.setHeader('Set-Cookie', [
          `nextera.sid=s%3A${req.sessionID}.signature; Path=/; HttpOnly=false; Secure=false; SameSite=Lax; Max-Age=2592000`,
          `nextera-auth=${req.session.isAuthenticated || false}; Path=/; HttpOnly=false; Secure=false; SameSite=Lax; Max-Age=2592000`
        ]);
        
        console.log('🍎 iPhone Safari: Forcing session cookie in JSON response');
      }
      
      originalJson.call(this, data);
    };
    
    // iPhone Safari specific headers for better session handling
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate, private');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.setHeader('Vary', 'User-Agent, Cookie');
  }
  
  next();
};

module.exports = iphoneSafariSessionPersistence;
