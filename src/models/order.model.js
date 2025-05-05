import mongoose from "mongoose";
const orderSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true },
  phone_number: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  note: { type: String },
  products: [
    {
        _id:false,
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        default: 1
      }
    }
  ]
}, { timestamps: true });
export const Order = mongoose.model("Order", orderSchema);