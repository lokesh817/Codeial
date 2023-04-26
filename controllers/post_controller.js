const Post= require('../models/post');
const Comment=require('../models/comment');
module.exports.create=function(req,res){
    Post.create({content:req.body.content,user:req.user._id})
        .then(function(){
            return res.redirect('back');
        })
        .catch(function(err){
            console(err,'error in post creation');return;
        })
}
module.exports.destroy=function(req,res){
    Post.findById(req.params.id)
    .then(function(post){
        if(post.user==req.user.id){
            post.deleteOne();
            Comment.deleteMany({post:req.params.id})
            .then(function(){
                return res.redirect('back');
            })
            .catch(function(err){
                return res.redirect('back');
            })
        }
        else{
            return res.redirect('back');
        }
    })
}