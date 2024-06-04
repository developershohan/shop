import { children } from "react";
import Layout from "../component/Layout/Layout";
import LoginForm from "../customer/Auth/LoginForm";
import RegisterForm from "../customer/Auth/RegisterForm";
import Cart from "../customer/pages/Cart/Cart";
import CheckOut from "../customer/pages/CheckOut/CheckOut";
import Home from "../customer/pages/Home/Home";
import Product from "../customer/pages/Product/Product";
import SingleProduct from "../customer/pages/SingleProduct/SingleProduct";
import PublicGard from "./PublicGard";

const PublicRouter = [
  {
    element: <PublicGard />,
    children: [
      {
        element: <Layout />,
        children: [
          {
            path: "/",
            element: <Home />,
          },
          {
            path: "/login",
            element: <LoginForm />,
          },
          {
            path: "/register",
            element: <RegisterForm />,
          },
          {
            path: "/product",
            element: <Product />,
          },
          {
            path: "/product/:id",
            element: <SingleProduct />,
          },
          {
            path: "/:lavelOne/:lavelTwo/:lavelThree",
            element: <Product />,
          },
          {
            path: "/cart",
            element: <Cart />,
          },
          {
            path: "/checkout",
            element: <CheckOut />,
          },
        ],
      },
    ],
  },
];

export default PublicRouter;
