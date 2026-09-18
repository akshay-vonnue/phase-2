import { Response, Request } from "express";
import { deleteTicketFromFile, handleError, readfile, updateTicketInFile, writeToFile } from "../lib/utils.js";
import { Status } from "../lib/types.js";
import ticketService from "../services/ticket.service.js";

export const createTicket = async(req: Request, res: Response) => {
    try {
        let title = req.body.title;
        let description = req.body.description
        let priority = req.body.priority
        let createdBy = req.body.createdBy
        let category_id = req.body.category_id
        // console.log(title,description,priority,createdBy,assignedTo)

        if (!title || !description || !priority || !createdBy || !category_id) {
            return res.status(422).json({
                success: false,
                message:'All fields are required.'
            })
        }
        
        console.log(title, description, priority, createdBy, category_id)
        let data = await ticketService.createTicket(title, description, priority, createdBy, category_id);
        console.log(data)
        if (data) {
            return res.status(200).json({
                success: true,
                data:data,
                message:'Ticket created Successfully'
            })
        }
    } catch (error) {
        if(error instanceof Error) handleError(res,error.message)
    }
    
    console.log('createTicket')
}

export const listTickets = async (req: Request, res: Response) => {
    console.log('listTicket')

    let user = req.body.userId

    let data = await ticketService.listTickets(user);

    console.log(data)

    if (data) {
        return res.status(200).json({
            success: true,
            data: data,
        })
    }
    return res.status(400).json({
        success:false,
        message:'something went wrong while reading data'
    })
}

export const getTicket = async (req: Request, res: Response) => {
    try {
        let reqParams = req.params
        let ticketId = reqParams['id'] as string
        console.log(ticketId,"controller")
        let data = await ticketService.getTicket(ticketId);

        if (data) {
            return res.status(200).json({
                success: true,
                data: data
            })
        } else {
            return res.status(200).json({
                success:false,
                message:'ticket not found'
            })
        }
    } catch (e) {
        if (e instanceof Error) {
            return handleError(res,e.message)
        }
    }

    console.log('getTicket')
}

export const updateStatus = async (req:Request, res:Response) => {
    console.log('updateStatus')
    try {
        let reqParams = req.params

        let ticketId = reqParams["id"] as string
        let status = reqParams["status"] as Status
        console.log(ticketId, status)
        
        if (ticketId && status) {
            let updateResponse = await ticketService.updateStatus(ticketId, status);
            if (updateResponse) {
                return res.status(200).json({
                    success:true,
                    message:'status updated successfully'
                })
            } else {
                return res.status(200).json({
                    success:false,
                    message:'Ticket not found'
                })
            }
        } else {
            return res.status(200).json({
                success:false,
                message:'ticketId and Status are required'
            })
        }
    } catch (e) {
        if (e instanceof Error) return handleError(res, e.message)
    }
}

export const assignTicket = async(req:Request, res:Response) => {
    console.log('assign ticket')

    try {
        let reqParams = req.params
        let ticketId = reqParams['id'] as string
        let user = req.body.assignedTo

        if (ticketId && user) {
            let updatedResponse = await ticketService.assignTicket(ticketId, user);
            if (updatedResponse) {
                return res.status(200).json({
                    success:true,
                    message:`Ticket assigned to ${user} successfully`
                })
            } else {
                return res.status(200).json({
                    success:false,
                    message:`Ticket not found`
                })
            }
        } else {
            return res.status(404).json({
                success:false,
                message:'All fields are required.'
            })
        }
    } catch (error) {
        if (error instanceof Error) {
            return handleError(res,error.message)
        }
    }
}

export const deleteTicket = async(req:Request, res:Response) => {
    try {
        let reqParams = req.params
        let ticketId = reqParams['id'] as string

        if (ticketId) {
            let isDeleted = await ticketService.deleteTicket(ticketId);
            if (isDeleted) {
                return res.status(200).json({
                    success:true,
                    message: 'data deleted Successfully',
                    data: isDeleted
                })
            } else {
                return res.status(200).json({
                    success:false,
                    message:'Invalid ticket id'
                })
            }
        }
    } catch (error) {
        if (error instanceof Error) {
            return handleError(res,error.message)
        }
    }
}