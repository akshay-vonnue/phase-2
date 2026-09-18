import pool from "../config/database.js";
class TicketRepository {
    async createTicket(title, description, priority, category_id, createdBy) {
        const query = `
        insert into ticket(title,description,customer_id,category_id,priority)
        values (
            $1 , $2 , $3 , $4 , $5
        ) returning ticket_id;
        `;
        try {
            const { rows } = await pool.query(query, [title, description, createdBy, category_id, priority]);
            const newTicketId = rows[0].ticket_id;
            const statusQuery = `
                insert into status(status,ticket_id)
                values ('open',$1);
            `;
            const result = await pool.query(statusQuery, [newTicketId]);
            return result;
        }
        catch (error) {
            console.log(error);
            throw new Error('something went wrong while accessing data');
        }
    }
    async listTickets(id) {
        console.log(id, ": user id");
        const query = `
            select * from ticket
            where ticket.customer_id = $1;
        `;
        try {
            const { rows } = await pool.query(query, [id]);
            console.log(rows);
            return rows;
        }
        catch (error) {
            console.log(error);
            throw new Error(`something went wrong while accessing data`);
        }
    }
    async getTicket(id) {
        const query = `
            select * from ticket
            where ticket_id = $1;
        `;
        try {
            const { rows } = await pool.query(query, [id]);
            return rows[0];
        }
        catch (error) {
            console.log(error);
            throw new Error(`something went wrong while accessing data`);
        }
    }
    async updateStatus(id, status) {
        const query = `
            update status
            set status = $2
            where ticket_id = $1;
        `;
        try {
            const result = await pool.query(query, [id, status]);
            return result;
        }
        catch (error) {
            console.log(error);
            throw new Error(`something went wrong while accessing data`);
        }
    }
    async assignTicket(id, assignedTo) {
        const query = `
            insert into assignment(ticket_id,user_id)
            values ($1,$2);
        `;
        try {
            const result = await pool.query(query, [id, assignedTo]);
            return result;
        }
        catch (error) {
            console.log(error);
            throw new Error(`something went wrong while accessing data`);
        }
    }
    async deleteTicket(id) {
        const query = `
            delete from ticket
            where ticket_id = $1;
        `;
        try {
            const result = await pool.query(query, [id]);
            return result;
        }
        catch (error) {
            console.log(error);
            throw new Error('something went wrong while accessing data');
        }
    }
}
export default new TicketRepository();
