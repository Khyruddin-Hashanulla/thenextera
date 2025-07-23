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
        // Multiple cookie setting strategies for iPhone Safari
        const isProduction = process.env.NODE_ENV === 'production';
        const sessionCookie = `nextera.sid=s%3A${req.sessionID}.signature; Path=/; HttpOnly=true; Secure=${isProduction}; SameSite=${isProduction ? 'None' : 'Lax'}; Max-Age=2592000`;
        const authCookie = `nextera-auth=${req.session.isAuthenticated || false}; Path=/; HttpOnly=true; Secure=${isProduction}; SameSite=${isProduction ? 'None' : 'Lax'}; Max-Age=2592000`;
        const simpleCookie = `nextera-simple=${req.sessionID}; Path=/; HttpOnly=false; Secure=${isProduction}; SameSite=${isProduction ? 'None' : 'Lax'}; Max-Age=2592000`;
        
        res.setHeader('Set-Cookie', [sessionCookie, authCookie, simpleCookie]);
        
        // Also try setting individual cookies
        res.cookie('nextera.sid', `s%3A${req.sessionID}.signature`, {
          path: '/',
          httpOnly: true,
          secure: isProduction,
          sameSite: isProduction ? 'none' : 'lax',
          maxAge: 2592000000
        });
        
        console.log('🍎 iPhone Safari: Multiple cookie strategies applied:', {
          sessionCookie,
          authCookie,
          simpleCookie
        });
        
        console.log('🍎 iPhone Safari: Forcing session cookie in response');
      }
      
      originalSend.call(this, data);
    };
    
    res.json = function(data) {
      // Set session cookie explicitly for iPhone Safari
      if (req.sessionID && req.session) {
        // Multiple cookie setting strategies for iPhone Safari
        const isProduction = process.env.NODE_ENV === 'production';
        const sessionCookie = `nextera.sid=s%3A${req.sessionID}.signature; Path=/; HttpOnly=true; Secure=${isProduction}; SameSite=${isProduction ? 'None' : 'Lax'}; Max-Age=2592000`;
        const authCookie = `nextera-auth=${req.session.isAuthenticated || false}; Path=/; HttpOnly=true; Secure=${isProduction}; SameSite=${isProduction ? 'None' : 'Lax'}; Max-Age=2592000`;
        const simpleCookie = `nextera-simple=${req.sessionID}; Path=/; HttpOnly=false; Secure=${isProduction}; SameSite=${isProduction ? 'None' : 'Lax'}; Max-Age=2592000`;
        
        res.setHeader('Set-Cookie', [sessionCookie, authCookie, simpleCookie]);
        
        // Also try setting individual cookies
        res.cookie('nextera.sid', `s%3A${req.sessionID}.signature`, {
          path: '/',
          httpOnly: true,
          secure: isProduction,
          sameSite: isProduction ? 'none' : 'lax',
          maxAge: 2592000000
        });
        
        console.log('🍎 iPhone Safari: Multiple cookie strategies applied:', {
          sessionCookie,
          authCookie,
          simpleCookie
        });
        
        console.log('🍎 iPhone Safari: Forcing session cookie in JSON response');
      }
      
      originalJson.call(this, data);
    };
    
    // iPhone Safari specific headers for better session handling
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate, private');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.setHeader('Vary', 'User-Agent, Cookie');
    
    // Additional iPhone Safari cookie compatibility headers
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Cookie');
    res.setHeader('Access-Control-Expose-Headers', 'Set-Cookie');
    
    // Force cookie acceptance for iPhone Safari
    res.setHeader('P3P', 'CP="NOI ADM DEV PSAi COM NAV OUR OTRo STP IND DEM"');
  }
  
  next();
};

module.exports = iphoneSafariSessionPersistence;
