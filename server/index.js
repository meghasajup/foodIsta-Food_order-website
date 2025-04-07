import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoutes.js';
import userRouter from './routes/userRoutes.js';

//environment variables
dotenv.config();

//app config
const app = express()
const port = process.env.PORT || 4000;

//middleware
app.use(express.json())
app.use(cors())

//DB connection
connectDB();

//api endpoints
app.use('/api/user', userRouter)
app.use("/api/food",foodRouter)
app.use("/images",express.static('uploads'))

app.get("/", (req, res) => {
    res.send("Welcome to FoodIsta - Food Order api!")
})

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})