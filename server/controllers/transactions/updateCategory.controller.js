import Transactions from "../../models/transactions/transaction.model.js"
import getErrorMessages from "../errorMessages.js"

async function updateCategory(req, res, next) {
    try {
        // code works without this !selectedCategory check because no document would match the query filter where the category is undefined because category is required
        if (!req.body.selectedCategory) {
            throw new Error("No category selected")
        }

        if (!req.body.newName) {
            throw new Error("Category's new name is required")
        }

        const result = await Transactions.updateMany(
            {
                user_id: req.body.user._id,
                category: req.body.selectedCategory
            },
            { category: req.body.newName },
            { runValidators: true }
        )

        // if (result.matchedCount < 1) {
        if (!result.matchedCount) {
            throw new Error("Category not found")
        }

        if (!result.acknowledged) {
            res.status(500).json({ message: 'Unable to update category' })
            return
        }

        // not using because of free server limit fears
        // const updateFilter = {
        //     user_id: req.body.user._id,
        //     category: req.body.selectedCategory
        // }

        // const updateToMake = { category: newName }
        // const write = await Transactions.bulkWrite([
        //     {
        //         updateMany: {
        //             filter: updateFilter,
        //             update: updateToMake
        //         }
        //     }
        // ])

        req.body.okMessage = 'Category updated successfully'
        next()
    }
    catch (error) {
        res.status(400).json({ message: getErrorMessages(error) })
    }
}

export { updateCategory }