/**
 * Created by Tim Ho on 6/20/2016.
 */

// Job req model
var mongoose = require('mongoose');
var uuid = require('node-uuid');

var JobReqSchema = new mongoose.Schema({
    _id: { type: String, default: uuid.v4},
    title: {type: String, required: true}, // Position name
    description: String, // job description, added separately
    city: {type: String, required: true},
    state: {type: String, required: true},
    base: {type: String, required: true},
    bonus: String,
    experience: {type: String, required: true},
    skills: {type: String, required: true}, // ones a candidate needs to meet to apply for the position
    niceToHave: String, // preferable skills
    industry: String,
    degree: String,
    createdBy: {type: String, required: true}, // id of user/manager who created this job req
    candidateIds: [String]
});

module.exports = mongoose.model('JobReq', JobReqSchema);
