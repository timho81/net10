/**
 * Created by Tim Ho on 6/27/2016.
 */

// Util method
module.exports = {
    sendJSONresponse: function (res, status, content) {
        res.status(status);
        res.json(content);
    }
};

