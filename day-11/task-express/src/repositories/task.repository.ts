import { Task } from "../types/types.js";
import { loadData, writeData } from "../utils/file.js";

class TaskRepository{
    async findAll(): Promise<Task[]>{
        const data = await loadData();
        return data;
    }

    async findById(id: number): Promise<Task | undefined>{
        const tasks = await this.findAll();
        if(tasks) return tasks.find(task => task.id === id);
    }

    async create(task: Task): Promise<Task> {
        console.log(`create task repo`)
        const tasks = await this.findAll();

        if (tasks) {
            tasks.push(task);
            await writeData(tasks);
        }
        return task;
    }

    async update(id: number, updates: Partial<Task>) {
        const tasks = await this.findAll()
        if (tasks) {
            const index = tasks?.findIndex(task => task.id === id)

            if (index == -1) {
                return undefined
            }

            tasks[index] = {
                ...tasks[index],
                ...updates
            }

            await writeData(tasks)
        }
        return true;
    }

    async delete(id: number): Promise<boolean>{
        const tasks = await this.findAll();
        if (tasks) {
            const index = tasks.findIndex(task => task.id === id);
            if (index === -1) {
                return false;
            }
            tasks.splice(index, 1);
            await writeData(tasks);
        }

        return true;
    }
}

export default new TaskRepository();