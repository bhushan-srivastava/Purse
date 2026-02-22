import Users from "../../models/user/user.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import nodemailer from "nodemailer"
import { v4 as uuidv4 } from "uuid";
import AppError from "../appError.js";


const cookieName = process.env.AUTH_COOKIE_NAME || "purseToken";



const getAuthCookieOptions = () => {
    const secure = process.env.COOKIE_SECURE=='true'? true : false; //.env vars are not primitive boolean, they're strings
    
    // const sameSite = process.env.COOKIE_SAMESITE || (secure ? "none process.env.NODE_ENV === "production");
    // const sameSite = process.env.COOKIE_SAMESITE || "lax"; // allows same domain server to clear client cookies (used during logout)
    // const parsedMaxAge = parseInt(process.env.COOKIE_MAX_AGE_MS);
    
    const maxAge = 3 * 24 * 60 * 60 * 1000; // 3 days in milliseconds

    return {
        httpOnly: true,
        secure,
        // sameSite,
        maxAge,
        path: "/"
    };
};

const getAuthCookieClearOptions = () => {
    const { httpOnly, secure, path } = getAuthCookieOptions();
    return { httpOnly, secure, path };
};

async function register(req, res, next) {
    try {
        await Users.create(req.body)
        res.status(201).json({ message: 'User registered successfully' })
    }
    catch (error) {
        next(error);
    }
}

async function login(req, res, next) {
    try {
        const user = await Users.findOne({ "email": req.body.email });

        if (!user) {
            throw new AppError('Incorrect email', 401)
        }

        if (!req.body.password) {
            throw new AppError('Password is required to login', 400)
        }

        const auth = await bcrypt.compare(req.body.password, user.password);
        if (!auth) {
            throw new AppError('Incorrect password', 401)
        }

        if (user.reset_code) {
            throw new AppError('Password to be reset', 401)
        }

        const token = createToken(user.email);
        const decodedToken = jwt.decode(token);
        user.activeSessions = user.activeSessions.concat(decodedToken.jti);
        await user.save();

        res.cookie(cookieName, token, getAuthCookieOptions());
        res.status(200).json({ message: 'Login successful', name: user.name });
    }
    catch (error) {
        next(error);
    }
}

function createToken(email) {
    /**uuidv4() uses cryptographically secure random bytes from the runtime/OS
    then it formats those bytes into UUID format
    xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx */
    const jti = uuidv4();
    return jwt.sign(
        { email, jti },
        process.env.JWT_SECRET,
        { expiresIn: 3 * 24 * 60 * 60 /* 3 days in seconds */ }
    );
};

async function sendResetEmail(req, res, next) {
    try {
        const randomCode = Math.floor((Math.random() * 100000) + 10000)

        let user = req.user

        user.reset_code = randomCode

        await user.save()

        const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.ETHEREAL_USER, // generated ethereal user
                pass: process.env.ETHEREAL_PASSWORD, // generated ethereal password
            },
        });

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

        console.log("Preview URL: ", nodemailer.getTestMessageUrl(info));
        res.status(200).json({ message: 'Reset code sent' })
    }
    catch (error) {
        next(error)
    }
}

async function reset(req, res, next) {
    try {
        const user = req.user

        if (!user.reset_code) {
            throw new AppError('Reset code is not sent yet', 400)
        }

        const match = await bcrypt.compare(req.body.verificationCode, user.reset_code);
        if (!match) {
            throw new AppError('Incorrect verification code', 400)
        }

        user.password = req.body.newPassword

        user.reset_code = undefined
        user.activeSessions = []; // flush all active sessions
        // after reset on any 1 device, all deviced logged out

        await user.save()
        res.clearCookie(cookieName, getAuthCookieClearOptions());

        res.status(200).json({ message: 'Password reset successful' })
    }
    catch (error) {
        next(error)
    }
}

async function logout(req, res, next) {
    try {
        req.user.activeSessions = req.user.activeSessions.filter((jti) => jti !== req.jti);
        await req.user.save();
        res.clearCookie(cookieName, getAuthCookieClearOptions()); // maxage will be 0 automatically
        
        res.status(200).json({ message: 'Logout successful' })
    }
    catch (error) {
        next(error)
    }
}

export { register, login, sendResetEmail, reset, logout }
