import mongoose from "mongoose"
import { ENV } from "./env.js"

export const ConnectDB = async()=>{
    try {
        const conn = await mongoose.connect(ENV.DB_URL)
        console.log("Connected to MongoDB:",conn.connection.host)
    } catch (error) {
        console.log("Error DB :"+error.message);
        process.exit(1)
        
    }
}