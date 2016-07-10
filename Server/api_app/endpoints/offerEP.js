/**
 * Created by Tim Ho on 7/5/2016.
 */


var mongoose = require('mongoose');
var OfferPackage = require('../models/OfferPackage.js');
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

// Send Offer Package, via email, to candidate to invite him to employment, sent out ONCE only
module.exports.sendToCandidate = function (req, res) {

};
