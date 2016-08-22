/**
 * Created by Tim Ho on 6/20/2016.
 */

// Candidate model
var mongoose = require('mongoose');
var uuid = require('node-uuid');

// This subdoc embedded into Candidate entity embodies jobs acknowledged as interested or not by a candidate
var InterestAckJobSchema = new mongoose.Schema({
    _id: { type: String, default: uuid.v4},
    jobId: {type: String, required: true},
    managerId: {type: String, required: true},
    interested: {type: Boolean, required: true, default: false}
});

var MatchedJobSchema = new mongoose.Schema({
    _id: { type: String, default: uuid.v4},
    matchedJobId: {type: String, required: true}, // jobId
    managerId: {type: String, required: true} // userId
});

var CandidateSchema = new mongoose.Schema({
    _id: { type: String, default: uuid.v4},
    firstName: {type: String, required: true},
    lastName: String,
    displayName: String,
    tagLine: String,
    city: String,
    state: String,
    email: {type: String, unique: true, required: true,
        match: [/.+\@.+\..+/, "Please fill an email-compliant format!"]},
    phone: {type: String, required: true},
    jobTitle: {type: String, required: true},
    currentEmployer: String, // (when and for how long)
    coreCompetency: {type: String, required: true},
    summary1: {type: String}, // authored by recruiters
    summary2: {type: String},
    summary3: {type: String},
    experienceLevel: {type: String, required: true},
    currentComp: String,
    currentBonus: String,
    desiredComp: String,
    desiredBonus: String,
    resume: String,
    interestAckJobs: [InterestAckJobSchema], // Jobs as an embedded subdocument that are of interest to the candidate
                                             // Jobs that are of no interest to the candidate will be ignored by him/her
    matchedJobs: [MatchedJobSchema],
    excludedJobIds: [String], // a list of jobs in which this candidate is not interest, thus, he/she ignores them
    userId: String,
    jobIds: [String], // positions/jobreqs for which the candidate applied
    createdBy: {type: String, required: true}, // userId of the creator who creates this candidate
    averageRating: Number, // a computed value
    scores: [Number],
    passedOn: {type: Boolean, default: false}
});

module.exports = mongoose.model('Candidate', CandidateSchema);


