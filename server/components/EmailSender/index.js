var nodemailer = require('nodemailer');
var path = require('path');
var Emails = require('./Emails');

var config = JSON.parse(fs.readFileSync(path.join(__dirname, "../../..", "config.json"), "utf8"));

var EmailSender = function (options) {
    this.mailOptions = {
        from: options.from,
        to: options.to,
        bcc: options.bcc,
        subject: options.subject,
        html: options.html,
    }

    this.send = function () {
        var transporter = nodemailer.createTransport("SMTP", {
            host: 'smtp.office365.com',
            port: '587',
            auth: {
                user: config.email.username,
                pass: config.email.password,
            },
            secureConnection: false,
            tls: {
                ciphers: 'SSLv3'
            }
        });
        transporter.sendMail(this.mailOptions, function(error, info){
            if(error){ return console.log(error); }
            console.log('Message sent: ' + options.subject);
        });
    }
}

module.exports = EmailSender;
module.exports.Emails = Emails;
