const Comment= require('../models/comment');
const Post=require('../models/post');
module.exports.create=function(req,res){
    Post.findById(req.body.post)
        .then(function(post){
            Comment.create({
                content:req.body.content,
                post:req.body.post,
                user:req.user._id
            })
            .then(function(comments){
                post.comments.push(comments);
                post.save();
                res.redirect('/');
            })
            .catch(function(err){
                console.log(err,'ERROR');
            })
        })
        .catch(function(err){
            console.log(err,'ERROR');
        })
}