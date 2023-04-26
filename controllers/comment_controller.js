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
module.exports.destroy=function(req,res){
    Comment.findByIdAndDelete(req.params.id)
    .then(function(comment){
        if(req.user.id==comment.user){
            let postId=comment.post;
            comment.deleteOne()
            Post.findByIdAndUpdate(postId,{$pull:{comment:req.params.id}})
            .then(()=>{
                return res.redirect('back');
            })
            .catch(()=>{
                console.log('error',err);
            })
        }
    })
    .catch(function(err){
        console.log(`Error ${err}`);
    })
}