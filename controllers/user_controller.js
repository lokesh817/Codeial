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