import { BrowserRouter, Routes, Route, Navigate } from "react-router"
import Login from "./feature/auth/Pages/Login"
import Register from "./feature/auth/Pages/register"

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path = "/" element={<h1>Welcome to the App</h1>}/>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes