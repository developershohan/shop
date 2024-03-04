import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    review: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
        required: true
    }
},{
    timestamps: true
})


export const Review = mongoose.model('reviews', reviewSchema)