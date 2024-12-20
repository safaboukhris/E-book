const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const favoriteSchema = new Schema({
    userId: {
        type:mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    bookId: {
        type:mongoose.Schema.Types.ObjectId,
        ref: "book",
        required: true
    },
},
   {timestamps: true} 
)

module.exports.favoritesModel = mongoose.model("favorite", favoriteSchema)