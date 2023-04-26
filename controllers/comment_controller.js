const Comment= require('../models/comment');
const Post=require('../models/post');
module.exports.create=async function(req,res){
    try{
        let post=await Post.findById(req.body.post);
        if(post){
            let comments=await Comment.create({
                content:req.body.content,
                post:req.body.post,
                user:req.user._id
            });
            post.comments.push(comments);
            post.save();
            res.redirect('/');
        }
    }
    catch{
        console.log(err,'ERROR');
        return;
    }
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

module.exports.destroy=async function(req,res){
    try{
        let comment=await Comment.findByIdAndDelete(req.params.id);
        if(req.user.id==comment.user){
            let postId=comment.post;
            comment.deleteOne();
            Post.findByIdAndUpdate(postId,{$pull:{comment:req.params.id}})
            return res.redirect('back');
        }
        else{
            return res.redirect('back');
        }   
    }
    catch(err){
        console.log(`Error ${err}`);
        return;
    }
}