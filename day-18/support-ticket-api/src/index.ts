import express from 'express'
import ticketRouter from './router/ticket.router.js'
import adminTicketRouter from './router/adminTicket.router.js'
import userRouter from './router/user.router.js'
import rateLimit from 'express-rate-limit'

export const app = express()   

app.use(express.json())

const limiter = rateLimit({
    windowMs: 16 * 60 * 1000,
    max: 50,
    message:'rate limit exceeded.Try again later.'
})

app.use(limiter)

app.use('/api/ticket', ticketRouter)
app.use('/api/admin/ticket', adminTicketRouter);

app.use('/user',userRouter)

app.listen(3000, () => {
    console.log(`server running on port : 3000`)
})