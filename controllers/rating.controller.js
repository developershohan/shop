import ratingService from "../services/rating.service.js";


// create Rating
const createRating = async(req, res) => {
    const user = req.user
    try {
        const rating = await ratingService.createRating(req.body, user)
        return res.status(201).send(rating)
    } catch (error) {
        return res.status(500).send({
            error: error.message
        })
    }
}

// get All Ratings
const getAllRatings = async(req, res) => {
    const productId = req.params.id
    const user = req.user
    try {
        const ratings = await ratingService.getAllRatings(productId)
        return res.status(201).send(ratings)
    } catch (error) {
        return res.status(500).send({
            error: error.message
        })
    }
}

export {
    createRating,
    getAllRatings
}