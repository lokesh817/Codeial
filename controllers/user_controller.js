const fs = require('fs');
const path = require('path');
const User = require('../models/user');

module.exports.profile=function(req,res){
    User.findById(req.params.id)
    .then(function(user){
        return res.render('user',{
            title:'User',
            profile_user:user
        });
    })
    .catch(function(err){
        req.flash('error','Error occured while finding user');
        return;
    })
}
module.exports.update=async function(req,res){
    if(req.user.id==req.params.id){
        try{
            let user= await User.findById(req.params.id);
            User.uploadsAvatar(req,res,function(err){
                if(err){console.log('**** multer error:****',err)}
                user.name=req.body.name;
                user.email=req.body.email;
                if(req.file){
                    if(user.avatar){
                        fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                    }
                    user.avatar=User.avatarPath+'/'+req.file.filename;
                }
                user.save();
                return res.redirect('back');
            })
        
        }
        catch(err){
            req.flash('error','Access denied');
            return res.status(401).send('Unauthorized User');
        }
    }else{
        req.flash('error','Unauthorized User!');
        return res.status(401).send('Unauthorized')
    }   
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
                        req.flash('success','Account created')
                        return res.redirect('/user/sign-in');
                    })
                    .catch(function(err){
                        req.flash('error','User not created'); return;        
                    })
            }
            else{
                return res.redirect('back');
            }
            
        })
        .catch(function(err){
            req.flash('error','User id not exists');
            return;
        })
}
module.exports.createSession=function(req,res){
    //do later
    req.flash('success','Sign-in Successfully');
    return res.redirect('/');
}
module.exports.destroySession=function(req,res){
    req.logout(function(err){
        if(err){console.log(err,'error is logging out');}       
        req.flash('success','logged out');
        return res.redirect('/');
    });
    
}