const express = require('express')
const connectDB = require('../config/database.js')
const cookieParser = require('cookie-parser')
const authRouter = require('../routes/auth.js')
const profileRouter = require('../routes/profile.js')
const requestRouter = require('../routes/request.js')
const userRouter = require('../routes/user.js')
const cors = require('cors')
const { FRONTEND_URL } = require('../utils/constants.js')
const paymentRouter = require('../routes/payment.js')
const paymentWebhookRouter = require('../routes/paymentWebhook.js')
const { createServer } = require('http')
const initializeSocket = require('../utils/socket.js')
const chatRouter = require('../routes/chatRouter.js')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 1111

app.use('/', paymentWebhookRouter)

app.use(cors({
    origin: FRONTEND_URL,
    credentials: true,
}))

app.use(express.json())
app.use(cookieParser())

app.use('/', authRouter)
app.use('/', profileRouter)
app.use('/', requestRouter)
app.use('/', userRouter)
app.use('/', paymentRouter)
app.use('/', chatRouter)

//Database and server call

const server = createServer(app)
initializeSocket(server)


connectDB()
    .then(() => {
        console.log('Database connection established')
        server.listen(port, () => {
            console.log(`Connection Success at port ${port}`);
        })
    })
    .catch((err) => {
        console.error("Error : Can't Connect to the Database")
    })
