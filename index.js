const express = require('express');
const path = require('path');
const app = express();
const bcrypt = require("bcrypt");
require('dotenv').config();
const server = app.listen(process.env.PORT ||3000);
const io = require('socket.io')(server);
app.use(express.static(path.join(__dirname,'public')));
app.use(express.json());
const mongoose = require("mongoose");


mongoose.connect("mongodb://127.0.0.1:27017/pulsechat")
.then(() => {
    console.log("MongoDB Connected");
}).catch(err => {
    console.log(err);
});

const userSchema = new mongoose.Schema({
    username: String,
    phone: String,
    password: String
});

const User = mongoose.model("User", userSchema);



app.post("/signup", async (req, res) => {

    const { username, phone, password } = req.body;

    const userExists = await User.findOne({ phone });

    if(userExists){
        return res.json({status:"User already exists"});
    }

    const newUser = new User({
        username,
        phone,
        password: await bcrypt.hash(password, 10)
    });

    await newUser.save();

    res.json({status:"Account created"});
});


app.post("/login", async (req, res) => {

    const { phone, password } = req.body;

    const user = await User.findOne({ phone });

    if(!user){
        return res.json({status:"User not found Sign up first"});
    }

    const valid = await bcrypt.compare(password, user.password);
    if(!valid){
        return res.json({status:"Wrong password"});
    }

    res.json({
        status:"success",
        username:user.username,
        phone:user.phone
    });
});




io.on('connection',Clientconnected);

const totalClient = new Set();
let users = {};

function Clientconnected(socket){

    totalClient.add(socket.id); 
    io.emit('clients',totalClient.size);

    socket.on('disconnect',()=>
    {
        totalClient.delete(socket.id)
         for(const phone in users){
        if(users[phone] === socket.id){
            delete users[phone];
        }
    }
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
