import Users from "../../models/user/user.model.js"
import AppError from "../appError.js";

async function editName(req, res, next) {
    try {
        if (!req.body.newName) {
            throw new AppError('New first name is required', 400)
        }

        const user = await Users.findByIdAndUpdate(
            req.user._id,
            { name: req.body.newName },
            { new: true, runValidators: true }
        )

        if (!user) {
            throw new AppError('Incorrect user', 404)
        }

        if (user.name !== req.body.newName /* req.body.name */) {
            throw new AppError('Unable to update name', 500)
        }

        const threeDays = 3 * 24 * 60 * 60 * 1000; // 3 days in milliseconds
        res.cookie('purseName', user.name, { maxAge: threeDays })
        res.status(200).json({ message: 'Name updated successfully' })
    }
    catch (error) {
        next(error)
    }
}

export default editName;
