const mongoose = require("mongoose")


function connectToDb(){
    mongoose.connect(process.env.MONGO_URI)
    .then (() => {
        console.log("The DataBase is Connected")
    })
}

module.exports = connectToDb