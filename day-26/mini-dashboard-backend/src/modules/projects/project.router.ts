import Router from 'express'
import { getAll } from './project.controller'

const router = Router()

router.get('/all',getAll)

export default router