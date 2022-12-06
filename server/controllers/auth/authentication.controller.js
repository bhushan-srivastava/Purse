import Users from "../../models/user.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import nodemailer from "nodemailer"
import getErrorMessages from "../errorMessages.js"

dotenv.config({ path: '../development.env' })

// authN

async function register(req, res) {
    try {
        await Users.create(req.body)
        res.status(201).json({ message: 'User registered successfully' })
    }
    catch (error) {
        res.status(400).json({ message: getErrorMessages(error) })
    }
}

async function login(req, res) {
    try {
        const user = req.body.user

        const auth = await bcrypt.compare(req.body.password, user.password);
        if (!auth) {
            throw new Error('Incorrect password')
        }

        if (user.reset_code) {
            throw new Error('Password to be reset')
        }

        const token = createToken(user.email);
        // for production if website is deployed on https server
        // res.cookie('purse', token, { httpOnly: true, secure: true, maxAge: maxAge * 1000 });
        res.cookie('purse', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.cookie('purseName', user.name, { maxAge: maxAge * 1000 });
        res.status(200).json({ message: 'Login successful', name: user.name });
    }
    catch (error) {
        res.status(401).json({ message: getErrorMessages(error) })
    }
}

// create json web token
const maxAge = 3 * 24 * 60 * 60;
function createToken(email) {
    return jwt.sign(
        { email },
        process.env.JWT_SECRET,
        { expiresIn: 3 * 24 * 60 * 60 /* 3 days in seconds */ }
    );
};

async function sendResetEmail(req, res) {
    try {
        const randomCode = Math.floor((Math.random() * 100000) + 10000)

        let user = req.body.user

        user.reset_code = randomCode

        const updatedUser = await user.save()

        /******** maybe useless to check for !updatedUser because if any issue is there mongoose will throw error ********/
        // if (!updatedUser) {
        //     throw new Error('Reset code not sent')
        // }

        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
        const testAccount = await nodemailer.createTestAccount();

        if (!testAccount) {
            throw new Error('Reset code not sent')
        }

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

        // send mail with defined transport object
        const info = await transporter.sendMail({
            from: '"Purse" <noreply@purse.com>', // sender address
            to: user.email, // list of receivers
            subject: "Verification code", // Subject line
            text: "Hello " + user.name
                + ",\nPlease use " + randomCode
                + " as a verification code to change your password.", // plain text body
            html: "Hello " + user.name
                + ",<br>Please use " + randomCode
                + " as a verification code to change your password." // html body
        });

        if (!info) {
            throw new Error('Reset code not sent')
        }

        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: ", nodemailer.getTestMessageUrl(info));
        res.status(200).json({ message: 'Reset code sent' })
    }
    catch (error) {
        res.status(500).json({ message: getErrorMessages(error) })
    }
}

async function reset(req, res) {
    try {
        const user = req.body.user

        const match = await bcrypt.compare(req.body.verificationCode, user.reset_code);
        if (!match) {
            throw new Error('Incorrect verification code')
        }

        user.password = req.body.newPassword

        user.reset_code = undefined

        await user.save()

        res.status(200).json({ message: 'Password reset successful' })
    }
    catch (error) {
        res.status(400).json({ message: getErrorMessages(error) })
    }
}

async function logout(req, res, next) {
    try {
        res.clearCookie('purse'); // works
        res.clearCookie('purseName');
        next()
    }
    catch (error) {
        res.status(500).json({ message: 'Logout unsuccessful' })
    }
}

async function sendLogoutResponse(req, res) {
    /********* maybe useless try catch block or bad code */
    try {
        res.status(200).json({ message: 'Logout successful' })
    }
    catch (error) {
        res.status(500).json({ message: 'Logout unsuccessful' })
    }
}

export { register, login, sendResetEmail, reset, logout, sendLogoutResponse }