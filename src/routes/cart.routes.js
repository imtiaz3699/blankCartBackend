import express from "express";

import { addToCart, removeFromCart, getCart } from "../controller/cart.controller.js";
const router = express.Router();
router.post("/add-to-cart",addToCart)
router.put("/remove-from-cart",removeFromCart)
router.get("/get-cart",getCart)
export default router;