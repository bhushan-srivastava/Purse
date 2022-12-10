import Transactions from "../../models/transactions/transaction.model.js"
import getErrorMessages from "../errorMessages.js"

const constructTransaction = ({ email, user, ...rest }) => {
    return { user_id: user._id, ...rest }
}

const constructFilter = async ({ email, user, ...filters }) => {
    const { startDate, endDate, startAmount, endAmount, type, categories, recurring } = filters

    const filter = {};

    filter.user_id = user._id;

    (startDate || endDate) && (filter.date = {});
    if (startDate && endDate && (startDate > endDate)) {
        throw new Error('Start date cannot be greater than end date')
    }
    startDate && (filter.date.$gte = startDate);
    endDate && (filter.date.$lte = endDate);

    (startAmount || endAmount) && (filter.amount = {});
    if (startAmount && endAmount && (startAmount > endAmount)) {
        throw new Error('Start amount cannot be greater than end amount')
    }
    startAmount && (filter.amount.$gte = startAmount);
    endAmount && (filter.amount.$lte = endAmount);

    if (type) {
        if (type === 'Spent' || type === 'Earned') {
            filter.type = type
        }
        else {
            throw new Error('Type can be Spent/Earned')
        }
    }

    if (categories) {
        const validCategories = await Transactions.distinct("category", { user_id: user._id })

        if (categories.every(category => validCategories.includes(category))) {
            filter.category = { $in: categories }
        }
        else {
            throw new Error('Invalid category')
        }
    }

    // categories
    //     && categories.every(category => validCategories.includes(category))
    //     && (filter.category = { $in: categories });

    if (recurring) {
        if (typeof recurring !== 'boolean') {
            throw new Error('Recurring can be true or false')
        }
        filter.recurring = recurring
    }

    return filter
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

export { constructTransaction, constructFilter, getAllTransactions }