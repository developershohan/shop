
import Navbar from '../../customer/components/Navbar/Navbar'
import { Outlet } from 'react-router-dom'
const Layout = () => {
  return (
    <div>
        
        <Navbar/>
        <Outlet/>

    </div>
  )
}

export default Layout