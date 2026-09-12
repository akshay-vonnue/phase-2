import { describe, it, expect, beforeAll, afterEach } from 'vitest'
import { handleAll, writeData } from '../dist'

let jsonData;
beforeAll(() => {
    jsonData = handleAll()
})

afterEach(() => {
    writeData()
})

describe("api testing", () => {
    // it("get tasks", async() => {
    //     let repsonse = await fetch(`http://localhost:3000/tasks`)
    //     let data = await repsonse.json();
    //     expect(data).toEqual([{"id":0,"task_name":"wake up","isCompleted":true},{"id":1,"task_name":"work out","isCompleted":false}])
    // })

    // it("get task", async() => {
    //     let response = await fetch(`http://localhost:3000/tasks/0`)
    //     let data = await response.json()

    //     expect(data).toEqual([{"id":0,"task_name":"wake up","isCompleted":true}])
    // })

    // it("add task", async () => {

    //     let data = JSON.stringify({
    //         text:'play football'
    //     })

    //     let response = await fetch(`http://localhost:3000/tasks`, {
    //         method: 'POST',
    //         headers:{'Content-Type':'application/json'},
    //         body:data
    //     })

    //     response = await response.json()

    //     expect(response).toEqual('task added successfully')
    // })
})