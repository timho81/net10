
// Job Package model
var mongoose = require('mongoose');
var uuid = require('node-uuid');

var JobPackageSchema = new mongoose.Schema({
    _id: { type: String, default: uuid.v4},
    jobId: {type: String, required: true},
    documentName: {type: String, required: true},
    documentType: {type: String, required: true}
});

module.exports = mongoose.model('JobPackage', JobPackageSchema);

