import express from 'express';
import { createTicket, deleteTicket, getTicket, listTickets, updateStatus } from '../controller/ticket.controller.js';
let router = express.Router();
router.post('/create', createTicket);
router.get('/list', listTickets);
router.get('/ticket/:id', getTicket);
router.put('/ticket/:id/:status', updateStatus);
router.delete('/ticket/:id', deleteTicket);
export default router;
