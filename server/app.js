var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose')
const { authRoute } = require ("./routes/auth")
const { booksRoute } = require("./routes/book")
const { contactRoute } = require ("./routes/contact")
const {favoritesRouter} = require ('./routes/favorite')
const { imageRouter} = require('./routes/upload')
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
app.use('/file', express.static(path.join(__dirname, 'public', 'files')));
app.use("/uploads",express.static(__dirname + "/uploads"))

app.use(cors())
mongoose
.connect(process.env.MONGO_URI)
.then(()=> console.log('DataBase connected succesfully'))
.catch((err)=> console.log(err))



app.use("/api", [authRoute,  booksRoute])
app.use("/api",contactRoute)
app.use("/api", favoritesRouter)
app.use("/img", imageRouter)

module.exports = app;


