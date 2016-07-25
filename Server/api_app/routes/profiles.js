/**
 * Created by Tim Ho on 6/16/2016.
 */

var express = require('express');
var router = express.Router();

var multer  = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, process.env.RESUMES_DIR)
    },
    filename: function (req, file, cb) {
        cb(null, req.params.candidateId + '-' + file.originalname);
}
});

var uploadResume = multer({ storage: storage });

var jwt = require('express-jwt');
var auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload'
});

// Include endpoint files
var profileEP = require('../endpoints/profileEP');

// CRUD routes for profile
// POST /api/{version}/profiles/candidateId
router.post('/:candidateId', auth, uploadResume.single('resume'), profileEP.create)
      // PUT /api/{version}/profiles
      .put('/:id/:candidateId', auth, uploadResume.single('resume'), profileEP.update)
      // GET /api/{version}/profiles/id
      .get('/:id', auth, profileEP.findById);

// router.post('/:candidateId', profileEP.create)
//     .put('/:id', profileEP.update)
//     .get('/:id', profileEP.findById);

// Finder methods will go here

// CRUD routes for Company Contact
// POST /api/{version}/profiles/companyContact
router.post('/companyContact', auth, profileEP.createContact)
      // PUT /api/{version}/profiles/companyContact/companyContactId
      .put('/companyContact/:companyContactId', auth, profileEP.updateContact);

// router.post('/updateSettings', auth, profileEP.updateSettings)

module.exports = router;