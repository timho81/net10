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
router.post('/', auth, profileEP.create)
      .put('/:id', auth, profileEP.update)
      .get('/:id', auth, profileEP.findById);
// Finder methods will go here

// CRUD routes for Company Contact
router.post('/companyContact', auth, profileEP.create)
      .put('/companyContact/:id', auth, profileEP.update);

module.exports = router;