const Comments = require('../models/comment');
const Post= require('../models/post');
const Users= require('../models/user');
module.exports.home= async function(req,res){
    let posts=[];
    let users=[];
    try{
        console.log('hi');
        posts = await Post.find({})
            .sort("-createdAt")
            .populate("user")
            .populate({
                path: "comments",
                populate:{
                    path :"user",
                },
                // populate:{
                //     path :"like",
                // },
            })
            // .populate('comments')
            // .populate('like');

            for( let post of posts){
                for(let comment of post.comments){
                    console.log(comment);
                }
            } 
            
        try{
            users= await Users.find({});
        }
        catch(err){
            req.flash('error','Error encountered loading comments');
            return res.redirect('back');
        }
        return res.render('home',{
            title:'Codeial | Home',
            posts: posts,
            all_users: users,
        });
    } catch(err) {
        console.log(err,'error');
        req.flash('error','Error encountered loading users post');
        return;
    }    
}
module.exports.friends=function(req,res){
    return res.end('<h1>friends section codiel</h1>');
}
module.exports.post=function(req,res){
    return res.end('<h1>post section codiel</h1>');
}
module.exports.reel=function(req,res){
    return res.end('<h1>reel section codiel</h1>');
}