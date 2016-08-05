/**
 * Created by Tim Ho on 7/26/2016.
 */

//Bucket name: net10_files

var multer  = require('multer');

var gcloud = require('gcloud');

// var CLOUD_BUCKET = config.get('CLOUD_BUCKET');
var CLOUD_BUCKET = 'net10_files';

var storage = gcloud.storage({
    projectId: 'algebraic-hub-132823'
});

var bucket = storage.bucket(CLOUD_BUCKET);

var gcsFileUploadMulter = require('multer')({
    inMemory: true,
    fileSize: 5 * 1024 * 1024, // no larger than 5mb
    rename: function (fieldname, filename) {
        // generate a unique filename
        return filename.replace(/\W+/g, '-').toLowerCase() + Date.now();
    }
});

module.exports = {
    gcsFileUploadMulter: gcsFileUploadMulter
    ,
    getPublicUrl: function (filename) {
        return 'https://storage.googleapis.com/' + CLOUD_BUCKET + '/' + filename;
    },
    uploadFileToGCS: function (req, res, next) {
            if (!req.file) {
                return next();
            }

            var gcsname = Date.now() + req.file.originalname;
            var file = bucket.file(gcsname);
            var stream = file.createWriteStream();

            stream.on('error', function (err) {
                console.log('Error to upload file');
                req.file.cloudStorageError = err;
                next(err);
            });

            stream.on('finish', function () {
                console.log('Uploaded file successfully');
                req.file.cloudStorageObject = gcsname;
                req.file.cloudStoragePublicUrl = getPublicUrl(gcsname);
                next();
            });

            stream.end(req.file.buffer);
    }
    ,
    uploadResume: function (res, status, content) {
        var storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, process.env.RESUMES_DIR)
            },
            filename: function (req, file, cb) {
                cb(null, req.params.candidateId + '-' + file.originalname);
            }
        });

        var uploadResume = multer({ storage: storage });

        return uploadResume;
    },
    uploadDocument: function (res, status, content) { // Upload documents for job package
        var storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, process.env.JOB_PACKAGE_DOCUMENTS_DIR)
            },
            filename: function (req, file, cb) {
                cb(null, req.params.jobId + '-' + file.originalname);
            }
        });

        var uploadDocument = multer({ storage: storage });

        return uploadDocument;
    },
    uploadOfferDocument: function (res, status, content) { // Upload documents for job package
        var storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, process.env.OFFER_DOCUMENTS_DIR)
            },
            filename: function (req, file, cb) {
                cb(null, req.params.offerId + '-' + file.originalname);
            }
        });

        var offerDocument = multer({ storage: storage });

        return offerDocument;
    }
};
