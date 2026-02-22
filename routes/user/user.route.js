import { Router } from "express"
import editName from "../../controllers/user/user.controller.js"

const router = Router()
router.route('/name').patch(editName)

export { router }