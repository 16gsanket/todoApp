import mongoose from "mongoose";
import logger from "../utils/logger.js";

const connectDB = async()=>{
    try {
        const connectionInstances = mongoose.connect(process.env.MONGODB_URI)
        console.log('mongoDb connected');
  
    } catch (error) {
        logger.error('database connection failed')
        throw new Error('Could not connect to database')
    }
}


export default connectDB;