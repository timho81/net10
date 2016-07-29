/**
 * Created by Tim Ho on 7/1/2016.
 */


var mongoose = require('mongoose');
var Interview = require('../models/Interview.js');
var utils = require('../utils/utils.js');

module.exports.create = function (req, res) {
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
};


module.exports.reschedule = function (req, res) {
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
};

// Candidates respond to an interview invitation by accepting/rejecting an interview invitation
module.exports.respond = function (req, res) {

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
};

// Cancelled by Manager
module.exports.cancel = function (req, res) {
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
};







