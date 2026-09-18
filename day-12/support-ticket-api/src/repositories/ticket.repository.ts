import { configDefaults } from "vitest/config";
import pool from "../config/database.js";
import { Priority, Ticket } from "../lib/types.js";
import { db } from "../prisma/db.js";

class TicketRepository{

    async createTicket(title: string, description: string, priority: Priority, category_id: string, createdBy: string) {

        let ticket;

        try {
            let result = await db.transaction(async (tx) => {
                ticket = await tx.orm.public.Ticket.create({
                    title: title,
                    description: description,
                    priority: priority,
                    category_id: Number(category_id),
                    customer_id: Number(createdBy),
                });

                const status = await tx.orm.public.Status.create({
                    ticket_id:ticket.id,
                    status:'open'
                })

                return {
                    ticket: ticket
                }
            })

            console.log('ticket repo')

            return result.ticket
        } catch (error) {
            console.log(error)
            throw new Error('something went wrong while accessing data')
        }
    }


    async listTickets(id: string) {
        try {

            const rows = await db.orm.public.Ticket.all();

            console.log(rows)
            return rows
        } catch (error) {
            console.log(error)
            throw new Error(`something went wrong while accessing data`)
        }
    }

    async getTicket(id: string) {
        console.log(`getticket repo`)
        try {
            const result = await db.orm.public.Ticket.where({
                id: Number(id)
            }).first();
            console.log(result)
            return result
        } catch (error) {
            console.log(error)
            throw new Error(`something went wrong while accessing data`)
        }
    }

    async updateStatus(id: string, status: string) {
        try {
            console.log(`update repo`)
            const result = await db.orm.public.Status.where({
                ticket_id: Number(id)
            }).update({
                status:status
            })
            console.log(result)
            return result
        } catch (error) {
            console.log(error)
            throw new Error(`something went wrong while accessing data`)
        }

    }

    async assignTicket(id: string, assignedTo: string) {
        try {
            const result = await db.orm.public.Assignment.create({
                ticket_id: Number(id),
                user_id : Number(assignedTo)
            })
            return result
        } catch (error) {
            console.log(error)
            throw new Error(`something went wrong while accessing data`)
        }
    }

    async deleteTicket(id:string) {
        try {
            const result = await db.orm.public.Ticket.
                where({
                    id: Number(id)
                }).delete()
            return result
        } catch (error) {
            console.log(error)
            throw new Error('something went wrong while accessing data')
        }
    }
    
}

export default new TicketRepository()