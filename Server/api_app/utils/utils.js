/**
 * Created by Tim Ho on 6/27/2016.
 */

// Util method
module.exports = {
    sendJSONresponse: function (res, status, content) {
        res.status(status);
        res.json(content);
    },
    isAuthorized: function(req) {
        var roles = req.payload.authorities;
        var authorized = false;
        for (var i = 0; i< roles.length;i++)
            if (roles[i] == 'ROLE_MANAGER') {
                authorized = true;
                break;
            }
        console.log('#### authorized=' + authorized );
        return authorized;
}
};

