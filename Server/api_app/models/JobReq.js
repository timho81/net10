/**
 * Created by Tim Ho on 6/20/2016.
 */

// Job req model
var mongoose = require('mongoose');
var uuid = require('node-uuid');

var JobReqSchema = new mongoose.Schema({
    _id: { type: String, default: uuid.v4},
    name: {type: String, required: true}, // job name
    description: {type: String, required: true}, // job description
    responsibilities: {type: [String], required: true},   // ones a candidate will take once being admitted
    requirements: {type: [String], required: true}, // ones a candidate needs to meet to apply for the position
    createdBy: {type: String, required: true}, // id of user/manager who created this job req
    candidateIds: [String]
});

module.exports = mongoose.model('JobReq', JobReqSchema);
