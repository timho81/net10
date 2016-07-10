/**
 * Created by Tim Ho on 6/28/2016.
 */


// Offer Package model
var mongoose = require('mongoose');
var uuid = require('node-uuid');

var OfferPackageSchema = new mongoose.Schema({
    _id: { type: String, default: uuid.v4},
    candidateId: {type: String, required: true},
    sentOut: {type: Boolean, default: false}, // sent once to a target candidate
    benefitsPackage: {type: String, required: true}
});

module.exports = mongoose.model('OfferPackage', OfferPackageSchema);
