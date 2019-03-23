var express = require('express');
var router = express.Router();
const {check, validationResult} = require('express-validator/check');

router.get('/',function(req, res, next) {
  res.send("users homepage");
});

router.get('/login',function(req, res, next) {
//  res.send("users login");
  res.render('login', {title: 'Login'});
});

router.post('/login',function(req, res, next) {
  res.send("username: " + req.body.username + " password: " + req.body.password);
});

router.get('/admin',function(req, res, next) {
  res.send("admin page");
});

router.get('/register',function(req, res, next) {
//  res.send("users register");
  res.render('register', {title: 'Register'});
});

router.post('/register',
  [check('name').isLength({min: 1}).withMessage('Name is required'),
  check('username').isLength({min: 1}).withMessage('Username is required')],
  function(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.render('register', {errors: errors.array()});
  } else {
    res.send("register ...");
  }
});

module.exports = router;
