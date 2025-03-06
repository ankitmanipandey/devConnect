const validator = require('validator')
const validateSignUpData = (req) => {
    const { skills, emailId, password, photoUrl, about, name } = req.body
    if (name.length < 4 || name.length > 50) {
        throw new Error("Name should be between 4 to 50 characters")
    }
    if (!validator.isEmail(emailId)) {
        throw new Error("Enter valid Email Id")
    }
    if (!validator.isStrongPassword(password)) {
        throw new Error("Enter Strong Password")
    }
    if (skills.length !== 0 && skills.split(",").length > 10) {
        throw new Error("Skills can't be more than 10")
    }
    if (!about) {
        throw new Error("About is Required!")
    }
    if (about.length > 100) {
        throw new Error("About cannot exceed 100 characters!")
    }
    if (photoUrl && !validator.isURL(photoUrl)) {
        throw new Error("Enter valid URL for image")
    }
}

module.exports = validateSignUpData

