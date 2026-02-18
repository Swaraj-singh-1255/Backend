const express = require('express');
const userModeal = require('../models/user.modeal')
const jwt = require('jsonwebtoken')
const authRouter = express.Router()
const crypto = require('crypto')


// Register route
authRouter.post('/register', async (req, res) => {
    console.log('Register route hit', req.body)
    try {
        const { name, email, password } = req.body

        const isUserExist = await userModeal.findOne({ email })
        if(isUserExist){
            return res.status(409).json({
                message: 'Email already exists'
            })
        }
        // Hash the password using MD5
        const hashedPassword = crypto.createHash('md5').update(password).digest('hex')
        const user = await userModeal.create({
            name, email, password: hashedPassword

        })
        // Generate JWT token
        const token = jwt.sign({
            id: user._id,
            email: user.email
        }, 
        process.env.JWT_SECRET
        )
        // Set the token in a cookie
        res.cookie("jwt_token", token)



        // Here you would typically perform validation and save the user to the database
        res.status(201).json({
            message: 'User registered successfully',
            user,
            token
        })
        // For demonstration purposes, we are just returning the user data and token in the response
    } catch (error) {
        res.status(500).json({
            message: 'Error registering user',
            error: error.message
        })
    }
})

// Protected route example
authRouter.post("/protected", (req, res) => {
    console.log(req.cookies);
    res.status(200).json({
        message: 'You have accessed a protected route'
    })

})
    // Login route
authRouter.post('/login', async (req, res) => {
        const { email, password } = req.body
        const user = await userModeal.findOne({ email })
        if(!user){
            return res.status(404).json({
            message: 'Invalid email or password'
        })
    }
    // Hash the provided password and compare with the stored hashed password
    const isPasswordMatch = user.password === crypto.createHash('md5').update(password).digest('hex')

    if(!isPasswordMatch){
        return res.status(401).json({
            message: 'Invalid email or password'
        })
    }
    const token = jwt.sign({
        id: user._id,
        email: user.email
    }, 
    process.env.JWT_SECRET
    )
    res.cookie("jwt_token", token)

    res.status(200).json({ 
        message: 'Login successful',
        user
    })

    })   
    


module.exports = authRouter