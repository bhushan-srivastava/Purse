import Users from "../../models/user.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config({ path: '../development.env' })

// authN

// get error message
const getErrorMessage = (error) => {
    // console.log(err.message, err.code);
    // let errorMessage = ""

    // // incorrect email
    // if (err.message === 'incorrect email') {
    //     errors.email = 'That email is not registered';
    // }

    // // incorrect password
    // if (err.message === 'incorrect password') {
    //     errors.password = 'That password is incorrect';
    // }

    // // duplicate email error
    // if (err.code === 11000) {
    //     errorMessage += 'Email is already in use';
    // }

    // // user validation errors
    // if (err.message.includes('user validation failed')) {
    //     Object.values(err.errors).forEach(({ properties }) => {
    //         errorMessage = properties.message;
    //     });
    // }

    let errorMessage = ""

    if (error.code === 11000) {
        errorMessage += "Email is already registered to a user"
    }

    // if (error.message.includes('validation failed')) {
    if (error.name === "ValidationError") {
        Object.values(error.errors).forEach((errorField) => {
            errorMessage += errorField.message
        })
    }

    return errorMessage;
}

async function register(req, res) {
    try {
        await Users.create(req.body)
        res.status(201).json({ message: 'User registered successfully' })
    }
    catch (error) {
        let errorMessage = getErrorMessage(error)
        res.status(400).json({ message: errorMessage })
    }
    // catch (error) {
    //     //   res.status(400).json({ error.message })

    //     res.status(400).json({ error })
    // }
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
    res.cookie('purseName', user.name, { maxAge: maxAge * 1000 });
    res.status(200).json({ message: 'Login successful', name: user.name });
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
    res.clearCookie('purse'); // works
    res.clearCookie('purseName');
    res.status(200).json({ message: 'Logout successful' })
}

// authZ

function requireAuth(req, res, next) {
    const token = req.cookies.purse;

    // check json web token exists & is verified
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET,
            function (err, decodedToken) {
                if (err) {
                    res.status(401).json({ message: 'Unauthorized' })
                }
                else if (decodedToken) {
                    next();
                }
            });
    }
    else {
        res.status(401).json({ message: 'Unauthorized' })
    }
};

function getAuth(req, res) {
    res.status(200).json({ message: 'Authorized' })
}

export { register, login, sendResetEmail, reset, logout, requireAuth, getAuth }