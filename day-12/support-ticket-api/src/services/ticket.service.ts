import { Priority } from "../lib/types.js";
import ticketRepository from "../repositories/ticket.repository.js";

class TicketService{
    async createTicket(title: string, description: string, priority: Priority, createdBy: string, category_id:string):Promise<unknown>{
        return await ticketRepository.createTicket(title, description, priority, category_id, createdBy);
    }

    async listTickets(id: string) {
        console.log(id,"service")
        return await ticketRepository.listTickets(id);
    }

    async getTicket(id:string) {
        return await ticketRepository.getTicket(id);
    }

    async updateStatus(id: string, status: string) {
        let ticket = this.getTicket(id)
        if (!ticket) return false

        return await ticketRepository.updateStatus(id, status);
    }

    async assignTicket(ticket_id: string, user_id: string) {
        let ticket = this.getTicket(ticket_id)
        if (!ticket) return false

        return await ticketRepository.assignTicket(ticket_id, user_id);
    }

    async deleteTicket(id: string) {
        let ticket = this.getTicket(id)
        if (!ticket) return false

        return await ticketRepository.deleteTicket(id);
    }
}

export default new TicketService()