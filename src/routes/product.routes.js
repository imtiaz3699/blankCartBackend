import express from "express";
import { addBestDeals, createProduct, deleteProduct, getBestDealsProduct, getProductByCategory, getProducts, getSingleProduct, heroProduct, updateProduct } from "../controller/product.controller.js";

const router = express.Router();

router.post("/create-product",createProduct)
router.put("/update-product/:id",updateProduct)
router.delete("/delete-product/:id",deleteProduct)
router.get("/get-products",getProducts)
router.get("/get-single-product/:id",getSingleProduct)
router.put("/add-product-to-hero-section/:id",heroProduct)
router.get("/get-product-hero-section",heroProduct)
router.put("/add-best-deals-product/:id",addBestDeals)
router.get("/get-best-deals-product",getBestDealsProduct)
router.get("/get-product-by-category/:id",getProductByCategory)

export default router;