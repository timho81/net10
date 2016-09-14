/**
 * Created by Tim Ho on 6/14/2016.
 *
 * Logics to compare user-provided credentials against what exists in database,
 * if equal, then authentication succeeds, the user can log in to the app,
 * otherwise, authc fails, the user is blocked from proceeding
 */

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
// var User = mongoose.model('User');
var User = require('../models/User.js');


// Configure passport
passport.use(new LocalStrategy({
        usernameField: 'email'
    },
    function(email, password, done) {

        User.findOne({ email: email.toLowerCase() }, function (err, user) {
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
