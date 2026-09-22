export type Status = 'open' | 'in-progress' | 'closed'

export type Ticket = {
    id: string,
    title: string,
    description: string,
    priority: 'low' | 'medium' | 'high',
    createdBy: string,
    assignedTo: string | null,
    status: Status
}

export type User = 'ADMIN' | 'AGENT' | 'USER'