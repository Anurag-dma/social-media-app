const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

// tell passport to use a new strategy for google login
passport.use(
  new googleStrategy(
    {
      clientID: '00859443416670-ftm5ojpand40llcj045lb6bg1ngr0iio.apps.googleusercontent.com',
      clientSecret: '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N4',
      callbackURL: 'http://localhost:8000/users/auth/google/callback',
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        // find a user
        const user = await User.findOne({ email: profile.emails[0].value }).exec();
        console.log(accessToken, refreshToken);
        console.log(profile);

        if (user) {
          // if found, set this user as req.user
          return done(null, user);
        } else {
          // if not found, create the user and set it as req.user
          const newUser = await User.create({
            name: profile.displayName,
            email: profile.emails[0].value,
            password: crypto.randomBytes(20).toString('hex'),
          });
          return done(null, newUser);
        }
      } catch (err) {
        console.log('error in google strategy-passport', err);
        return done(err, null);
      }
    }
  )
);

module.exports = passport;
