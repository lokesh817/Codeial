const Post= require('../models/post');
const Comment=require('../models/comment');
const User=require('../models/user');

const { error } = require('console');
module.exports.create= async function(req,res){
    try{
        let post=await Post.create({
            content:req.body.content,
            user:req.user._id
        });
        
        if(req.xhr){
            await post.populate('user')
            return res.status(200).json({
                data:{
                    post:post    
                },message:'post created!'
            });
        }
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
        console.log(req.params.id);
        let post=await Post.findById(req.params.id);
        console.log(post);
        console.log(post.user);
        if(post.user==req.user.id){
            post.deleteOne();
            await Comment.deleteMany({post:req.params.id})
            console.log('I am outside xhr');
            if(req.xhr){
                console.log('I am inside xhr');
                return res.status(200).json({
                    data:{
                        post_id:req.params.id,
                    },message:'post deleted!'
                });
            }
            console.log('I passed xhr req');
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
        return;
    }
}