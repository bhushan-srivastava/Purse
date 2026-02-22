import Transactions from "../../models/transactions/transaction.model.js"
import AppError from "../appError.js";

async function deleteTransaction(req, res, next) {
    try {
        const transaction = await Transactions.findOneAndDelete({
            _id: req.params.transactionId,
            user_id: req.user._id
        });

        if (!transaction) {
            throw new AppError('Transaction not found', 404);
        }

        res.status(200).json({ message: 'Transaction deleted successfully' });
    }
    catch (error) {
        next(error);
    }
}

export { deleteTransaction };
