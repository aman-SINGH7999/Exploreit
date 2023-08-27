const createError = require('../error');
const User = require('../models/User');
const Video = require('../models/Video');

// UPDATE USE
const update = async (req,res,next)=>{
    if(req.params.id === req.user.id){
        try{
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {$set : req.body},{new:true});
            res.status(200).json({
                success : true,
                user : updatedUser,
            })
        }catch(err){
            next(err);
        }
    }else{
        return next(createError(403,"You can update only your Account!"))
    }
}

// DELETE USER
const deleteUser = async (req,res,next)=>{
    if(req.params.id === req.user.id){
        try{
            const deletedUser = await User.findByIdAndDelete(req.params.id);
            res.status(200).json({
                success : true,
                user : deletedUser,
                message : "User deleated successfully!",
            })
        }catch(err){
            next(err);
        }
    }else{
        return next(createError(403,"You can delete only your Account!"))
    }
}

// GET A USER
const getUser = async (req,res,next)=>{
    try{
        // console.log(req.params.id);
        const user = await User.findById(req.params.id);
        return res.status(200).json({
            success : true,
            user : user
        })
    }catch(err){
        next(err);
    }
}

// SUBSCRIBE A USER
const subscribe = async (req,res,next)=>{
    console.log("sub user")
    try{
        await User.findByIdAndUpdate(req.user.id ,{
            $push : {subscribedUsers : req.params.id},
        })
        const user = await User.findByIdAndUpdate(req.user.id, {
            $inc : {subscribers : 1},
        },{new:true})
        res.status(200).json({
            success : true,
            message : "Subscription successful!",
            user : user,
        })
    }catch(err){
        next(err); 
    }
}

// UNSUBSCRIBE A USER
const unsubscribe = async (req,res,next)=>{
    console.log(" ------------------!sub user")
    try{
        await User.findByIdAndUpdate(req.user.id ,{
            $pull : {subscribedUsers : req.params.id},
        })
        const user = await User.findByIdAndUpdate(req.user.id, {
            $inc : {subscribers : -1},
        },{new:true})
        res.status(200).json({
            success : true,
            message : "Unsubscription successful!",
            user : user,
        })
    }catch(err){
        next(err);
    }
}

// LIKE A VIDEO
const like = async (req,res,next)=>{
    try{
        const likedVideo = await Video.findByIdAndUpdate(req.params.videoId,{
            $addToSet : {likes : req.user.id},
            $pull : {dislikes : req.user.id},
        },{new:true});
        res.status(200).json({
            success : true,
            message : "video liked!",
            data : likedVideo,
        })
    }catch(err){
        next(err);
    }
}

// disLIKE A VIDEO
const disLike = async (req,res,next)=>{
    console.log("-----------------DIS LIKE")
    try{
        const dislikedVideo = await Video.findByIdAndUpdate(req.params.videoId,{
            $pull : {likes : req.user.id},
            $addToSet : {dislikes : req.user.id},
        },{new:true});
        res.status(200).json({
            success : true,
            message : "video disliked!",
            data : dislikedVideo,
        })
    }catch(err){
        next(err);
    }
}

module.exports = {update,deleteUser,getUser,subscribe,unsubscribe,like,disLike}