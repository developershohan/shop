import express from "express";
import { createMultipleProducts, createProduct, deleteProduct, updateProduct } from "../controllers/product.controller.js";
import authenticate from "../middleware/authenticate.js";
const router= express.Router();

router.post("/",authenticate ,createProduct)
router.post("/creates",authenticate ,createMultipleProducts)
router.delete("/:id",authenticate,deleteProduct)
router.patch("/:id",authenticate,updateProduct)






export default router