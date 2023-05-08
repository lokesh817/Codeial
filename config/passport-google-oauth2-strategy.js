const passport=require('passport');
// for google authentication
const googleOAuth=require('passport-google-oauth').OAuth2Strategy;
//helps in random passwords generation
const crypto=require('crypto');
const User=require('../models/user');
//tell passport to user new strategy to authenticate
passport.use(new googleOAuth({
    clientID:'1091373711027-d2h5flpeder7d91qc5j7ah4bcaamnva1.apps.googleusercontent.com',
    clientSecret:'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',
    callbackURL:'http://localhost:8000/user/auth/google/callback'
},async function(accessToken,refrsehToken,profile,done){
    try{
        //find user
        let user= await User.findOne({email:profile.emails[0].value});
        // console.log(user);
        // console.log(profile);
        if(user){
            //if find,set user as req.user
            return done(null,user)
        }else{
            //if not found then try to create new user and set as req.user
            try{
                let newUser=await User.create({
                    name:profile.displayName,
                    email:profile.emails[0].value,
                    password:crypto.randomBytes(20).toString('hex')
                });
                if(newUser){
                    return done(null,newUser);
                }
            }catch(err){
                console.log(err,'error in sign up');
            }
        }
    }catch(err){
        console.log(err,'Google sign in not working');
    }
    
}));
module.exports=passport;

