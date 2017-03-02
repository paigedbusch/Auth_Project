const express = require('express');
const session = require('express-session');
const passport = require('passport');
const GitHubStrategy = require('passport-github2');
const Auth0Strategy = require('passport-auth0');
const request = require('request');
const config = require('./config');

const app = express();

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('./public'));

passport.use(new GitHubStrategy({
    clientID: config.clientID,
    clientSecret: config.clientSecret,
    callbackURL: "http://localhost:3000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({ githubId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));

var requireAuth = function(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.status(403).end();
  }
  return next();
}

app.get('/auth/github', passport.authenticate('auth0'));

app.get('/auth/github/callback',
  passport.authenticate('auth0', {successRedirect: '/#/home'}), function(req, res) {
    res.status(200).send(req.user);
});

app.get('https://api.github.com/user/followers').auth('username', 'password', false);

app.listen(3000, function() {
  console.log('Connected on 3000')
});