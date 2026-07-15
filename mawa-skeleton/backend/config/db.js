import mongoose from "mongoose";

export async function connectDB(){
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("mongoDB connected");
    }catch(err){
        console.log("failed mongoDB connect" , err.message)
            process.exit(1)
    }
}