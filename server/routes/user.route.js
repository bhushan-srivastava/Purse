import { Router } from "express"
import { getUser } from "../controllers/auth/authHelper.js"
import { requireAuth } from "../controllers/auth/authorization.controller.js"
import editName from "../controllers/user/user.controller.js"

const router = Router()
router.route('/api/user/name').patch(requireAuth, getUser, editName)

export { router }