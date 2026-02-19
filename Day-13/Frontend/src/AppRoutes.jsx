import { BrowserRouter, Routes, Route, Navigate } from "react-router"
import Login from "./feature/auth/Pages/Login"
import Register from "./feature/auth/Pages/register"

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes