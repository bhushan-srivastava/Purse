import Users from "../../models/user/user.model.js"
import getErrorMessages from "../errorMessages.js"

async function editName(req, res) {
    try {
        if (!req.body.newName) {
            throw new Error('New first name is required')
        }

        const user = await Users.findByIdAndUpdate(
            req.body.user._id,
            { name: req.body.newName },
            { new: true, runValidators: true }
        )

        if (!user) {
            throw new Error('Incorrect user')
        }

        if (user.name !== req.body.newName /* req.body.name */) {
            res.status(500).json({ message: 'Unable to update name' })
            return
        }

        const threeDays = 3 * 24 * 60 * 60 * 1000; // 3 days in milliseconds
        res.cookie('purseName', user.name, { maxAge: threeDays })
        res.status(200).json({ message: 'Name updated successfully' })
    }
    catch (error) {
        res.status(400).json({ message: getErrorMessages(error) })
    }
}

export default editName;