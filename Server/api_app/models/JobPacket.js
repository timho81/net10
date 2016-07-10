/**
 * Created by Tim Ho on 7/1/2016.
 */

// Offer Job Package model
var mongoose = require('mongoose');
var uuid = require('node-uuid');

var JobPackageSchema = new mongoose.Schema({
    _id: { type: String, default: uuid.v4},
    jobId: {type: String, required: true},
    jobPackage: {type: String, required: true}
});

module.exports = mongoose.model('JobPackage', JobPackageSchema);
