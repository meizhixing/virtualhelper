'use strict';
const express = require("express");
const path = require("path");
const mongoose = require('mongoose');
const passport = require('passport');
const Strategy = require('passport-local').Strategy
const session = require('express-session');
const bodyparser = require('body-parser');

var usersRouter = require('./routes/users');
var indexRouter = require('./routes/index');
var datumusers = require('./datum/users')

mongoose.connect('mongodb://mongodb/virtualhelper', {useNewUrlParser: true});
let db = mongoose.connection;
db.on('error',function(err) {
  console.log(err);
});
db.once('open',()=>{console.log('connect to mongodb successfully')});

passport.use(new Strategy(function(username, password, cb) {
  datumusers.findByUsername(username, function(err, user){
    if (err) {return cb(err);}
    if (!user) {return cb(null, false);}
    if (user.password != password) {return cb(null, false);}
    return cb(null, user);
  });
}));

passport.serializeUser(function(user, cb){
  cb(null, user.id);
});
passport.deserializeUser(function(id, cb){
  datumusers.findById(id,function(err, user){
    if(err) {return cb(err);};
    cb(null,user);
  });
});

const app = express();
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,'public')));
app.use(passport.initialize());
app.use(passport.session());

app.use('/users',usersRouter);
app.use('/',indexRouter);
// app.get('/',(req,res)=>res.send('Hello World!'));


app.listen(5005,()=>console.log('Example app listening on port 5005!'));
