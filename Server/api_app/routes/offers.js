/**
 * Created by Tim Ho on 7/5/2016.
 */

var express = require('express');
var router = express.Router();

var sec = require('../security/security.js');

var offerEP = require('../endpoints/offerEP');

// Walks manager through the offer creation process,
// allow custom offer letter and other package contents to be
// sent to candidate
router.post('/', sec.getAuth(), offerEP.create);

router.post('/createOfferPackage', sec.getAuth(), offerEP.createOfferPackage);

// router.post('/sendOfferLetter', offerEP.sendOfferLetter);
router.post('/sendOfferLetter', sec.getAuth(), offerEP.sendOfferLetter);

module.exports = router;