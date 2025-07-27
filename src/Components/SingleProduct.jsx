
import { fetchSingleProduct } from '@/store/productSlice';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom'; 
import s1 from '../assets/picTwo.jpg';
import toast from 'react-hot-toast';
import { addToCart } from '@/store/cartSlice';

const SingleProduct = () => {
  const apiUrl = import.meta.env.VITE_APP_API_URL;
  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate
  const { selectedProductDetails } = useSelector((state) => state.product);
  const { items } = useSelector((state) => state.cart); // Access cart items

  // Determine the product object to display
  const product = Array.isArray(selectedProductDetails)
    ? selectedProductDetails[0]
    : selectedProductDetails;

  useEffect(() => {
    dispatch(fetchSingleProduct(productId));
  }, [dispatch, productId]);

  const { data: user } = useSelector((state) => state.auth);

  const handleAddToCart = () => {
    try {
       if (
               user?.length == 0 &&
               (localStorage.getItem("token") == "" ||
                localStorage.getItem("token") == null ||
                localStorage.getItem("token") == undefined)

      ) {

      return navigate("/login");

    }

      // Check if the product is already in the cart
      const isItemInCart = items?.some(item => item.product?._id === productId);

      if (isItemInCart) {
        toast.error('Item is already in cart');
        return;
      }

      // Add to cart if not already present
      dispatch(addToCart(productId));
      toast.success('Product added to cart successfully');
    } catch (error) {
      console.error(error);
      toast.error('Failed to add product to cart');
    }
  };

  return (
    <div>
      <section className="text-gray-700 body-font overflow-hidden bg-white">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              alt="ecommerce"
              className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
              src={product?.productImage && product.productImage.length > 0 ? `${apiUrl}${product.productImage[0]}` : s1}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="title-font text-gray-500 tracking-widest text-gray-900 text-3xl title-font font-medium">
                {product?.name}
              </h2>
              <p className="leading-relaxed">{product?.description}</p>
              <p className="leading-relaxed">
                <span className="text-gray-500">Stock Remaining:</span>{' '}
                {product?.inStock}
              </p>
              <div className="w-full border-b-1 border-gray-300 my-6"></div>
              <div className="flex">
                <span className="title-font font-medium text-2xl text-gray-900">
                  NPR: {product?.price}
                </span>
                {product?.inStock > 0 ? (
                  <button
                    onClick={handleAddToCart}
                    className="cursor-pointer flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded"
                  >
                    Add To Cart
                  </button>
                ) : (
                  <button
                    onClick={handleAddToCart}
                    disabled
                    className="cursor-not-allowed flex ml-auto text-white bg-red-400 border-0 py-2 px-6 focus:outline-none rounded opacity-70 hover:bg-red-700"
                  >
                    Out of Stock
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SingleProduct;