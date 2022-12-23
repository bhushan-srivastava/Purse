import { Router } from "express"
import { register, login, sendResetEmail, reset, logout, sendLogoutResponse } from "../../controllers/auth/authentication.controller.js"
import { requireAuth, getAuth } from "../../controllers/auth/authorization.controller.js"
import { getUser } from "../../controllers/auth/authHelper.js"

const router = Router()
router.route('/').get(requireAuth, getUser, getAuth)
router.route('/register').post(register)
router.route('/login').post(getUser, login)
router.route('/forgot').post(logout, getUser, sendResetEmail)
router.route('/forgot/password').post(logout, getUser, reset)
router.route('/logout').get(logout, sendLogoutResponse)

export { router }