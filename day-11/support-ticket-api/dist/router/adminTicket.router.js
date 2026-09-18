import express from 'express';
import { assignTicket } from '../controller/ticket.controller.js';
let router = express.Router();
router.patch('/:id/assign', assignTicket);
export default router;
