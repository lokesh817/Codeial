module.exports.home=function(req,res){
    return res.render('home',{
        title:'Home'
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