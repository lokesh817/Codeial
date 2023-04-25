const Post= require('../models/post');
const Users= require('../models/user');
module.exports.home= async function(req,res){
    let posts=[];
    let users=[];
    try{
        posts = await Post.find({})
            .populate("user")
            .populate({
                path: "comments",
                populate:{
                    path :"user",
                },
            });
        try{
            users= await Users.find({});
        }
        catch(err){
            // req.flash('error','Error encountered loading users');
            console.log(`Error pulling all Users: ${err}`);
        }
    } catch(err) {
        // req.flash('error','Error encountered loading users');
        console.log(`Error pulling all Users: ${err}`);
    }
    return res.render('home',{
        title:'Home',
        posts: posts,
        all_users: users,
    });
    
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