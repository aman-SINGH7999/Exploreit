const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config();

const username = process.env.DATABASE_USERNAME
const password = process.env.DATABASE_PASSWORD

const connectDB = () => mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.uotv5qf.mongodb.net/exploreit`,{
    useNewUrlParser : true,
    useUnifiedTopology : true,
}).then(()=>{
    console.log("db connected successfully!")
}).catch((err)=>{
    console.log("Error : ",err)
})

module.exports = connectDB;