// src/Components/Product.jsx
import React, { useEffect } from "react";
import s1 from "../assets/picTwo.jpg";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProducts } from "@/store/productSlice";
import { useNavigate } from "react-router-dom";

const Product = () => {
    const apiUrl = import.meta.env.VITE_APP_API_URL;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userProducts,searchTerm,userProductsStatus } = useSelector((state) => state.product);
    console.log(userProducts);
    
    

    const filteredSearchTerm = userProducts.filter((product)=>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        dispatch(fetchUserProducts());
    }, [dispatch]);



    return (
        <>
            <div className=" bg-[#00171f] min-h-screen">
                <div className="container mx-auto max-w-7xl ">
                    <div className="flex flex-col py-8">
                      <div className="flex items-center justify-between mb-4 ">
                        <h1 className="text-3xl font-bold text-white">My Products</h1>
                        <button onClick={()=>navigate("/addproduct")} className="bg-[white] text-black px-4 py-2 font-bold cursor-pointer">Add Product</button>
                      </div>
                      <div className="w-full h-[1px]  bg-white"></div>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
                            {/* Ensure userProducts is an array before mapping */}
                            {filteredSearchTerm && filteredSearchTerm.length > 0 && filteredSearchTerm?.map((product) => (
                                <div
                                    key={product._id}
                                    className="overflow-hidden bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)]
                                    transform transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-[0_20px_35px_rgb(0,0,0,0.2)] cursor-pointer"
                                >
                                    {/* Image Container */}
                                    <div className="relative h-48">
                                        <img
                                            className="object-cover w-full h-full"
                                            src={
                                                product.productImage &&
                                                product.productImage.length > 0
                                                    ? `${apiUrl}${product.productImage[0]}`
                                                    : s1
                                            }
                                            alt={product.name || "Product Image"}
                                        />
                                    </div>

                                    {/* Content Container */}
                                    <div className="p-4 text-black bg-white">
                                        <div className="flex items-start justify-between">
                                            <h5 className="text-lg font-semibold">{product.name}</h5>
                                        </div>

                                        <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                                            {product.description}
                                        </p>

                                        <div className="mt-4 space-y-1">
                                            <p className="text-sm">
                                                <span className="font-semibold">Price:</span> $
                                                {product.price}
                                            </p>
                                            <p className="text-sm">
                                                <span className="font-semibold">InStock:</span>{" "}
                                                {product.inStock}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Product;