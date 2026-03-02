const mongoose = require("mongoose")

function connectToDB(){
    mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Conneted to DB')
    })
    .catch(err =>{
        console.log("Error connection to DB", err);
        
    })
}

module.exports = connectToDB