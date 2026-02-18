/*
this is the entry point of the application. It imports the Express app from the src/app.js file and starts the server on port 3000. 
When the server is running, it logs a message to the console.
*/
require('dotenv').config()
const app = require('./src/app')
const connectToDB = require('./src/config/database')

connectToDB()

app.listen(3000, () =>{
    console.log('Server is running on port 3000')
})