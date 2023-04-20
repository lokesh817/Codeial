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
        req.flash('error',"Invalid username/password");
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
module.exports=passport;

// const passport=require('passport');
// const User = require('../models/user');

// const LocalStrategy=require('passport-local').Strategy;

// passport.use(new LocalStrategy({
//   usernameField:'email',
//   passReqToCallback:true
// },
//   async function(email,password,done){
     
//       const user=await User.findOne({email});
//       // console.log(user);
//       if(!user||user.password!=password){
//         console.log('wrong');
//         //req.flash('error',"Invalid username/password");
//         return done(null,false);
//     }

//   return done(null,user);
// }
// ));

// passport.serializeUser(function(user,done){
//   done(null,user.id);
// });

// passport.deserializeUser(async function(id,done){
//   const userId=await User.findById(id);
//   console.log(userId);
//   return done(null,userId);
     
// });