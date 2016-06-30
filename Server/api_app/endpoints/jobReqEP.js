/**
 * Created by Tim Ho on 6/20/2016.
 */

// Endpoint that expose APIs for managing job requisitions
// Access control is restricted to Managers only

var mongoose = require('mongoose');
var JobReq = require('../models/JobReq.js');
var utils = require('../utils/utils.js');


// Create a new req
module.exports.create = function (req, res) {
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


// Operations made by recruiters
/////////////////////////////////////////////////////////////
module.exports.searchForReqs = function (req, res) {


};

module.exports.assignCandidateToReq = function (req, res) {


};
/////////////////////////////////////////////////////////////////


// Operations made by candidates
/////////////////////////////////////////////////////////////
module.exports.viewJobPacket = function (req, res) {


};
///////////////////////////////////////////////////////////////
