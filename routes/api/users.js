const express = require("express");
const jwt = require("jsonwebtoken");
const passport = require('passport');

const router = express.Router();

const validateLoginInput = require("../../validation/login");
const validateEmailInputs = require("../../validation/sendEmail");
const keys = require("../../config/keys");
const mailerProxy = require('../../emailUtility/mailerproxy');

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);
    if (!isValid) {
        return res.status(400).json({
            success: false,
            message: errors
        });
    }
    const username = req.body.username;
    const password = req.body.password;

    if (username != keys.ADMIN_EMAIL || password != keys.ADMIN_PASSWORD) {
        return res.status(400).json({
            success: false,
            message: "Incorrect credentials"
        });
    }

    // You can add you logic to authenticate user from the DB

    const payload = {
        username: req.body.username
    };

    jwt.sign(
        payload,
        keys.secretOrKey,
        {
            expiresIn: 31556926 // 1 year in seconds
        },
        (err, token) => {
            res.json({
                success: true,
                token: "Bearer " + token
            });
        }
    );
});


// @route POST api/users/sendMail
// @desc sends emails
// @access Private
router.post('/sendMail', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validateEmailInputs(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    var token = req.headers['authorization'] || req.headers['x-access-token'];
    if (token && token.startsWith("Bearer ")) {
        token = token.slice(7, token.length);
    }
    var decoded = jwt.decode(token, { complete: true });
    var username = decoded.payload.username;

    mailerProxy(req, res, {
        username
    });
});

module.exports = router;