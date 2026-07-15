import express from "express";
import { getMyRequests, getMyListings, getRequestsForMyListings } from "../controllers/userController.js";
import {protect } from "../middleware/authMiddleware.js";
import {allowRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/me/requests", protect, allowRoles('renter'), getMyRequests);
router.get("/me/listings", protect, allowRoles("owner"), getMyListings);
router.get("/me/listing-requests", protect, allowRoles("owner"), getRequestsForMyListings);
export default router;
