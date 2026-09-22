import Router from 'express'
import { currentUser, login, signup } from '../controller/user.controller.js'
import { authMiddleware } from '../middleware/user.middleware.js'

const router = Router()

router.post('/signup',signup)
router.post('/login', login)
router.get('/current-user', authMiddleware, currentUser)

export default router