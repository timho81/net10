/**
 * Created by Tim Ho on 7/20/2016.
 */

var nodeMailer = require('nodemailer');
var config = require('../../config');
var utils = require('./utils.js');

module.exports = {
    doSend: doSend
};

function doSend (res, recipient, subject, content) {
        // For gmail successful login, access for less secure apps must be turned on
        var transporter = nodeMailer.createTransport({
            service: config.get('MAIL_SERVICE'),
            auth: {
                user: config.get('MAIL_USERNAME'), // Your email id
                pass: config.get('MAIL_PASSWORD') // Your password
            }
        });

        var mailOptions = {
            from: config.get('MAIL_FROM'), // sender address
            to: recipient, // receivers
            subject: subject, // Subject line
            // text: 'content', // plaintext body
            html: content // html body
        };

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log('An error occurred while sending email, message: ' + error);
            } else {
                console.log('Email has been sent: ' + info.response);
            }
        });
    }

