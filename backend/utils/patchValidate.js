const validator = require('validator')
const validatePatch = (req) => {
    const { skills, password, name, about, photoUrl } = req.body
    const data = req.body
    const allowedUpdates = ["skills", "password", "photoUrl", "name", "about"]
    const isAllowed = Object.keys(data).every((k) => allowedUpdates.includes(k))
    if (!isAllowed) {
        throw new Error("Update not allowed")
    }
    if (!about) {
        throw new Error("About is Required!")
    }
    if (name && name.length >= 20) {
        throw new Error("Maximum length should be 15")
    }
    if (skills && skills.length > 10) {
        throw new Error("Skills are more than 10!")
    }
    if (photoUrl && !validator.isURL(photoUrl)) {
        throw new Error("Valid Url is required for Image")
    }
    if (password && !validator.isStrongPassword(password)) {
        throw new Error("Strong Password is required!")
    }
    if (about && about.length > 50) {
        throw new Error("About cannot exceed 150 characters!")
    }
}
module.exports = validatePatch