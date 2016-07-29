/**
 * Created by Tim Ho on 6/28/2016.
 */


// Offer Package model
var mongoose = require('mongoose');
var uuid = require('node-uuid');

var OfferPackageSchema = new mongoose.Schema({
    _id: { type: String, default: uuid.v4},
    offerId: {type: String, required: true},
    sentOut: {type: Boolean, default: false}, // sent once to a target candidate
    documentName: {type: String},
    documentType: {type: String}
});

module.exports = mongoose.model('OfferPackage', OfferPackageSchema);
