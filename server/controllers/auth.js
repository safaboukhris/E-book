const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { userModel} = require ("../models/user");


const register = async (req , res) => {
    try{
        const exist = await userModel.findOne({ email : req.body.email });
        if(exist) {
            return res.status(409).send("user exist");
        }
        const hash = bcrypt.hashSync(req.body.password , 10);
        req.body.password = hash;
        const user = await userModel.create(req.body);
        return res.send ({
            message : "user created successfully",
            user,
        });
    }catch(error){
        console.log("error" , error)
    }
};

const login = async (req , res) => {
        try{
            const user = await userModel.findOne({ email : req.body.email });
            if(!user) {
                return res.status(404).send("user not found");
            }
            const ismatch = await bcrypt.compare(req.body.password, user.password);
            if (!ismatch){
                return res.status(401).send("invalid password");
            }
            const payload = {
                id: user._id,
                email: user.email,
                role: user.role,
                name: user.name,
                password: user.password,
            };
            const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "1d"})

            return res.send({
                token,
                user:payload,
            });
        }catch(error){
            console.log("error :>>" , error)
        }


};

const Find = async ( req,res ) =>{
    try{
        const users = await userModel.find().sort({ createdAt: -1 })
        res.send(users)

    } catch (err){
        res.status(500).json ({msg : err.message})
    }
}

const Delete = async (req, res) =>{
    try{
        const userDeleted = await userModel.deleteOne ({_id : req.params.id})
        res.status(200).json({ message: 'user delted successfully', data: userDeleted })
    }catch (err){
        res.status(500).json ({msg : err.message})
    }
}

module.exports.authController ={
    register,
    login,
    Find,
    Delete,
};