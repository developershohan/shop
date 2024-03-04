import IconButton from '@mui/material/IconButton'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
const CartItem = () => {
  return (
    <div className=" p-5 my-5 shadow-sm border rounded-sm">
      
      <div className=" flex items-center">
        <div className=" w-[5rem] h-[5rem] lg:w-[9rem] lg:h-[9rem] shadow-sm border rounded-sm p-2 pb-0">

          <img className=" h-full w-full object-cover object-top rounded-sm" src="https://rukminim1.flixcart.com/image/612/612/l4zxn680/kurta/i/g/u/s-mtml0039-341-manthan-original-imagfrz3gwgdtczm.jpeg?q=70" alt="" />
        </div>
        <div className=" ml-5 space-y-1">
          <p className=" font-semibold">category</p>
          <p className=" opacity-70">Size: L, White</p>
          <p className=" opacity-70 mt-2">Seller: Name</p>
          <div className=" flex gap-3">
          <p className=" font-semibold">{`$${123}`}</p>
            <p className=" opacity-50 line-through ">{`$${1234}`}</p>
            <p className=" text-green-900 font-semibold">{`${12}%`}</p>
          </div>
        </div>

      </div>
      <div className=" mt-3">
          <IconButton>
            <RemoveCircleOutlineIcon/>
          </IconButton>
          <span className='p-2 px-8 border'>2</span>
          <IconButton  sx={{color: "green"}} >
            <AddCircleOutlineIcon />
          </IconButton>
          <button className=' px-3 text-red-700 font-semibold' >
            Remove
          </button>
        </div>
    </div>
  )
}

export default CartItem