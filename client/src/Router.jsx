import { createBrowserRouter } from "react-router-dom";
import Signup from "./auth/Signup";
import Login from "./auth/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import AddTask from "./components/Addtask";
import ViewTask from "./components/VIewTask";
import EditTask from "./components/EditTask";

export let router = createBrowserRouter(
    [
        {
            path: "/",
            element: <Home />
        },
        {
            path: "/viewTask/:taskId",
            element: <ViewTask/>
        },
        {
            path: "/editTask/:taskId",
            element: <EditTask/>
        },
        {
            path: "/signup",
            element: <Signup />
        },
        {
            path: "/login",
            element: <Login />
        },
        {
            path:"/addTask",
            element:<AddTask/>
        },
        {
            path: "/profile",
            element: <Profile />
        },
    ],
    {
        future: {
            v7_startTransition: true,
            v7_fetcherPersist: true,
        },
    }
);
