var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// Need to go before models
var passport = require('passport');

var routes = require('./routes/index');
var users = require('./routes/users');

// Endpoint API routes go here
var accountApiRoutes = require('./api_app/routes/accounts');
// var profileApiRoutes = require('./api_app/routes/profiles');

// API routes for Web components access go here
// var accountServerRoutes = require('./server_app/routes/accounts');
// var profileServerRoutes = require('./server_app/routes/profiles');

require('./api_app/configs/passport');

var app = express();

// Constants
var apiVersion = '/v1';
var db_connection_uri = 'mongodb://localhost/net10';

// Connect ExpressJS to MongoDB
var mongoose = require('mongoose');
mongoose.connect(db_connection_uri, function(err) {
  if(err) {
    console.log('connection error', err);
  } else {
    console.log('connection successful');
  }
});

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

// Must go after static routes and before API routes
app.use(passport.initialize());

app.use('/', routes);
app.use('/users', users);

app.use('/api' + apiVersion + '/accounts', accountApiRoutes);


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