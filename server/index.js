const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config();

const passport = require('passport');
require('../config/passport-setup');

const cookieSession = require('cookie-session');
const authRoutes = require('./auth-routes');
const readrRoutes = require('./readr-routes');

const PORT = process.env.PORT || 8080;
const app = express();

// initialize cookie session
app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000, // 1 day in ms
  keys: [process.env.cookieKey || 'cookieKey'],
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/readr', readrRoutes);

app.listen(PORT, () => {
  console.log(`Listening on port :${PORT}!`);
});
