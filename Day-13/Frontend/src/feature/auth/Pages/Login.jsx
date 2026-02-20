import Rect, {useState} from 'react'
import '../style/form.scss'
import { Link } from 'react-router'
import axios from 'axios'
import { useAuth } from '../hooks/userAuth'
import { useNavigate } from 'react-router'



const Login = () => {

const [username, setUsername] = useState("")
const [password, setPassword] = useState("")

const { handleLogin, loading } = useAuth()
const navigate = useNavigate()

if(loading){
    return(
        <h1>Loading.....</h1>
    )
}


 function handleSubmit(e) {
    e.preventDefault()

    handleLogin(username, password)
    .then(res=>{
        console.log(res)
        navigate("/")
    })

}
    return (
            <main>
            <div className="form-container">
            <h1>Login!</h1>
            <form onSubmit={handleSubmit}>
                <input 
                onInput={(e) => {setUsername(e.target.value)}}
                type="text" 
                name='unsename' 
                placeholder='Enter username' />

                <input 
                onInput={(e) => {setPassword(e.target.value)}}
                type="password" 
                name='password' 
                placeholder='Enter password'/>
                <button>Login</button>
            </form>

                <p>Don't have a account? <Link className='toggle-AuthForm' to='/register'>Register</Link></p>
</div>
        </main>
    )
}

export default Login