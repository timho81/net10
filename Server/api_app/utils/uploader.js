/**
 * Created by Tim Ho on 7/26/2016.
 */

var multer  = require('multer');

module.exports = {
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
