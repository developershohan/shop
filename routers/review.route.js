import express from "express";
import { createReview, getAllReviews } from "../controllers/review.controller.js";
import authenticate from "../middleware/authenticate.js";
const router = express.Router();


router.post("/create", authenticate, createReview)
router.get("/product/:productId", authenticate, getAllReviews)

export default router