// import { getAllOrder,shipOrder,confirmOrder,deliverOrder,cancelOrder } from "../services/order.service,js"
import orderServices from "../services/order.service.js"


// get all orders
const getAllOrders = async (req, res) => {


    try {

        const orders = await orderServices.getAllOrder()
        return res.status(200).send(orders)

    } catch (error) {
        return res.status(500).send({
            error: error.message
        })
    }

}

// confirm orders
const confirmOrder = async (req, res) => {

    const orderId = req.params.orderId

    try {

        const orders = await orderServices.confirmOrder(orderId)
        return res.status(200).send(orders)

    } catch (error) {
        return res.status(500).send({
            error: error.message
        })
    }

}

// ship orders
const shipOrder = async (req, res) => {

    const orderId = req.params.orderId

    try {

        const orders = await orderService.shipOrder(orderId)
        return res.status(200).send(orders)

    } catch (error) {
        return res.status(500).send({
            error: error.message
        })
    }

}


// deliver orders
const deliverOrder = async (req, res) => {

    const orderId = req.params.orderId

    try {

        const orders = await orderService.deliverOrder(orderId)
        return res.status(200).send(orders)

    } catch (error) {
        return res.status(500).send({
            error: error.message
        })
    }

}

// cencel orders
const cancelOrder = async (req, res) => {

    const orderId = req.params.orderId

    try {

        const orders = await orderService.cancelOrder(orderId)
        return res.status(200).send(orders)

    } catch (error) {
        return res.status(500).send({
            error: error.message
        })
    }

}

// delete orders
const deleteOrder = async (req, res) => {

    const orderId = req.params.orderId

    try {

        const orders = await orderService.deleteOrder(orderId)
        return res.status(200).send(orders)

    } catch (error) {
        return res.status(500).send({
            error: error.message
        })
    }

}

export {
    getAllOrders,
    confirmOrder,
    shipOrder,
    deliverOrder,
    cancelOrder,
    deleteOrder
}