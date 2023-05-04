class PostComments{
    constructor(postId){
        this.postId=postId;
        this.postContainer=$(`#post-${postId}`);
        this.newCommentForm=$(`#post-${postId }-comments-form`);
        this.createComment(postId);
        let self=this;
        $(' .delete-comment-button',this.postContainer).each(function(){   
            self.deleteComment($(this));
        });
    }
    createComment(postId){
        let pSelf=this;
        this.newCommentForm.submit(function(e){
            e.preventDefault();
            let self = this;
            $.ajax({
                type:'post',
                url:'/comment/create',
                data: $(self).serialize(),
                success:function(data){
                    console.log(data);
                    let newComment=pSelf.createCommentDom(data.data.comments);
                    $(`#comment-box-${postId}`).prepend(newComment);

                    NotyNotification('Comment added ','success');
                    pSelf.deleteComment($(' .delete-comment-button',newComment));
                },
                error:function(err){
                    console.log(err);
                    NotyNotification('Comment not add','error');
                }
            });
        });
    }
    createCommentDom(comment){
        return $(`<p class="comment-container" id="comment-${comment._id}">        
                <i class="fas fa-user"></i> ${comment.user.name} :- <small>${comment.content} </small>
                <a class="delete-comment-button" href="/comment/destroy/${comment._id}"><i class="fas fa-trash-alt"> </i></a>
            </p>`)
    }
    deleteComment(deleteLink){
        console.log(deleteLink);
        $(deleteLink).click(function(e){
            e.preventDefault();
            $.ajax({
                type:'get',
                url:$(deleteLink).prop('href'),
                success:function(data){
                    $(`#comment-${data.data.comment_id}`).remove();
                    NotyNotification('Comment Deleted successfully','success');
                },
                error:function(err){
                    console.log(err.responseText);
                    NotyNotification('Internal Error','error');
                }

            });
        });
    }
    NotyNotification(text,type){
        new Noty({
            theme : 'Relax' , 
            text: text,
            type: type,
            layout : "topRight",
            timeout : 1500
        }).show();
    }
}