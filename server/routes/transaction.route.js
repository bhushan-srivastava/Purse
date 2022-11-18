import { Router } from "express"
import { requireAuth } from "../controllers/auth/auth.controller.js"

const router = Router()

router.route('/api/transaction')
    .get(requireAuth, /* controller method */)
    .post(requireAuth, /* controller method */)
router.route('/api/transaction/:transactionId')
    .put(requireAuth, /* controller method */)
    .delete(requireAuth, /* controller method */)

export { router }