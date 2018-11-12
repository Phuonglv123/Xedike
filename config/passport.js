
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {}
// load model

const Account = require('../models/account');
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';
module.exports = (passport) => passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    // console.log(jwt_payload);
    Account.findById(jwt_payload.id)
    .then(account=> {
        if(account){
            return done(null, account)
        }
    })
    .catch(err => console.log(err));
}));