import * as dotenv from "dotenv";
import mongoose from "mongoose"
import express from "express"
import cookieParser from "cookie-parser"
import path from 'path'
import { fileURLToPath } from 'url';
import { router as authRoutes } from "./routes/auth/auth.route.js"
import { router as transactionRoutes } from "./routes/transactions/transaction.route.js"
import { router as userRoutes } from "./routes/user/user.route.js"
import { requireAuth } from "./controllers/auth/authorization.controller.js"
import globalErrorHandler from './controllers/errorController.js';
import AppError from "./controllers/appError.js";
import { startReminderCron } from "./jobs/reminder.cron.js";


dotenv.config();


const server = express();

server.use(express.json());
server.use(cookieParser());

server.use('/api/auth', authRoutes)
server.use('/api/transaction', requireAuth, transactionRoutes)
server.use('/api/user', requireAuth, userRoutes)

/* production client build folder */
if (process.env.NODE_ENV == 'production') {
    const __filename = fileURLToPath(import.meta.url);

    const __dirname = path.dirname(__filename);

    server.use(express.static(path.join(__dirname, './client/build')))

    server.get('/*', function (req, res) {
        res.sendFile(path.join(__dirname, './client/build/index.html'));
    });
}

// 404 for unknown routes
server.all('*', (req, res, next) => {
    next(new AppError(`Cannot find ${req.originalUrl}`, 404));
});

// user friendly messages to client
server.use(globalErrorHandler);

const port = process.env.PORT || 8082

mongoose.set('strictQuery', true);
mongoose.connect(process.env.DB_CONNECTION_STRING)
    .then((result) => {
        startReminderCron(); // recurring txns reminder
        server.listen(port)
        console.info(`listening on port ${port}`)
    })
    .catch((error) => {
        console.error(error)
    })
