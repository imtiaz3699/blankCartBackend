import { Product } from "../models/product.models.js";
import { handleError, handleSuccess } from "../utils/helpers.js";


export const createProduct = async (req, res) => {
    if (!req.body.name) {
        return handleSuccess(res, "Product name is required", 400);
    }
    try {
        const product = await Product.create(req.body);
        return handleSuccess(res, product);
    } catch (e) {
        return handleError(res, e.message, 500);
    }
}

export const updateProduct = async (req, res) => {
    if (!req.body.name) {
        return handleError(res, "Product name is required", 400);
    }
    try {
        const productExists = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!productExists) {
            return handleError(res, "Product not found", 404);
        }
        return handleSuccess(res, productExists, "Product has been updated.");
    } catch (e) {
        return handleError(res, e.message, 500);
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const isProductExists = await Product.findByIdAndDelete(req.params.id);
        if (!isProductExists) {
            return handleError(res, "Product not found", 404);
        }
        return handleSuccess(res, {}, "Product has been deleted.");
    } catch (e) {
        return handleError(res, e.message, 500);
    }
}

export const getProducts = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    try {
        const products = await Product.find({}).skip((page - 1) * parseInt(limit)).limit(limit);
        const data = {
            products: products,
            page: page,
            limit: limit,
            total: await Product.find({}).countDocuments()
        }
        return handleSuccess(res, data);
    } catch (e) {
        return handleError(res, e.message, 500);
    }
}

export const getSingleProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('category');
        if (!product) {
            return handleError(res, "Product not found", 404);
        }
        return handleSuccess(res, product, 'Product fetched successfully.');
    } catch (e) {
        return handleError(res, e.message, 500);
    }
}

export const heroProduct = async (req, res) => {
    try {
        const isProduct = await Product.findByIdAndUpdate(req.params.id, { is_hero_section: req.body.is_hero_section }, { new: true });
        if (!isProduct) {
            return handleError(res, "Product not found", 404);
        }
        return handleSuccess(res, isProduct, "Product has been added to hero section.");
    } catch (e) {
        return handleError(res, e.message, 500);
    }
}

export const getHeroProducts = async (req, res) => {
    try {
        const products = await Product.find({ is_hero_section: true });
        return handleSuccess(res, products);
    } catch (e) {
        return handleError(res, e.message, 500);
    }
}

export const addBestDeals = async (req, res) => {
    try {
        const isProduct = await Product.findByIdAndUpdate(req.params.id, { best_deal: req.body.is_best_deals }, { new: true });
        if (!isProduct) {
            return handleError(res, "Product not found", 404);
        }
        return handleSuccess(res, isProduct, "Product has been added to best deals section.");
    } catch (e) {
        return handleError(res, e.message, 500);
    }
}

export const getBestDealsProduct = async (req, res) => {
    try {
        const products = await Product.find({ best_deal: true });
        return handleSuccess(res, products);
    } catch (e) {
        return handleError(res, e.message, 500);
    }
}

export const getProductByCategory = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    try {
        const products = await Product.find({ category: req.params.id }).skip((page - 1) * parseInt(limit)).limit(limit);
        const data = {
            products: products,
            page: parseInt(page),
            limit: parseInt(limit),
            total: await Product.find({ category: req.params.id }).countDocuments()
        }
        if (!products) {
            return handleError(res, "Product not found", 404);
        }
        return handleSuccess(res, data);
    } catch (e) {
        return handleError(res, e.message, 500);
    }
}