const socket = require("socket.io");
const crypto = require("crypto");
const { Chat } = require("../Models/chat");
//const ConnectionRequests = require("../Models/connectionRequest");
const getSecretRoomId = (userId, targetUserId) =>{
  return crypto.createHash("sha256").update([userId, targetUserId].sort().join("$")).digest("hex");
}
const initialSocket = (server) =>{
    const io = socket(server, {
        cors:{
            origin: "http://localhost:5173",
        }
    });
    
    io.on("connection", (socket) => {
        //handle events

        socket.on("joinChat", ({firstName, userId, targetUserId})=>{
           const roomId = getSecretRoomId(userId, targetUserId);// Symbol() //unique id;
           console.log(firstName ,"joined chat room: ",roomId);
           socket.join(roomId);

        })
        socket.on("sendMessage", async ({firstName,lastName, userId, targetUserId, message})=>{
            
            try{
                const roomId = getSecretRoomId(userId, targetUserId);
            console.log(firstName ," send message to chat room: ",message);
            //save msg to DB
            //TODO: check if user and target user are friend
           // ConnectionRequests.findOne({fromUserId: userId, targetUserId: targetUserId , status: "accepted"})
                let chat = await Chat.findOne({participants:{ $all:[userId, targetUserId]}});
                if(!chat){
                 chat = new Chat({
                    participants:[userId, targetUserId],
                    messages: []
                 })
                }
                chat.messages.push({
                    senderId:userId,
                    message
                })
                await chat.save()
            io.to(roomId).emit("messageReceived", {firstName, lastName, message})

            }
            catch(err){
                console.log(err.message);
            }
        })
        socket.on("disconnect", ()=>{
            
        })

    });
}

module.exports = initialSocket;