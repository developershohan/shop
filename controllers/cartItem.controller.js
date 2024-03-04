// import files

import cartItemService from "../services/cartItem.service.js";

// update Cart Item
const updateCartItem = async (req,res) => {
    const user = await req.user;
    try {

        const updateCartItem = await cartItemService.updateCartItem(user._id, req.params.id, req.body);
        return res.status(200).send(updateCartItem)
        
    } catch (error) {
        return res.status(500).send({
            error: error.message
        })
    }
}

// remove Cart Item
const removeCartItem = async (req,res) => {
    const user = await req.user;
    try {

       await cartItemService.removeCartItem(user._id, req.params.id);
        return res.status(200).send({message: "cart Item removed successfully"})
        
    } catch (error) {
        return res.status(500).send({
            error: error.message
        })
    }
}

export default{
    updateCartItem,
    removeCartItem
}