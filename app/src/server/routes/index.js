const express = require('express');
const router = express.Router();

const authHelpers = require('../auth/_helpers');
const passport = require('../auth/local');

const indexController = require('../controllers/index');

router.get('/', function (req, res, next) {
  const renderObject = {};
  renderObject.title = 'Welcome to Express!';
  indexController.sum(1, 2, (error, results) => {
    if (error) return next(error);
    if (results) {
      renderObject.sum = results;
      res.render('index', renderObject);
    }
  });
});
router.get('/login', function (req, res, next) {
  res.render('login');
});
router.get('/register', function(req, res, next){
  res.render('register');
});
router.get('/dashboard', authHelpers.loginRequired, function(req, res, next){
  res.render('dashboard');
});
router.get('/profile', authHelpers.loginRequired, function(req, res, next){
  res.render('profile',{
            user : req.user // get the user out of session and pass to template
        });
});

module.exports = router;
