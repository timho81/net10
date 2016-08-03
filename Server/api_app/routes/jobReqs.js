/**
 * Created by Tim Ho on 6/20/2016.
 */

var express = require('express');
var router = express.Router();
var sec = require('../security/security.js');
var uploader = require('../utils/uploader.js');

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

// Add job req description separately
router.put('/addDescriptionToReq/:id', sec.getAuth(), jobReqEP.addDescriptionToReq);

// Routes to operations made by recruiters
// Search for requisitions by criteria (job name/description/requirements)
router.get('/searchForReqs/:name/:description/:requirements', sec.getAuth(), jobReqEP.searchForReqs);

// router.put('/assignCandidateToReq/:jobId/:candidateId', jobReqEP.assignCandidateToReq);
router.put('/assignCandidateToReq/:jobId/:candidateId', sec.getAuth(), jobReqEP.assignCandidateToReq);

// router.get('/findCandidatesByJobReq/:id', jobReqEP.findCandidatesByJobReq);
router.get('/findCandidatesByJobReq/:id', sec.getAuth(),  jobReqEP.findCandidatesByJobReq);

// router.get('/findJobReqsByManager/:managerId', jobReqEP.findJobReqsByManager);
router.get('/findJobReqsByManager/:managerId', sec.getAuth(), jobReqEP.findJobReqsByManager);


// Operations on Job Package 's Documents
// router.post('/document/:jobId', uploadDocument.single('document'), jobReqEP.addDocumentToJobPackage);
// router.post('/document/:jobId', sec.getAuth(), uploadDocument.single('document'), jobReqEP.addDocumentToJobPackage);
router.post('/document/:jobId', sec.getAuth(), uploader.uploadDocument().single('document'), jobReqEP.addDocumentToJobPackage);

// router.put('/document/:jobId', uploader.uploadDocument().single('document'), jobReqEP.updateDocumentToJobPackage);
router.put('/document/:jobId', sec.getAuth(),uploader.uploadDocument().single('document'), jobReqEP.updateDocumentToJobPackage);

router.delete('/document/:jobId', jobReqEP.deleteDocumentFromJobPackage);
// router.delete('/document/:jobId', sec.getAuth(), jobReqEP.deleteDocumentFromJobPackage)

// Routes to operations made by candidates
router.get('/', sec.getAuth(), jobReqEP.viewJobPackage);
// router.get('/', jobReqEP.viewJobPackage);

module.exports = router;
