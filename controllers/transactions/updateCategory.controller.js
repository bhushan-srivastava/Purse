import Transactions from "../../models/transactions/transaction.model.js"

async function updateCategory(req, res, next) {
    try {
        const { selectedCategory, newName } = req.body;

        if (!selectedCategory) {
            const error = new Error("No category selected");
            error.statusCode = 400;
            throw error;
        }

        if (!newName) {
            const error = new Error("Category's new name is required");
            error.statusCode = 400;
            throw error;
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
            const error = new Error("Category not found");
            error.statusCode = 404;
            throw error;
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
