const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const User = require('../models/userModel');

module.exports = function(passport) {
  // Verify Google OAuth credentials exist
  if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
    console.log('Google OAuth credentials not provided, skipping OAuth setup');
    
    // Setup basic passport serialization without OAuth
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser(async (id, done) => {
      try {
        const user = await User.findById(id);
        done(null, user);
      } catch (err) {
        done(err, null);
      }
    });
    
    return;
  }
  
  // If we get here, credentials exist
  try {
    passport.use(
      new GoogleStrategy({
          clientID: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          callbackURL: '/api/users/google/callback'
        },
        async (accessToken, refreshToken, profile, done) => {
          try {
            const email = profile.emails[0].value;
            const existingUser = await User.findOne({ email });

            if (existingUser) return done(null, existingUser);

            const newUser = await User.create({
              name: profile.displayName,
              email: email,
              password: 'GOOGLE_OAUTH', // mark as OAuth user
            });

            done(null, newUser);
          } catch (err) {
            console.error('Error in Google OAuth strategy:', err);
            done(err, null);
          }
        }
      )
    );

    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser(async (id, done) => {
      try {
        const user = await User.findById(id);
        done(null, user);
      } catch (err) {
        done(err, null);
      }
    });
    
    console.log('Google OAuth strategy initialized successfully');
  } catch (err) {
    console.error('Failed to initialize Google OAuth strategy:', err);
  }
};