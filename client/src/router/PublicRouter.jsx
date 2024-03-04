
import Layout from '../component/Layout/Layout'
import Cart from '../customer/pages/Cart/Cart'
import CheckOut from '../customer/pages/CheckOut/CheckOut'
import Home from '../customer/pages/Home/Home'
import Product from '../customer/pages/Product/Product'
import SingleProduct from '../customer/pages/SingleProduct/SingleProduct'

const PublicRouter = [
    {
        element: <Layout/>,
        children: [
            {
                path: "/",
                element: <Home/>
            },
            {
                path: "/login",
                element: <Home/>
            },
            {
                path: "/register",
                element: <Home/>
            },
            {
                path: "/product",
                element: <Product/>
            },
            {
                path: "/product/:id",
                element: <SingleProduct/>
            },
            {
                path: "/cart",
                element: <Cart/>
            },
            {
                path: "/checkout",
                element: <CheckOut/>
            },
        ]
    }
]

export default PublicRouter