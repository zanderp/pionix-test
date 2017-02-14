(function(appConfig) {

  'use strict';

  // *** main dependencies *** //
  const path = require('path');
  const cookieParser = require('cookie-parser');
  const bodyParser = require('body-parser');
  const session = require('express-session');
  const redis = require("redis");
  const redisStore = require('connect-redis')(session);
  const client = redis.createClient();
  const flash = require('connect-flash');
  const morgan = require('morgan');
  const nunjucks = require('nunjucks');
  const passport = require('passport');

  // *** view folders *** //
  const viewFolders = [
    path.join(__dirname, '..', 'views')
  ];

  // *** load environment variables *** //
  require('dotenv').config();

  appConfig.init = function(app, express) {

    // *** view engine *** //
    nunjucks.configure(viewFolders, {
      express: app,
      autoescape: true
    });
    app.set('view engine', 'html');

    // *** app middleware *** //
    if (process.env.NODE_ENV !== 'test') {
      app.use(morgan('dev'));
    }
    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    // redis session
    app.use(session({
      secret: 'verysecret',
      store: new redisStore({ host: 'localhost', port: 6379, client: client,ttl :  300 }),
      cookie:{maxAge:300000},
      saveUninitialized: false,
      resave: false
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(flash());
    app.use(express.static(path.join(__dirname, '..', '..', 'client')));

  };

})(module.exports);
