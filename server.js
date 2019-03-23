'use strict';
const express = require("express");
const path = require("path");
const mongoose = require('mongoose');

var usersRouter = require('./routes/users');
var indexRouter = require('./routes/index');

mongoose.connect('mongodb://mongodb/virtualhelper', {useNewUrlParser: true});
let db = mongoose.connection;
db.on('error',function(err) {
  console.log(err);
});
db.once('open',()=>{console.log('connect to mongodb successfully')});

const app = express();
var bodyparser = require('body-parser');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,'public')));
app.use('/users',usersRouter);
app.use('/',indexRouter);
// app.get('/',(req,res)=>res.send('Hello World!'));


app.listen(5005,()=>console.log('Example app listening on port 5005!'));
