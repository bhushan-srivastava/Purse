import Users from "../../models/userModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config({ path: '../development.env' })

// authN

async function register(req, res) {
    try {
        await Users.create(req.body)
        res.status(201).json({ message: 'User registered successfully' })
    }
    catch (error) {
        if (error.code === 'E11000') {
            res.status(400).json({ message: 'Email is already in use' })
        }
        else {
            res.status(400).json({ message: error.message })
        }
    }
}

async function login(req, res) {
    const user = await Users.findOne({ "email": req.body.email });

    if (!user) {
        res.status(401).json({ message: 'Incorrect email' })
        return
    }

    const auth = await bcrypt.compare(req.body.password, user.password);
    if (!auth) {
        res.status(401).json({ message: 'Incorrect password' })
        return
    }

    const token = createToken(user.email);
    // for production
    // res.cookie('purse', token, { httpOnly: true, secure: true, maxAge: maxAge * 1000 });
    res.cookie('purse', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ message: 'Login successfull', name: user.name });
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
    console.log('in reset get');
}

async function reset(req, res) {
    console.log('in reset post');
}

async function logout(req, res) {
    // res.clearCookie('purse', '', { maxAge: 1 });
    res.cookie('purse', '', { maxAge: 1 });
    res.status(200).json({ message: 'Logout successful' })
}

// authZ

function requireAuth(req, res, next) {
    const token = req.cookies.purse;

    // check json web token exists & is verified
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET,
            (err, decodedToken) => {
                if (err) {
                    res.status(401).json({ message: 'Unauthorized' })
                }
                else {
                    next();
                }
            });
    }
    else {
        res.status(401).json({ message: 'Unauthorized' })
    }
};

const authController = { register, login, sendResetEmail, reset, logout, requireAuth }

export default authController