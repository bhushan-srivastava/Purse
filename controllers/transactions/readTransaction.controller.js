import Transactions from "../../models/transactions/transaction.model.js"
import { constructFilter } from "./transactionHelper.js"

async function filterTransactions(req, res, next) {
    try {
        const filter = await constructFilter({ ...req.body, user: req.user })

        const transactions = await Transactions.find(filter)

        res.status(200).json({
            message: 'Filter transactions successful',
            transactions: transactions,
        })
    }
    catch (error) {
        next(error)
    }
}

export { filterTransactions }
