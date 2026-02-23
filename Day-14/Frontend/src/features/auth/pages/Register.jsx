import React from 'react'
import { Link } from "react-router"


const handleSubmit = (e) => {
        e.preventDefault()
    }

const Register = () => {
    return (
        <main>
            <div className="from-container">
                <h1>Register</h1>
                <form onSubmit={handleSubmit} >
                    <input type="text"  name='username' id='username' placeholder='Enter UserName'/>
                    <input type="text"  name='email' id='email' placeholder='Enter Email'/>
                    <input type="password" name='password' id='password' placeholder='Enter Password' />
                    <button className='button primary-button'>Register</button>
                </form>
                <p>Already have an account ? <Link to={'/login'}>Login to account.</Link></p>
            </div>
        </main>
    )
}

export default Register
