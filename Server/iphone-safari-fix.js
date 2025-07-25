// iPhone Safari Session Fix Middleware
// Addresses specific session persistence issues on iPhone Safari

const iphoneSafariFix = (req, res, next) => {
  const userAgent = req.headers['user-agent'] || '';
  const isIPhone = /iPhone/.test(userAgent);
  const isSafari = /Safari/.test(userAgent) && !/Chrome/.test(userAgent);
  const isIPhoneSafari = isIPhone && isSafari;
  
  // Add iPhone Safari detection to request
  req.isIPhoneSafari = isIPhoneSafari;
  req.isIPhone = isIPhone;
  req.isSafari = isSafari;
  
  if (isIPhoneSafari) {
    console.log('🍎 iPhone Safari detected - applying compatibility fixes');
    
    // Enhanced session persistence for iPhone Safari
    const originalSend = res.send;
    const originalJson = res.json;
    
    // Override send method to force session save
    res.send = function(data) {
      if (req.session && req.session.save) {
        // Force session touch and save for iPhone Safari
        req.session.touch();
        req.session.lastActivity = new Date().toISOString();
        req.session.iphoneSafariAccess = true;
        
        req.session.save((err) => {
          if (err) {
            console.error('🍎 iPhone Safari session save error:', err);
          } else {
            console.log('✅ iPhone Safari session saved successfully');
          }
          originalSend.call(this, data);
        });
      } else {
        originalSend.call(this, data);
      }
    };
    
    // Override json method to force session save
    res.json = function(data) {
      if (req.session && req.session.save) {
        req.session.touch();
        req.session.lastActivity = new Date().toISOString();
        req.session.iphoneSafariAccess = true;
        
        req.session.save((err) => {
          if (err) {
            console.error('🍎 iPhone Safari session save error (json):', err);
          } else {
            console.log('✅ iPhone Safari session saved successfully (json)');
          }
          originalJson.call(this, data);
        });
      } else {
        originalJson.call(this, data);
      }
    };
    
    // iPhone Safari specific headers for better compatibility
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate, private');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.setHeader('Vary', 'Origin, User-Agent, Accept-Encoding');
    
    // Enhanced CORS headers for iPhone Safari
    if (req.headers.origin) {
      res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
      res.setHeader('Access-Control-Allow-Credentials', 'true');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin');
      res.setHeader('Access-Control-Max-Age', '86400'); // 24 hours
    }
    
    // Force session touch and add iPhone Safari flags
    if (req.session) {
      req.session.touch();
      req.session.iphoneSafariUser = true;
      req.session.lastIPhoneAccess = new Date().toISOString();
      
      // Enhanced session debugging for iPhone Safari
      console.log('🍎 iPhone Safari session details:', {
        sessionId: req.sessionID?.substring(0, 8) + '...',
        isAuthenticated: req.session.isAuthenticated,
        userId: req.session.userId,
        hasSessionData: Object.keys(req.session).length > 0,
        method: req.method,
        url: req.url,
        cookies: req.headers.cookie ? 'present' : 'missing'
      });
    }
    
    // Enhanced upload handling for iPhone Safari
    if (req.url.includes('/upload') || req.url.includes('/thumbnail')) {
      console.log('🍎 iPhone Safari upload request detected');
      
      // Set upload-specific headers for iPhone Safari
      res.setHeader('X-Content-Type-Options', 'nosniff');
      res.setHeader('X-Frame-Options', 'DENY');
      res.setHeader('X-XSS-Protection', '1; mode=block');
      
      // Increase timeout for iPhone Safari uploads
      req.setTimeout(300000); // 5 minutes
      res.setTimeout(300000); // 5 minutes
      
      // Add upload progress handling
      req.on('data', (chunk) => {
        console.log('🍎 iPhone Safari upload progress:', chunk.length, 'bytes');
      });
      
      req.on('end', () => {
        console.log('🍎 iPhone Safari upload data received completely');
      });
      
      req.on('error', (error) => {
        console.error('🍎 iPhone Safari upload error:', error);
      });
    }
  }
  
  next();
};

module.exports = iphoneSafariFix;
