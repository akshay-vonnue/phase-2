import express, { NextFunction, Request, Response } from 'express'
import { assignTicket, createTicket, deleteTicket, getTicket, listTickets, updateStatus } from '../controller/ticket.controller.js'
import { createTicketSchema, getTicketSchema, updateStatusSchema } from '../controller/ticket.schemas.js'
import { ZodObject } from 'zod'

let router = express.Router()

router.post('/create', validate(createTicketSchema), createTicket)

router.get('/list', listTickets)
router.get('/:id',validateParams(getTicketSchema), getTicket)
router.put('/:id/:status',validateParams(updateStatusSchema), updateStatus)
router.delete('/:id',deleteTicket)

export default router


function validate(schema: ZodObject) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req.body);
        if (result.success) {
            next()
        } else {
            return res.status(400).json({
                message:await JSON.parse(result.error.message)[0].message
            })
        }
    }
}

function validateParams(schema: ZodObject) {
    return async(req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req.params);

        if (!result.success) {
            return res.status(400).json({
                error:await JSON.parse(result.error.message)[0].message
            })
        }

        next();
    }
}