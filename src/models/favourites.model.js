import mongoose from "mongoose";

const favouritesSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    products: [
        {
            _id: false,
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true,
            },
        },
    ],
}, { timestamps: true });

export const Favourites = mongoose.model("Favourites", favouritesSchema);