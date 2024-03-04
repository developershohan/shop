
import AddressCard from '../AddressCard/AddressCard'
import Cart from '../../pages/Cart/Cart'



const OrderSummery = () => {
  return (
    <div>
      
      <div className=" flex flex-col gap-5">
        <div className="shadow-sm border rounded-sm p-3">
      <AddressCard />
          
        </div>
        <div className="shadow-sm border rounded-sm ">

      <Cart />
        </div>

      </div>

    </div>
  )
}

export default OrderSummery