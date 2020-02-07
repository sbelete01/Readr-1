// Setup for passport google authentication

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
require('dotenv').config();
const { User } = require('../sequelize/index');
const dbHelpers = require('../sequelize/db-helpers');

// get information from user to create cookie to send to browser
passport.serializeUser((user, next) => {
  next(null, user.googleId); // possibly change to user.id
});

// take id from stored cookie sent from browser and find user
passport.deserializeUser((id, next) => {
  User.findOne({
    where: {
      googleId: id,
    },
  })
    .then((user) => {
      next(null, user);
    });
});

passport.use(
  new GoogleStrategy({
    callbackURL: '/auth/google/redirect',
    clientID: process.env.clientID,
    clientSecret: process.env.clientSecret,
  }, (accessToken, refreshToken, profile, next) => {
    // check if user already exists in DB
    // find user with matching googleId and profile.id
    User.findOne({
      where: {
        googleId: profile.id,
      },
    })
      .then((currentUser) => {
        if (currentUser) {
          // if user exists
          next(null, currentUser);
        } else {
          // if user doesn't exist
          // use profile.id & profile.displayName for saving in db
          // create new sequelize User given ^
          User.create({
            username: profile.displayName,
            googleId: profile.id,
          })
            .then((newUser) => {
              dbHelpers.createPreferences(newUser.dataValues.id);
              next(null, newUser);
            });
        }
      });
  }),
);
