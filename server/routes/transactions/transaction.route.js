import { Router } from "express"
import { getUser } from "../../controllers/auth/authHelper.js"
import { requireAuth } from "../../controllers/auth/authorization.controller.js"
import { createTransaction } from "../../controllers/transactions/createTransaction.controller.js"
import { readTransactions } from "../../controllers/transactions/readTransaction.controller.js"
import { deleteTransaction } from "../../controllers/transactions/deleteTransaction.controller.js"

const router = Router()

router.route('/api/transaction')
    .get(requireAuth, getUser, readTransactions)
    .post(requireAuth, getUser, createTransaction)
router.route('/api/transaction/:transactionId')
    .put(requireAuth, getUser, /* controller method */)
    .delete(requireAuth, getUser, deleteTransaction)

export { router }