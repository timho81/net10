/**
 * Created by Tim Ho on 6/20/2016.
 */

var mongoose = require('mongoose');
var Candidate = require('../models/Candidate.js')
var Profile = require('../models/Profile.js');
var utils = require('../utils/utils.js');

// Impl of Candidate CRUDs
module.exports.create = function (req, res) {
    Candidate.create(req.body, function (err, candidate) {
        if (err) {
            sendJSONresponse(res, 404, err);
        }
        utils.sendJSONresponse(res, 200, {
            "status" : "created",
            "candidateId": candidate._id
        });
    });
};

module.exports.update = function (req, res) {
    Candidate.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) {
            sendJSONresponse(res, 500, err);
        }
        utils.sendJSONresponse(res, 200, {
                    "status" : "updated"
        });
    });
};

module.exports.delete = function (req, res) {
    Candidate.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) {
            sendJSONresponse(res, 500, err);
        }
        utils.sendJSONresponse(res, 200, {
            "status" : "deleted"
        });
    });

};

module.exports.findById = function(req, res, next) {
    Candidate.findById(req.params.id, function (err, post) {
        if (err) {
            sendJSONresponse(res, 404, err);
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
            sendJSONresponse(res, 404, err);

        utils.sendJSONresponse(res, 200, {
            "summary" : post.summary
        });
    });
};


// Operations for managers
module.exports.swipeCandidateSummaries = function (req, res) {
    console.log('Listing candidate summaries...');

    Candidate.find({}, '_id firstName lastName summary', function(err, candidates) {
        if (!err){
            res.json(candidates);
        } else {
            utils.sendJSONresponse(res, 500, err);
        }
    });

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

// Depends how you want to implement it.  You need to track which offers went to
// which candidates and know the state of the offer after it was extended.
// So  that offer has an association with the manager, candidate and req.
// It has three states;  created, extended, [accepted/rejected]
// Offers can only be made on open reqs
// once an offer has been accepted, the opening count should be decremented,
// because there could be multiple openings
// multiple openings per job req

module.exports.offerCandidate = function (req, res) {
    // Create associations between candidate and offer entities

};