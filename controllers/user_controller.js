module.exports.profile=function(req,res){
    return res.render('user',{
        title:'User'
    })
}
module.exports.signIn=function(req,res){
    return res.render('user-sign-in',{
        title:'Codeial | sign In'
    })
}
module.exports.signUp=function(req,res){
    return res.render('user-sign-Up',{
        title:'Codeial | sign Up'
    })
}
module.exports.create=function(req,res){
    //do later
}
module.exports.createSession=function(req,res){
    //do later
}