import express from 'express'
import { authMiddleware } from '../middlewares/authmiddleware.middleware.js';
import { createTask, deleteTask, updateTask } from '../controllers/taskController.controller.js';
import { findTasksByDate } from '../controllers/taskListController.controller.js';

const taskRouter = express.Router();

taskRouter.post('/create-task',authMiddleware, createTask)
taskRouter.patch('/update-task/:taskId',authMiddleware, updateTask)
taskRouter.delete('/delete-task/:taskId',authMiddleware, deleteTask)

taskRouter.get('/find-tasks-by-date/:taskListCreatedId',authMiddleware , findTasksByDate)


export {taskRouter};
