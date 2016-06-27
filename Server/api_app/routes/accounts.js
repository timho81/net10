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
// POST /api/{version}/accounts/login
router.post('/login', accountEP.login) // Account AuthenC
    // POST /api/{version}/accounts
    .post('/', auth, accountEP.setup) // Account Registration
    // PUT /api/{version}/accounts/changePassword/id
    .put('/changePassword/:id', auth, accountEP.changePassword) // Change password
    // PUT /api/{version}/accounts/id
    .put('/:id', auth, accountEP.modify)
    // GET /api/{version}/accounts/id
    .get('/:id', auth, accountEP.findById)
    // GET /api/{version}/accounts/findByUsername/username
    .get('/findByUsername/:username', auth, accountEP.findByUsername); // Finder routes

module.exports = router;