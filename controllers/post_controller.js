const Post= require('../models/post');

module.exports.create=function(req,res){
    Post.create({content:req.body.content,user:req.user._id})
        .then(function(){
            return res.redirect('back');
        })
        .catch(function(err){
            console(err,'error in post creation');return;
        })
}
