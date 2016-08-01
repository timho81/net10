var mongoose = require('mongoose');

module.exports = {
    makeConnection: function () {
        mongoose.connect(process.env.DB_CONNECTION_URI, function(err, database) {
            if(err) {
                console.log('Failed to connect to database', err);
            } else {
                console.log('Db connected');
            }
        });
    }
};
