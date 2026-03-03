import { login, register, getme, logout } from "../services/auth.api"
import { AuthContext } from "../auth.context"
import { useContext } from "react"

export const useAuth = () => {
    const context = useContext(AuthContext)
    const { user, setUser, loading, setLoading } = context  // ✅ setLoading fixed

    async function handleRegister({ username, email, password }) {
        setLoading(true)                                      // ✅ setLoading fixed
        const data = await register({ username, email, password })
        setUser(data.user)
        setLoading(false)                                     // ✅ setLoading fixed
    }

    async function handlelogin({ email, password }) {
        setLoading(true)                                      // ✅ setLoading fixed
        const data = await login({ email, password })         // ✅ calls login() not register()
        setUser(data.user)
        setLoading(false)                                     // ✅ setLoading fixed
    }

    async function handleGetMe() {
        setLoading(true)                                      // ✅ setLoading fixed
        const data = await getme()
        setUser(data.user)
        setLoading(false)                                     // ✅ setLoading fixed
    }

    async function handleLogout() {
        setLoading(true)                                      // ✅ setLoading fixed
        await logout()
        setUser(null)                                         // ✅ set null, logout has no user
        setLoading(false)                                     // ✅ setLoading fixed
    }

    return {
        user, loading, handleRegister, handlelogin, handleLogout, handleGetMe  // ✅ handlelogin lowercase
    }
}