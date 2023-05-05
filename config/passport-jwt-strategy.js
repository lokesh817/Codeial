const passport = require('passport');
const JWTStarategy = require('passport-jwt').Strategy;
const extractJWT = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
let opts={
    jwtFromRequest : extractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'codeial'
}
passport.use(new JWTStarategy(opts, async function(jwtPayload,done){
    let user=await User.findById(jwtPayload._id)
    try{
        if(user){return done(null,user);}
        else{ return done(null,false);}
    }
    catch(err){console.log('Error in finding user from JWT');return}
}))