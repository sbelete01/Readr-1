// Express router for all authentication with passport

const router = require('express').Router();
const passport = require('passport');

// auth user to verify if user is logged in for client
router.get('/user', (req, res) => {
  if (req.user) {
    res.json({ user: req.user });
  } else {
    res.send({ user: null });
  }
});

// auth logout
router.get('/logout', (req, res) => {
  // handle with passport
  req.logout();
  // res.send('logging out');
  res.redirect('/');
});

// auth with google
router.get('/google', passport.authenticate('google', {
  // Sends user to consent screen
  scope: ['profile', 'email'],
}));

// callback route for google to redirect to
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  // access current user through req.user
  // redirect to post login page
  res.redirect('/');
  // res.send('you reached the callback URI');
});

module.exports = router;
