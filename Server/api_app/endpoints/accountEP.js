/**
 * Created by Tim Ho on 6/14/2016.
 */

var passport = require('passport');
var mongoose = require('mongoose');
var User = require('../models/User.js');

// Util method
var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};


// User AuthenC
module.exports.login = function (req, res) {
    console.log('Authenticating an account...');

    if(!req.body.username || !req.body.password) {
        sendJSONresponse(res, 400, {
            "message": "All fields required"
        });
        return;
    }
    passport.authenticate('local', function(err, user, info){
        var token;
        if (err) {
            sendJSONresponse(res, 404, err);
            return;
        }
        if(user){
            token = user.generateJwt();
            sendJSONresponse(res, 200, {
                "token" : token
            });
        } else {
            sendJSONresponse(res, 401, info);
        }
    })(req, res);

};

// Create a new account
module.exports.create = function (req, res) {
    // Data validation
    console.log('Validating user entries...');
    if(!req.body.username || !req.body.email || !req.body.password) {
      sendJSONresponse(res, 400, {
        "message": "Required fields can not be left blank"
      });
      return;
    }

    console.log('Creating a new account...');
    var user = new User();

    user.username = req.body.username;
    user.setPassword(req.body.password);
    user.email = req.body.email;
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.authorities = req.body.authorities;

    user.save(function(err) {
        var token;
        if (err) {
            sendJSONresponse(res, 404, err);
        } else {
            token = user.generateJwt();
            sendJSONresponse(res, 200, {
                "token" : token
            });
        }
    });
    console.log('A new account has been created');
};

// Modify an existing account
module.exports.modify = function (req, res) {

    console.log('Modifying an account with id = ' + req.params.id);

    User.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err)
            return next(err);

        sendJSONresponse(res, 200,  {
            "status": "updated"
        });
    });

    console.log('The account has been modified');
};

// Find an account by id
module.exports.findById = function (req, res) {

    User.findById(req.params.id, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });

    console.log('An account has been found');
};

// Find an account by username
module.exports.findByUsername = function (req, res) {

    console.log('An account has been found by username');
};


