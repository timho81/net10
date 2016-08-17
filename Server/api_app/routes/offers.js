/**
 * Created by Tim Ho on 7/5/2016.
 */

var express = require('express');
var router = express.Router();

var sec = require('../security/security.js');
// var uploader = require('../utils/uploader.js');
var offerEP = require('../endpoints/offerEP');

// Walks manager through the offer creation process,
// allow custom offer letter and other package contents to be
// sent to candidate
// router.post('/', sec.getAuth(), offerEP.create);
router.put('/:offerId', sec.getAuth(), offerEP.update);

router.post('/createOfferPackage', sec.getAuth(), offerEP.createOfferPackage);

// Pass candidate
router.post('/passCandidate', offerEP.passCandidate);
// router.post('/passCandidate', sec.getAuth(), offerEP.passCandidate);

// Extend Offer - Send Offer Letter to candidate
// router.post('/sendOfferLetter', offerEP.sendOfferLetter);
router.put('/extendOffer/:offerId', sec.getAuth(), offerEP.extendOffer);

// router.post('/document/:offerId', sec.getAuth(), uploader.uploadOfferDocument().single('document'),  offerEP.addOfferDocument);
// router.put('/document/:offerId', sec.getAuth(), uploader.uploadOfferDocument().single('document'),  offerEP.updateOfferDocument);
router.delete('/document/:offerId', sec.getAuth(), offerEP.deleteOfferDocument);

// Operations made by candidates
router.put('/rescindOffer/:offerId', sec.getAuth(), offerEP.rescindOffer);
router.put('/respondOffer/:offerId', sec.getAuth(), offerEP.respondOffer);

router.get('/findOffersByCandidate/:candidateId', sec.getAuth(), offerEP.findOffersByCandidate);
router.get('/findOffersByManager/:managerId', sec.getAuth(), offerEP.findOffersByManager);

module.exports = router;