import React, {useState}from 'react'
import "../style/login.scss"
import FormGroup from '../components/FormGroup'
import { Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router'


const Login = () =>{
    const {loading, handlelogin} = useAuth()
    const navigate = useNavigate()

const [email, setEmail] = useState("")
const [password, setPassword] = useState("")


    async function handleSubmit(e){
        e.preventDefault()
        await handlelogin({email, password})
        navigate("/")
    }





    return (
        <main className='login-page'>
            <div className="form-container">
                <h1>Loging</h1>
                <form onSubmit={handleSubmit}>
                    <FormGroup 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        label="Email" placeholder="Enter your email"
                    />
                    <FormGroup 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        label="Password" placeholder="Enter your password"
                    />
                    <button className="btn-login">Login</button>
                </form>
                <p>You dont have an account?<Link to="/register">Register</Link></p>
            </div>
        </main>
    )
}

export default Login
