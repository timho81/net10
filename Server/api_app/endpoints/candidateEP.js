/**
 * Created by Tim Ho on 6/20/2016.
 */

var mongoose = require('mongoose');
var randomstring = require("randomstring");

var User = require('../models/User.js');
var Candidate = require('../models/Candidate.js');
var Profile = require('../models/Profile.js');
var emails = require('../utils/emails.js');
var utils = require('../utils/utils.js');

// var config = require('../../config');

// var uploader = require('../utils/uploader.js');
// var fileHander = require('../utils/fileHander.js');

// Impl of Candidate CRUDs
module.exports = {
    create: create,
    update: update,
    delete: deleteCandidate,
    findById: findById,
    searchForCandidates: searchForCandidates,
    matchJobWithCandidate: matchJobWithCandidate,
    addResume: addResume,
    findCandidatesByRecruiter: findCandidatesByRecruiter,
    addSummary: addSummary,
    updateSummary: updateSummary,
    deleteSummary: deleteSummary,
    findSummaryByCandidateId: findSummaryByCandidateId,
    passCandidate: passCandidate,
    offerCandidate: offerCandidate
};

// Candidate created by a recruiter
function create(req, res) {

    var newlyCreatedCandidateId;
    // Send account creation notification email to candidate with randomly generated pwd,
    // require pwd change on the first login
    var randomlyGeneratedPwd = randomstring.generate({
        length: 16,
        charset: 'alphanumeric'
    });
    console.log('randomlyGeneratedPwd = ' + randomlyGeneratedPwd);

    Candidate.create(req.body, function (err, candidate) {
        if (err) {
            console.log("Error occurred while creating a new candidate");
            utils.sendJSONresponse(res, 500, err);
        }
        newlyCreatedCandidateId = candidate._id;

        var user = new User();
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.email = req.body.email;
        user.phone = req.body.phone;
        user.isCandidateAccount = true;
        user.hasChangedRandomPwd = false;
        user.authority = 'ROLE_CANDIDATE';
        user.setPassword(randomlyGeneratedPwd);

        user.save(function(err) {
            if (err) {
                console.log("Error occurred while creating a new candidate account");
                utils.sendJSONresponse(res, 500, err);
            } else {
                // Associate the newly created candidate with the candidate account
                candidate.userId = user.id;

                candidate.save(function(err) {
                    if (err) {
                        utils.sendJSONresponse(res, 500, err);
                    } else {
                        console.log('A new candidate and candidate account have been created and associated');
                        utils.sendJSONresponse(res, 200, {
                            "status" : "created",
                            "candidateId": candidate._id
                        });
                    }
                });
                // Send account creation noti email to candidate with randamly generated pwd
                console.log('Sending the offer letter and offer package to candidate...');
                var subject = 'Account Creation';
                // Candidate 's email
                var recipient = req.body.email;
                var content = 'Dear Applicant,<br><br>' +
                    'We would like to inform that a new account has been created for you with password:' + randomlyGeneratedPwd + '<br>' +
                    'It is required that you change the password on your first login.<br><br>' +
                    'Best Regards,<br><br>' +
                    'Recruitment Team';
                emails.doSend(res, recipient, subject, content);
            }
        });
    })
}

function update(req, res) {
    Candidate.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) {
            sendJSONresponse(res, 500, err);
        }
        utils.sendJSONresponse(res, 200, {
                    "status" : "updated"
        });
    });
}

function deleteCandidate(req, res) {
    Candidate.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) {
            sendJSONresponse(res, 500, err);
        }
        utils.sendJSONresponse(res, 200, {
            "status" : "deleted"
        });
    });

}

function findById(req, res, next) {
    Candidate.findById(req.params.id, function (err, post) {
        if (err) {
            sendJSONresponse(res, 404, err);
        }
        res.json(post);
    });
}

// Filter candidates by firstName, city, state, jobTitle, coreCompetency, summary
function searchForCandidates(req, res) {
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
}

function matchJobWithCandidate(req, res, next) {
    console.log('Matching a job with this candidate...');

    Candidate.findById(req.params.candidateId, function (err, candidate) {
        candidate.matchedJobs.push({ matchedJobId: req.params.jobId, managerId: req.params.managerId});

        candidate.save(function(err) {
            if (err) {
                utils.sendJSONresponse(res, 500, err);
            } else {
                console.log('A job has been matched to this candidate');
                utils.sendJSONresponse(res, 200, {
                    "status" : "interested"
                });
            }
        });
    });
}

// Resume attachments
function addResume(req, res, next) {
    // Find candidate by id
    Candidate.findById(req.params.candidateId, function (err, candidate) {
        candidate.resume = req.file.originalname;
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
}



function findCandidatesByRecruiter(req, res) {
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
}

// Impl of Candidate Summary CRUDs
function addSummary(req, res) {
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
}

function updateSummary(req, res) {
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
}

function deleteSummary(req, res) {
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
}

function findSummaryByCandidateId(req, res) {
    // Find candidate by id
    Candidate.findById(req.params.candidateId, function (err, post) {
        if (err)
            sendJSONresponse(res, 404, err);

        utils.sendJSONresponse(res, 200, {
            "summary" : post.summary
        });
    });
}


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
function passCandidate(req, res) {
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
}

// Depends how you want to implement it.  You need to track which offers went to
// which candidates and know the state of the offer after it was extended.
// So  that offer has an association with the manager, candidate and req.
// It has three states;  created, extended, [accepted/rejected]
// Offers can only be made on open reqs
// once an offer has been accepted, the opening count should be decremented,
// because there could be multiple openings
// multiple openings per job req

function offerCandidate(req, res) {
    // Create associations between candidate and offer entities

}