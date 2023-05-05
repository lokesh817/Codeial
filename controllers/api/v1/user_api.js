const User = require('../../../models/user');
const JWT= require('jsonwebtoken');
module.exports.createSession=async function(req,res){
   try{
        let user= await User.findOne({email:req.body.email});
        if(!user || user.password!=req.body.password){
            return res.json(422,{message:'Invalid UserName/Password'});
        }
        return res.json(200,{
            data:{
                token: JWT.sign(user.toJSON(),'codeial',{expiresIn :100000})
            },message : 'Sign in successful, here is you Token keep it safe!',
            
        })
   }catch(err){
    console.log(err,'**** Some interval server error ****');
   }
   
}