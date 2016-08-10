/**
 * Created by Tim Ho on 8/8/2016.
 */

var nconf = module.exports = require('nconf');
var path = require('path');

// 1. Load constants from json config file
nconf.file({ file: path.join(__dirname, 'config.json') })
// 2. Defaults
    .defaults({
        // The info deemed as sensitive needs to be stored in .env
            JWT_SECRET: process.env.JWT_SECRET,
            MAIL_PASSWORD:process.env.MAIL_PASSWORD,
            PROD_DB_SERVER_PASSWORD:process.env.PROD_DB_SERVER_PASSWORD
    });
