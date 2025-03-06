const mongoose = require('mongoose')
const chatSchema = new mongoose.Schema({

    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    chatMessage: {
        type: String,
        required: true,
        trim: true
    }

}, { timestamps: true })

const chatData = mongoose.model("chat", chatSchema)
module.exports = chatData