import { Router } from "express"
import { filterTransactions } from "../../controllers/transactions/readTransaction.controller.js"
import { getAllTransactions } from "../../controllers/transactions/transactionHelper.js"
import { createTransaction } from "../../controllers/transactions/createTransaction.controller.js"
import { updateTransaction } from "../../controllers/transactions/updateTransaction.controller.js"
import { updateCategory } from "../../controllers/transactions/updateCategory.controller.js"
import { deleteTransaction } from "../../controllers/transactions/deleteTransaction.controller.js"
import { getAnalysis } from "../../controllers/transactions/analysis.controller.js"
import { sendReminder } from "../../controllers/transactions/reminder.controller.js"

const router = Router()

router.route('/')
    .get(getAllTransactions)
    .post(createTransaction)
router.route('/:transactionId')
    .put(updateTransaction)
    .delete(deleteTransaction)
router.route('/filter')
    .post( filterTransactions)
router.route('/category')
    .post(updateCategory)
router.route('/analysis')
    .post( getAnalysis)
router.route('/reminder')
    .get(sendReminder)

export { router }