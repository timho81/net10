/**
 * Created by Tim Ho on 6/21/2016.
 */

// Company Contact - Hiring Manager model
var mongoose = require('mongoose');
var uuid = require('node-uuid');

var CompanyContactSchema = new mongoose.Schema({
    _id: { type: String, default: uuid.v4},
    name: {type: String, required: true},
    title: {type: String, required: true},
    address: {type: String, required: true, maxlength: 200},  //(division location?)
    email: {type: String, unique: true, required: true,
        match: [/.+\@.+\..+/, "Please fill an email-compliant format!"]},
    phoneNumber: {type: String, required: true},               // (desk)
    cellNumber: {type: String, required: true},
    type: {type: String, required: true,
        enum: ['HIRING_MANAGER','HUMAN_RESOURCES_MANAGER','VENDOR_MANAGER']}, // Type of Company Contact – Hiring Manager, Human Resources, Vendor Manager
    hiringManagerRating: Number
});

module.exports = mongoose.model('CompanyContact', CompanyContactSchema);

