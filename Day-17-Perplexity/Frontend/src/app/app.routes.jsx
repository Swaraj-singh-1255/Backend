import { createBrowserRouter } from "react-router";
import Login from "../features/auth/pages/login";
import Register from "../features/auth/pages/register";
import DashboardLayout from "../features/chat/layouts/DashboardLayout";
import Protected from "../features/auth/components/Protected";
import { Navigate } from "react-router";
import Home from "../features/chat/pages/Home";
import Templates from "../features/chat/pages/Templates";
import Explore from "../features/chat/pages/Explore";
import Wallet from "../features/chat/pages/Wallet";

export const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/",
        element: (
          <Protected>
            <DashboardLayout />
          </Protected>
        ),
        children: [
          {
            index: true,
            element: <Home />
          },
          {
            path: "history",
            element: <Home />
          },
          {
            path: "templates",
            element: <Templates />
          },
          {
            path: "explore",
            element: <Explore />
          },
          {
            path: "wallet",
            element: <Wallet />
          }
        ]
    },
    {
        path: "/dashboard",
        element: <Navigate to="/" replace />
    }
])