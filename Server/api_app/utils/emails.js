/**
 * Created by Tim Ho on 7/20/2016.
 */

var nodeMailer = require('nodemailer');
var utils = require('./utils.js');

module.exports = {
    doSend: function (res, recipient, subject, content) {
        // For gmail successful login, access for less secure apps must be turned on
        var transporter = nodeMailer.createTransport({
            service: process.env.MAIL_SERVICE,
            auth: {
                user: process.env.MAIL_USERNAME, // Your email id
                pass: process.env.MAIL_PASSWORD // Your password
            }
        });

        var mailOptions = {
            from: process.env.MAIL_FROM, // sender address
            to: recipient, // receivers
            subject: subject, // Subject line
            // text: 'content', // plaintext body
            html: content // html body
        };

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                utils.sendJSONresponse(res, 500, error);
                console.log('An error occurred while sending email, message: ' + error);
            } else {
                utils.sendJSONresponse(res, 200, {
                    "status": "sent"
                });
                console.log('Email has been sent: ' + info.response);
            }
        });
    }
};
