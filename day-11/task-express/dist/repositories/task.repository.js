import pool from "../config/db.js";
class TaskRepository {
    // async findAll(): Promise<Task[]>{
    //     const data = await loadData();
    //     return data;
    // }
    async findAll() {
        const query = `select id,task,status from todo;`;
        try {
            const { rows } = await pool.query(query);
            return rows;
        }
        catch (e) {
            throw new Error('Could not fetch tasks from the database');
        }
    }
    // async findById(id: number): Promise<Task | undefined>{
    //     const tasks = await this.findAll();
    //     if(tasks) return tasks.find(task => task.id === id);
    // }
    async findById(id) {
        const query = `select * from todo where id = ${id}`;
        try {
            const { rows } = await pool.query(query);
            return rows[0];
        }
        catch (error) {
            throw new Error('something went wrong while performing db operation');
        }
    }
    // async create(task: Task): Promise<Task> {
    //     console.log(`create task repo`)
    //     const tasks = await this.findAll();
    //     if (tasks) {
    //         tasks.push(task);
    //         await writeData(tasks);
    //     }
    //     return task;
    // }
    async create(task) {
        const query = `INSERT INTO todo (task, status) VALUES ($1, 'pending') RETURNING *;`;
        try {
            const { rows } = await pool.query(query, [task.task_name]);
            return rows[0];
        }
        catch (error) {
            console.log(error);
            throw new Error('something went wrong');
        }
    }
    // async update(id: number, updates: Partial<Task>) {
    //     const tasks = await this.findAll()
    //     if (tasks) {
    //         const index = tasks?.findIndex(task => task.id === id)
    //         if (index == -1) {
    //             return undefined
    //         }
    //         tasks[index] = {
    //             ...tasks[index],
    //             ...updates
    //         }
    //         await writeData(tasks)
    //     }
    //     return true;
    // }
    async update(id, updates) {
        console.log(updates);
        const query = `UPDATE todo SET task = $1 WHERE id = $2;`;
        try {
            await pool.query(query, [updates.task_name, id]);
            return true;
        }
        catch (error) {
            console.error('Database update error:', error);
            return false;
        }
    }
    // async delete(id: number): Promise<boolean>{
    //     const tasks = await this.findAll();
    //     if (tasks) {
    //         const index = tasks.findIndex(task => task.id === id);
    //         if (index === -1) {
    //             return false;
    //         }
    //         tasks.splice(index, 1);
    //         await writeData(tasks);
    //     }
    //     return true;
    // }
    async delete(id) {
        const query = `delete from todo where id = $1`;
        try {
            const result = await pool.query(query, [id]);
            return (result.rowCount ?? 0) > 0;
        }
        catch (error) {
            return false;
        }
    }
}
export default new TaskRepository();
