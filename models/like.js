const { timeStamp } = require('console');
const mongoose = require('mongoose');
let likeSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId
    },
    likeable:{
        type:mongoose.Schema.ObjectId,
        require:true,
        refPath:'onModel'
    },
    onModel:{
        type:String,
        required:true,
        enum:['post','comment']
    }
},{
    timeStamp:true
});
const Like=mongoose.model('Like',likeSchema);
module.exports=Like;