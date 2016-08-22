/**
 * Created by Tim Ho on 6/20/2016.
 */

var express = require('express');
var router = express.Router();
var sec = require('../security/security.js');

// var fileHander = require('../utils/fileHander.js');

// Include endpoint files
var candidateEP = require('../endpoints/candidateEP');

// Candidate CRUDs for recruiters
// POST /api/{version}/candidates

// router.post('/', candidateEP.create);
router.post('/', sec.getAuth(), candidateEP.create);

// PUT /api/{version}/candidates
router.put('/:id', sec.getAuth(), candidateEP.update);
// router.put('/:id', candidateEP.update);
// DELETE /api/{version}/candidates
router.delete('/:id', sec.getAuth(), candidateEP.delete);
// router.delete('/:id', candidateEP.delete);

// GET /api/{version}/candidates/id
router.get('/:id', sec.getAuth(), candidateEP.findById);
// router.get('/:id', candidateEP.findById);

// router.get('/searchForCandidates/:keywords', candidateEP.searchForCandidates);
router.get('/searchForCandidates/:keywords', sec.getAuth(), candidateEP.searchForCandidates);

// This method helps trace candidates he/she has created
// router.get('/findCandidatesByRecruiter/:recruiterId', candidateEP.findCandidatesByRecruiter);
router.get('/findCandidatesByRecruiter/:recruiterId', sec.getAuth(), candidateEP.findCandidatesByRecruiter);

router.put('/matchJobWithCandidate/:candidateId/:jobId/:managerId', candidateEP.matchJobWithCandidate);
// router.put('/matchJobWithCandidate/:candidateId/:jobId', sec.getAuth(), candidateEP.matchJobWithCandidate);

// upload files onto GCP and save them there, for later usage, all file-related operations go through backend

// Attach resumes
// router.post('/addResume/:candidateId', fileHander.gcsFileUploadMulter.single('document'), fileHander.uploadFileToGCS, candidateEP.addResume);

// router.delete('/addResume/:candidateId', sec.getAuth(), candidateEP.addResume);
// router.put('/updateResume/:candidateId', candidateEP.updateResume);
// router.delete('/updateResume/:candidateId', sec.getAuth(), candidateEP.updateResume);
// router.delete('/deleteResume/:candidateId', candidateEP.deleteResume);
// router.delete('/deleteResume/:candidateId',sec.getAuth(), candidateEP.deleteResume);

// Candidate Summary CRUDs for recruiters
// router.post('/summaries/:candidateId', candidateEP.createSummaries);
router.post('/summaries/:candidateId', sec.getAuth(), candidateEP.createSummaries);

// router.put('/summaries/:candidateId', candidateEP.updateSummaries);
router.put('/summaries/:candidateId', sec.getAuth(), candidateEP.updateSummaries);

// router.delete('/summaries/:candidateId', candidateEP.deleteSummaries);
router.delete('/summaries/:candidateId', sec.getAuth(), candidateEP.deleteSummaries);

// router.get('/summaries/:candidateId', candidateEP.findSummariesByCandidateId);
router.get('/summaries/:candidateId', sec.getAuth(), candidateEP.findSummariesByCandidateId);


// For managers
// router.get('/summaries/:all', sec.getAuth(), candidateEP.swipeCandidateSummaries);
// router.get('/summaries/:all', candidateEP.swipeCandidateSummaries);
// router.get('/viewResume/:candidateId', sec.getAuth(),candidateEP.viewResume);

// router.get('/viewResume/:candidateId', candidateEP.viewResume);

// router.post('/', sec.getAuth(), candidateEP.passCandidate);
// router.post('/', candidateEP.passCandidate);
// router.post('/', sec.getAuth(), candidateEP.offerCandidate);
// router.post('/', candidateEP.offerCandidate);


module.exports = router;