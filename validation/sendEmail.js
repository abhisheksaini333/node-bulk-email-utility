const Validator = require("validator");
const isEmpty = require("is-empty");
const _ = require("lodash");

module.exports = function validateEmailInputs(data) {
    let errors = {};

    data.providers = !isEmpty(data.providers) ? data.providers : {};
    data.fromEmail = !isEmpty(data.fromEmail) ? data.fromEmail : "";
    data.genericSubject = !isEmpty(data.genericSubject) ? data.genericSubject : "";
    data.genericMailBody = !isEmpty(data.genericMailBody) ? data.genericMailBody : "";
    data.recipients = !isEmpty(data.recipients) ? data.recipients : [];

    // provider checks
    if (_.isEmpty(data.providers)) {
        errors.providers = "providers are required";
    } else if (_.isEmpty(data.providers.mailgun)) {
        errors.mailgun = "mailgun details are required";
    } else if (_.isEmpty(data.providers.nodemailer)) {
        errors.nodemailer = "nodemailer details are required";
    }
    // fromEmail check
    if (Validator.isEmpty(data.fromEmail)) {
        errors.fromEmail = "fromEmail is required";
    } else if (!Validator.isEmail(data.fromEmail)) {
        errors.fromEmail = "fromEmail is invalid";
    }
    // genericSubject check
    if (Validator.isEmpty(data.genericSubject)) {
        errors.genericSubject = "genericSubject is required";
    }
    // genericMailBody check
    if (Validator.isEmpty(data.genericMailBody)) {
        errors.genericMailBody = "genericMailBody is required";
    }
    // recipients check
    if (_.isEmpty(data.recipients)) {
        errors.recipients = "recipients are required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};