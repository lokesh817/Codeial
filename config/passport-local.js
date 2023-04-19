const passport=require('passport');
const localStrategy= require('passport-local');
const User=require('../models/user');
passport.use(new localStrategy({userNAmeField:'email'}),function(email,password,done){
    //find user and establise a session 
    User.findOne({email:email})
        .then(function(){
            if(!User || User.password!= password){
                console.log('Invalid Username and Password');
                return done(null,false);
            }
            return done(null,user);
        })
        .catch(function(err){
            console.log('error in finding user--> password');
            return done(err);
        })
});

// serializing user to decide whihkey is to be kept in cookie
passport.serializeUser(function(user,done){
    done(null,user.id);
});

// deserializing user from the key in the cookies
passport.deserializeUser(function(id,done){
    User.findOne(id)
        .then(function(user){
            return done(null,user);
        })
        .catch(function(err){
            console.log('error in finding user--> password');
            return done(err);
        })
})
module.exports=passport;