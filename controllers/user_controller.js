const User=require('../models/user');
module.exports.profile=function(req,res){
    return res.render('user',{
        title:'User'
    })
}
module.exports.signIn=function(req,res){
    return res.render('user-sign-in',{
        title:'Codeial | sign In'
    })
}
module.exports.signUp=function(req,res){
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
                        return res.redirect('./user/sign-in');
                    })
                    .catch(function(err){
                        if(err){ console.log('error in user creation'); return;}        
                    })
            }
            return res.redirect('back');
        })
        .catch(function(err){
            if(err){ console.log('error in finding user email'); return;}
        })
}
module.exports.createSession=function(req,res){
    //do later
}