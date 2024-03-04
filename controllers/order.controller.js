import orderService from "../services/order.service.js";

// createOrder
const createOrder = async (req, res) => {
    const user = await req.user

    try {
        let createOrder = await orderService.createOrder(user, req.body)
        return res.status(201).send(createOrder)
    } catch (error) {
        return res.status(500).send({
            error: error.message
        })
    }
}


// findOrderById
const findOrderById = async (req, res) => {
    const user = await req.user

    try {
        let findOrderById = await orderService.findOrderById(req.params.id)
        return res.status(201).send(findOrderById)
    } catch (error) {
        throw new Error(error.message)
    }
}
// OrderHistory
const OrderHistory = async (req, res) => {
    const user = req.user

    try {
        let orderHistory = await orderService.findUserOrderHistory(user._id)
        return res.status(201).send(orderHistory)
    } catch (error) {
        return res.status(500).send({
            error: error.message
        })
    }
}

export {
    createOrder,
    findOrderById,
    OrderHistory
}