// iPhone Safari Session Persistence Fix
// This middleware addresses iPhone Safari's strict cookie policies and session handling issues

const iphoneSafariFix = (req, res, next) => {
  // Detect iPhone Safari
  const userAgent = req.headers['user-agent'] || '';
  const isIPhone = /iPhone/.test(userAgent);
  const isSafari = /Safari/.test(userAgent) && !/Chrome/.test(userAgent);
  const isIPhoneSafari = isIPhone && isSafari;
  
  // Add detection flag to request
  req.isIPhoneSafari = isIPhoneSafari;
  
  if (isIPhoneSafari) {
    console.log('🍎 iPhone Safari detected - Applying session fixes');
    
    // Set iPhone Safari specific headers for better cookie handling
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.setHeader('Vary', 'Origin, User-Agent');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    
    // Enhanced CORS headers for iPhone Safari
    const origin = req.headers.origin;
    if (origin) {
      res.setHeader('Access-Control-Allow-Origin', origin);
      res.setHeader('Access-Control-Allow-Credentials', 'true');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    }
    
    // Force session touch and save for iPhone Safari
    if (req.session) {
      req.session.touch();
      req.session.iphoneSafari = true;
      req.session.lastAccess = new Date().toISOString();
      
      // Force session save for iPhone Safari
      const originalSend = res.send;
      res.send = function(data) {
        req.session.save((err) => {
          if (err) {
            console.error('🍎 iPhone Safari session save error:', err);
          } else {
            console.log('🍎 iPhone Safari session saved successfully');
          }
          originalSend.call(this, data);
        });
      };
    }
    
    // Handle preflight OPTIONS requests for iPhone Safari
    if (req.method === 'OPTIONS') {
      res.setHeader('Access-Control-Max-Age', '86400'); // 24 hours
      return res.status(200).end();
    }
  }
  
  next();
};

module.exports = iphoneSafariFix;
