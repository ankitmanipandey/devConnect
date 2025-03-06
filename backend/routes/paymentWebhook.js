const express = require('express')
const Stripe = require("stripe");
const paymentWebhookRouter = express.Router()
require('dotenv').config()
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const PaymentModel = require('../model/paymentData');
const User = require('../model/user');


paymentWebhookRouter.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
    let event = req.body;
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (endpointSecret) {
        const signature = req.headers['stripe-signature'];
        try {
            event = stripe.webhooks.constructEvent(req.body, signature, endpointSecret);
        }
        catch (err) {
            console.error("Webhook Signature Verification failed " + err.message)
            return res.status(400).send(err.message)
        }
    }
    const session = event.data.object //this we get from the object 'event'
    if (event.type === 'checkout.session.completed') {
        try {
            await PaymentModel.create({
                orderId: session.id,
                userName: session.metadata.userName,
                userId: session.metadata.userId,
                membershipType: session.metadata.membershipType,
                price: session.amount_total / 100
            })
            const user = await User.findOne({ _id: session.metadata.userId })
            user.isPremium = true
            user.membershipType = session.metadata.membershipType
            await user.save()
        }
        catch (err) {
            return res.status(400).json({ success: false, message: "Transaction failed" })
        }
    }
    return res.status(200).json({ success: true, message: `Your are now ${session.metadata.membershipType} member` });
});

module.exports = paymentWebhookRouter