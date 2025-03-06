const express = require('express')
const userAuth = require('../middlewares/userAuth')
const ConnectionRequest = require('../model/connectionRequest')
const userRouter = express.Router()
const User = require('../model/user')

const USER_SAFE_DATA = "name skills about photoUrl emailId isPremium membershipType"

//get all the pending requests

userRouter.get('/user/pending/requests', userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user
        const connectionRequests = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested"
        }).populate("fromUserId", USER_SAFE_DATA)
        return res.json({ message: "Your Pending Requests are here : ", connectionRequests })
    }
    catch (err) {
        res.status(400).send("Error : " + err.message)
    }
})

//get all your connections

userRouter.get('/user/connections', userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user
        const connections = await ConnectionRequest.find({
            $or: [
                { toUserId: loggedInUser._id, status: "accepted" },
                { fromUserId: loggedInUser._id, status: "accepted" }
            ]
        })
            .populate("fromUserId", USER_SAFE_DATA)
            .populate("toUserId", USER_SAFE_DATA)

        const data = connections.map((row) => {
            if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
                return row.toUserId
            }
            else {
                return row.fromUserId
            }
        })
        const finalData = data.filter((data) => data !== null)
        return res.json({ message: "Your connections are here : ", finalData })
    }
    catch (err) {
        return res.status(400).send("Error : " + err.message)
    }
})

//feed of the user

userRouter.get('/user/feed', userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user
        const page = parseInt(req.query.page) || 1
        let limit = parseInt(req.query.limit) || 10
        limit = limit > 50 ? 50 : limit
        const skip = (page - 1) * limit

        const connections = await ConnectionRequest.find({
            $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }]
        }).select("fromUserId toUserId")
        const userIdToHide = new Set()
        connections.forEach((connection) => {
            userIdToHide.add(connection.fromUserId.toString());
            userIdToHide.add(connection.toUserId.toString());
        })

        const user = await User.find({
            $and: [
                { _id: { $nin: Array.from(userIdToHide) } }, { _id: { $ne: loggedInUser._id } }
            ]
        })
            .select(USER_SAFE_DATA)
            .skip(skip)
            .limit(limit)

        return res.send(user)
    }
    catch (err) {
        return res.status(400).send("Feed is not present")
    }
})

userRouter.get("/user/connection/profile/:userId", userAuth, async (req, res) => {
    try {
        const { userId } = req.params
        const data = await User.findOne({
            _id: userId
        }).select(USER_SAFE_DATA)
        if (!data) return res.status(404).send("NO detail available")

        return res.status(200).send(data)
    }
    catch (err) {
        return res.status(404).send("No details available")
    }
})
userRouter.delete("/user/remove/connection/:userId", userAuth, async (req, res) => {
    try {
        const { userId } = req.params
        const data = await ConnectionRequest.findOneAndDelete({
            $or: [
                { fromUserId: userId },
                { toUserId: userId }
            ]
        })
        if (!data) return res.status(400).send("Cannot remove connection")
        return res.send("Connection removed successfully")
    }
    catch (err) {
        return res.send(err.message)
    }

})


module.exports = userRouter