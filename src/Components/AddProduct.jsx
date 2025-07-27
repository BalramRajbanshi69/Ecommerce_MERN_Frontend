import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FaCloudUploadAlt } from "react-icons/fa";
import { addProduct, fetchUserProducts } from "@/store/productSlice";
import { useDispatch } from "react-redux";

const AddProduct = () => {
  const apiUrl = import.meta.env.VITE_REACT_API_URL;
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    inStock: "",
    productImage: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});


    useEffect(() => {
    dispatch(fetchUserProducts());
  }, [dispatch]);


  const validateForm = () => {
    const newErrors = {};

    if (!product.name) {
      newErrors.name = "Product name is required";
    } else if (product.name.length < 3) {
      newErrors.name = "Product name must be at least 3 characters long";
    } else if (!/^[A-Z]/.test(product.name)) {
      newErrors.name = "Product name must start with a capital letter";
    }

    if (!product.description) {
      newErrors.description = "Description is required";
    } else if (product.description.length < 5) {
      newErrors.description = "Description must be at least 5 characters long";
    }

    if (!product.price) {
      newErrors.price = "Price is required";
    } else if (Number(product.price) <= 0) {
      newErrors.price = "Price must be greater than 0";
    }

    if (!product.inStock) {
      newErrors.inStock = "Stock quantity is required";
    } else if (Number(product.inStock) <= 0) {
      newErrors.inStock = "Stock quantity must be greater than 0";
    }

    if (!product.productImage) {
      newErrors.productImage = "Product image is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!localStorage.getItem("token")) {
      navigate("/login");
      toast.error("Please login to add products");
      return;
    }

    const touchAll = {};
    Object.keys(product).forEach((key) => {
      touchAll[key] = true;
    });
    setTouched(touchAll);

    if (!validateForm()) {
      toast.error("Please fix the errors before submitting");
      return;
    }

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("inStock", product.inStock);
    if (product.productImage) {
      formData.append("productImage", product.productImage);
    }

    try {
       dispatch(addProduct(formData)); 
      toast.success("Product added successfully!");

      setProduct({
        name: "",
        description: "",
        price: "",
        inStock: "",
        productImage: "",
      });
      setErrors({});
      setTouched({});

      setTimeout(() => {
        navigate("/userProduct");
      }, 1000);  
          
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add product");
      console.error(error);
    }
  };

  const handleBlur = (e) => {
    setTouched({ ...touched, [e.target.name]: true });
  };

  const handleChange = (e) => {
    const { name, type, value, files } = e.target;

    if (type === "file") {
      setProduct({
        ...product,
        [name]: files[0],
      });
    } else {
      setProduct({
        ...product,
        [name]: value,
      });
    }

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="max-w-3xl p-8 mx-auto mt-12 bg-white rounded-2xl shadow-2xl">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800">Add New Product</h2>
          <div className="h-1 mx-auto mt-2 bg-blue-600 w-28"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Product Name
              </label>
              <input
                type="text"
                name="name"
                value={product.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`block w-full p-2 mt-1 text-gray-700 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                  errors.name && touched.name ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter product title"
              />
              {errors.name && touched.name && (
                <p className="mt-1 text-sm text-red-500">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Price ($)
              </label>
              <input
                type="number"
                name="price"
                value={product.price}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`block w-full p-2 mt-1 text-gray-700 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                  errors.price && touched.price ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="0.00"
              />
              {errors.price && touched.price && (
                <p className="mt-1 text-sm text-red-500">{errors.price}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              onBlur={handleBlur}
              rows="4"
              className={`block w-full p-2 mt-1 text-gray-700 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                errors.description && touched.description
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              placeholder="Enter product description"
            />
            {errors.description && touched.description && (
              <p className="mt-1 text-sm text-red-500">{errors.description}</p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Stock Quantity
              </label>
              <input
                type="number"
                name="inStock"
                value={product.inStock}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`block w-full p-2 mt-1 text-gray-700 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                  errors.inStock && touched.inStock ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="0"
              />
              {errors.inStock && touched.inStock && (
                <p className="mt-1 text-sm text-red-500">{errors.inStock}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Product Image
              </label>
              <div
                className={`flex justify-center px-6 pt-5 pb-6 mt-1 border-2 border-dashed rounded-md ${
                  errors.productImage && touched.productImage
                    ? "border-red-500"
                    : "border-gray-300"
                } hover:border-blue-500`}
              >
                <div className="space-y-1 text-center">
                  <FaCloudUploadAlt
                    className={`w-12 h-12 mx-auto ${
                      errors.productImage && touched.productImage
                        ? "text-red-400"
                        : "text-gray-400"
                    }`}
                  />
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="productImage"
                      className={`relative font-medium ${
                        errors.productImage && touched.productImage
                          ? "text-red-400"
                          : "text-blue-400"
                      } bg-white rounded-md cursor-pointer hover:text-blue-500`}
                    >
                      <span>Upload a file</span>
                      <input
                        id="productImage"
                        name="productImage"
                        type="file"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF up to 10MB
                  </p>
                  {product.productImage && (
                    <p className="text-sm text-gray-500">
                      {product.productImage.name}
                    </p>
                  )}
                </div>
              </div>
              {errors.productImage && touched.productImage && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.productImage}
                </p>
              )}
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="flex justify-center w-full px-4 py-3 text-sm font-medium text-white transition-colors bg-blue-600 border border-transparent rounded-md shadow-sm cursor-pointer hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;