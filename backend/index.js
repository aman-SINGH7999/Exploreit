const express = require('express')
const connectDB = require('./db')
const dotenv = require('dotenv')
const cors = require('cors')
const app = express();
const cookieParser = require('cookie-parser')
app.use(cookieParser());

const userRoutes = require('./routes/users');
const videoRoutes = require('./routes/videos');
const commentRoures  = require('./routes/comments');
const authRoures  = require('./routes/auth');


app.use(cors());
app.use(express.json());

dotenv.config();
connectDB();
const port = process.env.PORT_NUMBER

app.use("/api/users",userRoutes);
app.use("/api/videos",videoRoutes);
app.use("/api/comments",commentRoures);
app.use("/api/auth",authRoures);

app.use((err,req,res,next)=>{
    const status = err.status || 500;
    const message = err.message || "Something Went wrong!";

    return res.status(status).json({
        success : false,
        status : status,
        message : message
    })
})


app.listen(port || 8800,()=>{
    console.log(`server is listening at port ${port}`)
})