const express = require('express');
const validateSignUpData = require('../utils/postValidate');
const validate = require('validator')
const bcrypt = require('bcrypt')
const User = require('../model/user.js')
const jwt = require('jsonwebtoken')
const authRouter = express.Router()
const sendMail = require('../middlewares/nodemailer.js');
const { FRONTEND_URL } = require('../utils/constants.js');
require('dotenv').config()

//creating the data / signup

authRouter.post('/signup', async (req, res) => {
    const { name, emailId, photoUrl,
        about, password, skills } = req.body
    try {
        //validation of data
        validateSignUpData(req)
        //encryption of password
        const hashedPassword = await bcrypt.hash(password, 10)
        const userExists = await User.findOne({
            emailId: emailId
        })
        if (userExists) {
            throw new Error("Email already exists")
        }
        const user = await User.create({
            name, emailId, photoUrl
            , password: hashedPassword, skills: skills.split(","), about
        })
        const token = jwt.sign({ _id: user._id }, process.env.PRIVATE_KEY, { expiresIn: "7d" })
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: 'Lax',
            path: "/"
        })

        return res.status(200).send(user)
    }
    catch (err) {
        return res.status(400).send(err.message)
    }
})

//login api

authRouter.post('/login', async (req, res) => {
    const { emailId, password } = req.body
    try {
        const user = await User.findOne({ emailId: emailId })
        if (!user) {
            throw new Error("User Credentials are invalid!")
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (isPasswordValid) {
            const token = jwt.sign({ _id: user._id }, process.env.PRIVATE_KEY, { expiresIn: "7d" })
            res.cookie("token", token, {
                httpOnly: true,
                secure: false,
                sameSite: 'Lax',
                path: "/"
            })
            return res.send(user)
        }
        else {
            return res.status(400).send("User Credentials are invalid!")
        }
    }
    catch (err) {
        return res.status(400).send(err.message)
    }
})

//logout api

authRouter.post('/logout', (req, res) => {
    try {
        res.cookie("token", "",
            {
                httpOnly: true,
                secure: false,
                sameSite: 'Lax',
                path: "/",
                expires: new Date(0)
            })
        res.clearCookie("token");
        return res.send("Signout Successful")
    }
    catch (err) {
        return res.status(400).send("Something went wrong")
    }

})

//Forgot Password api (Verification of the user)

authRouter.post("/verify/user", async (req, res) => {
    try {
        const { emailId } = req.body
        if (!validate.isEmail(emailId)) {
            res.status(400).json({ success: false, message: "Enter Valid Email Id !!" })
        }
        const user = await User.findOne({ emailId })
        if (!user) {
            return res.status(404).json({ success: false, message: "User does not exists" })
        }
        const token = await jwt.sign({ emailId }, process.env.PRIVATE_KEY, {
            expiresIn: "10m"
        })

        const resetLink = `${FRONTEND_URL}/forgot/password?token=${token}`
        sendMail(emailId, resetLink)
        return res.json({ success: true, message: "Reset link sent to your Email Id" })
    }
    catch (err) {
        return res.json({ success: false, message: "User Verification Failed" })
    }

})

//Forgot Password (Reseting the password)
authRouter.post("/reset/password", async (req, res) => {
    try {
        {
            const { token } = req.query
            const { password } = req.body
            if (!token) {
                return res.status(404).json({ success: false, message: "Token Not Received" })
            }
            const { emailId } = await jwt.verify(token, process.env.PRIVATE_KEY)

            const user = await User.findOne({ emailId })

            const newPassword = password
            if (!validate.isStrongPassword(newPassword)) {
                return res.status(400).json({ success: false, message: "Enter Strong Password" })
            }
            const hashedPassword = await bcrypt.hash(newPassword, 10)
            user.password = hashedPassword

            await user.save()
            return res.json({ success: true, message: "Password Changed Successfully" })
        }
    }
    catch (err) {
        return res.json({ success: false, message: "Password Reset could not be Done" })
    }

})



module.exports = authRouter
