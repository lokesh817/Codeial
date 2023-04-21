const User=require('../models/user');

module.exports.profile=function(req,res){
    console.log("*****")
    return res.render('user',{
        title:'User'
    })
}
module.exports.signIn=function(req,res){
    //if user already signed in it should not go to sign in page
    if(req.isAuthenticated()){
        return res.redirect('/user/profile')
    }
    return res.render('user-sign-in',{
        title:'Codeial | sign In'
    })
}
module.exports.signUp=function(req,res){
    //if user already signed in it should not go to sign up page
    if(req.isAuthenticated()){
        return res.redirect('/user/profile')
    }
    return res.render('user-sign-Up',{
        title:'Codeial | sign Up'
    })
}
module.exports.create=function(req,res){
    if(req.body.password!=req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email: req.body.email})
        .then(function(user){
            if(!user){
                User.create(req.body)
                    .then(function(user){
                        return res.redirect('/user/sign-in');
                    })
                    .catch(function(err){
                        console.log(err,'error in user creation'); return;        
                    })
            }
            else{
                return res.redirect('back');
            }
            
        })
        .catch(function(err){
           console.log('error in finding user email'); return;
        })
}
module.exports.createSession=function(req,res){
    //do later
    return res.redirect('/');
}
module.exports.destroySession=function(req,res){
    req.logout(function(err){
        if(err){console.log(err,'error is logging out');}       
        return res.redirect('/');
    });
    
}