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
    jobIds: [String], // positions for which the candidate applied
    rating: Number,
    passedOn: {type: Boolean, default: false}
});

module.exports = mongoose.model('Candidate', CandidateSchema);


