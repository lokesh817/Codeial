
class chatEngine{
    constructor(chatBoxId,userEmail,userName){
        this.chatBox=$(`#${chatBoxId}`);
        this.userEmail=userEmail;
        this.userName=userName;
        this.socket=io.connect('http://localhost:1000');
        // console.log(this.userEmail);
        if(this.userEmail){
            this.connectionHandler();
        }

    }


    connectionHandler(){
        let self = this;
        this.socket.on('connect',function(){
            console.log('connection established using socket');
        
        
            self.socket.emit('join_room',{
                user_email:self.userEmail,
                user_name:self.userName,
                chatroom:'codeial'
            });

            self.socket.on('user_joined',function(data){
                console.log('a user joined',data);
            });


        });

        //send a message on clicking the end message
        $('#send-message').click(function(){
            let msg=$('#chat-message-input').val();

            if(msg!=''){
                self.socket.emit('send_message',{
                    message:msg,
                    user_email:self.userEmail,
                    user_name:self.userName,

                    chatroom:'codeial'
                });
            }
            let input=document.getElementById('chat-message-input');
            input.value='';
            
        });

        self.socket.on('receive_message',function(data){
            console.log('message received',data.message);
            
            let newMessage=$('<li>');
            
            let messageType='other-message';
            
            if(data.user_email==self.userEmail){
                messageType='self-message';
            }
            newMessage.append($('<sub>',{
                'html':data.user_name
            }));
            newMessage.append($('<span>',{
                'html':data.message
            }));
            
            // newMessage.append($('<sub>',{
            //     'html':data.user_email
            // }));
            
            newMessage.addClass(messageType);
            
            $('#chat-messages-list').append(newMessage);
            
        })
    }
}