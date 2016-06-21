/**
 * Created by Tim Ho on 6/16/2016.
 */

var mongoose = require('mongoose');
var Profile = require('../models/Profile.js');
var CompanyContact = require('../models/CompanyContact.js');

// Util method
var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

// Create a new profile
module.exports.create = function (req, res) {
    var profile = new Profile();

    profile.title = req.body.title;
    profile.background = req.body.background;
    profile.industry = req.body.industry;
    profile.yearsOfExperience = req.body.yearsOfExperience;
    profile.userId = req.body.userId;

    profile.save(function(err) {
        if (err) {
            sendJSONresponse(res, 404, err);
        } else {
            sendJSONresponse(res, 200, {
                "status" : "created"
            });
        }
    });
    console.log('A new profile has been created');
};


// Update an existing profile
module.exports.update = function (req, res) {
    console.log('Updating a profile with id = ' + req.params.id);

    Profile.findByIdAndUpdate(req.params.id, req.body, function (err, profile) {
        if (err)
            return next(err);

        sendJSONresponse(res, 200,  {
            "status": "updated"
        });
    });

    console.log('The profile has been modified');
};


// Find an profile by id
module.exports.findById = function (req, res) {

    Profile.findById(req.params.id, function (err, profile) {
        if (err) return next(err);
        res.json(profile);
    });

    console.log('A profile has been found');
};


// CRUDs operations on Company Contact - Hiring Manager
// Create company contact
module.exports.create = function (req, res) {
    var companyContact = new CompanyContact();

    companyContact.name = req.body.name;
    companyContact.title = req.body.title;
    companyContact.address = req.body.address;
    companyContact.email = req.body.email;
    companyContact.phoneNumber = req.body.phoneNumber;
    companyContact.cellNumber = req.body.cellNumber;
    companyContact.type = req.body.type;

    companyContact.save(function(err) {
        if (err) {
            sendJSONresponse(res, 404, err);
        } else {
            sendJSONresponse(res, 200, {
                "status" : "created"
            });
        }
    });
    console.log('A new company contact has been created');
};

// Update an existing company contact
module.exports.update = function (req, res) {
    console.log('Updating a company contact with id = ' + req.params.id);

    CompanyContact.findByIdAndUpdate(req.params.id, req.body, function (err, companyContact) {
        if (err)
            return next(err);

        sendJSONresponse(res, 200,  {
            "status": "updated"
        });
    });

    console.log('The company contact has been updated');
};

