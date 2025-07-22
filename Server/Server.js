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
  "http://localhost:5173", // Dev frontend
  "https://nextera-vaaq.onrender.com", // Production fullstack
  "https://khyruddin-hashanulla.github.io" // If using GitHub Pages
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS blocked for this origin"));
    }
  },
  credentials: true,
};

if (process.env.NODE_ENV !== "production") {
  // Allow multiple localhost ports in development
  corsOptions.origin = function (origin, callback) {
    if (!origin || origin.startsWith('http://localhost:')) {
      callback(null, true);
    } else if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS blocked for this origin"));
    }
  };
}

app.use(cors(corsOptions));


// Serve static files from uploads directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Session configuration
const store = MongoStore.create({
  mongoUrl: process.env.ATLASDB_URL,
  crypto: {
    secret: process.env.SESSION_SECRET || "your-secret-key",
  },
  touchAfter: 24 * 3600, // 24 hours
});

store.on("error", (error) => {
  console.error("MongoDB session store error:", error);
});

app.set('trust proxy', 1); // Trust first proxy (Render)

// Detect if we're actually in production (has HTTPS) vs local development
const isProduction = process.env.NODE_ENV === "production" && process.env.PORT;
const isLocalDev = !process.env.PORT || process.env.PORT === "8081";

console.log('🔧 Session Configuration:', {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  isProduction,
  isLocalDev
});

app.use(
  session({
    secret: process.env.SESSION_SECRET || "your-secret-key",
    resave: false,
    saveUninitialized: false,
    store,
    cookie: {
      secure: isProduction && !isLocalDev, // Only secure in actual production with HTTPS
      sameSite: isProduction && !isLocalDev ? 'none' : 'lax', // 'none' only for production
      httpOnly: true, // Prevent XSS attacks
      maxAge: 30 * 24 * 3600 * 1000, // 30 days in milliseconds
      domain: undefined, // Let browser handle domain
    },
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
  app.use("/auth", authRoutes);
  console.log("✅ Auth routes loaded successfully");
} catch (error) {
  console.error("❌ Auth routes failed to load:", error.message);
  console.error("Full error:", error);
  console.error("Stack trace:", error.stack);
  app.use("/auth", (req, res) =>
    res.status(501).json({ 
      message: "Authentication routes not implemented",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    })
  );
}

// Session debugging route (for deployment troubleshooting)
app.get('/debug/session', (req, res) => {
  res.json({
    hasSession: !!req.session,
    sessionId: req.session?.id,
    isAuthenticated: req.session?.isAuthenticated,
    userId: req.session?.userId,
    userRole: req.session?.userRole,
    userName: req.session?.userName,
    userEmail: req.session?.userEmail,
    cookieSettings: {
      secure: req.session?.cookie?.secure,
      sameSite: req.session?.cookie?.sameSite,
      httpOnly: req.session?.cookie?.httpOnly,
      maxAge: req.session?.cookie?.maxAge,
      domain: req.session?.cookie?.domain
    },
    environment: process.env.NODE_ENV || 'development'
  });
});

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
    if (req.path.startsWith("/api") || req.path.startsWith("/auth")) {
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
