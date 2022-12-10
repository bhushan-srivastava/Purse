import Transactions from "../../models/transactions/transaction.model.js"
import getErrorMessages from "../errorMessages.js"

const constructTransaction = ({ email, user, ...rest }) => {
    return { user_id: user._id, ...rest }
}

async function getAllTransactions(req, res) {
    try {
        const transactions = await Transactions.find({ user_id: req.body.user._id })

        const categories = await Transactions.distinct("category", { user_id: req.body.user._id })

        res.status(200).json({
            message: req.body.okMessage,
            transactions: transactions,
            categories: categories
        })
    }
    catch (error) {
        res.status(500).json({ message: getErrorMessages(error) })
    }
}

export { constructTransaction, getAllTransactions }