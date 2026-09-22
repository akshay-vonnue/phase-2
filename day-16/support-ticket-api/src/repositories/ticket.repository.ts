import { prisma } from "../lib/prisma.js";

class TicketRepository{
    async createTicket(title: string, description: string, priority: 'LOW' | 'HIGH', category_id: string, createdBy: string, status: string) {

        try {
            const result = await prisma.$transaction([
                prisma.ticket.create({
                    data: {
                        title: title,
                        description: description,
                        priority: priority,
                        category_id: Number(category_id),
                        customer_id: Number(createdBy),
                        status:status
                    }
                })
            ])

            return result
        } catch (error) {
            console.log(error)
            throw new Error('something went wrong while accessing data')
        }
    }

    // @pagination in service-layer

    // async listTickets(id: string) {
    //     console.log(id,": user id")
    //     const query = `
    //         select * from ticket
    //         where ticket.customer_id = $1;
    //     `

    //     try {
    //         const { rows } = await pool.query(query, [id]);
    //         console.log(rows)
    //         return rows
    //     } catch (error) {
    //         console.log(error)
    //         throw new Error(`something went wrong while accessing data`)
    //     }
    // }

    async getTicket(id: string) {
        try {
            const ticketId = parseInt(id);

            const result = await prisma.ticket.findUnique({
                where: {
                    id:ticketId
                }
            })
            return result;
        } catch (error) {
            console.log(error)
            throw new Error(`something went wrong while accessing data`)
        }
    }

    async updateStatus(id: string, status: string) {
        const ticketId = parseInt(id,10)
        try {
            const currentTicket = await prisma.ticket.findUnique({
                where: { id: ticketId },
                select: { status: true }
            });

            if(!currentTicket) throw new Error('Ticket not found')

            const result = await prisma.$transaction([
                prisma.ticket.update({
                    where: {
                        id:ticketId
                    },
                    data: {
                        status:status
                    }
                }),
                prisma.status_history.create({
                    data: {
                        ticket_id: ticketId,
                        from: currentTicket?.status,
                        to:status
                    }
                })
            ])
            return result
        } catch (error) {
            console.log(error)
            throw new Error(`something went wrong while accessing data`)
        }

    }

    async assignTicket(id: string, assignedTo: string) {

        try {
            const result = await prisma.assignment.create({
                data: {
                    ticket_id: parseInt(id, 10),
                    user_id: parseInt(assignedTo, 10)
                }
            })
            return result
        } catch (error) {
            console.log(error)
            throw new Error(`something went wrong while accessing data`)
        }
    }

    async deleteTicket(id:string) {
        const query = `
            delete from ticket
            where ticket_id = $1;
        `;

        try {
            const result = await prisma.ticket.delete({
                where: {
                    id: parseInt(id, 10)
                }
            })

            return result
        } catch (error) {
            console.log(error)
            throw new Error('something went wrong while accessing data')
        }
    }
    
}

export default new TicketRepository()