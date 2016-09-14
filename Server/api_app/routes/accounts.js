/**
 * Created by Tim Ho on 6/14/2016.
 *
 * The router routes client requests to accountEP endpoint by mapping accounts url patterns for request processing
 */
var express = require('express');
var router = express.Router();
var sec = require('../security/security.js');

// Include endpoint files
var accountEP = require('../endpoints/accountEP');


// CRUD routes
router.post('/login', accountEP.login) // Account AuthenC
    .post('/', accountEP.create) // Account Registration
    .put('/changePassword/:id', sec.getAuth(), accountEP.changePassword) // Change password
    // .put('/:id', accountEP.update)
    .put('/:id', sec.getAuth(), accountEP.update)
    .get('/:id', sec.getAuth(), accountEP.findById)
    .get('/findByEmail/:email', sec.getAuth(), accountEP.findByEmail); // Finder routes

module.exports = router;