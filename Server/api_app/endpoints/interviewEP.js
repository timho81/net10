/**
 * Created by Tim Ho on 7/1/2016.
 */


var mongoose = require('mongoose');
var Interview = require('../models/Interview.js');
var Candidate = require('../models/Candidate.js');
var utils = require('../utils/utils.js');

module.exports = {
    create: create,
    reschedule: reschedule,
    respond: respond,
    cancel: cancel,
    acknowledgeInterestInJob: acknowledgeInterestInJob,
    interestInCandidate: interestInCandidate,
    changeState: changeState,
    findInterviewsByCandidate: findInterviewsByCandidate,
    findInterviewsByManager: findInterviewsByManager
};

function create(req, res) {
    Interview.create(req.body, function (err, interview) {
        if (err) {
            sendJSONresponse(res, 500, err);
        }
        utils.sendJSONresponse(res, 200, {
            "status" : "created",
            "interviewId": interview._id
        });
    });
    console.log('A new interview has been created');
}

function reschedule(req, res) {
    console.log('Rescheduling the interview with id = ' + req.params.id);

    // Find interview by id
    Interview.findById(req.params.id, function (err, interview) {
        interview.appointmentTime = req.body.rescheduledTime;

        interview.save(function(err) {
            if (err) {
                utils.sendJSONresponse(res, 500, err);
            } else {
                console.log('The interview has been rescheduled');
                utils.sendJSONresponse(res, 200, {
                    "status" : "rescheduled"
                });
            }
        });
    });

    console.log('The interview has been rescheduled');
}

// Candidates respond to an interview invitation by accepting/rejecting an interview invitation
function respond(req, res) {

    // Find interview by id
    Interview.findById(req.params.id, function (err, interview) {

        if (req.body.accepted)
        {
            interview.accepted = true;
            interview.save(function(err) {
                if (err) {
                    utils.sendJSONresponse(res, 500, err);
                } else {
                    console.log('The interview has been accepted by the candidate');
                    utils.sendJSONresponse(res, 200, {
                        "status" : "accepted"
                    });
                }
            });
        }
        if (req.body.rejected)
        {
            interview.rejected = true;
            interview.save(function(err) {
                if (err) {
                    utils.sendJSONresponse(res, 500, err);
                } else {
                    console.log('The interview has been rejected by the candidate');
                    utils.sendJSONresponse(res, 200, {
                        "status" : "rejected"
                    });
                }
            });
        }
    });
}

// Cancelled by Manager
function cancel(req, res) {
    Interview.findById(req.params.id, function (err, interview) {
        interview.cancelled = true;

        interview.save(function(err) {
            if (err) {
                utils.sendJSONresponse(res, 500, err);
            } else {
                console.log('The interview has been cancelled');
                utils.sendJSONresponse(res, 200, {
                    "status" : "cancelled"
                });
            }
        });
    });
}

function interestInCandidate(req, res) {

    // Find interview by id
    Interview.findById(req.params.id, function (err, interview) {
        // candidate.managerInterested = true;
        interview.state = 'MANAGER_INTERESTED';
        interview.interestedUserId = req.params.managerId;

        interview.save(function(err) {
            if (err) {
                utils.sendJSONresponse(res, 500, err);
            } else {
                console.log('The interview state has been changed in response to manager interest in this candidate');
                utils.sendJSONresponse(res, 200, {
                    "status" : "changed"
                });
            }
        });
    });
}

function acknowledgeInterestInJob(req, res, next) {
    console.log('Acknowledging interest in the job or not, if yes, disclose profile to the recruitment manager');

    // The flag indicates that a candidate acknowledges if he/she is interested in this job or not
    var interested = req.body.interested;

    Candidate.findById(req.params.candidateId, function (err, candidate) {

        if (err) {
            utils.sendJSONresponse(res, 404, err);
            return;
        }
        candidate.interestAckJobs.push({ jobId: req.body.jobId, managerId: req.body.managerId, interested: (interested=='true'?true:false)});

        candidate.save(function(err) {
            if (err) {
                utils.sendJSONresponse(res, 500, err);
            } else {
                if (interested == 'true') {
                    console.log('This job is of interest to the candidate');
                    utils.sendJSONresponse(res, 200, {
                        "status" : "interested"
                    });
                } else {
                    console.log('This job is of no interest to the candidate, then passed');
                    utils.sendJSONresponse(res, 200, {
                        "status" : "passed"
                    });
                }
            }
        });
    });

    // Find interview by id
    // Interview.findById(req.params.id, function (err, interview) {
    //     // candidate.managerInterested = true;
    //     interview.state = 'CANDIDATE_INTERESTED';
    //     interview.interestedUserId = req.params.candidateId;
    //
    //     interview.save(function(err) {
    //         if (err) {
    //             utils.sendJSONresponse(res, 500, err);
    //         } else {
    //             console.log('The interview state has been changed in reaction to candidate interest in a job');
    //             utils.sendJSONresponse(res, 200, {
    //                 "status" : "changed"
    //             });
    //         }
    //     });
    // });
}

function changeState(req, res) {
    Interview.findById(req.params.id, function (err, interview) {
        interview.state = req.params.state;

        interview.save(function(err) {
            if (err) {
                utils.sendJSONresponse(res, 500, err);
            } else {
                console.log('The interview state has been changed');
                utils.sendJSONresponse(res, 200, {
                    "status" : "changed"
                });
            }
        });
    });
}

// Find interviews joined by a candidate
function findInterviewsByCandidate(req, res) {
    console.log('Fetching interviews by candidate...');

    Interview.find().where('candidateId').equals(req.params.candidateId).exec(function(err, interviews) {
        if (interviews !=null && interviews.length > 0)
            res.jsonp(interviews);
        else {
            console.log('No interviews were joined by this candidate');
            utils.sendJSONresponse(res, 404, {
                "status" : "empty"
            });
        }
    });
}

// Find interviews by a manager who created them
function findInterviewsByManager(req, res) {
    console.log('Fetching interviews by manager...');

    Interview.find().where('inviter').equals(req.params.managerId).exec(function(err, interviews) {
        if (interviews !=null && interviews.length > 0)
            res.jsonp(interviews);
        else {
            utils.sendJSONresponse(res, 404, {
                "status" : "empty"
            });
        }
    });
}





