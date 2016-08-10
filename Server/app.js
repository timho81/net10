// Load .env file with environment variables

// Dev env
// require('dotenv').load();

// Prod env
var dotEnv = require('dotenv');
dotEnv.config({path: '/Server/.env'});


var express = require('express');
var path = require('path');
var config = require('./config');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var database = require('./api_app/configs/database');
// Need to go before models
var passport = require('passport');

var routes = require('./routes/index');
var users = require('./routes/users');

var indexRoute = require('./api_app/routes/index');

// Endpoint API routes go here
var accountApiRoutes = require('./api_app/routes/accounts');
var profileApiRoutes = require('./api_app/routes/profiles');
var candidateApiRoutes = require('./api_app/routes/candidates');
var jobReqRoutes = require('./api_app/routes/jobReqs');
var interviewRoutes = require('./api_app/routes/interviews');
var offerRoutes = require('./api_app/routes/offers');
// var messageRoutes = require('./api_app/routes/messages');

// API routes finterviewor Web components access go here
// var accountServerRoutes = require('./server_app/routes/accounts');
// var profileServerRoutes = require('./server_app/routes/profiles');

require('./api_app/configs/passport');

var app = express();

// Connect ExpressJS to MongoDB
database.makeDBConnection();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(path.join(__dirname, 'web_app')));

// Must go after static routes and before API routes
app.use(passport.initialize());

app.use('/', routes);
app.use('/users', users);

app.use('/index', indexRoute);

var apiVersion = config.get('API_VERSION');
app.use('/api' + apiVersion + '/accounts' , accountApiRoutes);
app.use('/api' + apiVersion + '/profiles' , profileApiRoutes);
app.use('/api' + apiVersion + '/candidates' , candidateApiRoutes);
app.use('/api' + apiVersion + '/jobReqs' , jobReqRoutes);
app.use('/api' + apiVersion + '/interviews' , interviewRoutes);
app.use('/api' + apiVersion + '/offers' , offerRoutes);
// app.use('/api' + apiVersion + '/messages' , messageRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {

  // Return error info when an unauthenticated request tries to access
  // protected resources
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({"message" : err.name + ": " + err.message});
  }


  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;

