import React, {useState} from 'react'
import "../style/register.scss"
import FormGroup from '../components/FormGroup'
import { Link } from 'react-router'

function register() {
  return (
    <main className='register-page'>
            <div className="form-container">
                <h1>Register</h1>
                <form action="">
                    <FormGroup label="Username" placeholder="Enter your username"/>
                    <FormGroup label="Email" placeholder="Enter your email"/>
                    <FormGroup label="Password" placeholder="Enter your password"/>
                    <button className="btn-login">Register</button>
                </form>
                <p>Already have an account?<Link to="/login">Login</Link></p>
            </div>
        </main>
  )
}

export default register
