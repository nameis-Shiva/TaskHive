import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import 'remixicon/fonts/remixicon.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Tasks from '../components/Tasks';
import axios from 'axios';

const Home = () => {
  const navigate = useNavigate();
  const [showPending, setShowPending] = useState(false);
  const { auth } = useAuth();
  const [user, setUser] = useState();

  useEffect(() => {
    if (auth.isLogin) {
      const baseUrl = window.env.BASE_URL;
      axios
        .get(`${baseUrl}/user/getuser`,{
          headers:{
            Authorization:`Bearer ${auth.token}`
          }
        })
        .then(res => {
          setUser(res.data.user.firstName); 
        })
        .catch(err => console.log(err));
    }
  }, [auth]);

  if (!auth.isLogin) {
    return (
      <div className="text-white text-center">
        <h2 className="text-2xl font-bold">Log In and Manage Your Tasks</h2>
        <button className="border-2 border-blue-400 px-4 py-1 mt-2 rounded text-blue-400" onClick={() => navigate("/login")}>
          Login
        </button>
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <div className="flex justify-around mt-3">
        <Navbar setShowPending={setShowPending} showPending={showPending} />
        <button onClick={() => navigate('/addTask')}>
          <i className="ri-add-circle-fill text-5xl text-zinc-700 hover:text-zinc-400"></i>
        </button>
        <button
          className="border-4 rounded px-3 h-12 border-zinc-700 text-zinc-700 text-xl font-semibold mt-3 
        hover:bg-zinc-900 hover:border-zinc-600 hover:text-zinc-600"
          onClick={() => navigate("/profile")}
        >
          <i className="ri-id-card-fill "></i> Profile
        </button>
      </div>

      {showPending ? <Tasks /> : (
        <div className="text-zinc-700 text-center mt-44">
          <h2 className="text-6xl font-bold">Hello {user}, <br /> Hope You&apos;re doing great! </h2>
        </div>
      )}
    </div>
  );
};

export default Home;
