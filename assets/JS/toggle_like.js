class ToggleLike{
    constructor(toggleElement){
        this.toggler = toggleElement;
        this.toggleLike();
    }
    toggleLike(){
        $(this.toggler).click(function(e){ 
            e.preventDefault();
            console.log('here');
            let self = this;
        //this is a new way of writing ajax which you might have studied, it looks like the same as promises
            $.ajax({
                type : 'post',
                url : $(self).attr('href')
            })
            .done(function(data){
                let likeCount = parseInt($(self).attr('data-likes'));
                
                if(data.data.deleted == true){
                    likeCount -=1;
                }else{
                    likeCount +=1;
                }
                $(self).attr('data-likes',likeCount);
                $(self).html(` <i class=" fas fa-heart"></i> ${likeCount} `);
            })
            .fail(function(errData){
                console.log('error in completing the request');
            });
        });
    }
}