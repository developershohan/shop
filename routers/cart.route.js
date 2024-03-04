import express from "express";
import authenticate from "../middleware/authenticate.js";
import cartControllers from "../controllers/cart.controller.js";

const router = express.Router();


router.get("/", authenticate, cartControllers.findUserCart)
router.put("/add", authenticate, cartControllers.addItemToCart)


export default router