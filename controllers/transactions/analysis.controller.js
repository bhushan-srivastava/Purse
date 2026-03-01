import Transactions from "../../models/transactions/transaction.model.js"
import { constructFilter } from "./transactionHelper.js"

async function getAnalysis(req, res, next) {
    try {
        const filter = await constructFilter({ ...req.body, user: req.user })

        const transactionSummary = await Transactions.aggregate([
            {
                $match: filter
            },
            {
                $group: {
                    _id: { type: '$type', category: '$category' },
                    total: { $sum: "$amount" }
                }
            },
            {
                $addFields: {
                    type: '$_id.type',
                    category: '$_id.category',
                }
            },
            {
                $project: {
                    _id: false
                }
            }
        ])

        const tableDataOb = {}

        const graphData = {
            categories: [],
            earned: [],
            spent: []
        }

        transactionSummary.forEach((data) => {
            tableDataOb[data.category] ??= {}

            tableDataOb[data.category][data.type] = data.total
        })

        const tableData = []

        for (const key in tableDataOb) {
            tableData.push({
                category: key[0].toUpperCase() + key.substring(1),
                spent: tableDataOb[key]['Spent'] ?? 0,
                earned: tableDataOb[key]['Earned'] ?? 0
            })

            graphData.categories.push(key[0].toUpperCase() + key.substring(1))
            graphData.spent.push(tableDataOb[key]['Spent'] ?? 0)
            graphData.earned.push(tableDataOb[key]['Earned'] ?? 0)
        }

        res.status(200).json({
            message: 'Get analysis successful',
            tableData: tableData,
            graphData: graphData
        })
    }
    catch (error) {
        next(error)
    }
}

export { getAnalysis }
