import { Review } from "../models/review.model.js";
import productService from "./product.service.js";

// create review

const createReview = async (reqData, user) => {
    try {
        const product = await productService.findProductById(reqData.productId)
        const review = new Review({
            review: reqData.review,
            user: user._id,
            product: reqData.product
        })
        await product.save()
        return await review.save()

    } catch (error) {
        throw new Error(error.message);

    }
}

// getAllReviews
const getAllReviews = async (productId) => {

    try {
        const product = await productService.findProductById(productId)
        const reviews = await Review.find({ product: product._id }).populate("user")
        return reviews
    } catch (error) {
        throw new Error(error.message)}
}

export default {
    createReview,
    getAllReviews
}