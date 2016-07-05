/**
 * Created by Tim Ho on 6/14/2016.
 */
var express = require('express');
var router = express.Router();
var sec = require('../security/security.js');

// Include endpoint files
var accountEP = require('../endpoints/accountEP');


// CRUD routes
// POST /api/{version}/accounts/login
router.post('/login', accountEP.login) // Account AuthenC
    // POST /api/{version}/accounts
    .post('/', sec.getAuth(), accountEP.create) // Account Registration
    // PUT /api/{version}/accounts/changePassword/id
    .put('/changePassword/:id', sec.getAuth(), accountEP.changePassword) // Change password
    // PUT /api/{version}/accounts/id
    .put('/:id', sec.getAuth(), accountEP.update)
    // GET /api/{version}/accounts/id
    .get('/:id', sec.getAuth(), accountEP.findById)
    // GET /api/{version}/accounts/findByUsername/username
    .get('/findByUsername/:username', sec.getAuth(), accountEP.findByUsername); // Finder routes

module.exports = router;