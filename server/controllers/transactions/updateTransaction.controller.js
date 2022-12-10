import Transactions from "../../models/transactions/transaction.model.js"
import getErrorMessages from "../errorMessages.js"
import { constructTransaction } from "./transactionHelper.js"

async function updateTransaction(req, res, next) {
    try {
        /* not using upsert because cast to ObjectId can fail because the user can give any incorrect id in any format */

        const transaction = constructTransaction(req.body)

        const updatedTransaction = await Transactions.replaceOne(
            { _id: req.params.transactionId },
            transaction,
            { new: true /*, upsert: true */, runValidators: true }
        )

        if (!updatedTransaction) {
            await Transactions.create(transaction)
            req.body.okMessage = 'Transaction added successfully'
        }
        else {
            req.body.okMessage = 'Transaction updated successfully'
        }

        next()
    }
    catch (error) {
        res.status(400).json({ message: getErrorMessages(error) })
    }
}

export { updateTransaction }