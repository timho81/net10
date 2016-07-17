/**
 * Created by Tim Ho on 7/17/2016.
 */

var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.status('200');
    res.json({
        "status":"running"
    });
});

module.exports = router;
