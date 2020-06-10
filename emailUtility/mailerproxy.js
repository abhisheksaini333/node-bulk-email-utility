const _ = require('lodash');
const nodemailer = require('nodemailer');
const mailgun = require('nodemailer-mailgun-transport');
const async = require("async");

module.exports = (req, res, { username }) => {
    const {
        fromEmail,
        providers,
        recipients,
        genericSubject,
        genericMailBody,
        detailsRequiredInResponse
    } = req.body;

    try {
        var success_recipients = [];
        var failure_recipients = [];
        var fallbackProviderInvoked = false;


        var primaryTransport = nodemailer.createTransport({
            service: providers.nodemailer.mailSevice,
            auth: {
                user: providers.nodemailer.authUser,
                pass: providers.nodemailer.authPass
            }
        });

        var mailgunAuth = {
            auth: {
                api_key: providers.mailgun.apiKey,
                domain: providers.mailgun.domain
            }
        };
        var secondaryTransport = nodemailer.createTransport(mailgun(mailgunAuth));

        function bulkMailer(tpt, recipients) {
            var self = this;
            transporter = tpt;
            self.recipients = recipients; // You can fetch your receipents from the DB if needed, as of now I supplied it from the request
            self.startMailing();
        }

        bulkMailer.prototype.startMailing = function () {
            var self = this;
            async.each(self.recipients, self.SendEmail, function () {
                console.log("success: ====>");
                console.log(success_recipients);
                console.log("failure: ====>");
                console.log(failure_recipients);
                if (failure_recipients.length > 0 && !fallbackProviderInvoked) {
                    console.log('Switching to secondary provider, Invloking fallback transport...');
                    fallbackProviderInvoked = true;
                    // switch to fallback provider
                    new bulkMailer(secondaryTransport, failure_recipients);
                    failure_recipients = [];
                } else {
                    let response = {
                        success: true,
                        message: "All mails triggered",
                    };
                    if (detailsRequiredInResponse) {
                        response.failure_recipients = failure_recipients;
                        response.success_recipients = success_recipients;
                    }
                    return res.status(200).json(response);
                }
            });
        };

        bulkMailer.prototype.SendEmail = function (recipient, callback) {
            console.log("Sending email to " + recipient.email);
            var self = this;
            self.status = false;
            async.waterfall([
                function (callback) {
                    var mailOptions = {
                        from: fromEmail,
                        to: recipient.email,
                        subject: `Hi ${recipient.name} - ${recipient.subject || genericSubject}!!`,
                        html: `Hi ${recipient.name},<br/><br/>
                              ${recipient.mailBody || genericMailBody}`
                    };
                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.log(error)
                            failure_recipients.push(recipient);
                        } else {
                            self.status = true;
                            success_recipients.push(recipient);
                        }
                        callback(null, self.status, recipient);
                    });
                },
                function (statusCode, recipient, callback) {
                    // You can call your own APIs here OR update your DB records for the mail sent status
                    console.log("Recipient: " + recipient.email + " :: Sent Status: " + statusCode);
                    callback();
                }
            ], function () {
                callback();
            });
        };

        new bulkMailer(primaryTransport, recipients);

    } catch (ex) {
        return res.status(400).json({
            success: false,
            message: JSON.stringify(ex)
        });
    }
};