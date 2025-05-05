import { Favourites } from "../models/favourites.model.js";
import { handleError } from "../utils/helpers.js";
export const addToFavourites = async (req, res) => {
    const { userId, productId } = req.body;
    if (!userId || !productId) {
        return res.status(400).json({ success: false, message: "userId and productId are required" });
    }
    try {
        let fav = await Favourites.findOne({ user_id: userId });
        if (!fav) {
            fav = new Favourites({ user_id: userId, products: [] });
        }
        const alreadyExists = fav.products.some(p => p.product.toString() === productId);
        if (alreadyExists) {
            return res.status(409).json({ success: false, message: "Product already in favourites" });
        }
        fav.products.push({ product: productId });
        await fav.save();
        res.status(200).json({ success: true, favourites: fav });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

export const removeFromFavourites = async (req, res) => {
    const { userId, productId } = req.body;
    if (!userId || !productId) {
        return res.status(400).json({ success: false, message: "userId and productId are required" });
    }
    try {
        const fav = await Favourites.findOne({ user_id: userId });
        if (!fav) {
            return res.status(404).json({ success: false, message: "Favourites not found" });
        }
        fav.products = fav.products.filter(p => p.product.toString() !== productId);
        await fav.save();
        res.status(200).json({ success: true, favourites: fav });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};


export const getUserFavourites = async (req, res) => {
    const { userId } = req.params;

    try {
        const fav = await Favourites.findOne({ user_id: userId }).populate("products.product");
        if (!fav) {
            return res.status(200).json({ success: true, favourites: [] }); // return empty if not found
        }
        res.status(200).json({ success: true, favourites: fav.products });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

export const clearFavourites = async (req, res) => {
    const { userId } = req.params;
    try {
        const fav = await Favourites.findOne({ user_id: userId });
        if (!fav) {
            return res.status(404).json({ success: false, message: "Favourites not found" });
        }
        fav.products = [];
        await fav.save();
        res.status(200).json({ success: true, message: "Favourites cleared", favourites: fav });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
