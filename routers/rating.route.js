import express from "express";
import { createRating, getAllRatings } from "../controllers/rating.controller.js";
import authenticate from "../middleware/authenticate.js";
const router = express.Router();


router.post("/create", authenticate, createRating)
router.get("/product/:productId", authenticate, getAllRatings)

export default router