/**
 * Created by Tim Ho on 6/20/2016.
 */

var express = require('express');
var router = express.Router();

var jwt = require('express-jwt');
var auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload'
});

// Include endpoint files
var jobReqEP = require('../endpoints/jobReqEP');

// CRUD routes
// router.post('/', auth, jobReqEP.create);
router.post('/', jobReqEP.create);
// router.put('/:id', auth, jobReqEP.update);
router.put('/:id', jobReqEP.update);
// router.delete('/:id', auth, jobReqEP.delete);
router.delete('/:id', jobReqEP.delete);
// router.get('/:id', auth, jobReqEP.findById);
router.get('/:id', jobReqEP.findById);



// Routes to operations made by recruiters
// Search for requisitions by criteria (job name/description/requirements)
// router.get('/:id',  jobReqEP.searchForReqs);
router.get('/:name/:description/:requirements', jobReqEP.searchForReqs);
// router.get('/:id', auth, jobReqEP.assignCandidateToReq);
router.get('/:candidateId/:reqId', jobReqEP.assignCandidateToReq);

// Routes to operations made by candidates
// router.get('/', auth, jobReqEP.viewJobPacket);
router.get('/', jobReqEP.viewJobPacket); // view job listings?

module.exports = router;
