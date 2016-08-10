/**
 * Created by Tim Ho on 7/5/2016.
 */

var config = require('../../config');

module.exports = {
    getAuth: getAuth,
    isAuthorized: isAuthorized
};

function getAuth() {
    var jwt = require('express-jwt');
    var auth = jwt({
        secret: config.get('JWT_SECRET'),
        userProperty: 'payload'
    });
    return auth;
}

function isAuthorized(req, requiredAuthorities) {
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

