import Transactions from "../../models/transactions/transaction.model.js"
import { constructTransaction } from "./transactionHelper.js"

async function createTransaction(req, res, next) {
    try {
        const transaction = constructTransaction({ ...req.body, user: req.user });

        const newTransaction = await Transactions.create(transaction);

        res.status(201).json({ 
            message: 'Transaction created successfully',
            data: newTransaction 
        });
    }
    catch (error) {
        next(error);
    }
}

export { createTransaction };
