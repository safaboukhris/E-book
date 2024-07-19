var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose')
const { authRoute } = require ("./routes/auth")
const cors = require ("cors")
const passport = require('passport')

var app = express();
/*  config passport */
app.use(passport.initialize())
require("./security/passport")(passport);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(cors())
mongoose
.connect(process.env.MONGO_URI)
.then(()=> console.log('DataBase connected succesfully'))
.catch((err)=> console.log(err))



app.use("/api", authRoute)
module.exports = app;
