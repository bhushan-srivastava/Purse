import Users from "../../models/user/user.model.js"
import getErrorMessages from "../errorMessages.js"

async function editName(req, res) {
    try {
        const user = await Users.findByIdAndUpdate(
            req.body.user_id,
            { name: req.body.name },
            { new: true }
        )

        if (!user) {
            throw new Error('Incorrect user')
        }

        if (user.name !== req.body.name) {
            res.status(500).json({ message: 'Unable to update name' })
            return
        }

        const maxAge = 3 * 24 * 60 * 60;
        res.cookie('purseName', user.name, { maxAge: maxAge * 1000 })
        res.status(200).json({ message: 'Name updated successfully' })
    }
    catch (error) {
        res.status(400).json({ message: getErrorMessages(error) })
    }
}

export default editName;