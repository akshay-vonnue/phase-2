import ticketRepository from "../repositories/ticket.repository.js";
class TicketService {
    async createTicket(title, description, priority, createdBy, category_id) {
        return await ticketRepository.createTicket(title, description, priority, category_id, createdBy);
    }
    async listTickets(id) {
        console.log(id, "service");
        return await ticketRepository.listTickets(id);
    }
    async getTicket(id) {
        return await ticketRepository.getTicket(id);
    }
    async updateStatus(id, status) {
        let ticket = this.getTicket(id);
        if (!ticket)
            return false;
        return await ticketRepository.updateStatus(id, status);
    }
    async assignTicket(ticket_id, user_id) {
        let ticket = this.getTicket(ticket_id);
        if (!ticket)
            return false;
        return await ticketRepository.assignTicket(ticket_id, user_id);
    }
    async deleteTicket(id) {
        let ticket = this.getTicket(id);
        if (!ticket)
            return false;
        return await ticketRepository.deleteTicket(id);
    }
}
export default new TicketService();
