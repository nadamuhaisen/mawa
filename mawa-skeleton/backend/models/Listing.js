import mongoose from "mongoose";

const listingSchema = new mongoose.Schema(
    {
        owner : {type :mongoose.Schema.Types.ObjectId , ref :"user" , required :true},
        title : {type : String , required: true},
        type : {
            type :String ,
            enum : ["شقق" , "محلات" , "صالات افراح ", "قطع اراضي"],
            required : true,
        },
    location: { type: String, required: true },
    price: { type: Number, required: true },
    priceUnit: { type: String, default: 'شهر' },
    description: String,
    images: [String],
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
},
{timestamps:true}
);

export default mongoose.model("Listing" , listingSchema);