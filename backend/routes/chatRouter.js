const express = require('express')
const userAuth = require('../middlewares/userAuth')
const chatData = require('../model/chatData')
const chatRouter = express.Router()

chatRouter.get("/get/chat/data/:loggedInUserId/:targetUserId", userAuth, async (req, res) => {
    try {
        const { loggedInUserId, targetUserId } = req.params
        const chatRecords = await chatData.find({
            $or: [
                {
                    senderId: loggedInUserId,
                    receiverId: targetUserId
                },
                {
                    senderId: targetUserId,
                    receiverId: loggedInUserId
                }
            ]
        }).sort({ createdAt: 1 })

        if (!chatRecords.length) return res.status(200).json({ success: false, message: "No Chat Record Found" })

        return res.json({ success: true, message: "Chat Record Available", chatData: chatRecords })
    }
    catch (err) {
        return res.status(500).json({ success: false, message: "Server Error while fetching Chat Data" })
    }

})



module.exports = chatRouter