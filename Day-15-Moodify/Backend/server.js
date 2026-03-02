require("dotenv").config();
const { connect } = require("mongoose")
const app = require("./src/app")
const connectToDB = require("./src/config/database")

connectToDB();

app.listen(3000, ()=>{
    console.log("Server is running on port number 3000")
})