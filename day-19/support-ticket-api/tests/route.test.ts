import { describe, it, expect, vi } from 'vitest'
import request from 'supertest'
import { app } from '../src/index.js'
import { Ticket } from '../src/lib/types.js'
import ticketService from '../src/services/ticket.service.js'

describe("ticket test", () => {

    let ticketId: string;


    // it("POST /create", async () => {
    //     const response = await request(app).post('/api/ticket/create').send({
    //         "title":"some service issue",
    //         "description":"mobile not working",
    //         "priority":"LOW",
    //         "createdBy":"1",
    //         "category_id": "1",

    //     })
    //     console.log(response)
    //     expect(response.status).toBe(200)

    // })

    // it("GET /list", async () => {
    //     const response = await request(app).get('/api/ticket/list').send({
    //         "user":"akshay"
    //     })
    //     expect(response.status).toBe(200)
    //     let data = response.body.data as Ticket[]
    //     ticketId = data[0].id
    // })

    // it("GET /getTicket", async () => {
    //     const response = await request(app).get(`/api/ticket/ticket/${1}`)
    //     const data = await response.body.data

    //     expect(data.title).toBe('heating-issue')
    //     expect(response.status).toBe(200)
    // })

    // it("PUT /updateStatus", async() => {
    //     const response = await request(app).put(`/api/ticket/ticket/${1}/close`)
    //     expect(response.status).toBe(200)
    // })

    // it("PATCH /assign", async () => {
    //     const response = await request(app).patch(`/api/admin/ticket/${2}/assign`).send({
    //         "assignedTo":"1"
    //     })

    //     expect(response.status).toBe(200)
    // })

    // it("DELETE /api/ticket/ticket/delete", async () => {
    //     const response = await request(app).delete(`/api/ticket/ticket/${ticketId}`)

    //     expect(response.status).toBe(200)
    // })
    
    // it("not found", async() => {
    //     const response = await request(app).get('/api/ticket/ticket/134');
    //     expect(response.body.message).toBe('ticket not found')
    // })
})

describe("service test", () => {
    // it("create ticket", async() => {
    //     let data = await ticketService.createTicket('test-title', 'test-description', 'LOW', "1", "1");
    //     expect(data[0].title).toBe('test-title')
    // })

    // it("get ticket", async() => {
    //     let data = await ticketService.getTicket('1');
    //     expect(data?.title).toBe('heating-issue')
    // })

    // it("update status", async () => {
    //     let data = await ticketService.updateStatus('11', 'close');
    //     console.log(data)
    //     if (typeof (data) !== 'boolean') {
    //         expect(data[0].status).toBe('close')
    //     }
    // })

    // it("assign ticket", async () => {
    //     let data = await ticketService.assignTicket('11', '1')
    //     if (typeof data !== 'boolean') {
    //         expect(data.ticket_id).toBe(11)
    //         expect(data.user_id).toBe(1)
    //     }
    // })

    // it("delete ticket", async () => {
    //     let data = await ticketService.deleteTicket('12')
    //     if (typeof data !== 'boolean') {
    //         expect(data.id).toBe(12)
    //     }
    // })
    
})

describe("pagination", () => {

    it("validation", async() => {
        let data = await request(app).get('/api/ticket/list/?priority=LOw')
        expect(data.body.error[0]).toBe('invalid priority')
    })

    it("pagination", async () => {
        const response = await request(app).get('/api/ticket/list/?page=1&pageSize=10&status=OPEN');
        // expect().toBe(10)
        expect(response.body.data.tickets.length).toBe(10)

    })

})