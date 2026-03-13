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


mongoose.connect(process.env.MONGO_URI || "mongodb://msanjayram07_db_user:Ukp4nIN1JVB4V9Lk@ac-rgzqc0x-shard-00-00.kgvsojm.mongodb.net:27017,ac-rgzqc0x-shard-00-01.kgvsojm.mongodb.net:27017,ac-rgzqc0x-shard-00-02.kgvsojm.mongodb.net:27017/pulsechat?ssl=true&replicaSet=atlas-nrqyvl-shard-0&authSource=admin&appName=Cluster0")
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
