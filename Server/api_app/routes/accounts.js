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


// Account AuthenC
router.post('/login', accountEP.login);

// CRUD routes
router.post('/', auth, accountEP.create); // Account Registration
// router.post('/', accountEP.create);
router.put('/:id', auth, accountEP.modify);
// router.put('/:id', accountEP.modify);
router.get('/:id', auth, accountEP.findById);

// Finder routes
// router.get('/findByUsername/:username', accountEP.findByUsername);
router.get('/findByUsername/:username', auth, accountEP.findByUsername);

//
module.exports = router;