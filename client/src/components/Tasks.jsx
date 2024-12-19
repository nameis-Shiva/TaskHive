import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const { auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isLogin) {
      const baseUrl = window.env.BASE_URL;
      axios
        .get(`${baseUrl}/user/task/gettask`, {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        })
        .then((res) => {
          setTasks(res.data.tasks || []); 
        })
        .catch((err) => console.log(err));
    }
  }, [auth]); 

  const handleView = (taskId) => {
    // Navigate to the view page using the taskId
    navigate(`/viewTask/${taskId}`);
  };
  

  const handleEdit = (taskId) => {
    // Navigate to the edit page (assuming you have an edit page for each task)
    navigate(`/editTask/${taskId}`);
  };

  return (
    <div className="p-3">
      {tasks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tasks.map((task) => (
            <div key={task._id} className="bg-zinc-800 p-4 rounded-lg shadow-md border border-zinc-900">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-zinc-400">{task.title}</h3>
                  <p className="text-sm text-zinc-400">{task.description}</p>
                  <p className="text-sm text-red-300">
                    <span className="font-semibold text-yellow-900">Status:</span> {task.status}
                  </p>
                  <p className="text-sm text-blue-900">
                    <span className="font-semibold text-green-900">Priority:</span> {task.priority}
                  </p>
                </div>
                <div className="flex flex-col justify-between">
                  {/* View Button */}
                  <button
                    onClick={() => handleView(task._id)}
                    className="text-blue-400 border border-blue-400 px-4 py-1 rounded hover:bg-blue-400 hover:text-white mb-2"
                  >
                    View
                  </button>

                  {/* Edit Button */}
                  <button
                    onClick={() => handleEdit(task._id)}
                    className="text-red-300 border border-red-300 px-4 py-1 rounded hover:bg-red-300 hover:text-white"
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-white text-center">
          <h2 className="text-2xl font-bold">It Seems there is no Pending Task.</h2>
          <button className="border-2 border-blue-400 px-4 py-1 mt-2 rounded text-blue-400" onClick={() => navigate("/addTask")}>
            Add Task
          </button>
        </div>
      )}
    </div>
  );
};

export default Tasks;
