const mongoose = require("mongoose")

const bookSchema = mongoose.Schema({
    name: {
        type: String,
        required : true,
    },
    author: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Books = mongoose.model('Book', bookSchema)

module.exports = Books