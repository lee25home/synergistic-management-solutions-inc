var User = require('./database/models/user.js');

module.exports = function(app, passport) {

  app.get('/signin', function(req, res) {
    //TODO add render page
    res.render("Hell World", {
      message: req.flash('lognInMessage')
    });
  });

  app.post('/signin', passport.authenticate('local-login', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
  }));

  app.get('/signup', function(req, res) {
    //TODO add render page
    res.render("Hell World", {
      message: req.flash('signUpMessage')
    });
  });

  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/', //redirect home page
    failureRedirect: '/signup',
    failureFlash: true
  }));

  app.get('/users', isLoggedIn, function(req, res) {
    //TODO add profile page
    res.render("Hell World", {
      user: req.user
    });
  });

  app.get('/users/*', isLoggedIn, function(req, res) {
    //TODO add profile page
    res.render("Hell World", {
      user: req.user
    });
  });

  app.post('/users/*', passport.authenticate('local-login', {
    successRedirect: '/', //redirect home page
    failureRedirect: '/signup',
    failureFlash: true
  }));

  app.get('/auth/facebook', passport.authenticate('facebook', {
    scope: ['email']
  }));

  app.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/profile',
    failureRedirect: '/'
  }));

  app.get('/logout', function(req, res) {
    req.logout();
    //passport
    res.redirect('/');
  });

};

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/signin');
}
