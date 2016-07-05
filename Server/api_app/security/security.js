/**
 * Created by Tim Ho on 7/5/2016.
 */


module.exports = {
    getAuth: function () {
        var jwt = require('express-jwt');
        var auth = jwt({
            secret: process.env.JWT_SECRET,
            userProperty: 'payload'
        });
        return auth;
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

        return authorized;
    }
};
