/**
 * Created by Tim Ho on 6/16/2016.
 */

var express = require('express');
var router = express.Router();

var jwt = require('express-jwt');
var auth = jwt({
    secret: '01ten_secret',
    userProperty: 'payload'
});

// Include endpoint files
var profileEP = require('../endpoints/profileEP');

// CRUD routes
router.post('/', auth, profileEP.create);
// router.post('/', profileEP.create);
router.put('/:id', auth, profileEP.update);
// router.put('/:id', profileEP.update);
router.get('/:id', auth, profileEP.findById);
// router.get('/:id', profileEP.findById);

// Finder methods will go here

module.exports = router;