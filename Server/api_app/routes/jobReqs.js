/**
 * Created by Tim Ho on 6/20/2016.
 */

var express = require('express');
var router = express.Router();
var sec = require('../security/security.js');

// Include endpoint files
var jobReqEP = require('../endpoints/jobReqEP');

// CRUD routes
router.post('/', sec.getAuth(), jobReqEP.create);
// router.post('/', jobReqEP.create);
router.put('/:id', sec.getAuth(), jobReqEP.update);
// router.put('/:id', jobReqEP.update);
router.delete('/:id', sec.getAuth(), jobReqEP.delete);
// router.delete('/:id', jobReqEP.delete);
router.get('/:id', sec.getAuth(), jobReqEP.findById);
// router.get('/:id', jobReqEP.findById);



// Routes to operations made by recruiters
// Search for requisitions by criteria (job name/description/requirements)
router.get('/searchForReqs/:name/:description/:requirements', sec.getAuth(), jobReqEP.searchForReqs);

// router.put('/assignCandidateToReq/:jobId/:candidateId', jobReqEP.assignCandidateToReq);
router.put('/assignCandidateToReq/:jobId/:candidateId', sec.getAuth(), jobReqEP.assignCandidateToReq);

// Routes to operations made by candidates
// router.get('/', auth, jobReqEP.viewJobPacket);
router.get('/', jobReqEP.viewJobPacket); // view job listings?

module.exports = router;
