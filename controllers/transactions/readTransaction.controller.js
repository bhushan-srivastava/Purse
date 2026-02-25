import Transactions from "../../models/transactions/transaction.model.js"
import { constructFilter } from "./transactionHelper.js"

async function filterTransactions(req, res, next) {
    try {
        const {
            sortBy,
            sortOrder,
            page: pageInput,
            limit: limitInput,
            ...filters
        } = req.body || {};
        const filter = await constructFilter({ ...filters, user: req.user })
        const sortField = sortBy === 'amount' ? 'amount' : 'date';
        const sortDirection = sortOrder === 'ascend' ? 1 : -1;
        const page = Math.max(parseInt(pageInput || 1, 10), 1);
        const limit = Math.max(parseInt(limitInput || 10, 10), 1);

        const [total, transactions] = await Promise.all([
            Transactions.countDocuments(filter),
            Transactions.find(filter)
                .sort({ [sortField]: sortDirection, createdAt: -1 })
                .limit(limit)
                .skip((page - 1) * limit)
                .exec()
        ])

        res.status(200).json({
            message: 'Filter transactions successful',
            transactions,
            total,
            page,
            limit,
            pages: Math.ceil(total / limit),
        })
    }
    catch (error) {
        next(error)
    }
}

export { filterTransactions }
