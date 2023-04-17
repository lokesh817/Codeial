const mongoose = require('mongoose');
const signUpSchema=mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    }
},{
    timestamps:true
});
const signUp=mongoose.model('signUp',signUpSchema);
module.exports=signUp;