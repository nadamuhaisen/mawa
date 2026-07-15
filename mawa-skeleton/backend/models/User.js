import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {type: String , required: true},
        phone:{type: String , required: true ,uniqe: true},
        password:{type: String , required: true},
        role:{
            type:String,
            enum:["renter" ,"owner" , "admin"],
            default: "renter"
        },
    },
  { timestamps: true }
);
export default mongoose.model('User', userSchema);
