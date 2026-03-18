import { log } from "console";
import app from  "./src/app.js";
import { createServer } from "http";
import { Server } from "socket.io";


const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });

io.on("connection", (socket) => {
    console.log("New connection created");

    socket.on("message", (msg) => {
        console.log("User Firest message event");
        console.log(msg);
        
        io.emit("abc")
    })
    
});


httpServer.listen(3000, () =>{
    console.log("Server is runing on port no. 3000");
});