const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.json())

const persons =[
    {
        id:"1",
        name:"Sajeeb",
        number:"01533094326",
    },
    {
        id:"2",
        name:"Tamanna",
        number:"0153309432",
    },
    {
        id:"3",
        name:"Azmain",
        number:"0153309326",
    },
    {
        id:"4",
        name:"People",
        number:"0153309326",
    }
]


const requestLogger = (request,response,next) => {
   console.log(`${request.method} ${request.path} ${response.statusCode}        
     ${JSON.stringify(request.body)} `);
  next()
}

app.use(requestLogger)

const generateId = () => {
    return  Math.random()* 1000000000000000
}

app.get('/api/persons',(request,response) => {
    response.json(persons)
})

app.get('/info',(request,response) => {
    const totalPerson = persons.length
    const today = new Date("2025-05-05")
    response.send(`<h1>Phonebook has info for ${totalPerson} people <h1>
        <p>${today}</p>`)
})

app.get('/api/persons/:id',(request,response) => {
    id = request.params.id
    const person = persons.find(person => person.id === id ? person : "")
    if(person){
        response.json(person)
    }
    else{
        response.status(404).send("id is not available")
    }
    
})

app.post('/api/persons',(request,response) => {
    body = request.body
    
    
    if(!body){
        return response.status(404).json({
            error:"Body is empty"
        })
    }
    let checkNameDuplicate
    if(body.name){
        checkNameDuplicate = persons.some(person => person.name === body.name)
    }
    if(!body.name || !body.number){
        return response.status(404).json({
            error: "name or number is missing"
        })
    }
    if(checkNameDuplicate){
        return response.status(404).json({
            error: "name must be unique"
        })
    }
    
    const person = {
        id:generateId(),
        name:body.name,
        number:body.number
    }
    persons.concat(person)
    response.json(person)
})

app.delete('/api/persons/:id',(request,response) => {
    const id = request.params.id
    const person = persons.filter(person => person.id !==id)
    response.status(204).end()
})


const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)


const port = 3001
app.listen(port, () =>{
    console.log(`Server running on port no. ${port}`)
} )