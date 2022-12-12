import Transactions from "../../models/transactions/transaction.model.js"
import getErrorMessages from "../errorMessages.js"
import { constructFilter } from "./transactionHelper.js"

async function getAnalysis(req, res) {
    try {
        const filter = await constructFilter(req.body)

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
                    category: '$_id.category'
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

        // if (transactionSummary.length === 0) {
        //     res.status(200).json({
        //         message: 'Get analysis successful',
        //         tableData: tableData,
        //         graphData: graphData
        //     })
        // }

        transactionSummary.forEach((data) => {
            tableDataOb[data.category] ??= {}

            tableDataOb[data.category][data.type] = data.total

            // graphData[data.type][data.category] = data.total
        })

        const tableData = []

        for (const key in tableDataOb) {
            tableData.push({
                category: key[0] + key.substring(1),
                // spent: key["Spent"],
                // earned: key["Earned"]
                spent: tableDataOb[key]['Spent'] ?? 0,
                earned: tableDataOb[key]['Earned'] ?? 0
            })

            graphData.categories.push(key[0] + key.substring(1))
            graphData.spent.push(tableDataOb[key]['Spent'] ?? 0)
            graphData.earned.push(tableDataOb[key]['Earned'] ?? 0)
        }

        res.status(200).json({
            message: 'Get analysis successful',
            // tableData: tableDataOb,
            tableData: tableData,
            graphData: graphData
        })
    }
    catch (error) {
        res.status(400).json({ message: getErrorMessages(error) })
    }
}

export { getAnalysis }