const express = require('express');
const path = require('path');
const app = express();
require('dotenv').config();

const server = app.listen(process.env.PORT ||3000);

const io = require('socket.io')(server);
app.use(express.static(path.join(__dirname,'public')));


io.on('connection',Clientconnected);

const totalClient = new Set();
let users = {};

function Clientconnected(socket){

    totalClient.add(socket.id); 
    io.emit('clients',totalClient.size);

    socket.on('disconnect',()=>
    {
        totalClient.delete(socket.id)
        io.emit('clients',totalClient.size);
       
    })

    socket.on('message',(data)=>
    {   
        socket.broadcast.emit('chat-msg',data);
    })

    socket.on('feedback',(data)=>{
    socket.broadcast.emit('feedback',data);
});


socket.on("register", (phone) => {
        if (phone) {
            users[phone] = socket.id;
            console.log("Registered:", phone);
        }
    });


    socket.on("privateMessage", (data) => {
        const receiverSocket = users[data.receiver];
        if (receiverSocket) {
            io.to(receiverSocket).emit("privateMessage", data);
        }
    });

}
