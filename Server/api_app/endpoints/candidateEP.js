/**
 * Created by Tim Ho on 6/20/2016.
 */

var mongoose = require('mongoose');
var Candidate = require('../models/Candidate.js')
var Profile = require('../models/Profile.js');
var utils = require('../utils/utils.js');

// Impl of Candidate CRUDs
module.exports.create = function (req, res) {
    Candidate.create(req.body, function (err, post) {
        if (err) {
            sendJSONresponse(res, 404, err);
            return next(err);
        }
        utils.sendJSONresponse(res, 200, {
            "status" : "created"
        });
    });
};

module.exports.update = function (req, res) {
    Candidate.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) {
            sendJSONresponse(res, 404, err);
            return next(err);
        }
        utils.sendJSONresponse(res, 200, {
                    "status" : "updated"
        });
    });
};

module.exports.delete = function (req, res) {
    Candidate.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) {
            sendJSONresponse(res, 404, err);
            return next(err);
        }
        utils.sendJSONresponse(res, 200, {
            "status" : "deleted"
        });
    });

};

module.exports.findById = function(req, res, next) {
    Candidate.findById(req.params.id, function (err, post) {
        if (err) {
            return next(err);
        }
        res.json(post);
    });
};


// Impl of Candidate Profile Summary CRUDs
module.exports.addSummary = function (req, res) {
    // Find profile by id
    Profile.findById(req.params.profileId, function (err, profile) {

        profile.summary = req.body.summary;

        profile.save(function(err) {
            if (err) {
                sendJSONresponse(res, 500, err);
            } else {
                console.log('The summary has been added to candidate profile');
                utils.sendJSONresponse(res, 200, {
                    "status" : "added"
                });
            }
        });
    });

};

module.exports.updateSummary = function (req, res) {
    // Find profile by id
    Profile.findById(req.params.profileId, function (err, profile) {

        profile.summary = req.body.summary;

        profile.save(function(err) {
            if (err) {
                sendJSONresponse(res, 500, err);
            } else {
                console.log('The candidate profile summary has been updated');
                utils.sendJSONresponse(res, 200, {
                    "status" : "updated"
                });
            }
        });
    });
};

module.exports.deleteSummary = function (req, res) {
    // Find profile by id
    Profile.findById(req.params.profileId, function (err, profile) {

        profile.summary = null;

        profile.save(function(err) {
            if (err) {
                sendJSONresponse(res, 500, err);
            } else {
                console.log('The candidate profile summary has been deleted');
                utils.sendJSONresponse(res, 200, {
                    "status" : "deleted"
                });
            }
        });
    });

};

module.exports.findSummaryByProfileId = function (req, res) {
    Profile.findById(req.params.profileId, function (err, post) {
        if (err)
            return next(err);

        utils.sendJSONresponse(res, 200, {
            "summary" : post.summary
        });
    });
};


// Operations for managers
module.exports.swipeCandidateSummaries = function (req, res) {


};

module.exports.viewCandidateResume = function (req, res) {


};

module.exports.passCandidate = function (req, res) {


};

module.exports.offerCandidate = function (req, res) {


};