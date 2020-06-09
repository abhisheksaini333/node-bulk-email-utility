const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateLoginInput(data) {
    let errors = {};

    data.username = !isEmpty(data.username) ? data.username : "";
    data.password = !isEmpty(data.password) ? data.password : "";

    // Email checks
    if (Validator.isEmpty(data.username)) {
        errors.username = "username is required";
    } else if (!Validator.isEmail(data.username)) {
        errors.username = "username is invalid";
    }
    // Password check
    if (Validator.isEmpty(data.password)) {
        errors.password = "password is required";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};