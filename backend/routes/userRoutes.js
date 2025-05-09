const express = require('express');
const passport = require('passport');
const router = express.Router();
const jwt = require('jsonwebtoken');


const {
  registerUser,
  loginUser,
  getMe,
  forgotPassword,
  verifyOTP,
  resetPassword,

} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// Regular auth
router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);


// Forgot Password - Send OTP
router.post('/forgot-password', forgotPassword);

// Verify OTP
router.post('/verify-otp', verifyOTP);

// Reset Password
router.post('/reset-password', resetPassword);


// Google OAuth routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });
    res.redirect(`https://resume-ai-dep.vercel.app/auth/google?token=${token}`);


  }
);




module.exports = router;
