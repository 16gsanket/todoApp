import Taskslist from "../models/tasksList.models.js"
import apiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asynchandler.js";
import logger from "../utils/logger.js";

const findTasksByDate = asyncHandler(async(req,res,next)=>{
    const {taskListCreatedId} = req.params;

    const taskList =await Taskslist.findById(taskListCreatedId).populate('tasks')

    logger.info(`task list requested by user ${req.user.userId} with id ${taskListCreatedId}`)

    res.status(200).json(new apiResponse(200,taskList,"task list found"))

    if(!taskList){
        throw new apiError(400,"task list not found")
    }
})

export {findTasksByDate}