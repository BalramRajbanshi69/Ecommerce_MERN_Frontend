import React, { useContext, useEffect } from "react";
import ProductContext from "../Context/ProductContext";
import p2 from "../assets/picTwo.jpg";
import { MdDelete } from "react-icons/md";
import { IoReturnUpBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const CartList = () => {
  const {
    state:{cart},
    dispatch,
    products
  } = useContext(ProductContext);

  const navigate = useNavigate();

   // Filter out deleted products
  const validCartItems = cart.filter(item => 
    products?.some(p => p._id === item._id)
  );


  

  if (cart.length === 0) {
    return (
      <div className="container px-4 py-8 mx-auto">
        <div className="p-4 text-red-700 bg-red-100 border-l-4 border-red-500 rounded shadow-md">
          <div className="flex items-center">
            <svg
              className="w-6 h-6 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            <strong className="font-medium">Cart Empty!</strong>
            <span className="ml-2">Select items to add to your cart.</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container px-4 py-8 mx-auto">
      <h2 className="mb-6 text-2xl font-bold text-center underline underline-offset-4">
        Product Cart
      </h2>
      <div className="m-3 cursor-pointer ">
        <IoReturnUpBackOutline size={40} onClick={() => navigate(-1)} />
      </div>
      <div className="overflow-hidden bg-white rounded-lg shadow-2xl">
        <ul className="divide-y divide-gray-300">
          {validCartItems.map((item) => (
            <li
              key={item.id}
              className="p-8 transition-colors hover:bg-gray-50"
            >
              <div className="flex items-start space-x-6">
                <div className="w-full overflow-hidden rounded-lg md:w-48 h-35">
                  <img
                    src={
                      item.image?.length > 0
                        ? `http://localhost:5000/uploads/${item.image[0]}`
                        : p2
                    }
                    alt={item.name || "Product"}
                    className="object-cover object-center w-full h-full transition-transform duration-300 transform hover:scale-105"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="text-lg font-medium text-gray-900">
                      {item.name}
                    </h3>
                    <p className="text-lg font-medium text-gray-900">
                      ${item.price * item.quantity}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-4">
                      <label className="text-sm text-gray-600">Quantity:</label>
                      <select
                        value={item.quantity}
                        onChange={(e) =>
                          dispatch({
                            type: "UPDATE_ITEM",
                            payload: {
                              _id: item._id,
                              quantity: e.target.value,
                              
                            },
                          })
                        }
                        className="border-gray-300 rounded-md shadow-sm form-select focus:border-indigo-500 focus:ring-indigo-500"
                      >
                        {[...Array(item.inStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                    <button
                      onClick={() =>{
                        dispatch({
                          type: "REMOVE_FROM_CART",
                          payload: item,
                        });
                        toast.success(`${item.name} removed from cart`)

                      }}
                      className="p-2 transition-all duration-300 ease-in-out rounded-md cursor-pointer hover:bg-transparent hover:scale-110 group"
                    >
                      <MdDelete
                        size={30}
                        className="text-red-950 group-hover:text-red-600"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>



                <div className="p-8 mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-t-2 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold mb-6 text-gray-800 text-center">
            <span className="border-b-4 border-blue-500 pb-1">Cart Summary</span>
          </h3>
          
          <div className="space-y-6">
            {/* Selected Items */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex flex-wrap gap-2 items-center">
                <span className="font-semibold text-gray-700 min-w-[120px]">
                  Selected Items:
                </span>
                <div className="flex flex-wrap gap-2">
                  {cart.map((item, index) => (
                    <span 
                      key={item._id} 
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    >
                      {item.name}
                      {index !== cart.length - 1 ? "" : ""}
                    </span>
                  ))}
                </div>
              </div>
            </div>
        
            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Total Products */}
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex flex-col items-center">
                  <span className="text-gray-500 text-sm">Total Products</span>
                  <span className="text-2xl font-bold text-gray-800 mt-1">
                    {cart.length}
                  </span>
                </div>
              </div>
        
              {/* Total Quantity */}
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex flex-col items-center">
                  <span className="text-gray-500 text-sm">Total Quantity</span>
                  <span className="text-2xl font-bold text-gray-800 mt-1">
                    {cart.reduce((total, item) => total + Number(item.quantity), 0)}
                  </span>
                </div>
              </div>
        
              {/* Total Price */}
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4 rounded-lg shadow-sm">
                <div className="flex flex-col items-center">
                  <span className="text-white text-sm">Total Price</span>
                  <span className="text-2xl font-bold text-white mt-1">
                    ${cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
        
            {/* Checkout Button */}
            <div className="mt-6 text-center">
              <button onClick={() => navigate(-1)} className="cursor-pointer px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg shadow-lg hover:from-blue-700 hover:to-indigo-800 transform hover:scale-105 transition-all duration-200">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>


      </div>
    </div>
  );
};

export default CartList;













