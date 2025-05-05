import express from 'express';

import { createOrder,getAllOrders,getSingleOrder,deleteOrder } from '../controller/order.controller.js';   

const router = express.Router();

router.post("/create-order",createOrder)
router.get("/get-all-orders",getAllOrders)
router.get("/get-single-order/:id",getSingleOrder)
router.delete("/delete-order/:id",deleteOrder)

export default router;