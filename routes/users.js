var express = require('express');
var router = express.Router();

router.get('/',function(req, res, next) {
  res.send("users homepage");
});

router.get('/login',function(req, res, next) {
  res.send("users login");
});

router.get('/admin',function(req, res, next) {
  res.send("admin page");
});

router.get('/register',function(req, res, next) {
  res.send("users register");
});
module.exports = router;
