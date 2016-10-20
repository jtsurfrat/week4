
var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var mongoose = require('passport');
var passport = require('passport');
var flash = require('connect-flash');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var configDB = require('./config/database.js');

//config
mongoose.connect(configDB.url); // connects to database

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser());
app.use(bodyParser());

app.use(session({sercet: "Ilovebacon"}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./app/routes.js')(app, passport);

app.listen(port);
console.log('The magic happens on port ' + port);



























//stuff
