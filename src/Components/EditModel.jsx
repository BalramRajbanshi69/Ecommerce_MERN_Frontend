import React, { useState } from "react";
import { toast } from "react-toastify";
import { MdClose } from "react-icons/md";

const EditModel = ({ prod, isOpen, onClose, onSave }) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    name: prod.name,
    description: prod.description,
    price: prod.price,
    inStock: prod.inStock,
  });

    const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Product Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Product name is required";
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "Product name must be at least 3 characters long";
    } else if (!/^[A-Z]/.test(formData.name)) {
      newErrors.name = "Product name must start with a capital letter";
    }

    // Description validation
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (formData.description.trim().length < 5) {
      newErrors.description = "Description must be at least 5 characters long";
    }

    // Price validation
    if (!formData.price) {
      newErrors.price = "Price is required";
    } else if (Number(formData.price) <= 0) {
      newErrors.price = "Price must be greater than 0";
    }

    // Stock validation
    if (!formData.inStock) {
      newErrors.inStock = "Stock quantity is required";
    } else if (Number(formData.inStock) <= 0) {
      newErrors.inStock = "Stock quantity must be greater than 0";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

 const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

   const handleBlur = (e) => {
    setTouched({ ...touched, [e.target.name]: true });
  };

const handleSave = async () => {
    // Mark all fields as touched
    const touchAll = {
      name: true,
      description: true,
      price: true,
      inStock: true,
    };
    setTouched(touchAll);

    if (!validateForm()) {
      toast.error("Please fix the errors before saving");
      return;
    }

    try {
      await onSave(formData);
      toast.success("Product updated successfully!");
      onClose();
    } catch (error) {
      toast.error("Failed to update product");
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center px-4">
        {/* Overlay */}
        <div className="fixed inset-0 bg-black/50 transition-opacity" />

        {/* Modal */}
        <div className="relative w-full max-w-md transform rounded-2xl bg-white p-6 shadow-xl transition-all">
          {/* Header */}
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-2xl font-bold text-gray-900">Edit Product</h3>
            <button
              onClick={onClose}
              className="rounded-full p-1 hover:bg-gray-100 transition-colors"
            >
              <MdClose size={24} className="text-gray-500" />
            </button>
          </div>

          {/* Form */}
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
                <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full rounded-md shadow-sm p-2 ${
                  errors.name && touched.name
                    ? "border-red-500"
                    : "border-gray-300"
                } focus:border-blue-500 focus:ring-blue-500`}
              />
              {errors.name && touched.name && (
                <p className="mt-1 text-sm text-red-500">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
               <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                onBlur={handleBlur}
                rows="3"
                className={`w-full p-2 rounded-md shadow-sm ${
                  errors.description && touched.description
                    ? "border-red-500"
                    : "border-gray-300"
                } focus:border-blue-500 focus:ring-blue-500`}
              />
              {errors.description && touched.description && (
                <p className="mt-1 text-sm text-red-500">{errors.description}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                    $
                  </span>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full p-2 rounded-md pl-7 shadow-sm ${
                      errors.price && touched.price
                        ? "border-red-500"
                        : "border-gray-300"
                    } focus:border-blue-500 focus:ring-blue-500`}
                  />
                </div>
                {errors.price && touched.price && (
                  <p className="mt-1 text-sm text-red-500">{errors.price}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  In Stock
                </label>
                <input
                  type="number"
                  name="inStock"
                  value={formData.inStock}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full p-2 rounded-md shadow-sm ${
                    errors.inStock && touched.inStock
                      ? "border-red-500"
                      : "border-gray-300"
                  } focus:border-blue-500 focus:ring-blue-500`}
                />
                {errors.inStock && touched.inStock && (
                  <p className="mt-1 text-sm text-red-500">{errors.inStock}</p>
                )}
              </div>
            </div>
          </form>

          {/* Footer */}
          <div className="mt-6 flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModel;