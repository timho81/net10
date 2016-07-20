/**
 * Created by Tim Ho on 7/5/2016.
 */


var mongoose = require('mongoose');
var OfferPackage = require('../models/OfferPackage.js');
var emails = require('../utils/emails.js');
var utils = require('../utils/utils.js');

// customized by a company
module.exports.create = function (req, res) {
    OfferPackage.create(req.body, function (err, post) {
        if (err) {
            sendJSONresponse(res, 404, err);
            return next(err);
        }
        utils.sendJSONresponse(res, 200, {
            "status" : "created"
        });
    });
    console.log('A new offer package has been created');
};

// Send Offer Letter with Offer Package, via email, to candidate to invite him to employment, sent out ONCE only
module.exports.sendOfferLetter = function (req, res) {
    console.log('Sending the offer letter and offer package to candidate...');

    // Add offer packages as attachments

    var subject = 'Offer Letter';
    // Candidate 's email
    var recipient = req.body.email;
    var content = 'Dear Applicant,<br>' +
        'We would like to inform that you have been selected for the position you apply to. ' +
        'You can find the Offer Package from attachments herein. Please contact us for your questions.<br><br>' +
        'Best Regards,<br><br>' +
        'Recruitment Team';
    emails.doSend(recipient, subject, content);
};


