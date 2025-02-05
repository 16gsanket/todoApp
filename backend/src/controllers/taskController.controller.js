import asyncHandler from "../utils/asynchandler.js";
import Task from "../models/task.models.js";
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import Taskslist from "../models/tasksList.models.js";
import logger from "../utils/logger.js";

const createTask = asyncHandler(async (req, res, next) => {
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();

  const taskListid = day + "" + "" + month + "" + year;

  const { name, description, completed, priority } = req.body;
  const { userId } = req.user;

  const createdTask = await new Task({
    name,
    description,
    completed,
    priority,
    owner: userId,
  });

  await createdTask.save();

  if (!createdTask) {
    throw new apiError(400, "Task Creation Failed at the Backend");
  }
  logger.info(`new task created by user ${userId} with id ${createdTask._id}`);
  const taskList = await Taskslist.findOne({
    taskcreatedDateId: taskListid,
    owner: userId,
  });

  let newtaskList;

  if (taskList) {
    await taskList.tasks.push(createdTask._id);
    await taskList.save();
    logger.info(
      `new task added to the task list by user ${userId} with id ${taskList._id}`
    );
  }
  if (!taskList) {
    newtaskList = new Taskslist({
      owner: userId,
      taskcreatedDateId: taskListid,
      tasks: [],
    });
    newtaskList.tasks.push(createdTask._id);
    await newtaskList.save();
    logger.info(
      `new task list created by user ${userId} with id ${newtaskList._id}`
    );
  }

  return res
    .status(201)
    .json(new apiResponse(201, createdTask, "task created success"));
});

const updateTask = asyncHandler(async (req, res, next) => {
  const { name, description, completed, priority } = req.body;

  const { taskId } = req.params;
  console.log(taskId);
  

  logger.info("task updated by user " + req.user.userId + " with id " + taskId);

  const updatedTask = await Task.findOneAndUpdate(
    { _id: taskId },
    {
      name,
      description,
      completed,
      priority,
    }
  );

  if (!updatedTask) {
    throw new apiError(400, "task not updated");
  }

  return res
    .status(200)
    .json(new apiResponse(201, updatedTask, "task Updated Success"));
});

const deleteTask = asyncHandler(async (req, res, next) => {
  const { taskId } = req.params;
  console.log('taskId from backend' , taskId);

  // fidnOneAndDelte  needs a object with speciifed {_id:itemId} else i will delete the first occureance
  const deletedTask = await Task.findOneAndDelete({_id : taskId});

  return res.status(200).json(new apiResponse(201, deletedTask, "task deleted"));
});

export { createTask, updateTask, deleteTask };
