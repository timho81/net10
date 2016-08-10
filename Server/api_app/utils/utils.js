/**
 * Created by Tim Ho on 6/27/2016.
 */

// Util methods
module.exports = {
    sendJSONresponse: sendJSONresponse
};

function sendJSONresponse (res, status, content) {
    res.status(status);
    res.json(content);
}



