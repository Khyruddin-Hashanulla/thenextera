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
  "http://localhost:5173", // Dev frontend
  "https://thenextera.onrender.com", // Production fullstack
  "https://nextera-frontend.vercel.app", // If deployed separately on Vercel
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
  corsOptions.origin = "http://localhost:5173";
}

app.use(cors(corsOptions));


// const corsOptions = {
//   origin:
//     process.env.NODE_ENV === "production"
//       ? [
//           "https://thenextera.onrender.com",
//           "https://khyruddin-hashanulla.github.io",
//         ]
//       : "http://localhost:5173",
//   credentials: true,
// };
// app.use(cors(corsOptions));



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

// Serve static files (production only)
// if (process.env.NODE_ENV === "production") {
//   const clientBuildPath = path.join(__dirname, "..", "Client", "dist");
//   app.use(express.static(clientBuildPath));

//   app.get("*", (req, res) => {
//     if (req.path.startsWith("/api") || req.path.startsWith("/auth")) {
//       return res.status(404).json({ error: "API endpoint not found" });
//     }
//     res.sendFile(path.join(clientBuildPath, "index.html"));
//   });
// }

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
  await mongoose.connect(dbUrl);
}

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
});
