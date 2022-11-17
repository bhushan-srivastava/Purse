import Users from "../../models/user.model"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import * as dotenv from 'dotenv'
dotenv.config()

// static method to login user
userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error('incorrect password');
    }
    throw Error('incorrect email');
};

async function register(req, res) {
    try {
        await Users.create(req.body)
        res.status(201).json({ message: 'User registered successfully' })
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}

async function login(req, res) {
    const user = await Users.findOne({ "email": req.body.email });

    if (!user) {
        res.status(401).json({ message: 'Incorrect email' })
        return
    }
    else {
        const auth = await bcrypt.compare(req.body.password, user.password);
        if (!auth) {
            res.status(401).json({ message: 'Incorrect password' })
            return
        }
    }

    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id });
}

// create json web token
const maxAge = 3 * 24 * 60 * 60;
function createToken(id) {
    return jwt.sign(
        { id },
        config.JWT_SECRET,
        { expiresIn: maxAge }
    );
};

export default { register, login }