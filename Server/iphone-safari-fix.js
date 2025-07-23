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
    
    // Force session save for iPhone Safari
    const originalSend = res.send;
    res.send = function(data) {
      if (req.session && req.session.save) {
        req.session.save((err) => {
          if (err) {
            console.error('iPhone Safari session save error:', err);
          } else {
            console.log('✅ iPhone Safari session saved successfully');
          }
          originalSend.call(this, data);
        });
      } else {
        originalSend.call(this, data);
      }
    };
    
    // iPhone Safari specific headers
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate, private');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    
    // Ensure CORS headers are set for iPhone Safari
    if (req.headers.origin) {
      res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
      res.setHeader('Access-Control-Allow-Credentials', 'true');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    }
    
    // Force session touch for iPhone Safari
    if (req.session) {
      req.session.touch();
      
      // Add iPhone Safari flag to session
      req.session.isIPhoneSafari = true;
      req.session.lastAccess = new Date().toISOString();
    }
  }
  
  next();
};

module.exports = iphoneSafariFix;
