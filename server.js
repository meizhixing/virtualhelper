var express = require("express");

var usersRouter = require('./routes/users');
var indexRouter = require('./routes/index');
const app = express();

app.use('/users',usersRouter);
app.use('/',indexRouter);
// app.get('/',(req,res)=>res.send('Hello World!'));


app.listen(5005,()=>console.log('Example app listening on port 5005!'));
