
const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())

app.use(express.json())

let notes = [
  {
    id: "1",
    content: "HTML is easy",
    important: true
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  },
  {
    id: "4",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
]

const generateId = () =>{
  const maxId = notes.length > 0 ? Math.max(...notes.map(n => Number(n.id))) : 0
  return (String(maxId + 1))

}

app.get('/',(request,response) => {
    response.send("<h1>Hello Sajeeb</h1>")
})

app.get('/api/notes',(request,response) => {
    response.json(notes)
})

app.get('/api/notes/:id',(request,response) => {
    const id = request.params.id;
    const note = notes.find(note => id === note.id);
    if(note){
        response.json(note)
    }else{
        // response.statusMessage =
        response.status(404).send("id is not available")
    }

})

app.post('/api/notes',(request,response) =>{
    // const maxId = notes.length > 0 
    // ? Math.max(...notes.map(n => Number(n.id))):0
    // const note = request.body;
    // note.id = String(maxId + 1)
    body = request.body
     if (!body.content) {
    return response.status(400).json({ 
        error: 'content missing' 
      })
    }
    const note = {
      id:generateId(),
      content:body.content,
      important:body.important || false
    }

    notes = notes.concat(note)
    console.log(note)
    response.json(note)
})





app.delete('/api/notes/:id', (request,response) => {
    const id = request.params.id;
    notes = notes.filter(note => id !== note.id);
    response.status(204).end()
})



const port = process.env.port || 3001

app.listen(port, () => {
    console.log(`Server Running on port ${port}`)
})

