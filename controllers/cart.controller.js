
import cartService from "../services/cart.service.js"


// find user cart 
const findUserCart = async (req,res) =>{
    const user= await req.user


    try {

        const cart = await cartService.findUserCart(user._id)
        return res.status(200).send(cart)
        
    } catch (error) {
        return res.status(500).send({
            error: error.message
        })
    }

}

// add Item to cart
const addItemToCart = async (req,res) =>{
    const user= await req.user


    try {

        const cartItem = await cartService.addCartItem(user._id, req.body)
        return res.status(200).send(cartItem)
        
    } catch (error) {
        return res.status(500).send({
            error: error.message
        })
    }

}

export default {
    findUserCart,
    addItemToCart
}