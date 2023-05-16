const Like=require('../models/like');
const Post=require('../models/post');
const Comment=require('../models/comment');

module.exports.toggleLike=async function(req,res){
    //likes/?id='abc'&type='post/comment'
    try{
        let likeable;
        let deleted=false;
        if(req.query.type=='post'){
            
            likeable=await Post.findById(req.query.id).populate('like');
            console.log('query type post check checked');
        }else{
            console.log('query type comment check checked');
            likeable=await Comment.findById(req.query.id).populate('like');
        }
        //check if like already exists
        let existingLike=await Like.findOne({
            likeable:req.query.id,
            onModel:req.query.type,
            user:req.user._id
        })
        //If a like exists delete it
        if(existingLike){
            likeable.like.pull(existingLike._id);
            likeable.save();
            existingLike.deleteOne();
            deleted=true;
        }else{
            let newLike= await Like.create({
                user:req.user._id,
                likeable:req.query.id,
                onModel:req.query.type
            });
            likeable.like.push(newLike._id);
            likeable.save();
        }
        return res.status(200).json({
            message:"Request successful",
            data:{
                deleted:deleted
            }
        });
    }catch(err){
        console.log(err,'Internal server error in like_controller');
        return res.status(400).json({
            message:"Internal server error"
        });
    }
}