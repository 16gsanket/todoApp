import Taskslist from "../models/tasksList.models.js"
import apiResponse from "../utils/apiResponse.js";
import apiError from "../utils/apiError.js";
import asyncHandler from "../utils/asynchandler.js";
import logger from "../utils/logger.js";

const findTasksByDate = asyncHandler(async(req,res,next)=>{
    const {taskListCreatedId} = req.params;
    console.log(taskListCreatedId);
    
    const {userId} = req.user;

    const taskList =await Taskslist.findOne({taskcreatedDateId:taskListCreatedId, owner:userId}).populate('tasks')

    
        if(!taskList){
            return res.status(400).json(new apiResponse(400,{},"task not list found"))
        }
    logger.info(`task list requested by user ${req.user.userId} with id ${taskListCreatedId}`)

    res.status(200).json(new apiResponse(200,taskList,"task list found"))
})

export {findTasksByDate}