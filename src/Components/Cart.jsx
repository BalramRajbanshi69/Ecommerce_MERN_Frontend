import { deleteCartItem, updateCartItem } from '@/store/cartSlice';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate} from "react-router-dom"

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const {items:products} = useSelector((state)=>state.cart);        // items from cartSlice initialState name and since we are mapping with products, so items:products ,we have store value to products(note-> if directly {items} , then use items.map((...)))
  // console.log(products);

  // totalitems & totalAmount
  const totalItems = products?.reduce((sum,item)=>item.quantity + sum,0)
  const totalAmount = products?.reduce((amount,item)=>item.quantity * item.product?.price + amount,0);


  // increase / decrease quantity
  const handleQuantityChange= (productId,newQuantity)=>{        // taking productId and newQuantity for change 
    dispatch(updateCartItem(productId,newQuantity))
  }
  
  // handle delete item from the cart
  const handleDelete = (productId)=>{
      dispatch(deleteCartItem(productId))
      toast.success("Item removed from cart")
  }

  return (
    <div>
        <div className="min-h-screen  bg-gray-100 pt-20">
    <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
    <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0 my-8">
      <div className=" md:w-2/3">
        {
          products.map((product)=>{
            return(
              <div key={product?.product?._id} className="justify-between mb-6  bg-white p-6 shadow-md sm:flex sm:justify-start">
          {/* <img src={product.product.productImage ? product.product.productImage : "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"} alt="product-image" className="w-full rounded-lg sm:w-40" /> */}
          {/* OR directly */}
          <img src={product?.product?.productImage} className="w-full sm:w-40"/>
          <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
            <div className="mt-5 sm:mt-0">
              <h2 className="text-lg font-bold text-gray-900">{product?.product?.name}</h2>
              <h2 className="text-lg font-regular text-gray-900">{product?.product?.description}</h2>
              <p className="mt-1 text-xs text-gray-700"><span className='font-bold'>Rs:</span> {product?.product?.price}</p>
            </div>
            
            <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
              <div className="flex items-center border-gray-100">
                {/* here in - and + make a quantity handle change , taking product._id , on which product id you wanted to increase & decrease  and on every click set to increase or decrease by 1 only */}
                <span onClick={()=>handleQuantityChange(product.product._id, product.quantity - 1)} className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"> - </span>
                <input onChange={(e)=>handleQuantityChange(product.product._id , e.target.value)} className="h-8 w-8 border bg-white text-center text-xs outline-none" type="number" value={product.quantity} min="1" />
                <span onClick={()=>handleQuantityChange(product.product._id, product.quantity + 1)} className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"> + </span>
              </div>
              <div onClick={()=>handleDelete(product.product?._id)} className="flex items-center justify-center space-x-4">
                <svg   xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>
          </div>
        </div>
            )
          })
        }
        
      </div>
      {/* <!-- Sub total --> */}
      <div className="mt-6 h-full  border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
        <div className="mb-2 flex justify-between">
          <p className="text-gray-700">Total Items</p>
          <p className="text-gray-700">{totalItems}</p>
        </div>
        <hr className="my-4" />
        <div className="flex justify-between">
          <p className="text-lg font-bold">Total Price</p>
          <div className="">
            <p className="mb-1 text-lg font-bold">{totalAmount}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
    </div>
  )
}

export default Cart