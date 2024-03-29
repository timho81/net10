/**
 * Created by Tim Ho on 7/1/2016.
 *
 * The router routes client requests to interviewEP endpoint by mapping interviews url patterns for request processing
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
    .put('/changeState/:id/:state', sec.getAuth(), interviewEP.changeState)
    // Candidate acknowledges interest in or ignore a job, if interested, discloses his/her entire profile to the manager
    // .put('/acknowledgeInterestInJob/:candidateId', interviewEP.acknowledgeInterestInJob)
    .put('/acknowledgeInterestInJob/:candidateId', sec.getAuth(), interviewEP.acknowledgeInterestInJob)
    // Manager shows his interest in a candidate by sending him a notification email
    .put('/interestInCandidate/:candidateId/:managerId', sec.getAuth(), interviewEP.interestInCandidate)

    .get('/findInterviewsByCandidate/:candidateId', sec.getAuth(), interviewEP.findInterviewsByCandidate)
    .get('/findInterviewsByManager/:managerId', sec.getAuth(), interviewEP.findInterviewsByManager);
;

module.exports = router;
