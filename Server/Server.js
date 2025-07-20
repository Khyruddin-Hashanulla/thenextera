const dotenv = require("dotenv");

dotenv.config();

// DNS configuration to help with SRV resolution
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']); // Use Google and Cloudflare DNS

const express = require("express");
const MongoStore = require("connect-mongo");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const path = require("path");
const app = express();
// Serve static files from client build folder in production
if (process.env.NODE_ENV === "production") {
  const clientBuildPath = path.join(__dirname, "..", "Client", "dist");
  console.log("Serving static files from:", clientBuildPath);

  app.use(express.static(clientBuildPath));

  // Handle React routing, return all requests to React app
  app.get("*", (req, res) => {
    res.sendFile(path.join(clientBuildPath, "index.html"));
  });
}

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
const corsOptions = {
  origin:
    process.env.NODE_ENV === "production"
      ? [
          "https://nextera-frontend.onrender.com",
          "https://thenextera.onrender.com",
          "https://khyruddin-hashanulla.github.io",
        ]
      : "http://localhost:5173",
  credentials: true,
};
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

app.use(
  session({
    secret: process.env.SESSION_SECRET || "your-secret-key",
    resave: false,
    saveUninitialized: false,
    store,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      maxAge: 30 * 24 * 3600, // 30 days
    },
  })
);

// Initialize Passport if available
app.use(passport.initialize());
app.use(passport.session());

// API Routes
try {
  app.use("/auth", require("./Routes/Auth"));
} catch (error) {
  console.warn("Auth routes not found:", error.message);
  app.use("/auth", (req, res) =>
    res.status(501).json({ message: "Authentication routes not implemented" })
  );
}

try {
  app.use("/api/courses", require("./Routes/Courses"));
} catch (error) {
  console.warn("Course routes not found:", error.message);
  app.use("/api/courses", (req, res) =>
    res.status(501).json({ message: "Course routes not implemented" })
  );
}

app.get("/", (req, res) => {
  res.redirect("/Home");
});

// Database connection
const dbUrl = process.env.ATLASDB_URL;
const fallbackUrl = process.env.MONGO_URI; // Direct connection string as fallback

// Debug logging
console.log('Environment variables loaded:');
console.log('ATLASDB_URL exists:', !!process.env.ATLASDB_URL);
console.log('MONGO_URI exists:', !!process.env.MONGO_URI);

if (!dbUrl && !fallbackUrl) {
  console.error('❌ Neither ATLASDB_URL nor MONGO_URI is defined in environment variables');
  console.error('Make sure your .env file contains one of: ATLASDB_URL=your_srv_connection_string or MONGO_URI=your_direct_connection_string');
  process.exit(1);
}

// Try SRV connection first, then fallback to direct connection
const connectToDatabase = async () => {
  if (dbUrl) {
    console.log('🔄 Attempting to connect to MongoDB using SRV connection...');
    try {
      await mongoose.connect(dbUrl);
      console.log("✅ Connected to MongoDB successfully using SRV connection");
      console.log("Database name:", mongoose.connection.name);
      return;
    } catch (err) {
      console.warn("⚠️ SRV connection failed:", err.message);
      if (fallbackUrl) {
        console.log('🔄 Trying fallback direct connection...');
      } else {
        throw err;
      }
    }
  }
  
  if (fallbackUrl) {
    try {
      await mongoose.connect(fallbackUrl);
      console.log("✅ Connected to MongoDB successfully using direct connection");
      console.log("Database name:", mongoose.connection.name);
    } catch (err) {
      console.error("❌ MongoDB connection error (direct connection):");
      console.error("Error name:", err.name);
      console.error("Error message:", err.message);
      throw err;
    }
  }
};

// Connect to database
connectToDatabase().catch((err) => {
  console.error("❌ Failed to connect to MongoDB with all available methods");
  console.error("Full error:", err);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
});
