import Transactions from "../../models/transactions/transaction.model.js"
import getErrorMessages from "../errorMessages.js"
import { constructTransaction } from "./transactionHelper.js"

async function createTransaction(req, res, next) {
    try {
        const transaction = constructTransaction(req.body)

        await Transactions.create(transaction)

        // if (transaction !== createdTransaction) {
        //     res.status(500).json({ message: 'Unable to add transaction' })
        //     return
        // }

        req.body.okMessage = 'Transaction added successfully'
        next()
    }
    catch (error) {
        res.status(400).json({ message: getErrorMessages(error) })
    }
}

export { createTransaction };