const Post= require('../models/post');
const Comment=require('../models/comment');
const { error } = require('console');
module.exports.create= async function(req,res){
    try{
        await Post.create({
            content:req.body.content,
            user:req.user._id
        });
        req.flash('success','Post Created');
        return res.redirect('back');
    }
    catch(err){
        req.flash('error','Error in post creation');
        return;
    }
    
}
module.exports.destroy=async function(req,res){
    try{
        let post=await Post.findById(req.params.id);
        if(post.user==req.user.id){
            post.deleteOne();
            await Comment.deleteMany({post:req.params.id})
            req.flash('success','Your Post has been deleted');
            return res.redirect('back');
        }
        else{
            req.flash('error','Only authorized user can delete!')
            return res.redirect('back');
        }
    }
    catch(err){
        console.log('error','post can not be deleted');
        return;
    }
}