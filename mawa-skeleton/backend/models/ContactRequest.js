import mongoose from "mongoose";

const contactRequestSchema = new mongoose.Schema(
{
    listing : { type: mongoose.Schema.Types.ObjectId, ref: "Listing", required: true },
    renter : { type : mongoose.Schema.Types.ObjectId , ref: "User" , required: true} ,
    message : String,
    status:{
        type : String ,
        enum : ["pending" , "confirmed" , "completed"],
        default : "pending" ,
    },

visitDate: Date,
},
{timestamps:true}
);

export default mongoose.model("ContactRequest", contactRequestSchema);