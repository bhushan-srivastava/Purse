import Users from "../../models/user/user.model.js"
import validator from 'validator'
import AppError from "../appError.js";

async function getUser(req, res, next) {
    try {
        // if email is undef then pass empty string to isEmail() to avaoid error
        if (!validator.isEmail(req.body.email || '')) {
            throw new AppError('Invalid email', 400)
        }

        const user = await Users.findOne({ "email": req.body.email });

        if (!user) {
            throw new AppError('Incorrect email', 401)
        }

        req.user = user
        next()
    }
    catch (error) {
        next(error)
    }
}

export { getUser }
