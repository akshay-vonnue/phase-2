import { Response, Request } from "express";
import { deleteTicketFromFile, handleError, readfile, updateTicketInFile, writeToFile } from "../lib/utils.js";
import { Status } from "../lib/types.js";

export const createTicket = async(req: Request, res: Response) => {
    try {
        let title = req.body.title;
        let description = req.body.description
        let priority = req.body.priority
        let createdBy = req.body.createdBy
        let assignedTo = null

        // console.log(title,description,priority,createdBy,assignedTo)

        if (!title || !description || !priority || !createdBy ) {
            return res.status(422).json({
                success: false,
                message:'All fields are required.'
            })
        }
    
        let data = await writeToFile({
            id:crypto.randomUUID(),
            title,
            description,
            priority,
            createdBy,
            assignedTo,
            status:'open'
        })
    
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

    let user = req.body.user
    let data = await readfile()
    console.log(data)
    let userTickets = data.filter(t => t.createdBy == user)
    if (userTickets) {
        return res.status(200).json({
            success: true,
            data: userTickets,
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
        let ticketId = reqParams['id']
        let data = await readfile()

        let ticket = data.find(t => t.id === ticketId)
        if (ticket) {
            return res.status(200).json({
                success: true,
                data: ticket
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
            let updateResponse = await updateTicketInFile(ticketId,{status:status})
            if (updateResponse !== -1) {
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
            let updatedResponse = await updateTicketInFile(ticketId, { assignedTo: user })
            if (updatedResponse !== -1) {
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
            let isDeleted = await deleteTicketFromFile(ticketId)
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