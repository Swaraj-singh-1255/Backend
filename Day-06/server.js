const app = require('./src/app')

const mongoose = require("mongoose")


function connectToDb(){
    mongoose.connect("mongodb+srv://bob646492_db_user:IBUmKGDpPsZsT3hN@cluster0.zjfdvuy.mongodb.net/day-6")
    .then(()=>{
        console.log("connected to Database")
    })
}

connectToDb()

app.listen(3000,() =>{
    console.log("server is runing on the port 30000")
})