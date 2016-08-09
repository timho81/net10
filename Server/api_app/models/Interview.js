/**
 * Created by Tim Ho on 6/29/2016.
 */

// Interview model
var mongoose = require('mongoose');
var uuid = require('node-uuid');

var InterviewSchema = new mongoose.Schema({
    _id: { type: String, default: uuid.v4},
    appointmentTime: {type: Date, required: true},
    time1: {type: Date, required: true},
    time2: Date,
    time3: Date,
    cancelled: {type: Boolean, default: false, required: true},
    accepted: {type: Boolean, default: false, required: true},
    rejected: {type: Boolean, default: false, required: true},
    notes: String,
    state: {type: String,
        enum: ['PHONE','ROUND_1','ROUND_2','FINAL']
    },
    jobReqId: {type: String, required: true},
    inviter: {type: String, required: true}, // User ID of Manager who invited the candidate
    candidateId: {type: String, required: true}
});

module.exports = mongoose.model('Interview', InterviewSchema);
