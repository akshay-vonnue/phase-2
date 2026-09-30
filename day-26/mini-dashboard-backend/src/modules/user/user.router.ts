import { Router } from "express";
import { login, me } from "./user.controller";

const router = Router()

router.post('/login', login)
router.get('/me',me)

export default router