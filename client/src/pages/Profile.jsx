import 'remixicon/fonts/remixicon.css'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [user, setUser] = useState("");
    const {auth, setAuth} = useAuth();
    const navigate = useNavigate();

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
            setUser(res.data.user); 
          })
          .catch(err => console.log(err));
      }
    }, [auth]);
    
    const handleLogout = () => {
      setAuth({ isLogin: false, token: "" }); 
      localStorage.removeItem("token"); 
    };
  
    if (!auth.isLogin) {
      return (
        <div className="text-white text-center">
          <h2 className="text-2xl font-bold">You are not logged in!</h2>
          <button className='border-2 border-blue-400 px-4 py-1 mt-2 rounded text-blue-400'
            onClick={()=>navigate("/login")}
          >Login</button>
        </div>
      );
    }
  
    return (
      <div className="p-4 rounded-lg border-4 border-zinc-700 w-[800px] bg-zinc-900 text-white">
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold mb-4 text-zinc-600">
            <i className="ri-id-card-fill"></i> &nbsp; Profile Information
          </h2>
          <button>
            <i className="ri-home-9-line text-2xl text-zinc-600"  onClick={()=> navigate("/")}></i>
          </button>
        </div>
  
        <div className="space-y-4">
          <div>
            <label className="font-semibold">First Name:</label>
            <p className="text-zinc-600">{user?.firstName || "N/A"}</p>
          </div>
  
          <div>
            <label className="font-semibold">Last Name:</label>
            <p className="text-zinc-600">{user?.lastName || "N/A"}</p>
          </div>
  
          <div>
            <label className="font-semibold">Date of Birth:</label>
            <p className="text-zinc-600">{user?.dob || "N/A"}</p>
          </div>
  
          <div>
            <label className="font-semibold">Gender:</label>
            <p className="text-zinc-600">{user?.gender || "N/A"}</p>
          </div>
  
          <div>
            <label className="font-semibold">Email:</label>
            <p className="text-zinc-600">{user?.email || "N/A"}</p>
          </div>
  
          <div>
            <label className="font-semibold">Last Login:</label>
            <p className="text-zinc-600">
              {user?.lastLogin ? new Date(user.lastLogin).toLocaleString() : "Never"}
            </p>
          </div>
        </div>
  
        <div className="flex justify-center gap-20 mt-7 mb-7">
          <button className="text-green-400 border-2 border-green-400 px-3 py-1 rounded-md hover:bg-green-700 hover:text-white hover:border-green-700">
            Edit <i className="ri-edit-box-line"></i>
          </button>
          <button
            onClick={handleLogout}
            className="text-red-400 border-2 border-red-400 px-3 py-1 rounded-md hover:bg-red-700 hover:text-white hover:border-red-700"
          >
            Logout <i className="ri-logout-box-line"></i>
          </button>
        </div>
      </div>
    );
  };
  
  export default Profile;