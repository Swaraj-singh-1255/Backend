const express = require("express")

const app = express()
app.use(express.json())

const notes = []

app.post("/notes", (req, res) => {

    notes.push(req.body)
    res.status(201).json({
        message:"Note Creates successfully"
    })

})

app.get("/notes", (req, res) => {
    res.status(200).json({
        notes: notes
    })
})

app.delete("/notes/:index", (req, res) =>{
    delete notes[req.params.index]
    res.status(204).json({
        message:"Note Delete Successsfully"
    })
})

app.patch("/notes/:task", (req, res) => {
    notes[req.params.task].description = req.body.description
    res.status(200).json({
        message:"Note Update Successfully"
    })
})



module.exports = app