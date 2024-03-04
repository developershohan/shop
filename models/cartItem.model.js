import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({

    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "carts",
        // required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
        // required: true
    },
    size: {
        type: String,
        // required: true
    },
    quantity: {
        type: Number,
        // required: true,
        default: 1
    },
    price: {
        type: Number,
        // required: true,
        default: 0
    },
    discountPrice: {
        type: Number,
        // required: true,

    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        // required: true
    }

})

export const cartItem = mongoose.model('cartItems', cartItemSchema)