import express from "express";
import { findProductById, getAllProducts } from "../controllers/product.controller.js";
import authenticate from "../middleware/authenticate.js";
const router= express.Router();

router.get("/",authenticate,getAllProducts)
router.get("/id/:id",authenticate,findProductById)




export default router