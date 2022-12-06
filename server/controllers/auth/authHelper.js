import Users from "../../models/user.model.js"
import getErrorMessages from "../errorMessages.js";

async function getUser(req, res, next) {
    try {
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