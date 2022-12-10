import dotenv from "dotenv"
import mongoose from "mongoose"
import express from "express"
// import * as cookieParser from "cookie-parser" // if error is there then uncomment this line
import cookieParser from "cookie-parser"
import { router as authRoutes } from "./routes/auth/auth.route.js"
import { router as transactionRoutes } from "./routes/transactions/transaction.route.js"
import { router as userRoutes } from "./routes/user/user.route.js"

dotenv.config({ path: '../development.env' })

const app = express();

// middleware
app.use(express.json());
app.use(cookieParser());

// app.use('/', authRoutes)
app.use('/api/auth', authRoutes)
// app.use('/', transactionRoutes)
app.use('/api/transaction', transactionRoutes)
app.use('/api/user', userRoutes)

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