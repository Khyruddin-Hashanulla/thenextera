require("dotenv").config();
const express = require("express");
const MongoStore = require('connect-mongo');
const mongoose = require("mongoose");
const cors = require("cors");
const session = require('express-session');
const cookieParser = require('cookie-parser');
const path = require('path');
const app = express();

// Serve static files from client build folder
app.use(express.static(path.join(__dirname, "../Client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../Client/dist/index.html"));
});

// Try to load passport configuration
let passport;
try {
  passport = require('./config/passport');
} catch (error) {
  console.warn("Passport configuration not found, authentication features will be disabled");
  passport = {
    initialize: () => (req, res, next) => next(),
    session: () => (req, res, next) => next()
  };
}



// Middleware
app.use(express.json());
app.use(cookieParser());

// CORS configuration
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://thenextera.onrender.com', 'https://khyruddin-hashanulla.github.io'] 
    : 'http://localhost:5173',
  credentials: true
};
app.use(cors(corsOptions));

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Session configuration
const store = MongoStore.create({
  mongoUrl: process.env.ATLASDB_URL,
  crypto: {
    secret: process.env.SESSION_SECRET || 'your-secret-key'
  },
  touchAfter: 24 * 3600 // 24 hours
});

store.on('error', (error) => {
  console.error('MongoDB session store error:', error);
});

app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  store,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 30 * 24 * 3600 // 30 days
  }
}));

// Initialize Passport if available
app.use(passport.initialize());
app.use(passport.session());

// API Routes
try {
  app.use("/auth", require("./Routes/Auth"));
} catch (error) {
  console.warn("Auth routes not found:", error.message);
  app.use("/auth", (req, res) => res.status(501).json({ message: "Authentication routes not implemented" }));
}

try {
  app.use("/api/courses", require("./Routes/Courses"));
} catch (error) {
  console.warn("Course routes not found:", error.message);
  app.use("/api/courses", (req, res) => res.status(501).json({ message: "Course routes not implemented" }));
}







app.get("/", (req, res) => {
  res.redirect("/Home");
});






// Serve static files from the React app in production
if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, '../Client/dist')));
  
  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../Client/dist/index.html'));
  });
}

// Database connection
// const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/nextera';

const dbUrl=process.env.ATLASDB_URL;

mongoose
  .connect(dbUrl)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});