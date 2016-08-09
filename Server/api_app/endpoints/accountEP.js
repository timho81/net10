/**
 * Created by Tim Ho on 6/14/2016.
 */

var passport = require('passport');
var mongoose = require('mongoose');
var User = require('../models/User.js');
var utils = require('../utils/utils.js');

// User AuthC
module.exports.login = function (req, res) {
    console.log('Authenticating an account...');

    if(!req.body.email || !req.body.password) {
        utils.sendJSONresponse(res, 400, {
            "message": "All fields required"
        });
        return;
    }

    passport.authenticate('local', function(err, user, info){
        var token;
        if (err) {
            utils.sendJSONresponse(res, 404, err);
            return;
        }
        if(user){
            token = user.generateJwt();
            utils.sendJSONresponse(res, 200, {
                "userId" : user._id,
                "token" : token
            });
        } else {
            utils.sendJSONresponse(res, 401, info);
        }
    })(req, res);

};

// Set up a new account
module.exports.create = function (req, res) {
    // Data validation
    console.log('Validating user entries...');
    if(!req.body.email || !req.body.password) {
        utils.sendJSONresponse(res, 400, {
        "message": "Required fields can not be left blank"
      });
      return;
    } else if (req.body.password.length < 6){ // Validate pwd complexity
        utils.sendJSONresponse(res, 400, {
            "message": "Password must be at least 6 characters"
        });
        return;
    }

    // The checking logic prevents user creation with email duplication from occurring
    // When there are no matches find() returns []
    User.find().and({email: req.body.email.toLowerCase()})
        .exec(function(err, users) {
        if (err) throw err;

        if (!users.length) {
            console.log('Non-existent');
            // Set up a new account whose username/email have not existed in the app

            console.log('Creating a new account...');
            var user = new User();

            user.firstName = req.body.firstName;
            user.lastName = req.body.lastName;
            user.email = req.body.email.toLowerCase();
            user.authority = req.body.authority;
            user.phone = req.body.phone;
            user.companyName = req.body.companyName;
            user.website = req.body.website;
            user.streetAddress = req.body.streetAddress;
            user.streetAddress2 = req.body.streetAddress2;
            user.zipCode = req.body.zipCode;

            user.setPassword(req.body.password);

            user.save(function(err) {
                var token;
                if (err) {
                    utils.sendJSONresponse(res, 404, err);
                } else {
                    token = user.generateJwt();
                    utils.sendJSONresponse(res, 200, {
                        "userId" : user.id,
                        "token" : token
                    });
                }
            });
            console.log('A new account has been created');

        } else {
            console.log('An account with this username or email has already existed, please retry with other inputs');
            utils.sendJSONresponse(res, 500, {
                "message" : "username or email has already existed, please retry!"
            });

        }

    }); // end of User.find()
}; // end of method

// Modify an existing account, all fields are modifiable except for username (non-editable once created),
// password (belongs to other use cases, change/reset pwd)
module.exports.update = function (req, res) {

    console.log('Updating an account with id = ' + req.params.id);
    // Update all user fields except for password
    User.findByIdAndUpdate(req.params.id, req.body, function (err, user) {
        if (err) {
            sendJSONresponse(res, 500, err);
        }
        utils.sendJSONresponse(res, 200, {
            "status" : "updated"
        });
    });
    console.log('This account has been updated');
};

// Change account 's password
module.exports.changePassword = function (req, res) {

    console.log('Changing password for the account with id = ' + req.params.id);

    // Find user by id
    User.findById(req.params.id, function (err, user) {
        user.setPassword(req.body.newPassword);

        user.save(function(err) {
            if (err) {
                utils.sendJSONresponse(res, 500, err);
            } else {
                console.log('Password has been changed');
                utils.sendJSONresponse(res, 200, {
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
module.exports.findByEmail = function (req, res) {
    var email = req.params.email.toLowerCase();
    User.findOne({ email: email }, function (err, user) {
        if (err) {
            utils.sendJSONresponse(res, 500,  {
                "error_message": "An internal server error occurred"
            });
        }
        if (!user) {
            console.log('The account with email = ' + email + ' can not be found');
            utils.sendJSONresponse(res, 404,  {
                "message": "Account not found"
            });
        } else {
            console.log('The account with email = ' + email + ' has been found');
            utils.sendJSONresponse(res, 200, user);
        }

    });
};


