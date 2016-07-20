/**
 * Created by Tim Ho on 7/20/2016.
 */

var nodeMailer = require('nodemailer');

module.exports = {
    doSend: function (recipient, subject, content) {
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
            if(error){
                return console.log(error);
            }
            console.log('Email has been sent: ' + info.response);
        });
    }
};
