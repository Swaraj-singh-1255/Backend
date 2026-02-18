const express = require('express');
const userModeal = require('../models/user.modeal')
const jwt = require('jsonwebtoken')

const authRouter = express.Router()

authRouter.post('/register', async (req, res) => {
    console.log('Register route hit', req.body)
    try {
        const { name, email, password } = req.body

        const isUserExist = await userModeal.findOne({ email })
        if(isUserExist){
            return res.status(400).json({
                message: 'Email already exists'
            })
        }

        const user = await userModeal.create({
            name, email, password

        })

        const token = jwt.sign({
            id: user._id,
            email: user.email
        }, 
        process.env.JWT_SECRET
        )

        res.cookie("jwt_token", token)



        // Here you would typically perform validation and save the user to the database
        res.status(201).json({
            message: 'User registered successfully',
            user,
            token
        })

    } catch (error) {
        res.status(500).json({
            message: 'Error registering user',
            error: error.message
        })
    }
})

module.exports = authRouter