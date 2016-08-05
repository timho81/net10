/**
 * Created by Tim Ho on 6/16/2016.
 */

var express = require('express');
var router = express.Router();
var sec = require('../security/security.js');
// var uploader = require('../utils/uploader.js');

// Include endpoint files
var profileEP = require('../endpoints/profileEP');

// CRUD routes for profile
// router.post('/:candidateId', sec.getAuth(), uploader.uploadResume().single('resume'), profileEP.create)
//       .put('/:id/:candidateId', sec.getAuth(), uploader.uploadResume().single('resume'), profileEP.update)
//       .get('/:id', sec.getAuth(), profileEP.findById);

router.post('/:candidateId', sec.getAuth(), profileEP.create)
    .put('/:id/:candidateId', sec.getAuth(), profileEP.update)
    .get('/:id', sec.getAuth(), profileEP.findById);

// router.post('/:candidateId', profileEP.create)
//     .put('/:id', profileEP.update)
//     .get('/:id', profileEP.findById);

// Finder methods will go here

// CRUD routes for Company Contact
// POST /api/{version}/profiles/companyContact
router.post('/companyContact', sec.getAuth(), profileEP.createContact)
      // PUT /api/{version}/profiles/companyContact/companyContactId
      .put('/companyContact/:companyContactId', sec.getAuth(), profileEP.updateContact);

// router.post('/updateSettings', sec.getAuth(), profileEP.updateSettings)

module.exports = router;