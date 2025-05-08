const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const colors = require('colors');
const session = require('express-session');
const passport = require('passport');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');
const userRoutes = require('./routes/userRoutes');
const analyzerRoutes = require('./routes/analyzerRoutes');
const fileUpload = require('express-fileupload');

// Load environment variables
dotenv.config();
require('./config/passport')(passport);

// Connect to database
connectDB();

const app = express();

// CORS Configuration - Updated to properly handle CORS
app.use(cors({
  // Allow specific origins or use an array for multiple origins
  origin: [
    'https://resume-ai-553fj7xs0-hammadmals-projects.vercel.app',
    'https://resume-ai.vercel.app',
    'http://localhost:5173', // For local development
    // Add any additional origins as needed
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Add these headers to all responses
app.use((req, res, next) => {
  // Backup in case the CORS middleware doesn't work properly
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'keyboard cat',
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Only try to initialize passport config if GOOGLE_CLIENT_ID exists
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  console.log('Initializing Google OAuth with provided credentials');
  try {
    require('./config/passport')(passport);
  } catch (err) {
    console.error('Error initializing passport:', err.message);
  }
} else {
  console.log('Google OAuth credentials not found, skipping OAuth setup');
}

app.use(fileUpload({
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  useTempFiles: true
}));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/analyzer', analyzerRoutes);

// Basic route for testing
app.get('/', (req, res) => {
  res.send('API is running...');
});

app.get('/login', (req, res) => {
  res.send('Login is running...');
});

// Error handler middleware
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});