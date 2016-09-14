var mongoose = require('mongoose');

var config = require('../../config');

module.exports = {
    makeDBConnection: makeMongoDBConnection
};

// Connect to mongodb, specify DEPLOYMENT_MODE to switch between development and production envs,
// database settings reside in config.json (under app root dir)
function makeMongoDBConnection () {
    var dbConnectionUrl = null;
    // Need to specify deployment modes: DEV/QA/STAGING/PROD in config.json
    if (config.get('DEPLOYMENT_MODE') == 'DEV'){
        // Example: mongodb://localhost/net10
        dbConnectionUrl = config.get('DEV_DB_SERVER_VENDOR') + '://' + config.get('DEV_DB_SERVER_ADDRESS') +
            '/' + config.get('DEV_DB_NAME');
    } else if (config.get('DEPLOYMENT_MODE') == 'PROD') {
        // Db connection url format: DB_VENDOR://DB_USERNAME:DB_PASSWORD@SERVER_ADDRESS:PORT/DB_NAME
        dbConnectionUrl = config.get('PROD_DB_SERVER_VENDOR') + '://' + config.get('PROD_DB_SERVER_USER') + ':' + config.get('PROD_DB_SERVER_PASSWORD') +
            '@' + config.get('PROD_DB_SERVER_ADDRESS') + ':' + config.get('PROD_DB_SERVER_PORT') + '/' + config.get('PROD_DB_NAME');
    }

    mongoose.connect(dbConnectionUrl, function(err, database) {
        if(err) {
            console.log('Failed to connect to MongoDB', err);
        } else {
            console.log('Connected to MongoDB successfully');
        }
    });
}


