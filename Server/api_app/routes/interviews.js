/**
 * Created by Tim Ho on 7/1/2016.
 */

var express = require('express');
var router = express.Router();

var jwt = require('express-jwt');
var auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload'
});

// Include endpoint files
var interviewEP = require('../endpoints/interviewEP');

// router.post('/', auth, interviewEP.create)       // Manager requests an interview
//     .put('/reschedule/:id', auth, interviewEP.reschedule)
//     .put('/respond/:id', auth, interviewEP.respond)// accept/decline an interview by candidates
//     .cancel('/:id', auth, interviewEP.cancel);   // Reject/cancel a scheduled interview

router.post('/', interviewEP.create)       // Manager requests an interview
    .put('/reschedule/:id', interviewEP.reschedule) // Update the scheduled time
    .put('/respond/:id', interviewEP.respond)// accept/decline an interview by candidates
    .put('/:id', interviewEP.cancel);

module.exports = router;
