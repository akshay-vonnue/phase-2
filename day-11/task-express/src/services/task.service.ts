import taskRepository from "../repositories/task.repository.js";
import { Task } from "../types/types";

class TaskService{
    
    async getAllTasks(): Promise<Task[]>{
        return await taskRepository.findAll();
    }

    async getTaskById(id: number): Promise<Task | undefined> {
        return await taskRepository.findById(id);
    }

    async createTask(taskName: string): Promise<Task> {
        console.log(`create task service`)
        const tasks = await taskRepository.findAll();

        const maxId = tasks.reduce(
            (max, task) => Math.max(max, task.id),
            -1
        );

        const newTask: Task = {
            id: maxId + 1,
            task_name: taskName,
            isCompleted: false
        };

        return await taskRepository.create(newTask);
    }

    async updateTask(
        id: number,
        updates: Partial<Task>
    ): Promise<Boolean | undefined> {

        const task = await taskRepository.findById(id);
        console.log(task)

        if (!task) {
            return undefined;
        }

        return await taskRepository.update(id, updates);
    }

    async deleteTask(id: number): Promise<boolean> {
        const task = await taskRepository.findById(id);

        if (!task) {
            return false;
        }

        return await taskRepository.delete(id);
    }

    async toggleComplete(id: number): Promise<Boolean | undefined> {

        const task = await taskRepository.findById(id);

        if (!task) {
            return undefined;
        }

        return await taskRepository.update(id, {
            isCompleted: !task.isCompleted
        });
    }

    async filterTasks(
        status: 'completed' | 'pending'
    ): Promise<Task[]> {

        const tasks = await taskRepository.findAll();

        if (status === 'completed') {
            return tasks.filter(task => task.isCompleted);
        }

        return tasks.filter(task => !task.isCompleted);
    }
}

export default new TaskService()