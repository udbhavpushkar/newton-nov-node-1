const express = require("express")
const mongoose = require("mongoose")
const app = express()
const cors = require("cors")
const port = 8001

const Book = require("./model/books")

//to resolve Cross origin request
app.use(cors())

// reading encoded data that we recieve from client though api
app.use(express.json()) 
app.use(express.urlencoded({extended: true}))

app.post("/book", async (req, res)=>{
    const bookData = new Book({
        name: req.body.name,
        author: req.body.author
    })
    try{
        const saved = await bookData.save()
        res.json(saved)
    }catch(e){
        res.status(400).json({error: e.message})
    }
})

app.get("/book", async (req, res)=>{
    try{
        const books = await Book.find()
        res.json(books)
    }catch(e){
        res.status(404).json({error: e.message})
    }
})

app.delete("/book/:id", async (req, res)=>{
    let id = req.params.id
    try{
        const deletedData = await Book.findByIdAndRemove(id)
        res.json(deletedData)
    }catch(e){
        res.status.json({error: e})
    }
})


//connect to mongodb using mongoose
mongoose.connect("mongodb://localhost:27017/november", {useUnifiedTopology: true, useNewUrlParser: true}, ()=>{
    console.log("Connected to db");
})

app.listen(port, ()=>{
    console.log("Listening to "+port);
})