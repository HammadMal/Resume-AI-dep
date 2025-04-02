const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const colors = require('colors');
const session = require('express-session'); // ✅ NEW
const passport = require('passport');       // ✅ NEW
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');
const userRoutes = require('./routes/userRoutes');

// Load environment variables
dotenv.config();
require('./config/passport')(passport); // ✅ Initialize passport strategy


// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
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


// Routes
app.use('/api/users', userRoutes);

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
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});