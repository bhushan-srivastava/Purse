import { Router } from "express"
import { register, login, sendResetEmail, reset, logout, sendLogoutResponse } from "../../controllers/auth/authentication.controller.js"
import { requireAuth, getAuth } from "../../controllers/auth/authorization.controller.js"
import { getUser } from "../../controllers/auth/authHelper.js"

const router = Router()
router.route('/api/auth').get(requireAuth, getUser, getAuth)
router.route('/api/auth/register').post(register)
router.route('/api/auth/login').post(getUser, login)
router.route('/api/auth/forgot').post(logout, getUser, sendResetEmail)
router.route('/api/auth/forgot/password').post(logout, getUser, reset)
router.route('/api/auth/logout').get(logout, sendLogoutResponse)

export { router }