import express from 'express';
import ticketRouter from './router/ticket.router.js';
import adminTicketRouter from './router/adminTicket.router.js';
export const app = express();
app.use(express.json());
app.use('/api/ticket', ticketRouter);
app.use('/api/admin/ticket', adminTicketRouter);
app.listen(3000, () => {
    console.log(`server running on port : 3000`);
});
