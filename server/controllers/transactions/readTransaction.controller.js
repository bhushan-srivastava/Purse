import Transactions from "../../models/transactions/transaction.model.js"
import getErrorMessages from "../errorMessages.js"
import { constructFilter } from "./transactionHelper.js"


async function readTransactions(req, res, next) {
    try {
        req.body.okMessage = 'Get transactions successful'
        next()
    }
    catch (error) {
        res.status(500).json({ message: 'Unable to get transactions' })
    }
}

async function filterTransactions(req, res) {
    try {
        // console.log(constructFilter(req.body));
        // res.send('check log')

        // const filter = await constructFilter(req.query)

        const filter = await constructFilter(req.body)

        const transactions = await Transactions.find(filter)

        req.body.okMessage = 'Filter transactions successful'

        res.status(200).json({
            message: req.body.okMessage,
            transactions: transactions,
        })
    }
    catch (error) {
        res.status(400).json({ message: getErrorMessages(error) })
    }
}

export { readTransactions, filterTransactions }