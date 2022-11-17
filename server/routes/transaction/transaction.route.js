//import controllers here
// transaction routes

import express from 'express'

const router = express.Router()

router.route('/api/transaction')
    .get(/* controller method */)
    .post(/* controller method */)

router.route('/api/transaction/:transactionId')
    .put(/* controller method */)
    .delete(/* controller method */)

export default router