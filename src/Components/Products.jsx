
import React, { useContext, useEffect, useState } from "react";
import s1 from "../assets/picTwo.jpg";
import ProductContext from "../Context/ProductContext";
import { BsThreeDots } from "react-icons/bs";
import  toast  from "react-hot-toast";
import { Link, useLocation, useParams } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import EditModel from "./EditModel";

const Products = ({showAddButton = true}) => {
  const apiUrl = import.meta.env.VITE_REACT_API_URL;
   const params = useParams();
   const searchQuery = params.searchQuery;
   const {
     products,
      state:{cart},
     dispatch,
     allProduct,
     editProduct,
     deleteProduct,
     getUserProducts,
   } = useContext(ProductContext);
   console.log("Product items:", products);
   console.log("Carts items:", cart);
   console.log(allProduct);

   const [menuVisible, setMenuVisible] = useState(false);
   const [modelVisible, setModelVisible] = useState(false);
   const [selectedProduct, setSelectedProduct] = useState(null);

    const [visibleProducts, setVisibleProducts] = useState(8);
     const [showAll, setShowAll] = useState(false);
     const location = useLocation();

      useEffect(() => {
        setShowAll(false);
      }, [location.pathname]);
    // Filter products for home page
    // const displayedProducts = showAddButton
    //   ? products
    //   : showAll
    //   ? products
    //   : products?.slice(0, visibleProducts);



        // Update the displayedProducts logic
    const displayedProducts = React.useMemo(() => {
      // Ensure products is an array
      const productsArray = Array.isArray(products) ? products : [];
      if (showAddButton) {
        return productsArray;
      }
      return showAll ? productsArray : productsArray.slice(0, visibleProducts);
    }, [products, showAddButton, showAll, visibleProducts]);


       const handleViewAll = (e) => {
         e.preventDefault();
         setShowAll(true);
       };

   const showAddNotification = () => toast.success("Added to Cart Successfully");
   const showRemoveNotification = () =>toast.success("Removed from Cart Successfully");

   const handleMenu = (id) => {
     setMenuVisible((prevMenu) => ({
       ...prevMenu,
       [id]: !prevMenu[id],
     }));
   };

   const OpenEditModal = (prod) => {
     setModelVisible(true);
     setSelectedProduct(prod);
   };

   const EditCloseModal = () => {
     setModelVisible(false);
     setSelectedProduct(null);
   };


    // Update the EditSave function
  const EditSave = async (updatedData) => {
    console.log("save changing or changed");
    const success = await editProduct(selectedProduct._id, updatedData);
    if (success) {
      // Close both the edit modal and menu
      setModelVisible(false);
      setMenuVisible(prev => ({
        ...prev,
        [selectedProduct._id]: false
      }));
      setSelectedProduct(null);
    }
  };
  
  // Update the handleDeleteMenu function
  const handleDeleteMenu = async (id) => {
    console.log("deleting products");
    await deleteProduct(id);
    // Close the menu for the deleted item
    setMenuVisible(prev => ({
      ...prev,
      [id]: false
    }));
  };



   useEffect(() => {
     if (showAddButton) {
       getUserProducts();
     } else {
       allProduct(searchQuery);
     }
   }, [showAddButton, searchQuery]);

  // useEffect(()=>{
  //   allProduct(searchQuery)
  // },[searchQuery]);


  return (
    <>
      <div className="pb-8 bg-[#00171f] min-h-screen ">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col">
            <div className="flex items-center justify-end mt-5 mb-6">
              {showAddButton && (
                <Link
                  to="/addproduct"
                  className="flex items-center gap-2 px-4 py-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  <FaPlus size={20} />
                  Add Products
                </Link>
              )}
            </div>

            {(!displayedProducts || displayedProducts.length === 0) ? (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-white">
              <div className="p-8 text-center">
                <h3 className="mb-4 text-2xl font-semibold">No Products Found</h3>
                <p className="text-gray-300">
                  {showAddButton 
                    ? "Start by adding your first product!"
                    : "No products available at the moment."}
                </p>
                {showAddButton && (
                  <Link
                    to="/addproduct"
                    className="inline-block px-6 py-2 mt-6 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
                  >
                    Add Your First Product
                  </Link>
                )}
              </div>
            </div>
            ) : (
            <div className="grid grid-cols-1 gap-6 mb-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {displayedProducts &&
                displayedProducts?.map((item) => (
                  <div
                    key={item._id}
                    className="overflow-hidden bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] 
                               transform transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-[0_20px_35px_rgb(0,0,0,0.2)] cursor-pointer"
                  >
                    {/* Image Container */}
                    <div className="relative h-48">
                      <img
                        className="object-cover w-full h-full"
                        src={
                          item.image?.length > 0
                            ? `${apiUrl}/uploads/${item.image[0]}`
                            : s1
                        }
                        alt={item.name || "Product Image"}
                      />
                    </div>

                    {/* Content Container */}
                    <div className="p-4 text-black bg-white">
                      <div className="flex items-start justify-between">
                        <h5 className="text-lg font-semibold">{item.name}</h5>
                        {/* Menu Dropdown */}

                        {showAddButton && (
                          <div className="relative menu-container">
                            <button
                              onClick={() => handleMenu(item._id)}
                              className="p-1 rounded-full hover:bg-gray-100"
                            >
                              <BsThreeDots />
                            </button>
                            {menuVisible[item._id] && (
                              <div className="absolute right-0 z-10 mt-2 bg-white border rounded-md shadow-lg w-36">
                                <button
                                  onClick={() => OpenEditModal(item)}
                                  className="w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 first:rounded-t-md"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleDeleteMenu(item._id)}
                                  className="w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-gray-100 last:rounded-b-md"
                                >
                                  Delete
                                </button>
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                        {item.description}
                      </p>

                      <div className="mt-4 space-y-1">
                        <p className="text-sm">
                          <span className="font-semibold">Price:</span> $
                          {item.price}
                        </p>
                        <p className="text-sm">
                          <span className="font-semibold">InStock:</span>{" "}
                          {item.inStock}
                        </p>
                      </div>

                      {/* Cart Button */}
                      <div className="mt-4">
                        {cart && cart.some((p) => p._id === item._id) ? (
                          <button
                            onClick={() => {
                              showRemoveNotification();
                              dispatch({
                                type: "REMOVE_FROM_CART",
                                payload: item,
                              });
                            }}
                            className="w-full py-2 text-white transition-colors bg-red-600 rounded-md cursor-pointer hover:bg-red-700"
                          >
                            Remove From Cart
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              showAddNotification();
                              dispatch({ type: "ADD_TO_CART", payload: item });
                            }}
                            className="w-full py-2 text-white transition-colors bg-blue-600 rounded-md cursor-pointer hover:bg-blue-700"
                          >
                            Add To Cart
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            )}

            {!showAddButton &&
              products?.length > visibleProducts &&
              !showAll && (
                <div className="flex justify-center mt-8">
                  <button
                    onClick={handleViewAll}
                    className="px-6 py-2 text-white duration-300 ease-in-out bg-blue-600 border-2 border-transparent rounded-md cursor-pointer hover:bg-transparent hover:text-white hover:border-2 hover:border-blue-600"
                  >
                    View All Products
                  </button>
                </div>
              )}

            {/* Edit Modal */}
            {modelVisible && selectedProduct && (
              <EditModel
                isOpen={modelVisible}
                onClose={EditCloseModal}
                prod={selectedProduct}
                onSave={EditSave}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;


















