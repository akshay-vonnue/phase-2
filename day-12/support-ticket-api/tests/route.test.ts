import { describe, it, expect, vi } from 'vitest'
import request from 'supertest'
import { app } from '../src/index.js'
import { Ticket } from '../src/lib/types.js'

describe("ticket test", () => {

    let ticketId: string;

    it("POST /create", async () => {
        const response = await request(app).post('/api/ticket/create').send({
            "title":"some service issue",
            "description":"mobile not working",
            "priority":"low",
            "createdBy":"akshay",
            "assignedTo":"somebody"
        })
        console.log(response)
        expect(response.status).toBe(200)

    })

    it("GET /list", async () => {
        const response = await request(app).get('/api/ticket/list').send({
            "user":"akshay"
        })
        expect(response.status).toBe(200)
        let data = response.body.data as Ticket[]
        ticketId = data[0].id
    })

    it("GET /getTicket", async () => { 
        const response = await request(app).get(`/api/ticket/ticket/${ticketId}`)
        expect(response.status).toBe(200)
    })

    it("PUT /updateStatus", async() => {
        const response = await request(app).put(`/api/ticket/ticket/${ticketId}/completed`)
        expect(response.status).toBe(200)
    })

    it("PATCH /assign", async () => {
        const response = await request(app).patch(`/api/admin/ticket/${ticketId}/assign`).send({
            "assignedTo":"fadhil"
        })

        expect(response.status).toBe(200)
    })

    it("DELETE /api/ticket/ticket/delete", async () => {
        const response = await request(app).delete(`/api/ticket/ticket/${ticketId}`)

        expect(response.status).toBe(200)
    })
})