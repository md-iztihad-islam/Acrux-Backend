import mongoose from "mongoose";
import { DB_URI } from "./serverConfig.js";

//Function to connect to the database

export const connectDB = async () => {
    try {
        await mongoose.connect(DB_URI);
        console.log("Connected to the database successfully");
    } catch (error) {
        console.log("Error connecting to the database:", error);
        return;
    }
}