import taskRepository from "../repositories/task.repository.js";
class TaskService {
    async getAllTasks() {
        return await taskRepository.findAll();
    }
    async getTaskById(id) {
        return await taskRepository.findById(id);
    }
    async createTask(taskName) {
        console.log(`create task service`);
        const tasks = await taskRepository.findAll();
        const maxId = tasks.reduce((max, task) => Math.max(max, task.id), -1);
        const newTask = {
            id: maxId + 1,
            task_name: taskName,
            isCompleted: false
        };
        return await taskRepository.create(newTask);
    }
    async updateTask(id, updates) {
        const task = await taskRepository.findById(id);
        console.log(task);
        if (!task) {
            return undefined;
        }
        return await taskRepository.update(id, updates);
    }
    async deleteTask(id) {
        const task = await taskRepository.findById(id);
        if (!task) {
            return false;
        }
        return await taskRepository.delete(id);
    }
    async toggleComplete(id) {
        const task = await taskRepository.findById(id);
        if (!task) {
            return undefined;
        }
        return await taskRepository.update(id, {
            isCompleted: !task.isCompleted
        });
    }
    async filterTasks(status) {
        const tasks = await taskRepository.findAll();
        if (status === 'completed') {
            return tasks.filter(task => task.isCompleted);
        }
        return tasks.filter(task => !task.isCompleted);
    }
}
export default new TaskService();
