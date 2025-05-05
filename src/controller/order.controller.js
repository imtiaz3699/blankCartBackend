import { Order } from "../models/order.model.js";


export const createOrder = async (req, res) => {
    try {
        const order = await Order.create(req.body);
        res.status(201).json({ success: true, message: "Order created", order });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

export const getAllOrders = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    try {
        const orders = await Order.find().skip((page - 1) * parseInt(limit)).limit(limit).populate("products.product").sort({ createdAt: -1 });
        res.status(200).json({ success: true, orders });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

export const getSingleOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate("products.product");
        if (!order) return res.status(404).json({ success: false, message: "Order not found" });
        res.status(200).json({ success: true, order });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

export const updateOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!order) return res.status(404).json({ success: false, message: "Order not found" });
        res.status(200).json({ success: true, message: "Order updated", order });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

export const deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        if (!order) return res.status(404).json({ success: false, message: "Order not found" });
        res.status(200).json({ success: true, message: "Order deleted" });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};