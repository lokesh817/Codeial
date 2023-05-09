const nodeMailer = require('nodemailer');
const ejs= require('ejs');
const path=require('path');

let transporter=nodeMailer.createTransport({
    service:'google',
    host:'smtp.gmail.com',
    port:465,
    secure:'false',
    auth:{
        user:'pal.lokesh6396@gmail.com',
        pass:'lhoxzldqcufbwzsi'
    }
});

let renderTemplate=(data,relativePath)=>{
    let mailHTML;
    ejs.renderFile(path.join(__dirname,'../views/mailer',relativePath),data,
    function(err,user){
        if(err){
            console.log('Error in rendering email template');return;
        }
        mailHTML=user;
    })
    return mailHTML;
}
module.exports={
    transporter:transporter,
    renderTemplate:renderTemplate
}