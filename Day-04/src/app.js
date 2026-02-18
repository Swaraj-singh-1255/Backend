const express = require("express")



const app = express()

app.use(express.json())

const notes = [
        // {
        // title: "Test Title 3",
        // description: "Test description 3"
    // }
]

app.get("/",(req, res)=>{
    res.send("Hello World!!!!!!")
})

app.post("/notes", (req, res) => {
    console.log(req.body)
    notes.push(req.body)

    console.log(notes)
    res.send("Note added successfully")
})

app.get("/notes", (req, res) =>{
    res.send(notes)
})

// Delete a note by index
//Params 
//delete /nodes /0
app.delete("/notes/:index",(req,res) =>{
        delete notes[req.params.index]

        res.send("Note deleted successfully")
})
// patch /notes/:index 
// req.body = {description : " sample modified description"}


app.patch("/notes/:index", (req, res) => {
        notes[req.params.index].description = req.body.description

        res.send("Note updated successfully")
    })



module.exports = app