/*  This file is responsible for setting up the Express application and configuring middleware. 
It imports the Express module, creates an instance of the Express application, and uses the express.json() middleware to parse incoming request bodies as JSON. 
Finally, it exports the app instance for use in other parts of the application, such as the server.js file where the server is started.

*/
const express = require('express')
const authRouter = require('./routes/auth.routrs')
const cookieParser = require('cookie-parser')

const app = express()
//  this mesddelware is used to parse the incoming request body as JSON
app.use(express.json())
app.use('/api/auth', authRouter)
app.use(cookieParser())

module.exports = app
