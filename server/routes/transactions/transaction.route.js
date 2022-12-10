import { Router } from "express"
import { requireAuth } from "../../controllers/auth/authorization.controller.js"
import { getUser } from "../../controllers/auth/authHelper.js"
import { readTransactions, filterTransactions } from "../../controllers/transactions/readTransaction.controller.js"
import { getAllTransactions } from "../../controllers/transactions/transactionHelper.js"
import { createTransaction } from "../../controllers/transactions/createTransaction.controller.js"
import { updateTransaction } from "../../controllers/transactions/updateTransaction.controller.js"
import { updateCategory } from "../../controllers/transactions/updateCategory.controller.js"
import { deleteTransaction } from "../../controllers/transactions/deleteTransaction.controller.js"

const router = Router()

router.route('/')
    .get(requireAuth, getUser, readTransactions, getAllTransactions)
    .post(requireAuth, getUser, createTransaction, getAllTransactions)
router.route('/:transactionId')
    .put(requireAuth, getUser, updateTransaction, getAllTransactions)
    .delete(requireAuth, getUser, deleteTransaction, getAllTransactions)
router.route('/filter')
    .post(requireAuth, getUser, filterTransactions) /**** no getAllTransactions here */
router.route('/category')
    .post(requireAuth, getUser, updateCategory, getAllTransactions)

export { router }