import { createBrowserRouter } from "react-router"
import Register from "./features/auth/pages/register"
import Login from "./features/auth/pages/login"
import Protected from "./features/auth/components/protected"
import Home from "./features/home/pages/Home" 

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Protected> <Home/></Protected>
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/Login",
        element: <Login />
    }
])