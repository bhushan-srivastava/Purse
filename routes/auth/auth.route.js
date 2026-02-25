import { Router } from "express"
import { register, login, sendResetEmail, reset, logout } from "../../controllers/auth/authentication.controller.js"
import { requireAuth, getAuth } from "../../controllers/auth/authorization.controller.js"
import { getUser } from "../../controllers/auth/authHelper.js"

const router = Router()
router.route('/').get(requireAuth, getAuth)
router.route('/register').post(register)
router.route('/login').post(login)
router.route('/forgot').post(getUser, sendResetEmail)
router.route('/forgot/password').post(getUser, reset)
router.route('/logout').post(requireAuth, logout)
    // .get(requireAuth, logout)

export { router }
