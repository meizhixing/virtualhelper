const express = require('express');
const passport = require('passport');
const router = express.Router();
const {check, validationResult} = require('express-validator/check');
let User = require('../models/user');

router.get('/',function(req, res, next) {
  res.send("users homepage");
});

router.get('/login',function(req, res, next) {
//  res.send("users login");
  res.render('login', {title: 'Login'});
});

router.post('/login',
  passport.authenticate('local', {failureRedirect: '/users/login'}), 
  function(req, res) {
    res.redirect('/');
  }
);

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
  function(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  } else {
    // res.send("register ...");
    // res.redirect('login');
    // res.send("username: " + req.body.username + " password: " + req.body.password);
    // res.send(req.body)
    let user = new User(req.body);
    // res.send("name: "+user.name+" email: "+user.email+" username: "+user.username + " password: "+user.password);
    user.save(function(err) {
      if (err) {
        console.log(err);
      } else {
        // res.end("success")
        res.redirect('login');
      }
    });
  }
});

module.exports = router;
