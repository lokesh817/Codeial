const passport=require('passport');
const LocalStrategy= require('passport-local').Strategy;
const User=require('../models/user');
passport.use(new LocalStrategy({usernameField:'email',passReqToCallback:true},async function(req,email,password,done){
    //find user and establise a session 
    // User.findOne({email:email})
    //     .then(function(user){
    //         if(!user || user.password!= password){
    //             console.log('Invalid Username and Password');
    //             return done(null,false);
    //         }
    //         return done(null,user);
    //     })
    //     .catch(function(err,done){
    //         console.log('error in finding user--> password');
    //         return done(err);
    //     })
    const user=await User.findOne({email});
      // console.log(user);
      if(!user||user.password!=password){
        console.log('wrong');
       // req.flash('error',"Invalid username/password");
        return done(null,false);
      }

    return done(null,user);
}));

// serializing user to decide whihkey is to be kept in cookie
passport.serializeUser(function(user,done){
    done(null,user.id);
});

// deserializing user from the key in the cookies
passport.deserializeUser(async function(id,done){
    // User.findOne(id)
    //     .then(function(user){
    //         return done(null,user);
    //     })
    //     .catch(function(err){
    //         console.log('error in finding user--> password');
    //         return done(err);
    //     })
    const userId=await User.findById(id);
    console.log(userId);
    return done(null,userId);
});

// check if the user is authenticated
passport.checkAuthentication = function(req, res, next){
    // if the user is signed in, then pass on the request to the next function(controller's action)
    
    if (req.isAuthenticated()){
        return next();
    }

    // if the user is not signed in
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req, res, next){
    if (req.isAuthenticated()){
        // req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
        res.locals.user = req.user;
    }

    next();
}



module.exports = passport;