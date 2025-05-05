// controllers/cartController.js
import { Cart } from "../models/cart.model.js";
import { handleError } from "../utils/helpers.js";
export const addToCart = async (req, res) => {
    const { browserId, productId, quantity = 1 } = req.body;

    if (!browserId) {
        return handleError(res, "Browser ID is required", 400);
    }

    if (!Array.isArray(productId) || productId.length === 0) {
        return handleError(res, "productId must be a non-empty array", 400);
    }

    try {
        let cart = await Cart.findOne({ browserId });

        if (!cart) {
            cart = new Cart({ browserId, products: [] });
        }

        for (const pid of productId) {
            const existingProduct = cart.products.find(
                (item) => item.product.toString() === pid
            );

            if (existingProduct) {
                existingProduct.quantity += quantity;
            } else {
                cart.products.push({ product: pid, quantity });
            }
        }

        await cart.save();

        return res.status(200).json({ success: true, cart });
    } catch (e) {
        return handleError(res, e.message, 500);
    }
};


export const removeFromCart = async (req, res) => {
    const { browserId, productId } = req.body;

    if (!browserId || !Array.isArray(productId) || productId.length === 0) {
        return res.status(400).json({
            success: false,
            message: "browserId and an array of productId are required",
        });
    }

    try {
        const cart = await Cart.findOne({ browserId });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found",
            });
        }

        const initialLength = cart.products.length;

        // Remove products whose IDs are in the productId array
        cart.products = cart.products.filter(
            (p) => !productId.includes(p.product.toString())
        );

        if (cart.products.length === initialLength) {
            return res.status(404).json({
                success: false,
                message: "No matching product(s) found in cart",
            });
        }

        await cart.save();

        res.status(200).json({ success: true, cart });
    } catch (e) {
        res.status(500).json({ success: false, message: e.message });
    }
};


export const getCart = async (req, res) => {
    const { browserId, userId, page = 1, limit = 10 } = req.query;
    try {
        const cart = await Cart.findOne({ browserId }).populate('products.product')
            .skip((page - 1) * parseInt(limit)).limit(limit);
        if (!cart) return res.status(404).json({ success: false, message: 'Cart not found' });
        res.status(200).json({ success: true, cart });
    } catch (e) {
        res.status(500).json({ success: false, message: e.message });
    }
};