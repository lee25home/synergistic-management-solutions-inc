module.exports = function(router, passport){
  router.use(function(req,res, next){
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/auth');
  });

  router.get('/users', function(req, res) {
    //TODO add profile page
    res.render("Hell World", {
      user: req.user
    });
  });

  router.get('/users/*', function(req, res) {
    //TODO add profile page
    res.render("Hell World", {
      user: req.user
    });
  });

  router.get('/*', function(req, res){
  		res.redirect('/profile');
  	})

}
