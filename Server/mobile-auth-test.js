// Mobile Authentication Test Endpoint
// This provides comprehensive mobile authentication testing and debugging

const express = require('express');
const router = express.Router();

// Mobile authentication test endpoint
router.get('/mobile-auth-test', (req, res) => {
  const userAgent = req.headers['user-agent'] || '';
  const isMobile = /Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  
  const testResults = {
    timestamp: new Date().toISOString(),
    mobileDetection: {
      isMobile,
      userAgent: userAgent.substring(0, 200),
      deviceType: isMobile ? 'Mobile' : 'Desktop'
    },
    sessionStatus: {
      hasSession: !!req.session,
      sessionId: req.session?.id,
      isAuthenticated: req.session?.isAuthenticated || false,
      userId: req.session?.userId || null,
      userRole: req.session?.userRole || null,
      sessionKeys: req.session ? Object.keys(req.session) : [],
      isMobileSession: req.session?.isMobileSession || false
    },
    cookieAnalysis: {
      hasCookieHeader: !!req.headers.cookie,
      cookieHeader: req.headers.cookie || 'No cookies',
      sessionCookie: req.cookies['nextera.sid'] || 'No session cookie',
      cookieCount: req.headers.cookie ? req.headers.cookie.split(';').length : 0,
      parsedCookies: req.cookies
    },
    requestDetails: {
      method: req.method,
      path: req.path,
      origin: req.headers.origin,
      referer: req.headers.referer,
      host: req.headers.host,
      protocol: req.protocol,
      secure: req.secure
    },
    mobileSpecificIssues: [],
    recommendations: []
  };
  
  // Analyze mobile-specific issues
  if (isMobile) {
    if (!req.headers.cookie) {
      testResults.mobileSpecificIssues.push('No cookies received - mobile browser may be blocking cookies');
      testResults.recommendations.push('Check mobile browser cookie settings');
    }
    
    if (!req.session?.isAuthenticated) {
      testResults.mobileSpecificIssues.push('User not authenticated on mobile');
      testResults.recommendations.push('Try logging in on mobile device');
    }
    
    if (req.headers.origin && req.headers.host && req.headers.origin !== `${req.protocol}://${req.headers.host}`) {
      testResults.mobileSpecificIssues.push('Cross-origin request detected');
      testResults.recommendations.push('Ensure CORS is properly configured for mobile');
    }
    
    if (!req.secure && process.env.NODE_ENV === 'production') {
      testResults.mobileSpecificIssues.push('Non-secure connection in production');
      testResults.recommendations.push('Use HTTPS for mobile compatibility');
    }
  }
  
  // Add success indicators
  testResults.overallStatus = {
    mobileCompatible: isMobile && req.session?.isAuthenticated,
    readyForCourseActions: !!(req.session?.isAuthenticated && req.session?.userId),
    sessionPersistent: !!(req.headers.cookie && req.cookies['nextera.sid']),
    issueCount: testResults.mobileSpecificIssues.length
  };
  
  res.json(testResults);
});

// Mobile course action test endpoint
router.post('/mobile-course-test', (req, res) => {
  const userAgent = req.headers['user-agent'] || '';
  const isMobile = /Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  
  const testResults = {
    timestamp: new Date().toISOString(),
    testType: 'Mobile Course Action Test',
    isMobile,
    authentication: {
      isAuthenticated: req.session?.isAuthenticated || false,
      userId: req.session?.userId || null,
      userRole: req.session?.userRole || null,
      canCreateCourse: req.session?.userRole === 'Instructor',
      canEditCourse: req.session?.userRole === 'Instructor',
      canDeleteCourse: req.session?.userRole === 'Instructor',
      canEnrollCourse: !!req.session?.userId
    },
    sessionData: {
      sessionId: req.session?.id,
      sessionKeys: req.session ? Object.keys(req.session) : [],
      isMobileSession: req.session?.isMobileSession || false
    },
    requestBody: req.body,
    status: 'success',
    message: 'Mobile course action test completed'
  };
  
  if (!req.session?.isAuthenticated) {
    testResults.status = 'error';
    testResults.message = 'User not authenticated - course actions will fail';
    testResults.solution = 'Please log in on mobile device first';
  }
  
  res.json(testResults);
});

module.exports = router;
