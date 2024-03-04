import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlenght: 50
    },
    parentCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "categories",
        // required: true
    },
    level: {
        type: Number,
        required: true
    }
})


export const Category = mongoose.model('categories', categorySchema)