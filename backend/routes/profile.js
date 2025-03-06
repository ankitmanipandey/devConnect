const express = require('express')
const userAuth = require('../middlewares/userAuth')
const validatePatch = require('../utils/patchValidate')
const validator = require('validator')
const bcrypt = require('bcrypt')
const profileRouter = express.Router()

//view profile

profileRouter.get('/profile/view', userAuth, (req, res) => {
    try {
        const { user } = req
        const userCopy = JSON.parse(JSON.stringify(user))//this is done to avoid sending the password on the frontend
        delete userCopy.password
        return res.send(userCopy)
    }
    catch (err) {
        return res.status(400).send(err.message)
    }
})

//edit profile

profileRouter.patch('/profile/edit', userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user
        validatePatch(req)
        const handlePasswordChange = async () => {
            const newPassword = req.body.password
            if (newPassword) {
                const newHashedPassword = await bcrypt.hash(newPassword, 10)
                loggedInUser.password = newHashedPassword
            }
        }
        const keysArrayFromBody = Object.keys(req.body)
        for (const key of keysArrayFromBody) {
            if (key === 'password') {
                await handlePasswordChange()
            }
            else {
                loggedInUser[key] = req.body[key]
            }
        }
        const user = await loggedInUser.save()
        return res.json({ success: true, message: "Profile Update Successfully", data: user })
    }
    catch (err) {
        return res.status(400).send(err.message)
    }
})

module.exports = profileRouter