import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("DB Connected Successfully!")
    } catch (error) {
        console.error("Database connection error:", error.message)
        process.exit(1)
    }
}