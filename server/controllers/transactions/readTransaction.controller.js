import Transactions from "../../models/transactions/transaction.model.js"
import getErrorMessages from "../errorMessages.js"


async function readTransactions(req, res, next) {
    try {
        req.body.okMessage = 'Get transactions successful'
        next()
    }
    catch (error) {
        res.status(500).json({ message: 'Unable to get transactions' })
    }
}

export { readTransactions }