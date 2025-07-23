const dotenv = require("dotenv");
dotenv.config();

// DNS configuration to help with SRV resolution
const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4", "1.1.1.1"]); // Use Google and Cloudflare DNS

const express = require("express");
const MongoStore = require("connect-mongo");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const path = require("path");
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
app.use(express.json());
app.use(cookieParser());

// CORS configuration

const allowedOrigins = [
  "https://thenextera.in",
  "https://www.thenextera.in",
  "http://localhost:5173", // Dev frontend (Vite default)
  "http://localhost:5174", // Dev frontend (alternative port)
  "http://localhost:3000", // Dev frontend (React default)
  "https://nextera-vaaq.onrender.com", // Production fullstack
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


// Serve static files from uploads directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

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

console.log('🔧 Session Configuration:', {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  isProduction,
  HTTPS_DETECTED: !!process.env.RENDER || !!process.env.VERCEL
});

app.use(
  session({
    secret: process.env.SESSION_SECRET || "your-secret-key",
    resave: false,
    saveUninitialized: false,
    store,
    name: 'nextera.sid', // Custom session name
    rolling: true, // Reset expiry on each request
    cookie: {
      secure: isProduction, // HTTPS required in production
      sameSite: isProduction ? 'none' : 'lax', // 'none' for cross-origin in production
      httpOnly: true, // Prevent XSS attacks
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
  
  // Force session save for iPhone Safari
  if (isIPhoneSafari && req.session) {
    req.session.debugAccess = new Date().toISOString();
    req.session.save((err) => {
      if (err) {
        console.error('Debug session save error:', err);
        sessionInfo.sessionSaveError = err.message;
      } else {
        sessionInfo.sessionSaved = true;
      }
      res.json(sessionInfo);
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
// const MONGO_URL = process.env.MONGO_URL;
const dbUrl = process.env.ATLASDB_URL;

// Connect to database
main()
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
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
}

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
});
// Restart trigger
