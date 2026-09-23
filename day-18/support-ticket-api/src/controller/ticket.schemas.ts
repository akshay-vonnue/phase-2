import z from 'zod';

export const createTicketSchema = z.object({
    title: z.string().min(2),
    description: z.string().min(8),
    priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
    category_id:z.string()
})


export const getTicketSchema = z.object({
    id: z.coerce.number()
})

export const updateStatusSchema = z.object({
    id: z.coerce.number(),
    status:z.enum(['open', 'resolved', 'closed','OPEN','IN_PROGRESS','RESOLVED','CLOSED'])
})

export const deleteTicketSchema = z.object({
    id: z.coerce.number()
})