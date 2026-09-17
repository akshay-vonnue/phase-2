import express from 'express';
import { handleAdd, handleAll, handleDelete, handleUpdateTask } from '../controllers/index.js';
import { handleError, handlenotFound } from '../utils/utils.js';
import { Task } from '../types/types.js';
import {logRoute} from '../middleware/logRoute.js'

let router = express.Router()

router.get('/',logRoute,(req, res) => {
    return res.status(200).json({
        message:'hello world!'
    })
})

router.get('/tasks',logRoute, (req, res) => {
    try {
        let data = handleAll()
        if (data.length !== 0) {
            return res.status(200).json({
                tasks : data
            })
        } else {
            return res.status(200).json({
                message:'task list is empty'
            })
        }
    } catch (e) {
        if (e instanceof Error) {
            return handleError(res,e.message)
        }
    }
})

router.get('/tasks/:id', (req, res) => {
    try {
        let reqParams = req.params
        let id = Number(reqParams["id"])
        let data:Task[] = handleAll()
        let task = data.find(t => t.id === id);

        if (task) {
            return res.status(200).json({
                task: task
            })
        } else {
            return res.status(404).json({
                message:`task with id:${id} not found`
            })
        } 
    } catch (e) {
        if (e instanceof Error) {
            return handleError(res,e.message)
        }
    }
})
// add task
router.post('/tasks', async(req, res) => {
    try {
        let data = req.body.task_name
        let isAdded = await handleAdd(data)
        if (isAdded) {
            res.status(200).json({
                id:isAdded
            })
        } else {
            res.status(200).json({
                message:'failed to add task'
            })
        }
    } catch (e) {
        if (e instanceof Error) {
            return handleError(res,'Something went wrong.try again later!')
        }
    }
})

// {
//     "task_name":"go to the turf"
// }
router.patch('/tasks/:id', (req, res) => {
    try {
        let reqParams = req.params
        let id = Number(reqParams['id'])

        let reqBody = req.body
        console.log(reqBody['task'])

        let data = handleUpdateTask(id, reqBody)
        
        if (data !== -1) {
            res.status(200).json(data)
        } else {
            res.status(400).json({
                message:'task not found'
            })
        }
    } catch (e) {
        if (e instanceof Error) {
            console.log(e)
            return handleError(res,'Something went wrong while updating the database')
        }
    }
})

router.delete('/tasks/:id', (req, res) => {
    try {
        let reqParams = req.params
        let id = Number(reqParams['id'])

        let data = handleDelete(id)
        if (data !== -1) {
            return res.status(200).json(data)
        } else {
            handlenotFound(res,'task not found')
        }
    } catch (e) {
        if (e instanceof Error) {
            return handleError(res,'something went wrong while deleting')
        }
    }
})

export default router