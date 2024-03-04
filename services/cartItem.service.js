
import userService from "../services/user.service.js"
import { cartItem } from "../models/cartItem.model.js";

// update Cart Item
const updateCartItem = async (userId, cartItemId, cartItemData) => {

    try {

        const item = await findCartItemById(cartItemId)

        if (!item) {

            throw new Error("cart item not found: ", cartItemId);
        }
        const user = await userService.findUserById(item.userId)

        if (!user) {
            throw new Error("User not found: ", userId);

        }
console.log(item.product);
        if (user._id.toString() === userId.toString()) {
            item.quantity = cartItemData.quantity
            item.price = item.quantity * item.product.price
            // item.discountPrice = item.quantity * item.product.discountPrice
            const updatedCartItem = await item.save()
            return updatedCartItem
        }
        else {

            throw new Error(" You can't update this cart item");
        }

    } catch (error) {
        throw new Error(error.message);

    }

}

// remove cart item
const removeCartItem = async (userId, cartItemId) => {

    try {

        const item = await findCartItemById(cartItemId,userId)
        const user = await userService.findUserById(userId)

        if (!item) {

            throw new Error("cart item not found: ", cartItemId);
        }
        if (!user) {
            throw new Error("User not found: ", userId);

        }

        if (user._id.toString() === userId.toString()) {
  
            return  await cartItem.findByIdAndDelete(cartItemId)
             
        }
        else {

            throw new Error(" You can't update this cart item");
        }

    } catch (error) {
        throw new Error(error.message);

    }

}

// find cart by id

const findCartItemById = async (cartItemId) => {

    try {

        const cartItems = await cartItem.findById(cartItemId).populate('product')
        console.log(cartItems);
        // const cartItem = await findCartItemById(cartItemId)

        if (cartItems) {
            return cartItems
            
        } else {
            throw new Error("User not found: ", userId);
            
        }

    } catch (error) {
        throw new Error(error.message);

    }

}

export default { updateCartItem,removeCartItem,findCartItemById }