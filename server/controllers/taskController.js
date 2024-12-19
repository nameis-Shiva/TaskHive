const taskModel = require("../models/taskModel")

const createTask = async (req,res) => {
    try {
        const{title, description, dueDate, priority} = req.body;
        const creator = req.userId;

        const newTask = new taskModel({
            title,
            description,
            dueDate,
            priority,
            creator,
        })
        await newTask.save();

        return res.status(201).json({ message: "Task created successfully", task: newTask });
    } catch (error) {
        return res.status(500).json({error:"Internal Server Error", msg:error.message})
    }
}

const getTask = async (req, res) => {
    try {
        const tasks = await taskModel.find({ creator: req.userId });
        return res.status(200).send({ tasks });
    } catch (error) {
        return res.status(500).send({ error: "Internal server error", msg: error.message });
    }
};
const getOneTask = async (req, res) => {
    try {
        const { taskId } = req.params;

        // Use the taskModel to find the task by its ID
        const task = await taskModel.findById(taskId);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.json({ task });
    } catch (error) {
        console.log("Error:", error);
        return res.status(500).send({ error: "Internal server error", msg: error.message });
    }
};



const updateTask = async (req,res) => {
    try {
        const taskId = req.params.taskId;
        const updateData = req.body;

        const updatedTask = await taskModel.findByIdAndUpdate(taskId, updateData, {new:true});
        if(!updatedTask){
            return res.status(400).send({error:"User Not Found"})
        }
        return res.status(200).send({message:"Task updated successfully", updateTask})
    } catch (error) {
        return res.status(500).send({error:"Internal Server Error",msg:error.message})
    }
}

const deleteTask = async (req, res) => {
    try {
        const taskId = req.params.taskId;
        const deletedTask = await taskModel.findByIdAndDelete(taskId);
        if(!deletedTask){
            return res.status(404).send({error:"Task not found"})
        }
        return res.status(200).send({message:"Task deleted successfully"})
    } catch (error) {
        return res.status(400).send({error:"Internal Error",msg:error.message})
    }
}

module.exports = {createTask, getTask, updateTask, deleteTask,getOneTask};