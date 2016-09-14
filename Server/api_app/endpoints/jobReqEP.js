/**
 * Created by Tim Ho on 6/20/2016.
 *
 * The endpoint handles client requests to Job Req service
 *
 * Resources access control is restricted to Managers only
 */

var mongoose = require('mongoose');
var JobReq = require('../models/JobReq.js');
var JobPackage = require('../models/JobPackage.js');
var Candidate = require('../models/Candidate.js');
var sec = require('../security/security.js');
var utils = require('../utils/utils.js');

module.exports = {
    create: create,
    update: update,
    delete: deleteReq,
    findById: findById,
    addDescriptionToReq: addDescriptionToReq,
    findCandidatesByJobReq: findCandidatesByJobReq,
    findJobReqsByManager: findJobReqsByManager,
    searchForReqs: searchForReqs,
    assignCandidateToReq: assignCandidateToReq,
    addDocumentToJobPackage: addDocumentToJobPackage,
    updateDocumentToJobPackage: updateDocumentToJobPackage,
    deleteDocumentFromJobPackage: deleteDocumentFromJobPackage,
    viewJobPackage: viewJobPackage
};

// Create a new req
function create(req, res) {

    if (!sec.isAuthorized(req, 'ROLE_MANAGER')) {
        console.log('You are unauthorized to create a new req');
        utils.sendJSONresponse(res, 403, {
            "status" : "unauthorized"
        });
        return;
    }

    JobReq.create(req.body, function (err, jobReq) {
        if (err) {
            utils.sendJSONresponse(res, 500, err);
        }
        utils.sendJSONresponse(res, 200, {
            "status" : "created",
            "jobId" : jobReq._id
        });
    });
    console.log('A new job req has been created');
}


// Update an existing jobReq
function update(req, res) {
    if (!sec.isAuthorized(req, 'ROLE_MANAGER')) {
        console.log('You are unauthorized to update this req');
        utils.sendJSONresponse(res, 403, {
            "status" : "unauthorized"
        });
        return;
    }

    console.log('Updating a job req with id = ' + req.params.id);

    JobReq.findByIdAndUpdate(req.params.id, req.body, function (err, jobReq) {
        if (err)
            utils.sendJSONresponse(res, 500, err);

        utils.sendJSONresponse(res, 200,  {
            "status": "updated"
        });
    });

    console.log('The job req has been modified');
}

function deleteReq(req, res) {
    if (!sec.isAuthorized(req, 'ROLE_MANAGER')) {
        console.log('You are unauthorized to delete this req');
        utils.sendJSONresponse(res, 403, {
            "status" : "unauthorized"
        });
        return;
    }

    JobReq.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) {
            sendJSONresponse(res, 500, err);
        }
        utils.sendJSONresponse(res, 200, {
            "status" : "deleted"
        });
    });
}

// Find a job req by id
function findById(req, res) {

    JobReq.findById(req.params.id, function (err, jobReq) {
        if (err)
            sendJSONresponse(res, 500, err);
        res.json(jobReq);
    });

    console.log('A job req has been found');
}

function addDescriptionToReq(req, res) {
    JobReq.findById(req.params.id, function (err, jobReq) {
        if (err) {
            console.log('The job req can not be found');
            sendJSONresponse(res, 404, err);
        }

        jobReq.description = req.body.description;

        jobReq.save(function(err) {
            if (err) {
                console.log('Saving the job req failed');
                utils.sendJSONresponse(res, 500, err);
            } else {
                console.log('Description has been added to the job req');
                utils.sendJSONresponse(res, 200, {
                    "status" : "added"
                });
            }
        });
    });
}

// Find applicants/candidates by a job req for which candidates applied
function findCandidatesByJobReq(req, res) {
    console.log('Fetching candidates by job req...');

    JobReq.findById(req.params.id)
        .select('candidateIds')
        .exec(function(err, jobReq) {
                Candidate.find().where('_id').in(jobReq.candidateIds).exec(function(err, candidates) {
                    if (candidates.length > 0)
                        res.jsonp(candidates);
                    else {
                        utils.sendJSONresponse(res, 404, {
                            "status" : "empty"
                        });
                    }
                });
            }
        );
}

// Find job reqs by a manager who created them
function findJobReqsByManager(req, res) {
    console.log('Fetching job reqs by manager...');

    JobReq.find().where('createdBy').equals(req.params.managerId).exec(function(err, jobReqs) {
        if (jobReqs.length > 0)
            res.jsonp(jobReqs);
        else {
            utils.sendJSONresponse(res, 404, {
                "status" : "empty"
            });
        }
    });
}
// Operations made by recruiters
// Filter Job Reqs by city, state, title, description, experience, skills
/////////////////////////////////////////////////////////////

function searchForReqs(req, res) {
    var keywords = req.params.keywords;
    console.log('Searching job reqs with keywords = ' + keywords);

    // equivalent to 'Like' clause in SQL, i stands for case insensitivity
    var regExp = new RegExp(keywords, 'i');

    JobReq.find( { $or:[ {'city':{ $regex: regExp}}, {'state':{ $regex: regExp}},
            {'title':{ $regex: regExp}} , {'description':{ $regex: regExp}}
            , {'experience':{ $regex: regExp}}, {'skills':{ $regex: regExp}}]},

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

function assignCandidateToReq(req, res) {
    var jobId = req.params.jobId;
    var candidateId = req.params.candidateId;

    // Find job by id
    // JobReq.findById(jobId, function (err, jobReq) {
    //     jobReq.candidateIds.push(candidateId);
    //
    //     jobReq.save(function(err) {
    //         if (err) {
    //             utils.sendJSONresponse(res, 500, err);
    //         } else {
    //             console.log('The job has been associated to the candidate');
    //             utils.sendJSONresponse(res, 200, {
    //                 "status" : "associated"
    //             });
    //         }
    //     });
    // });

    // Find candidate by id
    Candidate.findById(candidateId, function (err, candidate) {
        candidate.jobIds.push(jobId);

        candidate.save(function(err) {
            if (err) {
                utils.sendJSONresponse(res, 500, err);
            } else {
                console.log('The candidate has been assigned to the job');
                utils.sendJSONresponse(res, 200, {
                    "status" : "assigned"
                });
            }
        });
    });
}
/////////////////////////////////////////////////////////////////

function addDocumentToJobPackage(req, res) {
    JobPackage.create(req.body, function (err, post) {
        if (err) {
            utils.sendJSONresponse(res, 500, err);
        }
        utils.sendJSONresponse(res, 200, {
            "status" : "created"
        });
    });
    console.log('A document has been added to this job req');
}

function updateDocumentToJobPackage(req, res) {
    JobPackage.findByIdAndUpdate(req.params.id, req.body, function (err, jobPackage) {
        if (err)
            utils.sendJSONresponse(res, 500, err);

        utils.sendJSONresponse(res, 200,  {
            "status": "updated"
        });
    });
    console.log('A document has been updated to this job req');
}

function deleteDocumentFromJobPackage(req, res) {
    JobPackage.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) {
            utils.sendJSONresponse(res, 500, err);
        }
        utils.sendJSONresponse(res, 200, {
            "status" : "deleted"
        });
    });
    // Delete physical document file under server 's data dir

    console.log('The document has been deleted from this job req');
}

// Operations made by candidates, view a job package for a corresponding job/req for which a candidate is applying
/////////////////////////////////////////////////////////////
function viewJobPackage(req, res) {
    JobPackage.findById(req.params.id, function (err, jobPackage) {
        if (err)
            sendJSONresponse(res, 404, err);
        res.json(jobPackage);
    });
    console.log('A job package has been retrieved and returned');
}
///////////////////////////////////////////////////////////////

