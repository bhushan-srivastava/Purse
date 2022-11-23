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

export { requireAuth, getAuth }