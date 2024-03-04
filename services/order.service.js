import { populate } from "dotenv"
import { Address } from "../models/address.model.js"
import { Order } from "../models/order.model.js"
import { OrderItem } from "../models/orderItems.js"
import cartService from "./cart.service.js"


// create order service

const createOrder = async (user, shippingAddress) => {


        let address

        if (shippingAddress._id) {
            let existAddress = await Address.findById(shippingAddress._id)
            address = existAddress
        } else {

            address = new Address(shippingAddress)
            address.user = user
            await address.save()

            user.address.push(address)
            await user.save()

        }
  


        
        const cart = await cartService.findUserCart(user._id);
  
        // if (!cart || !Array.isArray(cart.cartItem)) {
        //     throw new Error("Invalid cart data");
        // }
        
        // if (!Array.isArray(cart.cartItems)) {
        //     throw new Error("cart.cartItems is not an array");
        // }
        const orderItems = []

        for (const item of cart.cartItem) {


            const orderItem = new OrderItem({
                product: item.product,
                size: item.size,
                quantity: item.quantity,
                price: item.price,
                discountedPrice: item.discountPrice,
                userId: user._id,
                address: address._id
            })

            const createOrderItem = await orderItem.save()
            orderItems.push(createOrderItem)
        }
        const createdOrder = new Order({
            user,
            orderItems,
            shippingAddress: address,
            totalPrice: cart.totalPrice,
            totalDiscountedPrice: cart.totalDiscountPrice,
            discount: cart.discount,
            orderStatus: "PENDING",
            totalItem: cart.totalItem
        })

        const saveOrder = await createdOrder.save()
        return saveOrder

}

// placeOrder for admin

const placeOrder = async (orderId) => {
    try {

        const order = await findOrderById(orderId)
        order.orderStatus = "PLACED"
        order.paymentDetails.status = "COMPLETED"
        return await order.save()

    } catch (error) {
        throw new Error(error.message);

    }

}

// confirmOrder for admin

const confirmOrder = async (orderId) => {
    try {

        const order = await findOrderById(orderId)

        order.orderStatus = "CONFIRMED"

        return await order.save()

    } catch (error) {
        throw new Error(error.message);

    }

}
// shipOrder for admin

const shipOrder = async (orderId) => {
    try {

        const order = await findOrderById(orderId)
        order.orderStatus = "SHIPPED"
        return await order.save()

    } catch (error) {
        throw new Error(error.message);

    }

}
// deliverOrder for admin

const deliverOrder = async (orderId) => {
    try {

        const order = await findOrderById(orderId)
        order.orderStatus = "DELIVERED"
        return await order.save()

    } catch (error) {
        throw new Error(error.message);

    }

}
// cancelOrder for admin

const cancelOrder = async (orderId) => {
    try {

        const order = await findOrderById(orderId)
        order.orderStatus = "CANCELED"
        return await order.save()

    } catch (error) {
        throw new Error(error.message);

    }

}

// find order by id
const findOrderById = async (orderId) => {
    try {

        const order = await Order.findById(orderId).populate("user").populate({ path: "orderItems", populate: { path: "product" } }).populate("shippingAddress")

    } catch (error) {
        throw new Error(error.message);

    }
}

// users order history

const findUserOrderHistory = async (userId) => {
    try {

        // const order = await Order.find({ user: userId,orderStatus:"PLACED" }).populate("user").populate({ path: "orderItems", populate: { path: "product" }}).populate("shippingAddress")
        const orders = await Order.find({ user: userId, orderStatus: "PLACED" }).populate({ path: "orderItems", populate: { path: "product" } }).lean()
        return orders

    } catch (error) {
        throw new Error(error.message);

    }
}

// get all order for admin

const getAllOrder = async () => {
    try {

        const orders = await Order.find().populate({ path: "orderItems", populate: { path: "product" } }).lean()
        // const orders = await Order.find().populate("user").populate({ path: "orderItems", populate: { path: "product" }}).populate("shippingAddress")
        return orders

    } catch (error) {
        throw new Error(error.message);

    }
}

// delete order for admin

const deleteOrder = async (orderId) => {
    try {

        const order = await findOrderById(orderId)
        await Order.findByIdAndDelete(order._id)
        return "Product deleted successfully"

    } catch (error) {
        throw new Error(error.message);

    }
}

export default {
    createOrder,
    placeOrder,
    confirmOrder,
    shipOrder,
    deliverOrder,
    cancelOrder,
    findOrderById,
    getAllOrder,
    deleteOrder,
    findUserOrderHistory
}