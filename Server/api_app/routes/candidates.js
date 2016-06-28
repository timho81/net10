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
var candidateEP = require('../endpoints/candidateEP');

// Candidate CRUDs for recruiters
// POST /api/{version}/candidates
router.post('/', auth, candidateEP.create);
// router.post('/', candidateEP.create);
// PUT /api/{version}/candidates
router.put('/:id', auth, candidateEP.update);
// router.put('/:id', candidateEP.update);
// DELETE /api/{version}/candidates
router.delete('/:id', auth, candidateEP.delete);
// router.delete('/:id', candidateEP.delete);

// GET /api/{version}/candidates/id
router.get('/:id', auth, candidateEP.findById);
// router.get('/:id', candidateEP.findById);

// Candidate Summary CRUDs for recruiters
// POST /api/{version}/candidates/summary/profileId
router.post('/summary/:candidateId', auth, candidateEP.addSummary);
// router.post('/summary/:candidateId', candidateEP.addSummary);
// PUT /api/{version}/candidates/summary/candidateId
router.put('/summary:candidateId', auth, candidateEP.updateSummary);
// router.put('/summary/:candidateId', candidateEP.updateSummary);
// DELETE /api/{version}/candidates/summary/candidateId
router.delete('/summary/:candidateId', auth, candidateEP.deleteSummary);
// router.delete('/summary/:candidateId', candidateEP.deleteSummary);
// GET /api/{version}/candidates/summary/candidateId
router.get('/summary/:candidateId', auth, candidateEP.findSummaryByCandidateId);
// router.get('/summary/:candidateId', candidateEP.findSummaryByCandidateId);


// For managers
// router.get('/', auth, candidateEP.swipeCandidateSummaries);
router.get('/', candidateEP.swipeCandidateSummaries);
// router.get('/', auth, candidateEP.viewCandidateResume);
router.get('/', candidateEP.viewCandidateResume);
// router.post('/', auth, candidateEP.passCandidate);
router.post('/', candidateEP.passCandidate);
// router.post('/', auth, candidateEP.offerCandidate);
router.post('/', candidateEP.offerCandidate);


module.exports = router;