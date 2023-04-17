const mongoose = require('mongoose');
const signInSchema=mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
},{
    timestamps:true
});
const signIn=mongoose.model('signIn',signInSchema);
module.exports=signIn;