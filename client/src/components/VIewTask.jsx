import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const ViewTask = () => {
  const { auth } = useAuth();
  const { taskId } = useParams(); // Get the task ID from URL params
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the task details by ID
    if (auth.isLogin) {
      const baseUrl = window.env.BASE_URL;
      axios
        .get(`${baseUrl}/user/task/gettask/${taskId}`, {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        })
        .then((res) => {
          setTask(res.data.task);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  }, [taskId, auth]); // Re-fetch task if taskId or auth changes

  const handleEdit = () => {
    // Navigate to the edit task page
    navigate(`/editTask/${taskId}`);
  };

  const handleDelete = () => {
    const baseUrl = window.env.BASE_URL;
    axios
      .delete(`${baseUrl}/user/task/delete/${taskId}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      })
      .then(() => {
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDone = () => {
    // Mark task as done
    const baseUrl = window.env.BASE_URL;
    axios
      .put(
        `${baseUrl}/user/task/updatetask/${taskId}`,
        { status: 'Done' },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      )
      .then((res) => {
        setTask(res.data.updatedTask); // Update task status in UI
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!task) {
    return (
      <div className="text-white text-center">
        <h2 className="text-2xl font-bold">Task not found</h2>
      </div>
    );
  }

  return (
    <div className="p-6 w-[30%] h-[40%]">
      <div className="bg-zinc-800 p-8 rounded-lg shadow-md border border-zinc-600 hover:scale-105 hover:shadow-lg transition-all duration-300">
        <div className="flex justify-between">
        <h2 className="text-3xl font-bold text-white">{task.title}</h2>
        <button>
            <i className="ri-home-9-line text-2xl text-zinc-600"  onClick={()=> navigate("/")}></i>
          </button>
         </div> 
        <p className="text-sm text-zinc-400 mt-2">{task.description}</p>
        <div className="mt-4">
          <p className="text-sm">
            <span className="font-semibold">Status:</span> {task.status}
          </p>
          <p className="text-sm">
            <span className="font-semibold">Priority:</span> {task.priority}
          </p>
        </div>

        <div className="flex justify-between mt-6">
          {/* Edit Button */}
          <button
            onClick={handleEdit}
            className="text-yellow-400 border border-yellow-400 px-4 py-2 rounded hover:bg-yellow-400 hover:text-white"
          >
            Edit
          </button>

          {/* Done Button */}
          <button
            onClick={handleDone}
            className="text-green-400 border border-green-400 px-4 py-2 rounded hover:bg-green-400 hover:text-white"
          >
            Done
          </button>

          {/* Delete Button */}
          <button
            onClick={handleDelete}
            className="text-red-400 border border-red-400 px-4 py-2 rounded hover:bg-red-400 hover:text-white"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewTask;
