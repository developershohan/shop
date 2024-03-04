import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema({
    rating: {
        type: Number,
        required: true
    },
    comment: {
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


export const Rating = mongoose.model('ratings', ratingSchema)