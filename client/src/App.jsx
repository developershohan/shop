
import { BrowserRouter,Routes , Route, RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import './App.css'
// import router from './router/Router'
import Navbar from './customer/components/Navbar/Navbar';
import LoggedOutRedirect from './middlewares/LoggedOutRedirect';
import LoggedInRedirect from './middlewares/LoggedInRedirect';
import Home from './customer/pages/Home/Home';
import Product from './customer/pages/Product/Product';
import Profile from './customer/pages/Profile/Profile';


function App() {


  return (
    <>
      {/* <RouterProvider router={router} /> */}
      <ToastContainer
position="top-center"
autoClose={2000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
draggable
theme="light"
/>


<BrowserRouter>
      <Navbar/>
        <Routes>
        <Route path='/' element={ <Home />} /><Route path='/product' element={<Product />} />
          <Route element={<LoggedOutRedirect />}  >
            <Route path='/login'  />
            <Route path='/register'  />
          </Route>
          <Route element={<LoggedInRedirect />} >
            <Route path='/account' element={<Profile />} />
          </Route>

        </Routes>
      </BrowserRouter>




    </>
  )
}

export default App
