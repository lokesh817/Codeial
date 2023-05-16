const Post= require('../models/post');
const Comment=require('../models/comment');
const Like=require('../models/like');

module.exports.create= async function(req,res){
    try{
        let post= await Post.create({
            content: req.body.content,
            user: req.user._id
        });

        if(req.xhr){
            //if we want to populate just the name of the user (we'll not want to password in the Api)
            post =await post.populate('user','name');

            return res.status(200).json({
                data:{
                    post: post
                },message:'post created!'
            });
        }

        req.flash('success','Post Created');
        return res.redirect('back');
    }
    catch(err){
        req.flash('error','Error in post creation');
        return res.redirect('back');
    }
    
}
module.exports.destroy=async function(req,res){
    
    try{
        let post=await Post.findById(req.params.id);
    
        if(post.user==req.user.id){
            
            // delete associated likes for the post and all its comments
            await Like.deleteMany({likeable : post, onModel: 'post'});
            await Like.deleteMany({_id: {$in: post.comments}});
    
            
            post.deleteOne();
            
            await Comment.deleteMany({post:req.params.id})
            
            if(req.xhr){
                return res.status(200).json({
                    data:{
                        post_id:req.params.id,
                    },message:'post deleted!'
                });
            }
            
            req.flash('success','Your Post has been deleted');
            
            return res.redirect('back');
        }
        else{
            req.flash('error','Only authorized user can delete!')
            return res.redirect('back');
        }
    }
    catch(err){
        console.log(err,'post can not be deleted');
        return res.redirect('back');
    }
}