import dotenv from "dotenv"
import mongoose from "mongoose"
import express from "express"
// import * as cookieParser from "cookie-parser" // if error is there then uncomment this line
import cookieParser from "cookie-parser"
import authController from "./controllers/auth/authController.js"

dotenv.config({ path: '../development.env' })

const app = express();

// middleware
app.use(express.json());
app.use(cookieParser());

// database connection
// mongoose.connect(process.env.DB_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }) // if error then uncomment this line
mongoose.connect(process.env.DB_CONNECTION_STRING)
    .then((result) => {
        app.listen(8080)
        console.info('listneing on port 8080')
    })
    .catch((error) => {
        console.error(error)
    })

// routes
const { register, login, sendResetEmail, reset, logout, requireAuth } = authController

// auth
app.post('/register', register)
app.post('/login', login)
app.get('/forgot', sendResetEmail)
app.post('/forgot', reset)
app.get('/logout', logout)

// transaction
app.get('/transaction', requireAuth, /* controller method */)
app.post('/transaction', requireAuth, /* controller method */)
app.put('/transaction/:transactionId', requireAuth, /* controller method */)
app.delete('/transaction/:transactionId', requireAuth, /* controller method */)