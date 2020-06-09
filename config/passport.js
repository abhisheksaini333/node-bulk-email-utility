const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const opts = {};
const keys = require("../config/keys");
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;
module.exports = passport => {
    passport.use(
        new JwtStrategy(opts, (jwt_payload, done) => {
            const username = jwt_payload.username;
            if (username == keys.ADMIN_EMAIL) {
                return done(null, {
                    username
                });
            }
            return done(null, false);
        })
    );
};