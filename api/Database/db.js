import mongoose from "mongoose";

export const connectToDatabase = async () =>{
    try {
        const connection = await mongoose.connect(process.env.MONGODB_CONN);
        
        console.log(`MongoDb Connected: ${connection.connection.host}`);
    } catch (error) {
        console.log(`mongo is not connected ${error.message}`);
    }
}