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
    isAuthorized: function(req, requiredAuthorities) {
        var grantedAuthority = req.payload.authority;
        var authorized = false;

        if (requiredAuthorities.indexOf(',') == -1) {// only one role required to access a certain realm
            if (requiredAuthorities == grantedAuthority)
                authorized = true;
        } else { // either of multiple roles required to access a certain realm
            if (requiredAuthorities.split(',').indexOf(grantedAuthority) == 1)
                authorized = true;
        }

        return authorized;
    }
};
