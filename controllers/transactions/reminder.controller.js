import Users from "../../models/user/user.model.js"
import Transactions from "../../models/transactions/transaction.model.js"
import getErrorMessages from "../errorMessages.js"
import nodemailer from "nodemailer"
import moment from 'moment'

async function sendEmail(transporter, transaction) {
    let { title, user_id, amount, type, category, description } = transaction

    description ??= 'NA'

    const user = await Users.findOne({ _id: user_id });

    if (!user) {
        throw new Error('Incorrect email')
    }

    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: '"Purse" <noreply@purse.com>', // sender address
        to: user.email, // list of receivers
        subject: "Transaction reminder", // Subject line
        html: "Hello,<br>"
            + "We wanted to remind you about your recurring transaction<br>"
            + "Title: " + title + ",<br>"
            + "Amount: " + amount + ",<br>"
            + "Type: " + type + ",<br>"
            + "Category: " + category + ",<br>"
            + "Description: " + description + "<br>"
    });

    if (!info) {
        throw new Error('Unable to send reset code')
    }

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: ", nodemailer.getTestMessageUrl(info));
}

async function sendReminder(req, res) {
    try {
        const today = new Date(new Date().setHours(0, 0, 0, 0))
        const tomorrow = new Date(moment(today).add(1, 'days'))
        // const dayAfterTomorrow = new Date(moment(tomorrow).add(1, 'days'))
        // const dayAfterTomorrow = new Date(moment(today).add(2, 'days'))

        const transactions = await Transactions.find({ remind_on: { $gte: today, $lt: tomorrow } })

        if (transactions.length === 0) {
            res.status(200).json({ message: 'Reminders sent' })
            return
        }

        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
        const testAccount = await nodemailer.createTestAccount();

        // if (!testAccount) {
        //     throw new Error('Unable to send reminder')
        // }

        // create reusable transporter object using the default SMTP transport
        const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: testAccount.user, // generated ethereal user
                pass: testAccount.pass, // generated ethereal password
            },
        });

        for (const transaction of transactions) {
            await sendEmail(transporter, transaction)
        }

        res.status(200).json({ message: 'Reminders sent' })
    }
    catch (error) {
        res.status(500).json({ message: getErrorMessages(error) })
    }
}

export { sendReminder }