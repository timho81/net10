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
            PROD_DB_SERVER_PASSWORD:process.env.PROD_DB_SERVER_PASSWORD,
        // Json web token for authc
            JWT_SECRET: process.env.JWT_SECRET,
        // Mail server settings
        //     MAIL_PASSWORD:process.env.MAIL_PASSWORD,
        GMAIL_CLIENT_ID:process.env.GMAIL_CLIENT_ID,
        GMAIL_CLIENT_SECRET:process.env.GMAIL_CLIENT_SECRET,
        GMAIL_REFRESH_TOKEN:process.env.GMAIL_REFRESH_TOKEN,
        GMAIL_ACCESS_TOKEN:process.env.GMAIL_ACCESS_TOKEN
    });
