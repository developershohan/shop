import { Cart } from "../models/cart.model.js";
import  {cartItem}  from "../models/cartItem.model.js";
import { Product } from "../models/product.model.js";


// create cart
 const createCart = async (user)=>{
try {
    const cart = new Cart({user})

    const createdCart = await cart.save()
    return createdCart
    
} catch (error) {
    throw new Error(error.message);
}
}

// find user cart
 const findUserCart = async(userId)=>{
    try {
        let cart = await Cart.findOne({ user: userId })
        .populate({
            path: 'cartItem',
            populate: {
                path: 'product',
                model: 'products',  // Replace with the correct model name for Product
            },
        });

        if (!cart) {
            // If cart is null, create a new cart for the user
            cart = await createCart(userId);
        }

        if (!Array.isArray(cart.cartItem)) {
            throw new Error("Invalid cart data");
        }

        let totalPrice = 0
        let totalDiscountPrice = 0
        let totalItem = 0

        for (let cartItem of cart.cartItem) {
            
            totalPrice += cartItem.price
            totalDiscountPrice += cartItem.discountPrice
            totalItem+= cartItem.quantity
            
        }

        cart.totalPrice = totalPrice
        cart.totalDiscountPrice = totalPrice - totalDiscountPrice
        cart.totalItem = totalItem

        return cart

        
    } catch (error) {
        throw new Error(error.message);

    }
}

// add cart item
 const addCartItem = async (userId,req)=>{
     try {

        const cart = await Cart.findOne({user:userId})

        const product = await Product.findById(req.productId)

        const isPresent = await cartItem.findOne({cart: cart._id, product: product._id, userId})

        if (!isPresent) {
            const newCartItem = new cartItem({
                cart: cart._id,
                product: product._id,
                size: req.size,
                userId,
                quantity: 1,
                price: product.price,
                discountPrice: product.discountedPrice,
            })

            const createdCartItem = await newCartItem.save()
            cart.cartItem.push(createdCartItem)
            await cart.save()

            return "Item created successfully"
        }

        
    } catch (error) {
        throw new Error(error.message);

    }
}


export default {
    createCart,
    findUserCart,
    addCartItem
}