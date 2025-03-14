const mongoose = require("mongoose")

const messagesSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
    message: {
        type: String,
        require: true
    }
}, { timestamps: true })

const chatSchema = new mongoose.Schema({
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", require: true }],
    messages: [messagesSchema]
})

const Chat = mongoose.model("Chat", chatSchema)
module.exports = { Chat }