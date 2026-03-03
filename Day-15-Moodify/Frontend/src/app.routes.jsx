import { createBrowserRouter } from "react-router"
import Register from "./features/auth/pages/register"
import Login from "./features/auth/pages/login"

export const router = createBrowserRouter([
    {
        path: "/",
        element: <h1>Home</h1>
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