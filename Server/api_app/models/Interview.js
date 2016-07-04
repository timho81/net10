/**
 * Created by Tim Ho on 6/29/2016.
 */

// Interview model
var mongoose = require('mongoose');
var uuid = require('node-uuid');

var InterviewSchema = new mongoose.Schema({
    _id: { type: String, default: uuid.v4},
    appointmentTime: {type: Date, required: true},
    cancelled: {type: Boolean, default: false, required: true},
    accepted: {type: Boolean, default: false, required: true},
    rejected: {type: Boolean, default: false, required: true},
    jobReqId: {type: String, required: true},
    candidateId: {type: String, required: true}
});

module.exports = mongoose.model('Interview', InterviewSchema);
