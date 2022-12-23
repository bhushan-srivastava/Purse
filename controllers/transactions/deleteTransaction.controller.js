import Transactions from "../../models/transactions/transaction.model.js"
import getErrorMessages from "../errorMessages.js"

async function deleteTransaction(req, res, next) {
    try {
        const transaction = await Transactions.findByIdAndDelete(req.params.transactionId)

        if (!transaction) {
            throw new Error('Incorrect transaction ID')
        }

        req.body.okMessage = 'Transaction deleted successfully'
        next()
    }
    catch (error) {
        res.status(400).json({ message: getErrorMessages(error) })
    }
}

export { deleteTransaction };