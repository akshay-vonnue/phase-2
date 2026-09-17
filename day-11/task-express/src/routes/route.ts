import express from 'express';
// import { handleAdd, handleAll, handleDelete, handleUpdateTask } from '../controllers/index.js';
import { createTask, deleteTask, getAllTasks, getTaskById, updateTask } from '../controllers/task.controller.js';
import {logRoute} from '../middleware/logRoute.js'

let router = express.Router()

router.get('/', logRoute, (req, res) => {
    console.log('health route called');
    return res.status(200).json({
        message:'hello world!'
    })
})

router.get('/tasks', logRoute, getAllTasks);

router.get('/tasks/:id', getTaskById);
// add task
router.post('/tasks', createTask);

// {
//     "task_name":"go to the turf"
// }
router.patch('/tasks/:id', updateTask);

router.delete('/tasks/:id', deleteTask);

export default router