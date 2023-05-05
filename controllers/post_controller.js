const Post= require('../models/post');
const Comment=require('../models/comment');
const User=require('../models/user');

const { error } = require('console');
module.exports.create= async function(req,res){
    try{
        let userID= await req.user;
        const postSave = new Post({
            content: req.body.content,
            user: userID.id
        })
        await postSave.save()
        .catch(() => console.log('Posting Error..')) 
        if(req.xhr){
            await postSave.populate('user')
            return res.status(200).json({
                data:{
                    post:postSave   
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
        let post=await Post.findById(req.params.id);
        if(post.user==req.user.id){
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
        return;
    }
}