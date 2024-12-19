import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        dob: '',
        gender: 'male', // default gender selection
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const baseUrl = window.env.BASE_URL;
        axios.post(`${baseUrl}/user/signup`, formData)
            .then(res => {
                console.log(res);
                navigate('/login')
            })
            .catch(error => console.log(error));
        console.log("Signing up with", formData);
    };
    

    return (
        <div className="w-[40%] bg-zinc-900 p-8 rounded-md shadow-lg">
            <h2 className="text-2xl font-bold text-center text-white mb-6">Sign Up</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-400 mb-1" htmlFor="firstName">First Name</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-gray-700 rounded-md text-white outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Enter your first name"
                        required
                    />
                </div>

                <div>
                    <label className="block text-gray-400 mb-1" htmlFor="lastName">Last Name</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-gray-700 rounded-md text-white outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Enter your last name"
                    />
                </div>

                <div className="flex space-x-4">
                    <div className="w-[50%]">
                        <label className="block text-gray-400 mb-1" htmlFor="dob">Date of Birth</label>
                        <input
                            type="date"
                            id="dob"
                            name="dob"
                            value={formData.dob}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-gray-700 rounded-md text-white outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                    <div className="w-[50%]">
                        <label className="block text-gray-400 mb-1">Gender</label>
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-gray-700 rounded-md text-white outline-none focus:ring-2 focus:ring-green-500"
                        >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="others">Others</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-gray-400 mb-1" htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
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
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-gray-700 rounded-md text-white outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Enter your password"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-md transition-colors"
                >
                    Sign Up
                </button>
            </form>

            <div className="text-center mt-4">
                <p className="text-gray-400">Already have an account? <a href="/login" className="text-indigo-500 hover:underline">Login</a></p>
            </div>
        </div>
    );
};

export default Signup;
