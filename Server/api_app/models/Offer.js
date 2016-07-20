// Offer model
var mongoose = require('mongoose');
var uuid = require('node-uuid');

var OfferSchema = new mongoose.Schema({
    _id: { type: String, default: uuid.v4},
    jobReqId: {type: String, required: true},
    candidateId: {type: String, required: true},
    extended: {type: Boolean, default: false} // just sent to 1 candidate only, shouldn't be sent multiple times
});

module.exports = mongoose.model('Offer', OfferSchema);
