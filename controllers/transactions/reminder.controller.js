import Users from "../../models/user/user.model.js"
import Transactions from "../../models/transactions/transaction.model.js"
import nodemailer from "nodemailer"
import moment from 'moment'
import AppError from "../appError.js";

async function sendEmail(transporter, transaction) {
    let { title, user_id, amount, type, category, description } = transaction

    description ??= 'NA'

    const user = await Users.findOne({ _id: user_id });

    if (!user) {
        throw new AppError('Incorrect email', 404)
    }

    const info = await transporter.sendMail({
        from: '"Purse" <noreply@purse.com>', // sender address
        to: user.email, // list of receivers
        subject: "Transaction reminder", // Subject line
        text: "Hello,\n" // plain text body
            + "We wanted to remind you about your recurring transaction\n"
            + "Title: " + title + ",\n"
            + "Amount: " + amount + ",\n"
            + "Type: " + type + ",\n"
            + "Category: " + category + ",\n"
            + "Description: " + description + "\n",
        html: "Hello,<br>" // html body
            + "We wanted to remind you about your recurring transaction<br>"
            + "Title: " + title + ",<br>"
            + "Amount: " + amount + ",<br>"
            + "Type: " + type + ",<br>"
            + "Category: " + category + ",<br>"
            + "Description: " + description + "<br>"
    });

    console.log("Preview URL: ", nodemailer.getTestMessageUrl(info));
}

async function sendRemindersForToday() {
    const today = new Date(new Date().setHours(0, 0, 0, 0))
    const tomorrow = new Date(moment(today).add(1, 'days'))

    const transactions = await Transactions.find({ remind_on: { $gte: today, $lt: tomorrow } })

    if (transactions.length === 0) {
        return 0
    }

    const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.ETHEREAL_USER, // generated ethereal user
            pass: process.env.ETHEREAL_PASSWORD, // generated ethereal password
        },
    });

    for (const transaction of transactions) {
        await sendEmail(transporter, transaction)
    }

    return transactions.length
}

async function sendReminder(req, res, next) {
    try {
        const reminderCount = await sendRemindersForToday()
        res.status(200).json({ message: 'Reminders sent', count: reminderCount })
    } catch (error) {
        next(error)
    }
}

export { sendReminder, sendRemindersForToday }
