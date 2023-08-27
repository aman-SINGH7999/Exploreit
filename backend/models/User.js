const mongoose = require('mongoose')

const userSchems = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        unique : true,
    },
    email : {
        type : String,
        required : true,
        unique : true,
    },
    password : {
        type : String,
        required : true,
    },
    img : {
        type : String,
        default : "https://media.istockphoto.com/id/1131164548/vector/avatar-5.jpg?s=612x612&w=0&k=20&c=CK49ShLJwDxE4kiroCR42kimTuuhvuo2FH5y_6aSgEo=",
    },
    subscribers : {
        type : Number,
        default : 0,
    },
    subscribedUsers : {
        type : [String],
    }
},{
    timestamps:true,
})

module.exports = mongoose.model("User",userSchems);