
import { RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import './App.css'
import router from './router/Router'


function App() {


  return (
    <>
      <RouterProvider router={router} />
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
    </>
  )
}

export default App
