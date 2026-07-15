import Listing from "../models/Listing.js";
import ContactRequest from "../models/ContactRequest.js";

//renterDashboard
//جلب طلبات المستاجر "Git/api/users/requests"
export async function getMyRequests(req,res,next){
    try{
        const requests = await ContactRequest.find({renter:req.user._id}).populate("listing");
        res.json(requests);
    }catch(err){
        next(err);
    }
}


//ownerDashboard
//جلب عقارات المالك "Get/api/users/listing"
export async function getMyListings(req, res, next) {
    try {
    const myListings =await Listing.find({owner:req.user._id});
    res.json(myListings);
    }catch(err){
        next(err);
    }
}



//طلبات التواصل ل عقارات المالك "Get/api/users/listing-requests "
export async function getRequestsForMyListings(req , res , next){
    try{
    const myListings = await Listing.find({ owner: req.user._id }).select('_id')
    const listingIds = myListings.map((l) => l._id)

    const requests = await ContactRequest.find({ listing: { $in: listingIds } })
      .populate('listing', 'title')
      .populate('renter', 'name')

    res.json(requests)
    }catch(err){
        next(err);
    }
}