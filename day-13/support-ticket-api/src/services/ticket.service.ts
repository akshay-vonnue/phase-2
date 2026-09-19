import { prisma } from "../lib/prisma.js";
import {Prisma} from "../generated/prisma/client.js"
import ticketRepository from "../repositories/ticket.repository.js";


class TicketService{
    async createTicket(title: string, description: string, priority: 'LOW' | 'HIGH', createdBy: string, category_id:string):Promise<unknown>{
        return await ticketRepository.createTicket(title, description, priority, category_id, createdBy,'open');
    }

    // async listTickets(
    //     userId: string,
    //     page: number,
    //     pageSize: number,
    //     assignee:number,
    //     sortField?: string,
    //     sortDirection?: string,
    //     whereClause: any = {},
    // ) {

    //     console.log(userId, page, pageSize, sortField, sortDirection, whereClause,assignee);
    //     // const skip = (page - 1) * pageSize
    //     const take = pageSize

    //     const orderBy: Prisma.TicketOrderByWithRelationInput = sortField
    //     ? { [sortField]: sortDirection === 'desc' ? 'desc' : 'asc'}
    //         : { createdAt: 'desc' }
        
    //     const totalCount = await prisma.ticket.count({ where: whereClause });
    //     const totalPages = Math.ceil(totalCount / pageSize) || 1;

    //     const activePage = page > totalPages ? totalPages : page;
    //     const skip = (activePage - 1) * pageSize;

    //     if (assignee) {
    //         whereClause.assignments = {
    //             some: {
    //                 user_id: assignee
    //             }
    //         }
    //     }

    //     const [tickets, total] = await prisma.$transaction([
    //         prisma.ticket.findMany({
    //             where: whereClause,
    //             skip,
    //             take:pageSize,
    //             orderBy,
    //             include: { 
    //                 assignments: {
    //                   include: { user: true }
    //                 } 
    //             }
    //         }),
    //         prisma.ticket.count({
    //             where: whereClause,
    //         })
    //     ])

    //     return {
    //         tickets,
    //         meta: {
    //             total,
    //             page,
    //             pageSize,
    //             totalPages: Math.ceil(total / pageSize)
    //         }
    //     }
    // }

    // http://localhost:3000/api/ticket/list/?page1&pageSize=1&status=open&priority=LOW&assignee=1&search=heating-issue&sortField=status&sortDirection=asc

    async listTicketsDB(validationResult:any) {
        try {
            const {
                page,pageSize,status,priority,assignee,search,sortField,sortDirection
            } = validationResult;

            const where = {
                ...(status && { status: status }),
                ...(priority && { priority: priority }),
                ...(assignee && {
                    assignments: {
                        some: {
                            user_id: assignee
                        }
                    }
                }),
                ...(search && {
                    title: {
                        contains: search,
                        mode:'insensitive'
                    }
                })
            }

            const skip = (page - 1) * pageSize
            const total = await prisma.ticket.count({
                where:where
            })
            const tickets = await prisma.ticket.findMany({
                where: where,
                skip: skip,
                take: pageSize,
                orderBy: {
                    [sortField]: sortDirection,
                }
            })

            const totalPages = Math.ceil(total / pageSize);

            return {
                total,
                totalPages,
                tickets
            }
        } catch (e) {
            console.log("listTicketDb error:", e)
            throw new Error('list ticket db error')
        }
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