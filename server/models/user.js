const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema (
    {
        name : String,
        email : {
            type : String,
            unique : true,
            immutable: true,
            required: true
        },
        password : String,
        role:{
            type:String,
            default: "USER"
        },
        profileImage : String ,
    },
    {timestamps: true}
)

module.exports.userModel = mongoose.model("user", userSchema)