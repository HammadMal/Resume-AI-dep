const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const User = require('../models/userModel');

module.exports = function(passport) {
  passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/api/users/google/callback'
      },
      async (accessToken, refreshToken, profile, done) => {
        const email = profile.emails[0].value;
        const existingUser = await User.findOne({ email });

        if (existingUser) return done(null, existingUser);

        const newUser = await User.create({
          name: profile.displayName,
          email: email,
          password: 'GOOGLE_OAUTH', // mark as OAuth user
        });

        done(null, newUser);
      }
    )
  );

  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id); // ✅ now using async/await
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });
  
};
