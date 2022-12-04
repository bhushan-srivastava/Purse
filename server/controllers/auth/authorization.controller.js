import Users from "../../models/user.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config({ path: '../development.env' })

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
                    req.body.email = decodedToken.email
                    next();
                }
            });
    }
    else {
        res.status(401).json({ message: 'Unauthorized' })
    }
};

async function getUser(req, res, next) {
    const user = await Users.findOne({ "email": req.body.email });

    if (!user) {
        res.status(401).json({ message: 'Incorrect email' })
        return
    }

    req.body.user_id = user._id
    next()
}

function getAuth(req, res) {
    res.status(200).json({ message: 'Authorized' })
}

export { requireAuth, getUser, getAuth }