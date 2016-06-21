/**
 * Created by Tim Ho on 6/14/2016.
 */
var express = require('express');
var router = express.Router();

// Include endpoint files
var accountEP = require('../endpoints/accountEP');

var jwt = require('express-jwt');
var auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload'
});

// CRUD routes
router.post('/login', accountEP.login) // Account AuthenC
    .post('/', auth, accountEP.setup) // Account Registration
    .put('/:id', auth, accountEP.modify)
    .get('/:id', auth, accountEP.findById)
    .get('/findByUsername/:username', auth, accountEP.findByUsername); // Finder routes

module.exports = router;