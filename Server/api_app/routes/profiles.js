/**
 * Created by Tim Ho on 6/16/2016.
 */

var express = require('express');
var router = express.Router();

var jwt = require('express-jwt');
var auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload'
});

// Include endpoint files
var profileEP = require('../endpoints/profileEP');

// CRUD routes for profile
// POST /api/{version}/profiles/candidateId
router.post('/:candidateId', auth, profileEP.create)
      // PUT /api/{version}/profiles
      .put('/:id', auth, profileEP.update)
      // GET /api/{version}/profiles/id
      .get('/:id', auth, profileEP.findById);

// router.post('/:candidateId', profileEP.create)
//     .put('/:id', profileEP.update)
//     .get('/:id', profileEP.findById);

// Finder methods will go here

// CRUD routes for Company Contact
// POST /api/{version}/profiles/companyContact
router.post('/companyContact', auth, profileEP.createContact)
      // PUT /api/{version}/profiles/companyContact
      .put('/companyContact/:id', auth, profileEP.updateContact);

// router.post('/updateSettings', auth, profileEP.updateSettings)

module.exports = router;