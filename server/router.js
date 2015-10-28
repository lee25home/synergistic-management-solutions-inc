module.exports = function(router, passport) {
  //
  router.get('/signin', function(req, res) {
    //TODO add render page
    res.render("Hell World", {
      message: req.flash('lognInMessage')
    });
  });

  // router.get('/signin',
  //   passport.authenticate('basic', { session: false }),
  //   function(req, res) {
  //     res.json({username: req.user.username, password: req.user.password});
  //   });

  router.post('/signin', passport.authenticate('local-login', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
  }));


  // app.post('/signin', function LocalAuthentication(req, res, next) {
  //
  //     passport.authenticate('local-login', function(err, user, info) {
  //         if (err) return next(err);
  //         if (!user) {
  //             return res.json(403, {
  //                 message: req.flash('No User')
  //             });
  //         }
  //       req.login(user, function(err) {
  //             if (err) return next(err);
  //             return res.json({
  //                 message: 'user authenticated',
  //             });
  //         });
  //
  //     })(req, res, next);
  // };







  router.get('/signup', function(req, res) {
    //TODO add render page
    res.render("Hell World", {
      message: req.flash('signUpMessage')
    });
  });

  router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/', //redirect home page
    failureRedirect: '/signup',
    failureFlash: true
  }));

  router.get('/facebook', passport.authenticate('facebook', {
    scope: ['email']
  }));

  router.get('/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/profile',
    failureRedirect: '/'
  }));

  router.get('/logout', function(req, res) {
    req.logout();
    //passport
    res.redirect('/');
  });

};
