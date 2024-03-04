import express from 'express'
import { mongooseConnection } from './config/db.js'
import userRoutes from "./routers/user.route.js";
import authRoutes from "./routers/auth.route.js"
import adminOrderRouter from "./routers/adminOrder.route.js"
import adminProductRouter from "./routers/adminProduct.route.js"
import cartRouter from "./routers/cart.route.js"
import cartItemRouter from "./routers/cartItem.route.js"
import orderRouter from "./routers/order.route.js"
import productRouter from "./routers/product.route.js"
import ratingRouter from "./routers/rating.route.js"
import reviewRouter from "./routers/review.route.js"
import dotenv from "dotenv"
import cookieParser from 'cookie-parser';
import errorHandler from './middleware/errorHandler.js';

// initialization
const app = express()
dotenv.config();

// environment vars
const PORT = process.env.PORT || 9090;

// set middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// static folder
app.use(express.static("public"));
app.use(cookieParser())


// error handler
app.use(errorHandler);

app.use("/auth", authRoutes)
app.use("/api/users",userRoutes)
app.use("/api/admin/orders",adminOrderRouter)
app.use("/api/admin/products",adminProductRouter)
app.use("/api/cart",cartRouter)
app.use("/api/cart_item",cartItemRouter)
app.use("/api/orders",orderRouter)
app.use("/api/products",productRouter)
app.use("/api/ratings",ratingRouter)
app.use("/api/review",reviewRouter)
app.listen(PORT, ()=>{
     mongooseConnection()
    console.log(`server listening on ${PORT}`)
})