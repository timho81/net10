/**
 * Created by Tim Ho on 6/20/2016.
 */

var express = require('express');
var router = express.Router();
var sec = require('../security/security.js');

// Include endpoint files
var candidateEP = require('../endpoints/candidateEP');

// Candidate CRUDs for recruiters
// POST /api/{version}/candidates
router.post('/', sec.getAuth(), candidateEP.create);
// router.post('/', candidateEP.create);
// PUT /api/{version}/candidates
router.put('/:id', sec.getAuth(), candidateEP.update);
// router.put('/:id', candidateEP.update);
// DELETE /api/{version}/candidates
router.delete('/:id', sec.getAuth(), candidateEP.delete);
// router.delete('/:id', candidateEP.delete);

// GET /api/{version}/candidates/id
router.get('/:id', sec.getAuth(), candidateEP.findById);
// router.get('/:id', candidateEP.findById);

// Candidate Summary CRUDs for recruiters
// POST /api/{version}/candidates/summary/profileId
router.post('/summary/:candidateId', sec.getAuth(), candidateEP.addSummary);
// router.post('/summary/:candidateId', candidateEP.addSummary);
// PUT /api/{version}/candidates/summary/candidateId
router.put('/summary:candidateId', sec.getAuth(), candidateEP.updateSummary);
// router.put('/summary/:candidateId', candidateEP.updateSummary);
// DELETE /api/{version}/candidates/summary/candidateId
router.delete('/summary/:candidateId', sec.getAuth(), candidateEP.deleteSummary);
// router.delete('/summary/:candidateId', candidateEP.deleteSummary);
// GET /api/{version}/candidates/summary/candidateId
router.get('/summary/:candidateId', sec.getAuth(), candidateEP.findSummaryByCandidateId);
// router.get('/summary/:candidateId', candidateEP.findSummaryByCandidateId);


// For managers
// router.get('/', sec.getAuth(), candidateEP.swipeCandidateSummaries);
router.get('/', candidateEP.swipeCandidateSummaries);
// router.get('/', sec.getAuth(), candidateEP.viewCandidateResume);
router.get('/', candidateEP.viewCandidateResume);
// router.post('/', sec.getAuth(), candidateEP.passCandidate);
router.post('/', candidateEP.passCandidate);
// router.post('/', sec.getAuth(), candidateEP.offerCandidate);
router.post('/', candidateEP.offerCandidate);


module.exports = router;