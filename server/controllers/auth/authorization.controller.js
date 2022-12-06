// import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import getErrorMessages from "../errorMessages.js";

dotenv.config({ path: '../development.env' })

// authZ

async function requireAuth(req, res, next) {
    try {
        const token = req.cookies.purse;

        if (!token) {
            throw new Error('Unauthorized')
        }

        // check json web token exists & is verified
        const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);

        req.body.email = decodedToken.email
        next();
    }
    catch (error) {
        res.status(401).json({ message: getErrorMessages(error) })
    }
};

function getAuth(req, res) {
    res.status(200).json({ message: 'Authorized' })
}

export { requireAuth, getAuth }