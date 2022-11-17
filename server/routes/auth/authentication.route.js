//import controllers here
// authentication routes

import express from 'express'

const router = express.Router()

router.route('/api/auth/register')
    .post(/* controller method */)

router.route('/api/auth/login')
    .post(/* controller method */)

router.route('/api/auth/reset')
    .get(/* controller method */)

router.route('/api/auth/reset')
    .post(/* controller method */)

router.route('/api/auth/logout')
    .get(/* controller method */)

export default router