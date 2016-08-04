/**
 * Created by Tim Ho on 6/20/2016.
 */

// Candidate model
var mongoose = require('mongoose');
var uuid = require('node-uuid');

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
    summary: {type: String}, // authored by recruiters
    experienceLevel: {type: String, required: true},
    currentComp: String,
    currentBonus: String,
    desiredComp: String,
    desiredBonus: String,
    resume: String,
    jobIds: [String], // positions/jobreqs for which the candidate applied
    createdBy: {type: String, required: true}, // userId of the creator who creates this candidate
    rating: Number,
    passedOn: {type: Boolean, default: false}
});

module.exports = mongoose.model('Candidate', CandidateSchema);


