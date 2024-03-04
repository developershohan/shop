import express from "express";
import authenticate from "../middleware/authenticate.js";
import { OrderHistory, createOrder, findOrderById } from "../controllers/order.controller.js";
const router= express.Router();

router.post("/",authenticate,createOrder)
router.get("/:user",authenticate,findOrderById)
router.get("/:id",authenticate,OrderHistory)


export default router