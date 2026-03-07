const socket = io();

socket.on('connect',()=>{
    console.log("connected to server");
});

const clientsTotal = document.getElementsByClassName('total-clients')[0];
const messageForm = document.getElementById('msg-form');
const nameInput = document.getElementById('username');
const messageInput = document.getElementById('msg-input');
const messagesContainer = document.getElementById('msg-container');

messageForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    message();
});


socket.on('clients',(data)=>
{   
    clientsTotal.innerHTML=`Online Users: ${data}`;
})

function message()
{
    if(messageInput.value ==='' || nameInput.value ==='') return;
    const data ={
        username:nameInput.value,
        message:messageInput.value,
        dataTime: new Date().toLocaleString()

    }
    socket.emit('message',data);
    addmessagetoUI(true,data);
    messageInput.value='';
}


socket.on('chat-msg',(data)=>{
    addmessagetoUI(false,data);
})

function addmessagetoUI(isownmsg,data)
{
     removeFeedback(); 
    const element = `
   <li class="${isownmsg?'right-msg':'left-msg'}">
                <p class="msg">
                    ${data.message} <span>${data.username}  ${data.dataTime}</span>
                </p>
            </li>
    `;

    messagesContainer.innerHTML+=element;
    scrollToBottom();
}

function scrollToBottom()
{
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}


messageInput.addEventListener('focus',(e)=>{
    socket.emit('feedback',{feedback:`${nameInput.value} is typing... `});
});
messageInput.addEventListener('keypress',()=>{

    socket.emit('feedback',{feedback:`${nameInput.value} is typing... `});
});
messageInput.addEventListener('blur',()=>{

    socket.emit('feedback',{feedback:''});
});


socket.on('feedback',(data)=>{
     removeFeedback();
    const element =`<li class="feedback">
                <p>
                    ${data.feedback}
                </p>
            </li>`
    messagesContainer.innerHTML+=element;
    scrollToBottom();
})


function removeFeedback()
{
    document.querySelectorAll('li.feedback').forEach((element)=>{
        element.parentNode.removeChild(element);
    })
    
}