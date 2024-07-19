const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema (
    {
        name : String,
        email : String,
        password : String,
        role:{
            type:String,
            default: "USER"
        },
    },
    {timestamps: true}
)

module.exports.userModel = mongoose.model("user", userSchema)