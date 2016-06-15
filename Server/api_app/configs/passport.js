/**
 * Created by Tim Ho on 6/14/2016.
 */

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
// var User = mongoose.model('User');
var User = require('../models/User.js');


// Configure passport
passport.use(new LocalStrategy({
        usernameField: 'username'
    },
    function(username, password, done) {
        User.findOne({ username: username }, function (err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, {
                    message: 'Incorrect username.'
                });
            }
            if (!user.validPassword(password)) {
                return done(null, false, {
                    message: 'Incorrect password.'
                });
            }
            return done(null, user);
        });
    }
));
