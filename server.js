var express = require("express");
var path = require("path");

var usersRouter = require('./routes/users');
var indexRouter = require('./routes/index');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname,'public')));
app.use('/users',usersRouter);
app.use('/',indexRouter);
// app.get('/',(req,res)=>res.send('Hello World!'));


app.listen(5005,()=>console.log('Example app listening on port 5005!'));
