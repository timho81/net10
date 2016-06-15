/**
 * Created by Tim Ho on 6/14/2016.
 */
var express = require('express');
var router = express.Router();

// Include endpoint files
var accountEP = require('../endpoints/accountEP');

var jwt = require('express-jwt');
var auth = jwt({
    secret: '01ten_secret',
    userProperty: 'payload'
});


// Account AuthenC
router.post('/login', accountEP.login);

// CRUD routes
router.post('/', auth, accountEP.create); // Account Registration
router.put('/:id', auth, accountEP.modify);
router.get('/:id', auth, accountEP.findById);

// Finder routes
router.get('/findByUsername', auth, accountEP.findByUsername);

//
module.exports = router;