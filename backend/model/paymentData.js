const mongoose = require('mongoose')
const paymentSchema = new mongoose.Schema({
    orderId: {
        type: String,
        required: true,
        unique: true
    },
    userName: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "User",
        unique: true
    },
    membershipType: {
        type: String,
        required: true,
        enum: ["gold", "silver"]
    },
    price: {
        type: Number,
        required: true
    }
}, { timestamps: true })

const PaymentModel = mongoose.model("PaymentModel", paymentSchema)
module.exports = PaymentModel