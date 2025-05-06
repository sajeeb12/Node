const mongoose = require('mongoose')
if(process.argv.length < 3){
    console.log("Give a password as a argument")
    process.exit()
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0.a5qfl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
    content:String,
    important:Boolean
})

const Note = mongoose.model('Note',noteSchema)

const note = new Note({
    content:"Html is easy",
    important:true
})

note.save().then(
    result => {
        console.log("Note is Saved")
        mongoose.connection.close()
    }
)