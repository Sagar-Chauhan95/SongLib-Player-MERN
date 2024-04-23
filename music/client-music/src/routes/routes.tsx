import { Navigate } from "react-router-dom";
import Home from "../pages/home/home";
import Login from "../pages/login/login";


export default [
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/home",
        element: <Home />
    },
    {
        path: "/",
        element: <Navigate to="/login" />
    },
    {
        path: "*",
        element: <Login />
    }
];