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
            console.log('outside xhr');
            if(req.xhr){
                console.log('inside xhr request');
                comments = await comments.populate('user','name')
                return res.status(200).json({
                    data:{
                        comments:comments    
                    },message:'comment added!'
                });
            } 
            req.flash('success','Comment added');
            res.redirect('/');
        }
    }
    catch(err){
        console.log('inside catch',err);
        req.flash('error','Comment not added');
        return res.redirect('back');
    }
}

module.exports.destroy=async function(req,res){
    try{
        let comment=await Comment.findByIdAndDelete(req.params.id);
        if(req.user.id==comment.user){
            let postId=comment.post;
            comment.deleteOne();
            Post.findByIdAndUpdate(postId,{$pull:{comment:req.params.id}})
            if (req.xhr){
                return res.status(200).json({
                    data: {
                        comment_id: req.params.id
                    },
                    message: "Post deleted"
                });
            }
            req.flash('success','Your Comment Deleted')
            return res.redirect('back');
        }
        else{
            req.flash('error','unauthorized user can not delete post');
            return res.redirect('back');
        }   
    }
    catch(err){
        req.flash('error','Internal error');
        return res.redirect('back');
    }
}