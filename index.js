import dotenv from "dotenv"
import mongoose from "mongoose"
import express from "express"
// import * as cookieParser from "cookie-parser" // if error is there then uncomment this line
import cookieParser from "cookie-parser"
import path from 'path'
import { fileURLToPath } from 'url';
import { router as authRoutes } from "./routes/auth/auth.route.js"
import { router as transactionRoutes } from "./routes/transactions/transaction.route.js"
import { router as userRoutes } from "./routes/user/user.route.js"

/* production environment */
if (process.env.NODE_ENV !== 'production') {
    dotenv.config({ path: '../development.env' })
}
else {
    dotenv.config()
}

const app = express();

// middleware
app.use(express.json());
app.use(cookieParser());

// app.use('/', authRoutes)
app.use('/api/auth', authRoutes)
// app.use('/', transactionRoutes)
app.use('/api/transaction', transactionRoutes)
app.use('/api/user', userRoutes)

/* production client build folder */
if (process.env.NODE_ENV === 'production') {
    const __filename = fileURLToPath(import.meta.url);

    const __dirname = path.dirname(__filename);

    app.use(express.static(path.join(__dirname, './client/build')))

    app.get('/*', function (req, res) {
        res.sendFile(path.join(__dirname, './client/build/index.html'));
    });
}

const port = process.env.PORT || 8080

// database connection
mongoose.set('strictQuery', true);
// mongoose.connect(process.env.DB_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }) // if error then uncomment this line
mongoose.connect(process.env.DB_CONNECTION_STRING)
    .then((result) => {
        app.listen(port)
        console.info(`listneing on port ${port}`)
    })
    .catch((error) => {
        console.error(error)
    })