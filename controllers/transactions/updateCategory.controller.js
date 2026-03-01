import Transactions from "../../models/transactions/transaction.model.js"
import AppError from "../appError.js";

async function updateCategory(req, res, next) {
    try {
        const { selectedCategory, newName } = req.body;

        if (!selectedCategory) {
            throw new AppError("No category selected", 400);
        }

        if (!newName) {
            throw new AppError("Category's new name is required", 400);
        }

        const result = await Transactions.updateMany(
            {
                user_id: req.user._id,
                category: selectedCategory
            },
            { category: newName },
            { runValidators: true }
        );

        if (result.matchedCount === 0) {
            throw new AppError("Category not found", 404);
        }

        res.status(200).json({ 
            message: 'Category updated successfully',
            data: result 
        });
    }
    catch (error) {
        next(error);
    }
}

export { updateCategory }
