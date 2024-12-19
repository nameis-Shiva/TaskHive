const express = require("express");
const { createTask, getTask, updateTask, deleteTask, getOneTask } = require("../controllers/taskController");
const verifyToken = require("../middlewares/jwt");

const taskRouter = express.Router();

//demo
taskRouter.get("/",(req,res)=> res.send("Task Router is working"));
//create task
taskRouter.post("/create",verifyToken,createTask)
//Get Tasks
taskRouter.get("/gettask",verifyToken,getTask)
//Get a specific task
taskRouter.get("/gettask/:taskId",verifyToken,getOneTask)
//update task
taskRouter.put("/update/:taskId",verifyToken,updateTask)
//Delete task
taskRouter.delete("/delete/:taskId",verifyToken, deleteTask)


module.exports = taskRouter;