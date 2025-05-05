import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  browserId: {
    type: String,
    required: true,
    index: true,
  },
  user_id:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:false,
  },
  products: [
    
    {
      _id: false,
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      quantity: {
        type: Number,
        default: 1,
        min: 1,
      },
    },
  ],
}, {
  timestamps: true,
});

export const Cart = mongoose.model('Cart', cartSchema);
