import { readFile , writeFile } from "fs/promises";
import { Ticket } from "./types";
import { Response } from "express";
import { stat } from "fs";
import { error } from "console";

let path = '/home/akshay.antony/training/phase-2/day-5/support-ticket-api/data/data.json'

let data:Ticket[];

export async function readfile() {
    let fileData = await readFile(path, 'utf8')
    if (fileData.trim()) {
        data = JSON.parse(fileData)
    } else {
        data = []
    }
    return data
}

export async function writeToFile(newTicket: Ticket) {

    let data = await readfile()
    data.push(newTicket)

    writeFile(path, JSON.stringify(data), "utf8");

    return data
}

export async function updateTicketInFile(ticketId: string, data: Partial<Ticket>) {
    let fileData = await readfile()
    let ticket = fileData.find(t => t.id === ticketId)

    if (!ticket) {
        return -1
    }

    if (fileData) {
        fileData = fileData.map(t => {
            if (t.id === ticketId) {
                return {
                    ...t,
                    ...data,
                    status:'in-progress'
                }
            }
            return t
        })
    }

    writeFile(path, JSON.stringify(fileData), "utf8")
    return 1
}

export async function deleteTicketFromFile(ticketId:string) {
    let data = await readfile()
    data = data.filter(t => t.id !== ticketId)
    writeFile(path, JSON.stringify(data), "utf8")
    return data
}

export async function handleError(res:Response,message:string) {
    return res.status(404).json({
        success:false,
        message:message
    })
}

interface QueryType {
    page: number,
    pageSize: number,
    status: string,
    priority: string,
    assignee: number,
    search: string,
    sortField: string,
    sortDirection: string
}

export function validateQuery(query: Partial<QueryType>) {
    const errors: string[] = []
    
    let page = 1;
    let pageSize = 10;
    let status: string | undefined;
    let priority: string | undefined;
    let assignee: number | undefined;
    let search: string | undefined;
    let sortField: string = 'createdAt';
    let sortDirection: string = 'desc';

    if (query.page !== undefined) {
        const value = Number(query.page)
        if (!Number.isInteger(value) || value < 1) {
            errors.push('page must be a postive number')
        } else {
            page = value
        }
    }

    if (query.pageSize !== undefined) {
        const value = Number(query.pageSize)
        if (!Number.isInteger(value) || value < 1 || value > 100) {
            errors.push('pageSize must be between 1 - 100')
        } else {
            pageSize = value
        }
    }

    if (query.status !== undefined) {
        const value = String(query.status)
        if (!['open', 'resolved', 'closed','OPEN','IN_PROGRESS','RESOLVED','CLOSED'].includes(value)) {
            errors.push('invalid status');
        } else {
            status = value
        }
    }

    if (query.priority !== undefined) {
        const value = String(query.priority)
        if (!['LOW','HIGH'].includes(value)) {
            errors.push('invalid priority');
        }
    }

    if (query.assignee !== undefined) {
        const value = Number(query.assignee)
        if (!Number.isInteger(value) || value < 1) {
            errors.push('assignee value must be a positive number')   
        } else {
            assignee = value
        }
    }

    if (query.search !== undefined) {
        const value = String(query.search).trim()
        if (value.length === 0) {
            errors.push("search can't be empty")
        } else {
            search = value
        }
    }

    if (query.sortField !== undefined) {
        const value = String(query.sortField)
        if (!['createdAt', 'updatedAt', 'priority', 'status'].includes(value)) {
            errors.push('invalid sort value')
        } else {
            sortField = value
        }
    }

    if (query.sortDirection !== undefined) {
        const value = String(query.sortDirection)
        if (!['asc', 'desc'].includes(value)) {
            errors.push('invalid sort direction')
        } else {
            sortDirection = value;
        }
    }


    return {
        errors,
        page,
        pageSize,
        status,
        priority,
        assignee,
        search,
        sortField,
        sortDirection
    }

}