/**
 * Created by Tim Ho on 6/20/2016.
 */

// Endpoint that expose APIs for managing job requisitions
// Access control is restricted to Managers only

var mongoose = require('mongoose');
var JobReq = require('../models/JobReq.js');
var JobPacket = require('../models/JobPacket.js');
var Candidate = require('../models/Candidate.js');
var sec = require('../security/security.js');
var utils = require('../utils/utils.js');

// Create a new req
module.exports.create = function (req, res) {

    // error
    if (!sec.isAuthorized(req, 'ROLE_MANAGER')) {
        console.log('You are unauthorized to create a new req');
        utils.sendJSONresponse(res, 403, {
            "status" : "unauthorized"
        });
        return;
    }

    JobReq.create(req.body, function (err, post) {
        if (err) {
            sendJSONresponse(res, 404, err);
            return next(err);
        }
        utils.sendJSONresponse(res, 200, {
            "status" : "created"
        });
    });
    console.log('A new job req has been created');
};


// Update an existing jobReq
module.exports.update = function (req, res) {
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
            return next(err);

        utils.sendJSONresponse(res, 200,  {
            "status": "updated"
        });
    });

    console.log('The job req has been modified');
};

module.exports.delete = function (req, res) {
    if (!sec.isAuthorized(req, 'ROLE_MANAGER')) {
        console.log('You are unauthorized to delete this req');
        utils.sendJSONresponse(res, 403, {
            "status" : "unauthorized"
        });
        return;
    }

    JobReq.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) {
            sendJSONresponse(res, 404, err);
            return next(err);
        }
        utils.sendJSONresponse(res, 200, {
            "status" : "deleted"
        });
    });

};

// Find a job req by id
module.exports.findById = function (req, res) {

    JobReq.findById(req.params.id, function (err, jobReq) {
        if (err) return next(err);
        res.json(jobReq);
    });

    console.log('A job req has been found');
};

// Find applicants/candidates by a job req for which candidates applied
module.exports.findCandidatesByJobReq = function (req, res) {
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
};

// Find job reqs by a manager who created them
module.exports.findJobReqsByManager = function (req, res) {
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
};

// Operations made by recruiters
// Filter Job Reqs by name/description/requirements
/////////////////////////////////////////////////////////////

module.exports.searchForReqs = function (req, res) {
    var name = req.params.name;
    var description = req.params.description;
    var requirements = req.params.requirements;

    JobReq.find({name:{ $regex : name }, description:{ $regex : description },
        requirements:{ $regex : requirements }}, function(err, results){

        if (results.length > 0)
            res.jsonp(results);
        else {
            utils.sendJSONresponse(res, 404, {
                "status" : "empty"
            });
        }
    });

};

module.exports.assignCandidateToReq = function (req, res) {
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

};
/////////////////////////////////////////////////////////////////


// Operations made by candidates, view a job package for a corresponding job/req for which a candidate is applying
/////////////////////////////////////////////////////////////
module.exports.viewJobPacket = function (req, res) {
    JobPacket.findById(req.params.id, function (err, jobPacket) {
        if (err) return next(err);
        res.json(jobPacket);
    });
    console.log('A job package has been retrieved and returned');
};
///////////////////////////////////////////////////////////////

