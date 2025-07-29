
import React, { useEffect, useState } from "react"; // Import useState
import s1 from "../assets/picTwo.jpg";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, fetchUserProducts } from "@/store/productSlice";
import { useNavigate } from "react-router-dom";
import { GoTrash } from "react-icons/go";
import { FiEdit } from "react-icons/fi";
import { STATUSES } from "@/globals/misc/statuses";
import toast from "react-hot-toast";
import { fetchCartItems } from "@/store/cartSlice";
import EditProductModal from "./EditProductModal";

const UserProduct = () => {
    const apiUrl = import.meta.env.VITE_APP_API_URL;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { userProducts, searchTerm, userProductsStatus } = useSelector((state) => state.product);

    // State for managing the edit modal
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [productToEdit, setProductToEdit] = useState(null);

    const filteredSearchTerm = userProducts.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

      useEffect(() => {
    dispatch(fetchUserProducts());
  }, [dispatch]); 

    const handleDelete = async (productId) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                // Ensure to await the dispatch action
                await dispatch(deleteProduct(productId))
                await dispatch(fetchCartItems()); 
                toast.success("Product deleted successfully!");
            } catch (error) {
                // Check if the error has a response from the server
                toast.error(error.response?.data?.error || "Failed to delete product");
            }
        }
    };

    const handleEdit = (product) => {
        setProductToEdit(product);
        setIsEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
        setProductToEdit(null); // Clear the product being edited
    };



    return (
        <>
            <div className="bg-[#00171f] min-h-screen">
                <div className="container mx-auto max-w-7xl ">
                    <div className="flex flex-col py-8">
                        <div className="flex items-center justify-between mb-4 ">
                            <h1 className="text-3xl font-bold text-white">My Products</h1>
                            <button onClick={() => navigate("/addproduct")} className="bg-[white] text-black px-4 py-2 font-bold cursor-pointer">Add Product</button>
                        </div>
                        <div className="w-full h-[1px] bg-white"></div>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
                            {/* Ensure filteredSearchTerm is an array before mapping */}
                            {filteredSearchTerm && filteredSearchTerm.length > 0 ? (
                                filteredSearchTerm.map((product) => (
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

                                            <p className="mt-2 text-sm text-gray-600 ">
                                                {product.description}
                                            </p>

                                            <div className="mt-4 space-y-1">
                                                <p className="text-sm">
                                                    <span className="font-semibold">Price:</span> ${product.price}
                                                </p>
                                                <div className="flex items-center justify-between">
                                                    <p className="text-sm">
                                                        <span className="font-semibold">InStock:</span>{" "}
                                                        {product.inStock}
                                                    </p>
                                                    <div className="flex gap-4 items-center">
                                                        <GoTrash
                                                            className="text-red-600 hover:text-red-800 cursor-pointer"
                                                            size={20}
                                                            onClick={() => handleDelete(product._id)}
                                                            title="Delete Product"
                                                        />
                                                        <FiEdit
                                                            className="text-blue-600 hover:text-blue-800 cursor-pointer"
                                                            size={20}
                                                            onClick={() => handleEdit(product)} // Pass the whole product object
                                                            title="Edit Product"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-white text-lg col-span-full text-center">No products found.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit Product Modal */}
            <EditProductModal
                isOpen={isEditModalOpen}
                onClose={handleCloseEditModal}
                productToEdit={productToEdit}
            />
        </>
    );
};

export default UserProduct;











