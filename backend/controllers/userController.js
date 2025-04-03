const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const crypto = require('crypto');

const nodemailer = require('nodemailer');

const dotenv = require('dotenv');
dotenv.config();







// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  // Check if user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  // Create user
  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check for user email
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};




//password reset 


const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// 1. Forgot Password
const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate OTP and expiry
    const otp = generateOTP();
    const expiry = Date.now() + 10 * 60 * 1000; // OTP expires in 10 minutes

    // Log OTP and expiry before saving to DB
    console.log('Generated OTP:', otp);
    console.log('OTP Expiry:', expiry);

    // Save OTP and expiry in the user document
    user.resetOTP = otp;
    user.otpExpires = expiry;

    // Save the updated user document
    const updatedUser = await user.save(); // Ensure this is awaited
    console.log('Updated User:', updatedUser); // Log the updated user object

    // Send OTP to email
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: 'no-reply@yourapp.com',
      to: email,
      subject: 'Your OTP for Password Reset',
      text: `Your OTP is: ${otp}. It will expire in 10 minutes.`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'OTP sent to email' });
  } catch (error) {
    console.error('Error in forgotPassword:', error);
    res.status(500).json({ message: 'Failed to send OTP', error });
  }
};


// 2. Verify OTP
const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  console.log('Email:', email);  // Log the email
  console.log('OTP:', otp);      // Log the OTP entered by the user
  
  try {
    const user = await User.findOne({ email });

    if (!user) {
      console.log('User not found for email:', email);
      return res.status(400).json({ message: 'User not found' });
    }

    console.log('Stored OTP:', user.resetOTP); // Log stored OTP in DB
    console.log('Stored OTP Expiry:', user.otpExpires); // Log OTP expiry time
    
    // Check if OTP matches
    if (user.resetOTP !== otp) {
      console.log('OTP does not match');
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    // Check if OTP has expired
    if (Date.now() > user.otpExpires) {
      console.log('OTP has expired');
      return res.status(400).json({ message: 'OTP has expired' });
    }

    res.status(200).json({ message: 'OTP verified successfully' });
  } catch (error) {
    console.error('Error verifying OTP:', error); // Log the error
    res.status(500).json({ message: 'OTP verification failed', error });
  }
};



// 3. Reset Password
const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  try {
    // Log received data to ensure everything is coming through
    console.log('Received data:', { email, otp, newPassword });

    const user = await User.findOne({ email });

    if (!user) {
      console.log('User not found:', email);
      return res.status(400).json({ message: 'User not found' });
    }

    // Log OTP and expiry before checking
    console.log('Stored OTP:', user.resetOTP);
    console.log('Stored OTP Expiry:', user.otpExpires);

    if (user.resetOTP !== otp) {
      console.log('Invalid OTP:', otp);
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    if (Date.now() > user.otpExpires) {
      console.log('OTP expired');
      return res.status(400).json({ message: 'OTP has expired' });
    }

    // If OTP is valid, hash the new password and save it
    user.password = newPassword; // will be hashed automatically by pre-save hook
    user.resetOTP = undefined; // Clear OTP after password reset
    user.otpExpires = undefined; // Clear OTP expiry after password reset

    // Log before saving to check all data is correct
    console.log('User before save:', user);

    await user.save(); // Save the user with the new password

    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ message: 'Failed to reset password', error });
  }
};





module.exports = {
  registerUser,
  loginUser,
  getMe,
  forgotPassword,
  verifyOTP,
  resetPassword,
};