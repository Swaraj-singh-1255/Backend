/*
    server ko creat krna
*/

const express = require("express")
const noteModel = require("./models/notes.model")



const app = express()
app.use(express.json())
/**
 * - POST /notes
 * - req.body => {title, description}
 */

app.post("/notes", async(req, res) => {
    const {title, description, age} = req.body

    const note = await noteModel.create({
        title, description, age
    })

    res.status(201).json({
        Message:"Notes created successfully",
        note
    })

})

app.get("/notes", async (req, res) => {
    const notes = await noteModel.find()

    res.status(200).json({
        message:"Node fetched Successfully",
        notes
    })
})


module.exports = app