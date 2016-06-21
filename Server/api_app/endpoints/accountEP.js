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


// User AuthC
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

// Set up a new account
module.exports.setup = function (req, res) {
    // Data validation
    console.log('Validating user entries...');
    if(!req.body.username || !req.body.email || !req.body.password) {
      sendJSONresponse(res, 400, {
        "message": "Required fields can not be left blank"
      });
      return;
    } else if (req.body.password.length < 6){ // Validate pwd complexity
        sendJSONresponse(res, 400, {
            "message": "Password must be at least 6 characters"
        });
        return;
    }

    // When there are no matches find() returns []
    User.find().and({$or : [{username:req.body.username}, {email: req.body.email}]})
        .exec(function(err, users) {
        if (err) throw err;

        if (!users.length) {
            console.log('Non-existent');
            // Set up a new account whose username/email have not existed in the app

            console.log('Setting up a new account...');
            var user = new User();

            user.username = req.body.username;
            user.setPassword(req.body.password);
            user.cell = req.body.cell;
            user.workPhone = req.body.workPhone;
            user.homePhone = req.body.homePhone;

            user.email = req.body.email;
            user.firstName = req.body.firstName;
            user.lastName = req.body.lastName;
            user.address = req.body.address;
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
            console.log('A new account has been set up');

        } else {
            console.log('An account with this username or email has already existed, please retry with other inputs');
            sendJSONresponse(res, 500, {
                "message" : "username or email has already existed, please retry!"
            });

        }

    }); // end of User.find()
}; // end of method

// Modify an existing account, all fields are modifiable except for username (non-editable once created),
// password (belongs to other use cases, change/reset pwd)
module.exports.modify = function (req, res) {

    console.log('Modifying an account with id = ' + req.params.id);

    // Find user by id
    User.findById(req.params.id, function (err, user) {
        user.email = req.body.email;
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.cell = req.body.cell;
        user.workPhone = req.body.workPhone;
        user.homePhone = req.body.homePhone;
        user.address = req.body.address;
        user.authorities = req.body.authorities;

        user.save(function(err) {
            if (err) {
                sendJSONresponse(res, 500, err);
            } else {
                console.log('The account has been modified');
                sendJSONresponse(res, 200, {
                    "status" : "updated"
                });
            }
        });
    });
};

// Change account 's password
module.exports.changePassword = function (req, res) {

    console.log('Changing password for the account with id = ' + req.params.id);

    // Find user by id
    User.findById(req.params.id, function (err, user) {
        user.setPassword(req.body.newPassword);

        user.save(function(err) {
            if (err) {
                sendJSONresponse(res, 500, err);
            } else {
                console.log('Password has been changed');
                sendJSONresponse(res, 200, {
                    "status" : "changed"
                });
            }
        });
    });
};


// Finder methods
// Find accounts by query criteria


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
    var username = req.params.username;
    User.findOne({ username: username }, function (err, user) {
        if (err) {
            sendJSONresponse(res, 500,  {
                "error_message": "An internal server error occurred"
            });
        }
        if (!user) {
            console.log('The account with username = ' + username + ' can not be found');
            sendJSONresponse(res, 404,  {
                "message": "Account not found"
            });
        } else {
            console.log('The account with username = ' + username + ' has been found');
            sendJSONresponse(res, 200, user);
        }

    });
};


