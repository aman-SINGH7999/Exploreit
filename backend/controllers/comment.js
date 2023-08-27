const Comment = require('../models/Comment')
const Video = require('../models/Video');
const createError = require('../error');

const addComment = async (req,res,next)=>{
    try{
        console.log("Add comment -: ",req.body);
        const videoId = req.body.videoId;
        const comment = new Comment({userId : req.user.id, ...req.body});
        const savedComment = await comment.save();

        const comments = await Comment.find({videoId : videoId});
        res.status(200).json({
            success : true,
            data : comments.reverse(),
            message : "Comment is added!",
        })
    }catch(err){
        next(err);
    }
}
const deleteComment = async (req,res,next)=>{
    try{
        const comment = await Comment.findById(req.params.id);
        const video = await Video.findById(req.params.videoId);
        if(comment.userId === req.user.id || video.userId === req.user.id){
            const deletedComments = await Comment.findByIdAndDelete(req.params.id);

            const comments = await Comment.find({videoId : req.params.videoId});
            res.status(200).json({
                success : true,
                data : comments.reverse(),
                message : "Comment is deleted!",
            })
        }
        return next(createError(403,"You can delete only your comments!"));
    }catch(err){
        next(err);
    }
}
const getComment = async (req,res,next)=>{
    try{
        const comments = await Comment.find({videoId : req.params.videoId});
        res.status(200).json({
            success : true,
            data : comments.reverse(),
        })
    }catch(err){
        next(err);
    }
}


module.exports = {addComment,deleteComment,getComment}