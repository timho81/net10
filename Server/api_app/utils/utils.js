/**
 * Created by Tim Ho on 6/27/2016.
 */

// Util method
module.exports = {
    sendJSONresponse: function (res, status, content) {
        res.status(status);
        res.json(content);
    },
    isAuthorized: function(req, roles) {
        var authorities = req.payload.authorities;
        var authorized = false;

        if (roles.indexOf(',') == -1) {// one role only
            for (var i = 0; i< authorities.length;i++)
                if (roles == authorities[i]) {
                    authorized = true;
                    break;
                }
        } else {
            for (var i = 0; i< authorities.length;i++)
                if (roles.split(',').indexOf(authorities[i]) == 1) {
                    authorized = true;
                    break;
                }
        }

        console.log('authorized=' + authorized);
        return authorized;
}
};

