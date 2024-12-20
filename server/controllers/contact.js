const {contactModel} = require ("../models/contact")

const Add =  async (req,res) => {
    try{
        const message = await contactModel.create(req.body)
        res.status(200).json({ message: 'Message added', data: message })
    }catch (error){
        console.log(error)
    }
}


const Get = async (req,res) => {
    try{
        const messages = await contactModel.find().sort({ createdAt: -1 })
        res.status(200).json({ message: 'Message fetched', data: messages })
    }catch (error){
        console.log(error)
    }
}

const Delete = async (req,res) => {
    try{
        const messagedeleted = await contactModel.deleteOne({ _id : req.params.id})
        res.status(200).json({ message: 'Message deleted', data: messagedeleted })
    }catch (error){
        console.log(error)
    }
}

module.exports.contactControllers = {
    Add,
    Get,
    Delete,
}