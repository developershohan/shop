import { useNavigate } from "react-router-dom"
import CartItem from "../../components/CartItem/CartItem"
import Button from '@mui/material/Button'




const Cart = () => {

  const navigate = useNavigate()
  return (
    <div className=" lg:grid grid-cols-3 lg:px-16">
      <div className=" col-span-2">

        <CartItem />
        <CartItem />
        <CartItem />
      </div>
      <div className=" px-5 sticky top-0 h-[100vh] mt-5">
        <div className=" border p-5">
          <p className=" pb-3"> Price Details</p>
          <hr />
          <div className=" space-y-3 font-semibold">
            <div className=" flex justify-between pt-3">
              <span> Price</span>
              <span> $123</span>
            </div>
            <div className=" flex justify-between pt-3">
              <span> Discount</span>
              <span> $123</span>
            </div>
            <div className=" flex justify-between pt-3">
              <span> Deliver Charge</span>
              <span> Free</span>
            </div>
            <div className=" flex justify-between pt-3 font-bold">
              <span> Total Price</span>
              <span> $123</span>
            </div>
          </div>
          <Button onClick={()=> navigate("/checkout")} className=" w-full" variant="contained" sx={{bgcolor: "#9155fd", my:"1rem", py:".5 rem"}}>
            Check out
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Cart