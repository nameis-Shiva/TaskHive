import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const {setAuth} = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if(email && password){
        console.log("Logging in with", { email, password });
        const info ={email,password};
        const baseUrl = window.env.BASE_URL;
        axios.post(`${baseUrl}/user/login`, info)
            .then(res => {
                if(res.status == 200){
                    setAuth({isLogin:true, token: res.data.token})
                    navigate("/")
                }
            })
            .catch(err => console.log(err.response?.data))
        setEmail("");
        setPassword("");
    } else {
        console.log("Provide all details");
    }
  };

  return (
      <div className="w-[40%] bg-zinc-900 p-8 rounded-md shadow-lg">
        <h2 className="text-2xl font-bold text-center text-white mb-6">Login</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-400 mb-1" htmlFor="email">Email</label>
            <input 
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 rounded-md text-white outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-400 mb-1" htmlFor="password">Password</label>
            <input 
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 rounded-md text-white outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your password"
              required
            />
          </div>
          
          <button 
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-md transition-colors"
          >
            Login
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-gray-400">Don&apos;t have an account? <a href="/signup" className="text-indigo-500 hover:underline">Sign up</a></p>
        </div>
      </div>
  );
};

export default Login;
