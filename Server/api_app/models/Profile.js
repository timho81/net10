/**
 * Created by Tim Ho on 6/16/2016.
 */

// Profile model
var mongoose = require('mongoose');
var uuid = require('node-uuid');

var ProfileSchema = new mongoose.Schema({
    _id: { type: String, default: uuid.v4},
    title: {type: String, required: true},
    summary: String, // authored  by a candidate himself
    background: {type: String, required: true},
    industry: {type: String, required: true},
    yearsOfExperience: {type: Number, min: 0, required: true},
    candidateId: {type: String, required: true}
});

module.exports = mongoose.model('Profile', ProfileSchema);
