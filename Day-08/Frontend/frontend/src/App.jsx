import { useState, useEffect } from 'react'
import axios from "axios"



function App() {
const [notes, setNotes] = useState([])

console.log("hellow integration")

function fetchNotes() {
  axios.get('http://localhost:3000/api/notes')
  .then((res) => {
    setNotes(res.data.notes)
  })
}

function handleDeleteNotes(id) {
  axios.delete(`http://localhost:3000/api/notes/${id}`)
  .then((res) => {
    console.log(res.data)
    fetchNotes()
  })
}

function handleUpdateNotes(id) {
  const newDescription = prompt("Enter new description:")
  axios.patch(`http://localhost:3000/api/notes/${id}`, {
    description: newDescription
  })
  .then((res) => {
    console.log(res.data)
    fetchNotes()
  })
}
useEffect(() => {
  fetchNotes()

}, [])
function handleSubmit(e) {
  e.preventDefault()
  const { title, description } = e.target.elements
  console.log(title.value, description.value)

  axios.post('http://localhost:3000/api/notes', {
    title: title.value,
    description: description.value
  })
  .then((res) => {
    console.log(res.data)
    fetchNotes()
  })
}

  return (
    <>
    <form className='note-create-form' onSubmit={handleSubmit} >
      <input name="title" type="text" placeholder='Enter Title' />
      <input name="description" type="text" placeholder='Enter Description' />
      <button type='submit'>Create Note</button>
    </form>
    <div className="notes">
      {
        notes.map(note => {
          return <div className="note"> 
      <h1>{note.title}</h1>
      <p>{note.description}</p>
      <button onClick={() => handleDeleteNotes(note._id)} className="delete">Delete</button>
      <button onClick={() => handleUpdateNotes(note._id)} className= "update">Update</button>
    </div>
        })
      }
    
    </div>
    </>
  )
}

export default App
