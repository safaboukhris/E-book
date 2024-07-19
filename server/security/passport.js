const { userModel } = require("../models/user");

var JwtStrategy = require("passport-jwt").Strategy,
    ExtractJwt = require("passport-jwt").ExtractJwt;
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET;

module.exports = (passport) => {
    return passport.use(
    new JwtStrategy(opts, async function (jwt_payload, done) {
        console.log(jwt_payload);
        const user = await userModel.findOne({ _id: jwt_payload.id });
        console.log(user);
            if (user) {
        return done(null, user);
    } else {
        return done(null, false);
        // or you could create a new account
    }
    })
);
};