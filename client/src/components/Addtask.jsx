import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import toastify styles
import { useAuth } from '../context/AuthContext';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddTask = () => {
    const navigate = useNavigate();
    const { auth } = useAuth();
    const [taskData, setTaskData] = useState({
        title: "",
        description: "",
        dueDate: "",
        status: "pending",
        priority: "medium",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTaskData({ ...taskData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const baseUrl = window.env.BASE_URL;
        axios
            .post(`${baseUrl}/user/task/create`,
                taskData, {
                    headers: {
                        Authorization: `Bearer ${auth.token}`,
                    },
                })
                .then(() => {
                  toast.success("Task added successfully!");
                  setTimeout(() => navigate("/"), 2000); // Delay navigation by 2 seconds
              })
            .catch(() => toast.error("Failed to add task"));

        setTaskData({
            title: "",
            description: "",
            dueDate: "",
            status: "pending",
            priority: "medium",
        });
    };

    return (
        <div className="p-4 rounded-lg border-4 border-zinc-700 w-[800px] bg-zinc-900 text-white">
            <div className="flex justify-between">
                <h2 className="text-2xl font-bold mb-4 text-zinc-600">Add Your Task</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Title */}
                <div>
                    <label className="block text-zinc-500 font-medium mb-1">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={taskData.title}
                        onChange={handleChange}
                        className="w-full p-2 rounded bg-zinc-800 border border-zinc-700 focus:outline-none focus:ring focus:ring-zinc-500"
                        required
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block text-zinc-500 font-medium mb-1">Description</label>
                    <textarea
                        name="description"
                        value={taskData.description}
                        onChange={handleChange}
                        rows="4"
                        className="w-full p-2 rounded bg-zinc-800 border border-zinc-700 focus:outline-none focus:ring focus:ring-zinc-500"
                        required
                    />
                </div>

                {/* Due Date */}
                <div>
                    <label className="block text-zinc-500 font-medium mb-1">Due Date</label>
                    <input
                        type="date"
                        name="dueDate"
                        value={taskData.dueDate}
                        onChange={handleChange}
                        className="w-full p-2 rounded bg-zinc-800 border border-zinc-700 focus:outline-none focus:ring focus:ring-zinc-500"
                    />
                </div>

                {/* Status */}
                <div>
                    <label className="block text-zinc-500 font-medium mb-1">Status</label>
                    <select
                        name="status"
                        value={taskData.status}
                        onChange={handleChange}
                        className="w-full p-2 rounded bg-zinc-800 border border-zinc-700 focus:outline-none focus:ring focus:ring-zinc-500"
                    >
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>

                {/* Priority */}
                <div>
                    <label className="block text-zinc-500 font-medium mb-1">Priority</label>
                    <select
                        name="priority"
                        value={taskData.priority}
                        onChange={handleChange}
                        className="w-full p-2 rounded bg-zinc-800 border border-zinc-700 focus:outline-none focus:ring focus:ring-zinc-500"
                    >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full p-2 rounded bg-blue-600 hover:bg-blue-700 text-white font-bold"
                >
                    Add Task
                </button>
            </form>
            <ToastContainer position="top-right" autoClose={2000} />
        </div>
    );
};

export default AddTask;
  