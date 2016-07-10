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


// Impl of Candidate Summary CRUDs
module.exports.addSummary = function (req, res) {
    // Find profile by id
    Candidate.findById(req.params.candidateId, function (err, candidate) {

        candidate.summary = req.body.summary;

        candidate.save(function(err) {
            if (err) {
                sendJSONresponse(res, 500, err);
            } else {
                console.log('The candidate summary has been added by recruiters');
                utils.sendJSONresponse(res, 200, {
                    "status" : "added"
                });
            }
        });
    });

};

module.exports.updateSummary = function (req, res) {
    // Find Candidate Summary by id
    Candidate.findById(req.params.candidateId, function (err, candidate) {

        candidate.summary = req.body.summary;

        candidate.save(function(err) {
            if (err) {
                sendJSONresponse(res, 500, err);
            } else {
                console.log('The candidate summary has been updated by recruiters');
                utils.sendJSONresponse(res, 200, {
                    "status" : "updated"
                });
            }
        });
    });
};

module.exports.deleteSummary = function (req, res) {
    // Find profile by id
    Candidate.findById(req.params.candidateId, function (err, candidate) {

        candidate.summary = null;

        candidate.save(function(err) {
            if (err) {
                sendJSONresponse(res, 500, err);
            } else {
                console.log('The candidate summary has been deleted by recruiters');
                utils.sendJSONresponse(res, 200, {
                    "status" : "deleted"
                });
            }
        });
    });

};

module.exports.findSummaryByCandidateId = function (req, res) {
    // Find candidate by id
    Candidate.findById(req.params.candidateId, function (err, post) {
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

// Managers decide if they are interested in the candidate a not
// once this is set to true, the candidate can not apply for this position for the second time
module.exports.passCandidate = function (req, res) {
    // Find candidate by id
    Candidate.findById(req.params.id, function (err, candidate) {
        candidate.passedOn = true;

        candidate.save(function(err) {
            if (err) {
                utils.sendJSONresponse(res, 500, err);
            } else {
                console.log('The candidate has been passed on by a manager ' +
                    'as he is not interested in this candidate');
                utils.sendJSONresponse(res, 200, {
                    "status" : "passed"
                });
            }
        });
    });
};

module.exports.offerCandidate = function (req, res) {


};