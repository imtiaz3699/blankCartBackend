import express from "express";
import { createCategory, deleteCategory, getCategories, getCategory, updateCategory } from "../controller/category.controller.js";

const router = express.Router();
router.post("/create-category", createCategory);
router.put("/update-category/:id", updateCategory);
router.get("/get-category/:id", getCategory);
router.get("/get-categories", getCategories);
router.delete("/delete-category/:id", deleteCategory);   

export default router;  