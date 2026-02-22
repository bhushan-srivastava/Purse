import Transactions from "../../models/transactions/transaction.model.js"
import AppError from "../appError.js";

async function updateTransaction(req, res, next) {
    try {
        const { transactionId } = req.params;
        const { user_id, ...updateData } = req.body;

        const updatedTransaction = await Transactions.findOneAndUpdate(
            { _id: transactionId, user_id: req.user._id },
            updateData,
            { new: true, runValidators: true }
        );

        if (!updatedTransaction) {
            throw new AppError('Transaction not found', 404);
        }

        res.status(200).json({
            message: 'Transaction updated successfully',
            data: updatedTransaction
        });
    }
    catch (error) {
        next(error);
    }
}

export { updateTransaction }
