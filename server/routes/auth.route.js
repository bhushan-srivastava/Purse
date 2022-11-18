import { Router } from "express"
import { register, login, sendResetEmail, reset, logout } from "../controllers/auth/auth.controller.js"

const router = Router()

router.route('/api/auth/register').post(register)
router.route('/api/auth/login').post(login)
router.route('/api/auth/forgot')
    .get(sendResetEmail)
    .post(reset)
router.route('/api/auth/logout').get(logout)

export { router }