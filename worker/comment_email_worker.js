const queue=require('../config/kue');
const commentMailer=require('../config/mailer/comment_mailer');
queue.process('emails',function(job,done){
    commentMailer.newComment(job.data);
    done();
});