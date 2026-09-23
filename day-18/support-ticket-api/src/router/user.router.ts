import Router, { NextFunction, Request, Response } from 'express'
import { currentUser, login, signup } from '../controller/user.controller.js'
import { authMiddleware } from '../middleware/user.middleware.js'
import rateLimit from 'express-rate-limit'
import { ZodObject } from 'zod'
import { loginSchema, signUpSchema } from '../controller/user.schema.js'

const router = Router()

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message:'too many attempts! try again later.'
})

router.post('/signup',limiter,validate(signUpSchema),signup)
router.post('/login', limiter,validate(loginSchema), login)
router.get('/current-user', authMiddleware, currentUser)

export default router

function validate(schema: ZodObject) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({
                message:await JSON.parse(result.error.message)[0].message
            })
        }
        next()
    }
}