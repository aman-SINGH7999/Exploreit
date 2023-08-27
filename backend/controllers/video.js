const createError = require('../error');
const Video = require('../models/Video');
const User = require('../models/User');

const addVideo = async (req,res,next)=>{
    const newVideo = new Video({userId : req.user.id, ...req.body});
    try{
        const savedVideo = await newVideo.save();
        return res.status(200).json({
            success : true,
            message : "Video is uploaded!",
            data : savedVideo,
        })
    }catch(err){
        next(err);
    }
}
const updateVideo = async (req,res,next)=>{
    try{
        const video = await Video.findById(req.params.id);
        if(!video) return next(createError(404,"Video not found!"));
        if(req.user.id == video.userId){
            const updatedVideo = await Video.findByIdAndUpdate(req.params.id,{
                $set : req.body,
            },{new : true});

            res.status(200).json({
                success : true,
                message : "Video is updated!",
                data : updatedVideo,
            })
        }else return next(createError(403,"You can only update only your video"))
    }catch(err){
        next(err);
    }
}
const deleteVideo = async (req,res,next)=>{
    try{
        const video = await Video.findById(req.params.id);
        if(!video) return next(createError(404,"Video not found!"));
        if(req.user.id == video.userId){
            const deletedVideo = await Video.findByIdAndDelete(req.params.id);
            const video = await Video.find({userId : req.user.id});
            res.status(200).json({
                success : true,
                message : "Video is deleted!",
                data : video,
            })
        }else return next(createError(403,"You can only delete only your video"))
    }catch(err){
        next(err);
    }
}
const getVideo = async (req,res,next)=>{
    try{
        const video = await Video.findById(req.params.id);
        if(!video) return next(createError(404,"video not found!"));
        return res.status(200).json({
            success : true,
            data : video,
        })
    }catch(err){
        next(err);
    }
}
const updateView = async (req,res,next)=>{
    try{
        await Video.findByIdAndUpdate(req.params.id, {
            $inc : {views : 1},
        })
        res.status(200).json("The view is increased!")
    }catch(err){
        next(err);
    }
}
const trend = async (req,res,next)=>{
    try{
        const videos = await Video.find({}).sort({views : -1});
        res.status(200).json({
            success : true,
            data : videos,
        })
    }catch(err){
        next(err);
    }
}

const random = async (req,res,next)=>{
    try{
        const videos = await Video.aggregate([{$sample : {size : 30}}])
        res.status(200).json({
            success : true,
            data : videos,
        })
    }catch(err){
        next(err);
    }
}

const sub = async (req,res,next)=>{
    console.log("hi..............");
    try{
        const user = await User.findOne({_id : req.user.id});
        const subscribedChannels = user.subscribedUsers;
        console.log("subscribedChannels : ", subscribedChannels)
        const list = await Promise.all(
            subscribedChannels.map((channelId)=>{
                return Video.find({userId : channelId});
            })
        );
        console.log("list", list);
        res.status(200).json({
            success : true,
            data : list.flat().sort((a,b)=> b.createdAt - a.createdAt),
        })
    }catch(err){
        next(err);
    }
}

const searchVideo = async (req, res, next)=>{
    try{
        const query = req.query.search;
        const videos = await Video.find({title : { $regex : query, $options : "i"}, }).limit(20);
        res.status(200).json({
            success : true,
            data : videos,
        })
    }catch(err){
        next(err);
    }
}

const getByTages = async (req,res,next)=>{
    try{
        const query = req.query.tags.split(",");
        const videos = await Video.find({tags : { $in : query, $options : "i"}, }).limit(20);
        res.status(200).json({
            success : true,
            data : videos,
        })
    }catch(err){
        next(err);
    }
}

const getVideoByUserId = async (req, res, next)=>{
    try{
        // console.log("id : ",req.user.id);
        const videos = await Video.find({userId : req.user.id});
        res.status(200).json({
            success : true,
            data : videos.reverse(),
        })
    }catch(err){
        next(err);
    }
}

const incrViews = async (req, res, next)=>{
    try{
        const id = req.params.id;
        await Video.findByIdAndUpdate(id,{
            $inc : {views : 1},
        })
        res.status(200).json({
            message : "video views is incremented!"
        })
    }catch{
        next(err);
    }
}


module.exports = {addVideo, updateVideo, deleteVideo, getVideo, updateView, trend, sub, random, searchVideo, getByTages, getVideoByUserId, incrViews}