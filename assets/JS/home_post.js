{
    //sending post data manually through ajax
    let createPost=function(){
        let newPostForm=$('#new-post-form');
        
        newPostForm.submit(function(e){
            e.preventDefault();
        
            $.ajax({
                type:'post',
                url:'/posts/create',
                data:newPostForm.serialize(),
                success:function(data){
                    let newPost=newPostDom(data.data.post);
                    $('#post-list').prepend(newPost);
                    NotyNotification('Post Created','success');
                    deletePost($(' .delete-post-button',newPost));
                    //call the create comment class
                    new PostComments(data.data.post._id);
                    // change  :: enable the functionality of the toggle like button on the new post
                    new ToggleLike($(' .toggle-like-button', newPost));
                },
                error: function(err){
                    console.log(err.responseText);
                }
            });
        });
    }
    // Receiving post data from sucess key and convert into a post 
    let newPostDom= function(post){
        return $(`<li id="post-${post._id}">
                <div id ="one-post">
                <div id="post-content">
                    <div id="post-user">
                        <i class="fas fa-user-circle"></i>${post.user.name}
                    </div>
                    <p>
                        ${post.content}
                    </p>
                        <a class="delete-post-button" href="/posts/destroy/${post._id}"><i class="fas fa-trash-alt"></i></a>
                </div>
                <div class="like-button"> 
                    
                    <a class="toggle-like-button" data-likes="0" href="like/toggle/?id=${post._id}&type=post"><i class=" fas fa-heart"></i> 0 </a>
                
                </div>
                <div id="post-comments-box">
                    <h4>Comments</h4>
                    <form action="comment/create" id="post-${ post._id }-comments-form" method="post">
                        <input type="text" name="content" placeholder="Say something.." required>
                        <input type="hidden" name="post" value="${post._id }">
                        <input type="submit" value="Add comments">
                    </form>
                    <div id="comment-box-${post._id}">
                        
                    </div>
                </div>
            </div>
    
        </li>`)
    }

    //Delete a post without refresh
    let deletePost=function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();
            
            $.ajax({
                type:'get',
                url:$(deleteLink).prop('href'),
                success: function(data){
                    $(`#post-${data.data.post_id}`).remove();
                    NotyNotification('Post Deleted','success');
                },error:function(error){
                    console.log(error.responseText);
                    NotyNotification('Error','error');
                }
            });
        });    
    }

    let convertPostsToAjax=function(){
        $('#post-list>li').each(function(){
            let self= $(this);
            let deleteButton =$(' .delete-post-button',self);
            deletePost(deleteButton);
            //get the post's id by spiltting the id attribute
            
            let postId = self.prop('id').split("-")[1];
            new PostComments(postId);
        });
    }

    function NotyNotification(text,type){
        new Noty({
            theme : 'Relax' , 
            text: text,
            type: type,
            layout : "topRight",
            timeout : 500
            }).show();
    }
    createPost();
    convertPostsToAjax();
}