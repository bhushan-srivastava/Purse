import Users from "../../models/user/user.model.js"
import getErrorMessages from "../errorMessages.js";

async function getUser(req, res, next) {
    try {
        /******** maybe useless maybe usefull */
        // if (!req.body.email) {
        //     throw new Error('Email is required')
        // }

        const user = await Users.findOne({ "email": req.body.email });

        if (!user) {
            throw new Error('Incorrect email')
        }

        req.body.user = user
        next()
    }
    catch (error) {
        res.status(401).json({ message: getErrorMessages(error) })
    }
}

export { getUser }