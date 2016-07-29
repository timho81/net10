// Offer model
var mongoose = require('mongoose');
var uuid = require('node-uuid');

var OfferSchema = new mongoose.Schema({
    _id: { type: String, default: uuid.v4},
    name: {type: String, required: true},
    description: {type: String, required: true},
    jobReqId: {type: String, required: true},
    candidateId: {type: String, required: true},
    offeredBy:{type: String, required: true}, // userId
    // extended: {type: Boolean, default: false}, // just sent to 1 candidate only, shouldn't be sent multiple times
    // rescinded: {type: Boolean, default: false}, //  invalidated the offer by Managers
    state: {type: String,
        enum: ['EXTENDED','ACCEPTED','REJECTED','RESCINDED']
    }
});

module.exports = mongoose.model('Offer', OfferSchema);
