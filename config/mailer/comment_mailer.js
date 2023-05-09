const nodeMailer= require('../../config/nodemailer')
exports.newComment = (comment)=>{
    console.log('inside new comment mailer');
    let HTML=nodeMailer.renderTemplate({comment:comment},'/comment/new_comments.ejs')
    nodeMailer.transporter.sendMail({
        from:'pal.lokesh6396@gmail.com',
        to:comment.user.email,
        subject:'New Comment',
        html:HTML
    },(err,info)=>{
        if(err){console.log(err);return;}
        console.log('message sent',info);return
    })
}