/**
 * Created by Tim Ho on 6/29/2016.
 */

// Interview model
var mongoose = require('mongoose');
var uuid = require('node-uuid');

var InterviewSchema = new mongoose.Schema({
    _id: { type: String, default: uuid.v4},
    time: {type: String, required: true},
    time1: {type: String, required: true},
    time2: String,
    time3: String,
    cancelled: {type: Boolean, default: false, required: true},
    accepted: {type: Boolean, default: false, required: true},
    rejected: {type: Boolean, default: false, required: true},
    notes: String,
    interestedUserId: String, // user id of a manager or a candidate who shows interest in a candidate or a job, respectively
    state: {type: String,
        enum: ['MANAGER_INTERESTED','CANDIDATE_INTERESTED','PHONE','ROUND_1','ROUND_2','FINAL']
    },
    jobReqId: {type: String, required: true},
    inviter: {type: String, required: true}, // User ID of Manager who invited the candidate
    candidateId: {type: String, required: true}
});

module.exports = mongoose.model('Interview', InterviewSchema);
