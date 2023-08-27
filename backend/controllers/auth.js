const User = require('../models/User');
const bcrypt = require('bcryptjs');
const createError = require('../error');
const jwt = require('jsonwebtoken')


// CREATE A USER
const signup = async (req,res, next)=>{
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        const newUser = new User({...req.body, password : hashedPassword});
        await newUser.save();
        res.status(200).json({
            success : true,
            message : "User Registered Successfully!"
        })
    }catch(err){
        next(err);
    }
} 

// SIGN IN
const signin = async (req,res,next)=>{
    try{
        const user = await User.findOne({name : req.body.name});
        console.log(user)
        if(!user){ 
             return res.status(404).json({
                success : false,
                message : "User not found!",
            });
        }
        const matchPassword = await bcrypt.compare(req.body.password, user.password)
        // console.log("match : ", matchPassword)
        if(matchPassword === false){
            return res.status(400).json({
                success : false,
                message : "Wrong Credentials!",
            });
        }   
        else{
            const jwtSecreate = process.env.JWT_SECREATE;
            const payload = {id : user._id};
            const token = await jwt.sign(payload, jwtSecreate, )
            
            return res.cookie("access_token", token).status(200).json({
                success : true,
                user : user,
                message : "User Logged In Successfully!",
                token,
            })
        }
    }catch(err){
        return next(err);
    }
} 

// GOOGLE AUTH


module.exports = {signup, signin}