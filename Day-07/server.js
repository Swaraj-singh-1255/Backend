/**
 * Server ko Start karna 
 * Database se connect karna
 */
require("dotenv").config()

const connectToDb = require("./src/config/database.js")
const app = require("./src/app.js")


connectToDb()

app.listen(3000, () => {
    console.log("Now the Server is start in port number 3000")
})