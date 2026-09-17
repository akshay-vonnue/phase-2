import { Request, Response } from "express";
import taskService from "../services/task.service.js";

export async function getAllTasks(req:Request,res:Response) {
    try {
        const tasks = await taskService.getAllTasks();
        if (tasks.length === 0) {
            return res.status(200).json({
                message: 'task list is empty'
            });
        }

        return res.status(200).json({
            tasks
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong'
        });
    }
}

export async function getTaskById(
    req: Request,
    res: Response
) {
    try {
        const id = Number(req.params.id);
        const task = await taskService.getTaskById(id);
        if (!task) {
            return res.status(404).json({
                message: `task with id:${id} not found`
            });
        }

        return res.status(200).json({
            task
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong'
        });
    }
}

export async function createTask(
    req: Request,
    res: Response
) {
    console.log(`create task controller`)
    try {
        const { task_name } = req.body;
        const task = await taskService.createTask(task_name);

        return res.status(201).json({
            id: task.id
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong'
        });
    }
}

export async function updateTask(
    req: Request,
    res: Response
) {
    try {
        const id = Number(req.params.id);
        const task = await taskService.updateTask(
            id,
            req.body
        );
        if (!task) {
            return res.status(404).json({
                message: 'task not found'
            });
        }
        return res.status(200).json({
            task
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong while updating'
        });
    }
}

export async function deleteTask(
    req: Request,
    res: Response
) {
    try {
        const id = Number(req.params.id);
        const deleted = await taskService.deleteTask(id);
        if (!deleted) {
            return res.status(404).json({
                message: 'task not found'
            });
        }
        return res.status(200).json({
            message: 'task deleted successfully'
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong while deleting'
        });
    }
}

