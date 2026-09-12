import { describe, it, expect, vi } from "vitest";
import { handleAdd, handleComplete, handleDelete, loadData, writeData } from '../src/index.ts'
import { Task } from "../src/types.ts";

describe("task manager cli test", () => {

    it("load data", async() => {

        let data = await loadData()
        expect(data).toEqual([
            {
                "id":0,
                "task_name":"wake up",
                "isCompleted":false
            }
        ])
    })

    it("handle add", async () => {
        await handleAdd("akshay")

        let data = await loadData()

        expect(data).toContainEqual({
            id: 1,
            task_name: "akshay",
            isCompleted: false
        })
    })

    it("handle delete", async() => {
        await handleDelete(1)

        let data = await loadData()
        expect(data).not.toContainEqual({
            id: 1,
            task_name: "akshay",
            isCompleted: false
        })
    })

    it("handle complete", async() => {
        await handleComplete(0)

        let data:Task[] = await loadData()

        let taskItem = data.find(t => t.id === 0)

        expect(taskItem?.isCompleted).toBeTruthy()
    })

})