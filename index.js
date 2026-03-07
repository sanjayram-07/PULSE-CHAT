const { Socket } = require('dgram');
const express = require('express');
const path = require('path');
const app = express();

const server = app.listen(3000,'0.0.0.0');

const io = require('socket.io')(server);
app.use(express.static(path.join(__dirname,'public')));


io.on('connection',Clientconnected);

const totalClient = new Set();


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

}



