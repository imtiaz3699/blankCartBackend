import { Category } from "../models/category.model.js";
import { handleError } from "../utils/helpers.js";

export const createCategory = async (req, res) => {
    if (!req.body.name) {
        return handleError(res, "Category name is required", 400);
    }
    try {
        const isCategoryExists = await Category.findOne({ name: req.body.name });
        if (isCategoryExists) return handleError(res, "Category already exists", 400);
        const category = await Category.create(req.body);
        res.status(201).json(category);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) return res.status(404).json({ message: "Not found" });
        res.json(category);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const updateCategory = async (req, res) => {
    if (!req.body.name) {
        return handleError(res, "Category name is required", 400);
    }
    try {
        const isCategoryExists = await Category.findOne({ name: req.body.name });
        if (isCategoryExists) return handleError(res, "Category already exists", 400);
        const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(category);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const deleteCategory = async (req, res) => {
    try {
        const isCategoryExists = await Category.findById(req.params.id);
        if (!isCategoryExists) return res.status(404).json({ message: "Not found" });
        await Category.findByIdAndDelete(req.params.id);
        res.json({ message: "Category deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
