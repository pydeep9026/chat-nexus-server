

const express=require("express")
const cors=require("cors")
const mongoose=require("mongoose")
const bodyParser = require('body-parser');
const Userroutes=require("./routes/userroutes")
const socket=require("socket.io")
const messageroute=require("./routes/messagesroute")

const app=express()  
require("dotenv").config()

app.use(bodyParser.json({ limit: "200mb" }));
app.use(bodyParser.urlencoded({ limit: "200mb",  extended: true, parameterLimit: 1000000 }));
app.use(cors()) 
app.use(express.json());   
  
  
app.use("/api/auth",Userroutes)   
app.use("/api/messages",messageroute)    
 


const PORT=process.env.PORT || 5000

/*const dburl='mongodb://0.0.0.0:27017/chat'*/
/*const dburl='mongodb+srv://PRADEEP123:'+encodeURIComponent('password')+'@cluster0.x5jbf4w.mongodb.net/chat?retryWrites=true&w=majority'*/
const dburl=process.env.db_url
 

mongoose.connect(dburl, {
    useNewUrlParser: true,
    useUnifiedTopology: true       
  });
  
  mongoose.connection.on('connected', () => {    
    console.log('Successfully connected to MongoDB');  

    mongoose.connection.db.command({ serverStatus: 1 }, (err, result) => {
        if (err) throw err;
        console.log(`Number of live connections: ${result.connections.current}`);
    });     
  });
  


 

const server=app.listen(process.env.PORT,()=>{
    console.log(`server started at port ${PORT}`)
})  

const io =socket(server,{      
    cors:{
        origin:"https://piehost.com",
        Credentials:true,
    }  
})       

global.onlineUsers=new Map()

io.on("connection",(socket)=>{
    global.chatSocket=socket
    socket.on("add-user",(userId)=>{
        onlineUsers.set(userId,socket.id)
    })
    socket.on("send-msg",(data)=>{
        const sendUserSocket=onlineUsers.get(data.to)
        if(sendUserSocket){
            socket.to(sendUserSocket).emit("msg-recieve",data.message)
        }
    })
})
