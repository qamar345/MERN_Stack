import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';


dotenv.config();

mongoose.connect(process.env.MONGODB).then(() => {
    console.log("Connected with MongoDB");
}).catch((err) => {
    console.log(err);
})

const app = express();
app.use(express.json())


app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})


app.listen(9900, () => {
    console.log("Server is Running on Port 9900")
})
