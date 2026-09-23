import { beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "../src";


describe("auth test", () => {
    let random: string;
    let token: string;
    let agentToken: string;
    let adminToken: string;

    let agentId: string;
    let ticketId: number;

    beforeAll(() => {
        random = crypto.randomUUID();
    })

    it("should register new user", async () => {
        const response = await request(app).post("/user/signup").send({
            name: `test_user_${random}`,
            email: `test_user_${random}@gmail.com`,
            role: "USER",
            password: "123456",
        });

        // console.log(response.body);
        expect(response.statusCode).toBe(201);
    });

    it("should fail registration on same email", async () => {
        const response = await request(app).post("/user/signup").send({
            name: `test_user_${random}`,
            email: `test_user_${random}@gmail.com`,
            role: "USER",
            password: "123456",
        });
        console.log(response.body)
        expect(response.statusCode).toBe(400)
        expect(response.body.message).toBe("email already in use.")
    });

    it("should register new agent", async () => {
        const response = await request(app).post("/user/signup").send({
            name: `test_agent_${random}`,
            email: `test_agent_${random}@gmail.com`,
            role: "AGENT",
            password: "123456",
        });

        agentToken = response.body.data
        // console.log(response.body);
        expect(response.statusCode).toBe(201);
    });

    it("admin login", async () => {
        const response = await request(app).post("/user/login").send({
            email: `admin1@gmail.com`,
            password: '123456',
            role:'ADMIN'
        })

        adminToken = response.body.data
    })
    
    it("should login the existing user", async()=> {
        const response = await request(app).post("/user/login").send({
            email: `test_user_${random}@gmail.com`,
            password: '123456',
            role: 'USER'
        })

        token = response.body.data

        expect(response.statusCode).toBe(200)
    })

    it("should respond with invalid password", async () => {
        const response = await request(app).post("/user/login").send({
            email: `test_user_${random}@gmail.com`,
            password: '2423742',
            role: 'USER'
        })
        console.log(response.body)
        expect(response.statusCode).toBe(400)
    })

    it("should create a new ticket", async () => {
        console.log(token)
        const response = await request(app).post('/api/ticket/create').send({
            "title": "some service issue",
            "description": "mobile not working",
            "priority": "LOW",
            "category_id": "1",
        }).set({ Authorization: `Bearer ` + token })

        
        ticketId = response.body.data[0].id;

        console.log(response)
        expect(response.status).toBe(200)
    })

    it("get admin id (get current user)", async () => {
        const response = await request(app).get('/user/current-user')
            .set({ Authorization: `Bearer ` + agentToken })

        agentId = response.body.data.id
        expect(response.statusCode).toBe(200)
    })

    it("should assign a ticket to user", async () => {
        console.log(agentId,"#####",adminToken)
        const response = await request(app).patch(`/api/admin/ticket/${ticketId}/assign`)
            .send({
                "assignedTo": agentId
            })
            .set({ Authorization: `Bearer ` + adminToken }) 
        console.log(response.body)
        expect(response.statusCode).toBe(200)
    })

    it("it should change the ticket status", async () => {
        const response = await request(app).put(`/api/ticket/${ticketId}/closed`)
            .set({ Authorization: `Bearer ` + agentToken }) 
        
        expect(response.statusCode).toBe(200)
    })

});
