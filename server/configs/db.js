import mongoose from "mongoose";
import { MONGODB_URI } from "./env.js";

/**
 * Database Connection Function
 * Establishes connection to MongoDB using Mongoose
 * @returns {Promise<void>} - Resolves when connection is successful
 */
const connectDB = async () => {

    try {

        mongoose.connection.on('connected' , () => console.log("Database connected succesfully"));
        
        await mongoose.connect(`${MONGODB_URI}/mern-auth`)
    } catch (error) {
        
        console.error("Error while connection to db: " ,error);
        
    }
}

export default connectDB;