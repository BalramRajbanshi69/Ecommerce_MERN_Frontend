// src/Components/EditProductModal.jsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { STATUSES } from "@/globals/misc/statuses"; // Adjust path as needed
import toast from "react-hot-toast";
import { updateProduct } from "@/store/productSlice";

const EditProductModal = ({ isOpen, onClose, productToEdit }) => {
  const apiUrl = import.meta.env.VITE_APP_API_URL;
  const dispatch = useDispatch();
  const { updateProductStatus } = useSelector((state) => state.product);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [inStock, setInStock] = useState("");
  const [newProductImage, setNewProductImage] = useState(null);

  useEffect(() => {
    if (isOpen && productToEdit) {
      setName(productToEdit.name || "");
      setPrice(productToEdit.price || "");
      setDescription(productToEdit.description || "");
      setInStock(productToEdit.inStock || "");
      setNewProductImage(null);
    }
  }, [isOpen, productToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!name || !price || !description || inStock === "") {
      toast.error(
        "Please fill in all required fields (Name, Price, Description, In Stock)"
      );
      return;
    }

    const stockValue = Number(inStock);
    if (isNaN(stockValue) || stockValue < 0) {
      toast.error("In Stock must be a non-negative number.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("inStock", stockValue);
    if (newProductImage) {
      formData.append("productImage", newProductImage);
    }

    try {
      await dispatch(
        updateProduct({ id: productToEdit._id, productData: formData }))
      toast.success("Product updated successfully!");
      onClose(); // Close the modal
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error(error.message || "Failed to update product.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-transparent backdrop-blur-[2px]  flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-2xl cursor-pointer"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4 text-black">Edit Product</h2>
        <form onSubmit={handleSubmit} className="space-y-2">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name:
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-black"
              required
            />
          </div>
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Price:
            </label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-black"
              required
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description:
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="3"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-black"
              required
            ></textarea>
          </div>
          <div>
            <label
              htmlFor="inStock"
              className="block text-sm font-medium text-gray-700"
            >
              In Stock Quantity:
            </label>
            <input
              type="number"
              id="inStock"
              value={inStock}
              onChange={(e) => setInStock(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-black"
              required
              min="0" // Ensure non-negative stock
            />
          </div>
          <div>
            <label
              htmlFor="productImage"
              className="block text-sm font-medium text-gray-700"
            >
              Product Image:
            </label>
            {productToEdit?.productImage && productToEdit.productImage[0] && (
              <div className="mt-2 mb-2">
                <p className="text-xs text-gray-500">Current Image:</p>
                <img
                  src={`${productToEdit.productImage[0]}?t=${new Date().getTime()}`}
                  alt="Current Product"
                  className="w-20 h-20 object-cover rounded"
                />
              </div>
            )}
            <input
              type="file"
              id="productImage"
              onChange={(e) => setNewProductImage(e.target.files[0])}
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>
          <button
            type="submit"
            className="w-full cursor-pointer bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
            disabled={updateProductStatus === STATUSES.LOADING}
          >
            {updateProductStatus === STATUSES.LOADING
              ? "Updating..."
              : "Update Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProductModal;
