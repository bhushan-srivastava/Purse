import Transactions from "../../models/transactions/transaction.model.js"
import AppError from "../appError.js";

const constructTransaction = ({ user, ...rest }) => {
    return { user_id: user._id, ...rest }
}

const constructFilter = async ({ user, ...filters }) => {
    const { startDate, endDate, startAmount, endAmount, type, categories, recurring } = filters

    const filter = {};

    filter.user_id = user._id;

    (startDate || endDate) && (filter.date = {});
    if (startDate && endDate && (startDate > endDate)) {
        throw new AppError('Start date cannot be greater than end date', 400)
    }
    startDate && (filter.date.$gte = new Date(new Date(startDate).setHours(0, 0, 0, 0)));
    endDate && (filter.date.$lte = new Date(new Date(endDate).setHours(0, 0, 0, 0)));

    (startAmount != null || endAmount != null) && (filter.amount = {});
    if (startAmount != null && endAmount != null && (startAmount > endAmount)) {
        throw new AppError('Start amount cannot be greater than end amount', 400)
    }
    startAmount != null && (filter.amount.$gte = startAmount);
    endAmount != null && (filter.amount.$lte = endAmount);

    if (type) {
        if (type === 'Spent' || type === 'Earned') {
            filter.type = type
        }
        else {
            throw new AppError('Type can be Spent/Earned', 400)
        }
    }

    if (Array.isArray(categories) && categories.length > 0) {
        const validCategories = await Transactions.distinct("category", { user_id: user._id })

        if (categories.every(category => validCategories.includes(category))) {
            filter.category = { $in: categories }
        }
        else {
            throw new AppError('Invalid category', 400)
        }
    }

    if (recurring != null) {
        if (typeof recurring !== 'boolean') {
            throw new AppError('Recurring can be true or false', 400)
        }
        filter.recurring = recurring
    }

    return filter
}

async function getAllTransactions(req, res, next) {
    try {
        const page = Math.max(parseInt(req.query.page || 1, 10), 1);
        const limit = Math.max(parseInt(req.query.limit || 10, 10), 1);
        const filter = { user_id: req.user._id };

        const [total, transactions, categories] = await Promise.all([
            Transactions.countDocuments(filter),
            Transactions.find(filter)
                .sort({ date: -1, createdAt: -1 })
                .limit(limit)
                .skip((page - 1) * limit)
                .exec(),
            Transactions.distinct("category", filter)
        ]);

        res.status(200).json({
            message: 'Transactions fetched successfully',
            data: transactions,
            total,
            page: parseInt(page),
            limit: parseInt(limit),
            pages: Math.ceil(total / limit),
            categories // keeping for now to avoid client side error
        });
    }
    catch (error) {
        next(error);
    }
}

export { constructTransaction, constructFilter, getAllTransactions }
