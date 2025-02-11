import express from 'express';
import { mongooseConnection } from './config/db.js';
import userRoutes from "./routers/user.route.js";
import authRoutes from "./routers/auth.route.js";
import adminOrderRouter from "./routers/adminOrder.route.js";
import adminProductRouter from "./routers/adminProduct.route.js";
import cartRouter from "./routers/cart.route.js";
import cartItemRouter from "./routers/cartItem.route.js";
import orderRouter from "./routers/order.route.js";
import productRouter from "./routers/product.route.js";
import ratingRouter from "./routers/rating.route.js";
import reviewRouter from "./routers/review.route.js";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import errorHandler from './middleware/errorHandler.js';
import cors from "cors";
import path from "path";

// initialization
const app = express();
dotenv.config();

// environment vars
const PORT = process.env.PORT || 9090;

// set middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// static folder
const __dirname = path.resolve();
console.log(`Static files path: ${path.join(__dirname, "./client/dist")}`);
app.use(express.static(path.join(__dirname, "./client/dist")));

app.get("*", (req, res) => {
    const indexPath = path.join(__dirname, 'client', 'dist', 'index.html');
    console.log(`Serving index.html from: ${indexPath}`);
    res.sendFile(indexPath, (err) => {
        if (err) {
            console.error(`Error serving index.html: ${err.message}`);
            res.status(500).send("Internal Server Error");
        }
    });
});

app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

// error handler
app.use(errorHandler);

// routes
app.use("/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin/orders", adminOrderRouter);
app.use("/api/admin/products", adminProductRouter);
app.use("/api/cart", cartRouter);
app.use("/api/cart_item", cartItemRouter);
app.use("/api/orders", orderRouter);
app.use("/api/products", productRouter);
app.use("/api/ratings", ratingRouter);
app.use("/api/review", reviewRouter);

app.listen(PORT, () => {
    mongooseConnection();
    console.log(`Server listening on ${PORT}`);
});
