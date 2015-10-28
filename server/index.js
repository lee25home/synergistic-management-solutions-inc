var browserify = require('browserify-middleware')
var express = require('express')
var Path = require('path')
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');
var MongoStore = require('connect-mongo')(session);
var mongoose = require('./database/config');
var Helpers = require('./request_handler');

var app = express()
  // var routes = express.Router()
  //
  // //redo once we have some public stuffs
  // routes.get('/app-bundle.js',
  //   // Tell browserify to user reactify as it's JSX compiler
  //   browserify('./client/app.js', {
  //     transform: [require('reactify')]
  //   }))
  //
  // //redo once we have some public stuffs
  // routes.get('/api/tags-example', function(req, res) {
  //   res.send(['node', 'express', 'browserify'])
  // })

//Here are all my endpoints! See the README for details
//on what kind of data is expected/being returned
// routes.get('/users', Helpers.getUsers);
// routes.get('/users/*', Helpers.getProfile);
// routes.post('/signup', Helpers.signUp);
// routes.post('/signin', Helpers.signIn);
// routes.post('/users/*', Helpers.submitProfile);

var assetFolder = Path.resolve(__dirname, '../client/public')
  // routes.use(express.static(assetFolder))

if (process.env.NODE_ENV !== 'test') {
  app.use(require('body-parser').json())
  app.use(require('body-parser').urlencoded({
    extended: true
  }));

  // routes.get('/*', function(req, res) {
  //   res.sendFile(assetFolder + '/index.html')
  // })

  //middleware - executes on any client and server interaction trade
  //marks the request and time on console
  app.use(morgan('dev'));

  app.use(cookieParser());
  //parse our cookie

  app.use(session({
    secret: 'Jang',
    saveUninitialized: true,
    resave: true,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 1 * 24 * 60 * 60
    })
  }));
  //saveUninitialized saves session to database for persistence log in
  //if set to true - it will save
  // resave -  if nothing is changed - save it again

  app.use(passport.initialize());
  app.use(passport.session());

  app.use(flash());

  var auth = express.Router();
  require('./router.js')(auth, passport);

  auth.get('/app-bundle.js',
    // Tell browserify to user reactify as it's JSX compiler
    browserify('./client/app.js', {
      transform: [require('reactify')]
    }));

  auth.get('/api/tags-example', function(req, res) {
    res.send(['node', 'express', 'browserify']);
  });

  auth.use(express.static(assetFolder))

  app.use('/auth', auth)

  var secure = express.Router();
  require('./secure.js')(secure, passport);
  app.use('/', secure);

  // Start the server!
  var port = process.env.PORT || 4000
  app.listen(port)
  console.log("Listening on port", port)
} else {

  module.exports = routes
}
