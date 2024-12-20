const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const bookSchema = new Schema ({
    user: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    title: {
        type: String,
        required : true
    },
    author: {
        type: String,
        required : true
    },
    summary: {
        type: String,
        required : true
    },
    price: {
        type: String,
    },
    category: {
        type: [String],
        enum: ['Fiction', 'Non-Fiction', 'Drama'], 
    },
    coverImage: {
        type: String,
        default : null
    },
    file: {
        type: String,
        default : null
    },
    language: {
        type: String,
    },
    featured: {
        type: Boolean,
        default : false
    }
},
        {timestamps: true} )

module.exports.bookModel = mongoose.model("book", bookSchema )