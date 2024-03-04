import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    orderItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "orderItems"
    }],
    orderDate: {
        type: Date,
        default: Date.now()
    },
    delivery: {
        type: Date,
    },
    shippingAddress: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "addresses"
    },
    paymentDetails: {

        paymentMethod: {
            type: String
        },
        transitionId: {
            type: String
        },
        paymentId: {
            type: String
        },
        paymentStatus: {
            type: String,
            default: "PENDING"
        },

    },
    totalPrice:{
        type: Number,
        required: true
    },
    totalDiscountedPrice:{
        type: Number,
        required: true
    },
    discount:{
        type: Number,
        required: true
    },
    orderStatus:{
        type: String,
        required: true,
        default: "PENDING"
    },
    totalItem:{
        type: Number,
        required: true
    }
},{
    timestamps: true
})


export const Order = mongoose.model('orders', orderSchema)