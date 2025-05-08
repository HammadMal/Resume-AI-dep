const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const colors = require('colors');
const session = require('express-session'); // ✅ NEW
const passport = require('passport');       // ✅ NEW
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');
const userRoutes = require('./routes/userRoutes');
const analyzerRoutes = require('./routes/analyzerRoutes');
const fileUpload = require('express-fileupload');



// Load environment variables
dotenv.config();
require('./config/passport')(passport); // ✅ Initialize passport strategy


// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Add this
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'] // Add this
}));


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: 'keyboard cat', // You can use process.env.SECRET instead
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());   // ✅
app.use(passport.session());      // ✅

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

//comment