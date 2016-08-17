/**
 * Created by Tim Ho on 7/5/2016.
 */


var mongoose = require('mongoose');
var Offer = require('../models/Offer.js');
var OfferPackage = require('../models/OfferPackage.js');
var Candidate = require('../models/Candidate.js')
var emails = require('../utils/emails.js');
var utils = require('../utils/utils.js');

module.exports = {
    update: update,
    createOfferPackage: createOfferPackage,
    passCandidate: passCandidate,
    extendOffer: extendOffer,
    addOfferDocument: addOfferDocument,
    updateOfferDocument: updateOfferDocument,
    deleteOfferDocument: deleteOfferDocument,
    rescindOffer: rescindOffer,
    respondOffer: respondOffer,
    findOffersByCandidate: findOffersByCandidate,
    findOffersByManager: findOffersByManager
};

function update(req, res) {
    Offer.findByIdAndUpdate(req.params.offerId, req.body, function (err, offer) {
        if (err)
            sendJSONresponse(res, 500, err);

        utils.sendJSONresponse(res, 200,  {
            "status": "updated"
        });
    });
    console.log('This offer has been updated');
}

// Create a new offer package for a candidate
function createOfferPackage(req, res) {

    Offer.create(req.body, function (err, offer) {
        if (err) {
            sendJSONresponse(res, 500, err);
        }

        var offerPackage = new OfferPackage();
        offerPackage.offerId = offer._id;

        offerPackage.save(function(err) {
            if (err) {
                utils.sendJSONresponse(res, 500, err);
            } else {
                utils.sendJSONresponse(res, 200, {
                    "status" : "created",
                    "offerId" : offer._id
                });
            }
        });
    });
    console.log('A new offer has been created');
}

// Pass Candidate
function passCandidate(req, res) {

    console.log('Ignored the candidate');

    // Set Candidate.passedOn = true?

}

// Offer Candidate use case - send Offer Letter with Offer Package, via email, to candidate to invite him to employment, sent out ONCE only
function extendOffer(req, res) {

    Offer.findById(req.params.offerId, function (err, offer) {
        offer.state = 'EXTENDED';

        offer.save(function(err) {
            if (err) {
                utils.sendJSONresponse(res, 500, err);
            } else {
                utils.sendJSONresponse(res, 200, {
                    "status" : "extended"
                });
                console.log('The offer has been extended');
            }
        });

        OfferPackage.findOne().where('offerId').equals(offer._id).exec(function(err, offerPackage) {
            offerPackage.sentOut = true;
            offerPackage.save(function(err) {
                if (err)
                    utils.sendJSONresponse(res, 500, err);
            });
        });

        Candidate.findById(offer.candidateId, function (err, candidate) {
            // Add offer package documents as attachments

            console.log('Sending the offer letter and offer package to candidate...');
            var subject = 'Offer Letter';
            // Candidate 's email
            var recipient = candidate.email;
            var content = 'Dear Applicant,<br>' +
                'We would like to inform that you have been selected for the position for which you apply. ' +
                'You can find the Offer Package from attachments herein. Please contact us for your questions.<br><br>' +
                'Best Regards,<br><br>' +
                'Recruitment Team';
            emails.doSend(res, recipient, subject, content);

        });
    });
}

function addOfferDocument(req, res) {
    OfferPackage.findOne().where('offerId').equals(req.params.offerId).exec(function(err, offerPackage) {
        offerPackage.documentName = req.body.documentName;
        offerPackage.documentType = req.body.documentType;

        offerPackage.save(function(err) {
            if (err) {
                utils.sendJSONresponse(res, 500, err);
            } else {
                utils.sendJSONresponse(res, 200, {
                    "status" : "added"
                });
            }
        });
    });
    console.log('The document has been added to this offer');
}

function updateOfferDocument(req, res) {
    OfferPackage.findOne().where('offerId').equals(req.params.offerId).exec(function(err, offerPackage) {
        offerPackage.documentName = req.body.documentName;
        offerPackage.documentType = req.body.documentType;

        offerPackage.save(function(err) {
            if (err) {
                utils.sendJSONresponse(res, 500, err);
            } else {
                utils.sendJSONresponse(res, 200, {
                    "status" : "updated"
                });
            }
        });
    });
    console.log('The new document has been updated to this offer');
}

function deleteOfferDocument(req, res) {
    OfferPackage.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) {
            utils.sendJSONresponse(res, 500, err);
        }
        utils.sendJSONresponse(res, 200, {
            "status" : "deleted"
        });
    });
    // Delete physical document file under server 's data dir

    console.log('This offer document has been deleted');
}

// Operation made by managers
function rescindOffer(req, res) {
    Offer.findById(req.params.offerId, function (err, offer) {
        offer.state = 'RESCINDED';

        offer.save(function(err) {
            if (err) {
                utils.sendJSONresponse(res, 500, err);
            } else {
                utils.sendJSONresponse(res, 200, {
                    "status" : "rescinded"
                });
                console.log('The offer has been rescinded');
            }
        });
    });
}

// Operation made by candidates
function respondOffer(req, res) {

    Offer.findById(req.params.offerId, function (err, offer) {
        offer.state = req.body.accepted ? 'ACCEPTED' : 'REJECTED';

        offer.save(function(err) {
            if (err) {
                utils.sendJSONresponse(res, 500, err);
            } else {
                utils.sendJSONresponse(res, 200, {
                    "status" : "rescinded"
                });
                console.log('The offer has been responded');
            }
        });
    });
}

function findOffersByCandidate(req, res) {
    console.log('Fetching offers by a candidate...');

    Offer.find().where('candidateId').equals(req.params.candidateId).exec(function(err, offers) {
        if (offers.length > 0)
            res.jsonp(offers);
        else {
            utils.sendJSONresponse(res, 404, {
                "status" : "empty"
            });
        }
    });
}

function findOffersByManager(req, res) {
    console.log('Fetching offers by manager...');

    Offer.find().where('offeredBy').equals(req.params.managerId).exec(function(err, offers) {
        if (offers.length > 0)
            res.jsonp(offers);
        else {
            utils.sendJSONresponse(res, 404, {
                "status" : "empty"
            });
        }
    });
}