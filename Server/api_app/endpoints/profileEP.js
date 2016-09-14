/**
 * Created by Tim Ho on 6/16/2016.
 *
 * The endpoint handles client requests to Profile service
 */



var mongoose = require('mongoose');
var Profile = require('../models/Profile.js');
var CompanyContact = require('../models/CompanyContact.js');
var utils = require('../utils/utils.js');

module.exports = {
    create: create,
    update: update,
    findById: findById,
    createContact: createContact,
    updateContact: updateContact
};

// Create a new profile
function create(req, res) {

    var profile = new Profile();

    profile.title = req.body.title;
    profile.background = req.body.background;
    profile.industry = req.body.industry;
    profile.yearsOfExperience = req.body.yearsOfExperience;
    profile.summary = req.body.summary;
    profile.candidateId = req.params.candidateId;

    profile.save(function(err) {
        if (err) {
            utils.sendJSONresponse(res, 404, err);
        } else {
            utils.sendJSONresponse(res, 200, {
                "status" : "created"
            });
        }
    });
    console.log('A new profile has been created');
}

// Update an existing profile
function update(req, res) {
    console.log('Updating a profile with id = ' + req.params.id);

    Profile.findByIdAndUpdate(req.params.id, req.body, function (err, profile) {
        if (err) {
            utils.sendJSONresponse(res, 404, err);
            return next(err);
        }

        utils.sendJSONresponse(res, 200,  {
            "status": "updated"
        });
    });

    console.log('The profile has been modified');
}

// Find an profile by id
function findById(req, res) {

    Profile.findById(req.params.id, function (err, profile) {
        if (err) return next(err);
        res.json(profile);
    });

    console.log('A profile has been found');
}


// Update Settings
// module.exports.updateSettings = function (req, res) {

    // Unimplemented
// }


// CRUDs operations on Company Contact - Hiring Manager
// Create company contact
function createContact(req, res) {
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
            utils.sendJSONresponse(res, 404, err);
        } else {
            utils.sendJSONresponse(res, 200, {
                "status" : "created"
            });
        }
    });
    console.log('A new company contact has been created');
}

// Update an existing company contact
function updateContact(req, res) {
    console.log('Updating a company contact with id = ' + req.params.companyContactId);

    CompanyContact.findByIdAndUpdate(req.params.companyContactId, req.body, function (err, companyContact) {
        if (err)
            return next(err);

        utils.sendJSONresponse(res, 200,  {
            "status": "updated"
        });
    });

    console.log('The company contact has been updated');
}


