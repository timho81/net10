/**
 * Created by Tim Ho on 7/1/2016.
 */


var mongoose = require('mongoose');
var Interview = require('../models/Interview.js');
var utils = require('../utils/utils.js');

module.exports = {
    create: create,
    reschedule: reschedule,
    respond: respond,
    cancel: cancel,
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
                console.log('The interview has been rescheduled');
                utils.sendJSONresponse(res, 200, {
                    "status" : "rescheduled"
                });
            }
        });
    });
    console.log('The interview has been cancelled');
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





