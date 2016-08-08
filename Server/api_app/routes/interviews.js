/**
 * Created by Tim Ho on 7/1/2016.
 */

var express = require('express');
var router = express.Router();
var sec = require('../security/security.js');

var interviewEP = require('../endpoints/interviewEP');

// router.post('/', sec.getAuth(), interviewEP.create)       // Manager requests an interview
//     .put('/reschedule/:id', sec.getAuth(), interviewEP.reschedule)
//     .put('/respond/:id', sec.getAuth(), interviewEP.respond)// accept/decline an interview by candidates
//     .cancel('/:id', sec.getAuth(), interviewEP.cancel);   // Reject/cancel a scheduled interview

router.post('/', sec.getAuth(), interviewEP.create)       // Manager requests an interview
    .put('/reschedule/:id', sec.getAuth(), interviewEP.reschedule) // Update the scheduled time
    .put('/respond/:id', sec.getAuth(), interviewEP.respond)// accept/decline an interview by candidates
    .put('/:id', sec.getAuth(), interviewEP.cancel)
    .get('/findInterviewsByManager/:managerId', sec.getAuth(), interviewEP.findInterviewsByManager);
;

module.exports = router;
