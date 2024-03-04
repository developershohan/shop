import express from "express";
import authenticate from "../middleware/authenticate.js";
import { cancelOrder, confirmOrder, deleteOrder, deliverOrder, getAllOrders, shipOrder } from "../controllers/adminOrder.controller.js";


const router= express.Router();

router.get("/",authenticate, getAllOrders)
router.put("/:orderId/confirmed",authenticate, confirmOrder)
router.put("/:orderId/ship",authenticate, shipOrder)
router.put("/:orderId/deliver",authenticate, deliverOrder)
router.put("/:orderId/cancel",authenticate, cancelOrder)
router.put("/:orderId/delete",authenticate, deleteOrder)


export default router