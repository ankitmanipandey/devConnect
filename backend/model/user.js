const mongoose = require('mongoose');
require('dotenv').config()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const { ICON_URL } = require('../utils/constants');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 4,
        maxLength: 50
    },

    emailId: {
        type: String,
        required: true,
        unique:true,
        trim: true
    },

    password: {
        type: String,
        required: true,
    },

    photoUrl: {
        type: String,
        default: ICON_URL
    },
    about: {
        type: String,
        required: true,
        maxLength: 150,
        default: "NewBee"
    },
    skills: {
        type: [String],
        default: ["Reading"]
    },
    isPremium: {
        type: Boolean,
        default: false
    },
    membershipType: {
        type: String,
        default: "None"
    }

})
const User = mongoose.model('User', userSchema)

userSchema.methods.getJWT = async function () {
    const user = this
    const token = await jwt.sign({ _id: user._id }, process.env.PRIVATE_KEY, { expiresIn: "7d" })
    return token
}

userSchema.methods.validatePassword = async function (passwordInputByUser) {
    const user = this
    const hashedPassword = user.password
    const isPasswordValid = await bcrypt.compare(passwordInputByUser, hashedPassword)
    return isPasswordValid
}

module.exports = User