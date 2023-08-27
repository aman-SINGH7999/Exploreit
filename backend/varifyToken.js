const jwt = require('jsonwebtoken');
const createError = require('./error');

const varifyToken = (req,res,next)=>{
    // console.log("--------------------req",req.headers);
    const token = req.cookies.access_token || req.headers.token || req.body.headers.token;
    const jwt_secreate = process.env.JWT_SECREATE;
    console.log("TOKEN : ", token);
    if(!token){
        return res.status(401).json({
            success : false,
            message : "You are not authenticated!",
        })
    }
    jwt.verify(token, jwt_secreate,(err,user)=>{
        if(err){
            return res.status(403).json({
                success : false,
                message : "Token is not valid!",
            })
        }
        req.user = user;
        next();
    })
}

module.exports = varifyToken