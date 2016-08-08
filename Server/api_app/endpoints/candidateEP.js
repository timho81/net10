/**
 * Created by Tim Ho on 6/20/2016.
 */

var mongoose = require('mongoose');
var Candidate = require('../models/Candidate.js')
var Profile = require('../models/Profile.js');
var utils = require('../utils/utils.js');

// var config = require('../../config');

// var uploader = require('../utils/uploader.js');
// var fileHander = require('../utils/fileHander.js');

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

// Filter candidates by firstName, city, state, jobTitle, coreCompetency, summary
module.exports.searchForCandidates = function (req, res) {
    var keywords = req.params.keywords;
    console.log('Searching candidates with keywords = ' + keywords);

    // equivalent to 'Like' clause in SQL, i stands for case insensitivity
    var regExp = new RegExp(keywords, 'i');

    Candidate.find( { $or:[ {'firstName':{ $regex: regExp}}, {'city':{ $regex: regExp}},
            {'state':{ $regex: regExp}} , {'jobTitle':{ $regex: regExp}},
            {'coreCompetency':{ $regex: regExp}} , {'summary':{ $regex: regExp}}]},

        function(err,results){
            if (results != null && results.length > 0)
                res.jsonp(results);
            else {
                utils.sendJSONresponse(res, 404, {
                    "status" : "empty"
                });
            }
        });
};



// Resume attachments
module.exports.addResume = function(req, res, next) {
    // Find candidate by id
    Candidate.findById(req.params.candidateId, function (err, candidate) {
        candidate.resume = req.file.originalname;
        console.log('3');
        candidate.save(function(err) {
            if (err) {
                utils.sendJSONresponse(res, 500, err);
            } else {
                console.log('A resume has been added to this candidate');
                utils.sendJSONresponse(res, 200, {
                    "status" : "added"
                });
            }
        });
    });
};



module.exports.findCandidatesByRecruiter = function (req, res) {
    console.log('Fetching candidates created by a recruiter ...');

    Candidate.find().where('createdBy').equals(req.params.recruiterId).exec(function(err, candidates) {
        if (candidates.length > 0)
            res.jsonp(candidates);
        else {
            utils.sendJSONresponse(res, 404, {
                "status" : "empty"
            });
        }
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
// module.exports.swipeCandidateSummaries = function (req, res) {
//     console.log('Listing candidate summaries...');
//
//     Candidate.find({}, '_id firstName lastName summary', function(err, candidates) {
//         if (!err){
//             res.json(candidates);
//         } else {
//             utils.sendJSONresponse(res, 500, err);
//         }
//     });
//
// };

// module.exports.viewResume = function (req, res) {
//     Candidate.findById(req.params.candidateId, function (err, candidate) {
//         fileHander.downloadFileFromGCS(req, res, candidate.resume);
//     });
// };

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