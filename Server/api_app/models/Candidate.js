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
    country: {type: String, required: true},
    address: {type: String, required: true, maxlength: 200},
    city: {type: String, required: true},
    state: {type: String, required: true},
    zip: {type: String, required: true},
    mobile: {type: String, required: true},
    workPhone: {type: String, required: true},
    homePhone: {type: String, required: true},
    email: {type: String, unique: true, required: true,
        match: [/.+\@.+\..+/, "Please fill an email-compliant format!"]},
    email2: {type: String, unique: true, required: true,
        match: [/.+\@.+\..+/, "Please fill an email-compliant format!"]},
    linkedIn: {type: String, required: true},
    personalSite: {type: String, required: true},
    customFields: [String],
    skillsetTags: [String],                          // (entered by recruiter)
    industryTags: [String],
    positionTag: String,
    title: {type: String, required: true},
    recruiterOwnership: String,                               // (when and for how long)
    notesField: {type: String, maxlength: 200},
    workHistory: String,
    educationHistory: String,
    summary: {type: String}, // authored by recruiters
    jobIds: [String], // positions for which the candidate applied
    rating: Number,
    passedOn: {type: Boolean, default: false}
});

module.exports = mongoose.model('Candidate', CandidateSchema);


