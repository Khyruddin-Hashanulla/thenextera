const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const path = require("path");
require("dotenv").config();

// DNS configuration to help with SRV resolution
const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4", "1.1.1.1"]); // Use Google and Cloudflare DNS

const app = express();

// Try to load passport configuration
let passport;
try {
  passport = require("./config/passport");
} catch (error) {
  console.warn(
    "Passport configuration not found, authentication features will be disabled"
  );
  passport = {
    initialize: () => (req, res, next) => next(),
    session: () => (req, res, next) => next(),
  };
}

// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser());

// CORS configuration

const allowedOrigins = [
  "https://thenextera.in",
  "https://www.thenextera.in",
  "http://localhost:5173", // Dev frontend (Vite default)
  "http://localhost:5174", // Dev frontend (alternative port)
  "http://localhost:3000", // Dev frontend (React default)
  "https://nextera-frontend.onrender.com", // Production fullstack
  "https://khyruddin-hashanulla.github.io", // GitHub Pages
  
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) {
      return callback(null, true);
    }
    
    // In development, allow any localhost origin
    if (process.env.NODE_ENV !== "production" && origin.startsWith('http://localhost:')) {
      return callback(null, true);
    }
    
    // Check against allowed origins
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    
    console.warn(`CORS blocked origin: ${origin}`);
    callback(new Error(`CORS policy violation: Origin ${origin} not allowed`));
  },
  credentials: true, // Essential for session cookies
  optionsSuccessStatus: 200, // For legacy browser support
};

app.use(cors(corsOptions));

// Serve static files for uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// iPhone/Safari Cross-Site Cookie Compatibility Middleware
app.use((req, res, next) => {
  // Ensure Access-Control-Allow-Credentials is always sent
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  
  // For iPhone/Safari - ensure proper CORS headers for cross-site requests
  const origin = req.headers.origin;
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  
  // iPhone/Safari specific headers for better cookie handling
  if (req.isMobile) {
    res.setHeader('Vary', 'Origin, User-Agent');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  }
  
  next();
});

// Enhanced session configuration for production stability
const store = MongoStore.create({
  mongoUrl: process.env.ATLASDB_URL,
  crypto: {
    secret: process.env.SESSION_SECRET || "your-secret-key",
  },
  touchAfter: 24 * 3600, // 24 hours
  // Enhanced production settings
  collectionName: 'sessions',
  ttl: 30 * 24 * 60 * 60, // 30 days in seconds
  autoRemove: 'native', // Use MongoDB's native TTL
  autoRemoveInterval: 10, // Check every 10 minutes
  // Connection stability
  stringify: false,
  serialize: (session) => {
    // Custom serialization for better session data handling
    return JSON.stringify(session);
  },
  unserialize: (session) => {
    // Custom deserialization
    return JSON.parse(session);
  }
});

// Enhanced session store error handling for production
store.on("error", (error) => {
  console.error("❌ MongoDB session store error:", error);
  console.error("Session store connection status:", {
    readyState: store.client?.readyState,
    error: error.message
  });
  console.error("Session store connection status:", {
    timestamp: new Date().toISOString(),
    error: error.message,
    stack: error.stack
  });
});

store.on("connected", () => {
  console.log("✅ MongoDB session store connected successfully");
});

store.on("disconnected", () => {
  console.warn("⚠️ MongoDB session store disconnected");
});

app.set('trust proxy', 1); // Trust first proxy (Render)

// Better production detection - only true if actually deployed
const isProduction = process.env.NODE_ENV === "production" && (process.env.RENDER || process.env.VERCEL || process.env.NETLIFY);

// Mobile browser detection middleware for enhanced session handling
const detectMobile = (req, res, next) => {
  const userAgent = req.headers['user-agent'] || '';
  req.isMobile = /Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  next();
};

app.use(detectMobile);

// iPhone Safari session fix - critical for iPhone Safari session persistence
const iphoneSafariFix = require('./iphone-safari-fix');
app.use(iphoneSafariFix);

// iPhone Safari session persistence fix - forces session cookies
const iphoneSafariSessionPersistence = require('./iphone-safari-session-persistence');
const iphoneSafariSessionRecovery = require('./iphone-safari-session-recovery');

// Apply iPhone Safari session recovery middleware first
app.use(iphoneSafariSessionRecovery);
// Then apply session persistence middleware
app.use(iphoneSafariSessionPersistence);

// iPhone Safari session debugging middleware
app.use((req, res, next) => {
  const userAgent = req.headers['user-agent'] || '';
  const isIPhoneSafari = /iPhone/.test(userAgent) && /Safari/.test(userAgent) && !/Chrome/.test(userAgent);
  
  if (isIPhoneSafari) {
    console.log('🍎 iPhone Safari Request Debug:', {
      method: req.method,
      url: req.url,
      sessionId: req.sessionID,
      sessionExists: !!req.session,
      cookies: req.headers.cookie,
      hasSessionCookie: req.headers.cookie ? req.headers.cookie.includes('nextera.sid') : false,
      sessionData: req.session ? {
        isAuthenticated: req.session.isAuthenticated,
        userId: req.session.userId,
        keys: Object.keys(req.session)
      } : null
    });
  }
  
  next();
});

console.log('🔧 Session Configuration:', {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  isProduction,
  HTTPS_DETECTED: !!process.env.RENDER || !!process.env.VERCEL
});

// iPhone Safari session configuration with enhanced compatibility
app.use(
  session({
    secret: process.env.SESSION_SECRET || "your-secret-key",
    resave: true, // Force session save for iPhone Safari compatibility
    saveUninitialized: false,
    store,
    name: 'nextera.sid', // Custom session name
    rolling: true, // Reset expiry on each request
    cookie: {
      secure: isProduction, // HTTPS required in production for iPhone Safari
      sameSite: isProduction ? 'none' : 'lax', // 'none' for cross-origin in production
      httpOnly: true, // Secure cookie - no JavaScript access
      maxAge: 30 * 24 * 3600 * 1000, // 30 days in milliseconds
      domain: undefined, // Let browser handle domain
      // iPhone/Safari specific compatibility settings
      path: '/', // Explicit path for mobile browsers
      priority: 'high', // High priority for mobile cookie handling
      // Additional iPhone/Safari compatibility
      partitioned: false, // Disable partitioned cookies for cross-site
    },
    // Enhanced production settings
    proxy: isProduction, // Trust proxy in production
    unset: 'destroy', // Destroy session when unset
    
    // iPhone Safari specific session handling
    genid: function(req) {
      const userAgent = req.headers['user-agent'] || '';
      const isIPhoneSafari = /iPhone/.test(userAgent) && /Safari/.test(userAgent) && !/Chrome/.test(userAgent);
      
      if (isIPhoneSafari) {
        console.log('🍎 iPhone Safari: Generating new session ID');
      }
      
      return require('uid-safe').sync(24); // Generate session ID
    }
  })
);

// Initialize Passport if available
app.use(passport.initialize());
app.use(passport.session());

// Validate critical environment variables
const requiredEnvVars = ['SESSION_SECRET', 'ATLASDB_URL'];
const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingEnvVars.length > 0) {
  console.warn('Missing environment variables:', missingEnvVars);
}

// API Routes
try {
  const authRoutes = require("./Routes/Auth");
  app.use("/api/auth", authRoutes);
  console.log("✅ Auth routes loaded successfully");
} catch (error) {
  console.error("❌ Auth routes failed to load:", error.message);
  console.error("Full error:", error);
  console.error("Stack trace:", error.stack);
  app.use("/api/auth", (req, res) =>
    res.status(501).json({ 
      message: "Authentication routes not implemented",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    })
  );
}



// iPhone Safari Cookie Debug Endpoint
app.get('/debug/cookies', (req, res) => {
  const userAgent = req.headers['user-agent'] || '';
  const isIPhoneSafari = /iPhone/.test(userAgent) && /Safari/.test(userAgent) && !/Chrome/.test(userAgent);
  
  const debugInfo = {
    timestamp: new Date().toISOString(),
    isIPhoneSafari,
    userAgent,
    headers: {
      cookie: req.headers.cookie,
      origin: req.headers.origin,
      referer: req.headers.referer,
      'user-agent': req.headers['user-agent']
    },
    cookies: req.cookies,
    sessionID: req.sessionID,
    sessionExists: !!req.session,
    sessionData: req.session ? {
      isAuthenticated: req.session.isAuthenticated,
      userId: req.session.userId,
      keys: Object.keys(req.session)
    } : null,
    rawCookieHeader: req.get('Cookie'),
    allHeaders: req.headers
  };
  
  // Force set cookies for iPhone Safari
  if (isIPhoneSafari) {
    res.setHeader('Set-Cookie', [
      `debug-test=working; Path=/; HttpOnly=false; Secure=false; SameSite=Lax; Max-Age=3600`,
      `nextera-debug=${Date.now()}; Path=/; HttpOnly=false; Secure=false; SameSite=Lax; Max-Age=3600`
    ]);
  }
  
  res.json(debugInfo);
});

// Enhanced session debug route for iPhone/Safari testing
app.get('/debug/session', (req, res) => {
  const userAgent = req.headers['user-agent'] || '';
  const isIPhone = /iPhone/.test(userAgent);
  const isSafari = /Safari/.test(userAgent) && !/Chrome/.test(userAgent);
  const isIPhoneSafari = isIPhone && isSafari;
  
  const sessionInfo = {
    // Session Status
    sessionExists: !!req.session,
    sessionId: req.sessionID,
    isAuthenticated: req.session?.isAuthenticated || false,
    userId: req.session?.userId,
    userRole: req.session?.userRole,
    userName: req.session?.userName,
    userEmail: req.session?.userEmail,
    loginTime: req.session?.loginTime,
    
    // Full session data for debugging
    fullSessionData: req.session || {},
    
    // Device Detection
    isIPhone,
    isSafari,
    isIPhoneSafari,
    userAgent,
    
    // Cookie Information
    cookies: req.headers.cookie,
    cookieCount: req.headers.cookie ? req.headers.cookie.split(';').length : 0,
    hasSessionCookie: req.headers.cookie ? req.headers.cookie.includes('nextera.sid') : false,
    
    // Request Headers
    origin: req.headers.origin,
    referer: req.headers.referer,
    
    // Session Configuration
    sessionConfig: {
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      httpOnly: true,
      maxAge: 30 * 24 * 3600 * 1000,
      path: '/'
    },
    
    // Environment
    isProduction,
    nodeEnv: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
    
    // iPhone Safari Specific
    iphoneSafariFlags: req.session ? {
      isIPhoneSafari: req.session.isIPhoneSafari,
      lastAccess: req.session.lastAccess
    } : null
  };
  
  // Set iPhone Safari compatible headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  if (req.headers.origin) {
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  }
  
  // iPhone Safari: Enhanced debug with session store verification
  if (isIPhoneSafari && req.session) {
    req.session.debugAccess = new Date().toISOString();
    req.session.debugTest = 'debug-test-' + Date.now();
    
    console.log('🍎 iPhone Safari debug - Session before save:', {
      sessionId: req.sessionID,
      sessionKeys: Object.keys(req.session),
      isAuthenticated: req.session.isAuthenticated,
      userId: req.session.userId,
      fullSession: req.session
    });
    
    req.session.save((err) => {
      if (err) {
        console.error('Debug session save error:', err);
        sessionInfo.sessionSaveError = err.message;
      } else {
        sessionInfo.sessionSaved = true;
        console.log('🍎 iPhone Safari debug - Session saved successfully');
      }
      
      // Try to reload session to verify persistence
      req.session.reload((reloadErr) => {
        if (reloadErr) {
          console.error('Debug session reload error:', reloadErr);
          sessionInfo.sessionReloadError = reloadErr.message;
        } else {
          console.log('🍎 iPhone Safari debug - Session reloaded:', {
            sessionId: req.sessionID,
            isAuthenticated: req.session.isAuthenticated,
            userId: req.session.userId,
            debugTest: req.session.debugTest
          });
          sessionInfo.sessionReloaded = true;
          sessionInfo.reloadedSessionData = req.session;
        }
        
        res.json(sessionInfo);
      });
    });
  } else {
    res.json(sessionInfo);
  }
});

// Mobile authentication test routes - temporarily disabled for debugging
// try {
//   const mobileAuthTest = require('./mobile-auth-test');
//   app.use('/debug', mobileAuthTest);
//   console.log('✅ Mobile auth test routes loaded successfully');
// } catch (error) {
//   console.error('❌ Mobile auth test routes failed to load:', error.message);
// }

try {
  const courseRoutes = require("./Routes/Courses");
  app.use("/api/courses", courseRoutes);
  console.log("✅ Course routes loaded successfully");
} catch (error) {
  console.error("❌ Course routes failed to load:", error.message);
  console.error("Full error:", error);
  console.error("Stack trace:", error.stack);
  app.use("/api/courses", (req, res) =>
    res.status(501).json({ 
      message: "Course routes not implemented",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    })
  );
}

// Serve static files (production only)

if (process.env.NODE_ENV === "production") {
  const clientBuildPath = path.join(__dirname, "..", "Client", "dist");
  app.use(express.static(clientBuildPath));

  app.get("*", (req, res) => {
    if (req.path.startsWith("/api") || req.path.startsWith("/auth") || req.path.startsWith("/debug")) {
      return res.status(404).json({ error: "API endpoint not found" });
    }
    res.sendFile(path.join(clientBuildPath, "index.html"));
  });
}

// Database connection
const dbUrl = process.env.ATLASDB_URL;

// Fallback to local MongoDB for development/testing
const localDbUrl = "mongodb://localhost:27017/thenextera";

async function connectToDatabase() {
  try {
    console.log("🔄 Attempting to connect to MongoDB Atlas...");
    await mongoose.connect(dbUrl, {
      serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      maxPoolSize: 10, // Maintain up to 10 socket connections
      serverApi: {
        version: '1',
        strict: true,
        deprecationErrors: true,
      }
    });
    console.log("✅ Connected to MongoDB Atlas");
  } catch (atlasError) {
    console.warn("⚠️ MongoDB Atlas connection failed:", atlasError.message);
    console.log("🔄 Falling back to local MongoDB...");
    
    try {
      await mongoose.connect(localDbUrl, {
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
        maxPoolSize: 10,
      });
      console.log("✅ Connected to local MongoDB");
    } catch (localError) {
      console.error("❌ Both Atlas and local MongoDB connections failed:");
      console.error("Atlas error:", atlasError.message);
      console.error("Local error:", localError.message);
      console.log("\n📋 To fix this issue:");
      console.log("1. Install MongoDB locally: brew install mongodb-community");
      console.log("2. Start MongoDB: brew services start mongodb-community");
      console.log("3. Or fix your Atlas connection string in .env file");
      throw localError;
    }
  }
}

// Connect to database
connectToDatabase()
  .then(() => {
    console.log("🚀 Database connection established");
  })
  .catch((err) => {
    console.error("💥 Database connection failed:", err.message);
    process.exit(1); // Exit if no database connection
  });

async function main() {
  // This function is now handled by connectToDatabase()
  console.log("📡 Server initialization complete");
}

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
});
// Restart trigger
