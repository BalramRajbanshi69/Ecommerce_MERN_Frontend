import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaCartArrowDown } from "react-icons/fa";
import { CiLight } from "react-icons/ci";
import { MdLightMode } from "react-icons/md";
import { LuLogIn } from "react-icons/lu";
import { FaSearch } from "react-icons/fa";
import eco from '../assets/eco.jpg';
import './Navbar.css'; // Assuming you have custom CSS here
import { useDispatch, useSelector } from "react-redux"; // Keep this
import { logOut } from "@/store/authSlice"; // Keep this
import { setSearchTerm } from "@/store/productSlice"; // Keep this
import { clearCart, fetchCartItems } from "@/store/cartSlice"; // Keep this
import toast from "react-hot-toast";

const Navbar = () => {
  const [isDark, setIsDark] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: user } = useSelector((state) => state.auth); // Redux user state
  const { items: cartItems } = useSelector((state) => state.cart); // Redux cart items
  const { searchTerm } = useSelector((state) => state.product); // Redux search term

  const handleClick = () => {
    setIsDark(!isDark);
  };

  const handleSearchChange = (e) => {
    dispatch(setSearchTerm(e.target.value)); // Update Redux search term
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Navigate to a search results page or trigger search on current page
    if (searchTerm.trim()) {
      navigate(`/search/${searchTerm}`); // Example: navigate to search results
    } else {
      navigate('/'); // If search term is empty, go home or clear results
    }
  };

  const handleLogout = () => {
    dispatch(logOut()); // Dispatch Redux logout action
    localStorage.removeItem("token"); // Also remove from localStorage
    dispatch(clearCart()); // Clear cart items on logout
    toast.success("Logged out successfully");
    navigate("/login");
  };

  useEffect(() => {
    // Fetch cart items when component mounts or user changes
    if (localStorage.getItem("token")) { // Only fetch if user is logged in
      dispatch(fetchCartItems());
    }
  }, [dispatch, user]); // Depend on dispatch and user to refetch if user logs in/out

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <nav
        className={`px-4 sm:px-6 lg:px-8 ${
          isDark ? "bg-[#0a0908] text-white" : "bg-white text-black"
        } shadow font-mono border-b ${
          isDark ? "border-white/20" : "border-gray-200"
        }`}
      >
        <div className="flex items-center justify-between h-16 mx-auto max-w-7xl">
          {/* Logo Section */}
          <div className="flex items-center flex-shrink-0">
            <Link to="/">
              <h3 className="text-xl font-bold tracking-wider logo-text">
                {"ECOFRIEND".split("").map((letter, index) => (
                  <span key={index} className="logo-letter">
                    {letter}
                  </span>
                ))}
              </h3>
            </Link>
            <img
              src={eco}
              alt="ecommerce-image"
              className={`w-20 h-16 object-contain ${
                isDark
                  ? "invert brightness-200 contrast-100"
                  : "mix-blend-multiply"
              }`}
            />
          </div>

          {/* Navigation Links */}
          <div className="flex-1 hidden px-4 md:block">
            <ul className="flex items-center justify-center gap-8 font-bold text-[19px]">
              {["Home", "Product", "Services", "Contact"].map((item, index) => (
                <Link
                  key={index}
                  className="nav-link"
                  // Corrected logic for the "Product" link
                  to={item === "Home" ? "/" : item === "Product" ? "/userProduct" : `/${item.toLowerCase()}`}
                >
                  {item.split("").map((letter, letterIndex) => (
                    <span key={letterIndex} className="nav-link-letter">
                      {letter}
                    </span>
                  ))}
                </Link>
              ))}
            </ul>
          </div>

          {/* Right Section - Search, Cart, etc */}
          <div className="flex items-center gap-4">
            <form onSubmit={handleSearchSubmit} className="relative hidden sm:block">
              <input
                type="text"
                onChange={handleSearchChange} // Use Redux action
                value={searchTerm} // Use Redux state
                placeholder="Search products..."
                className={`w-64 pl-4 pr-10 py-2 rounded-full border focus:outline-none focus:ring-2
                  ${
                    isDark
                      ? "bg-gray-800 border-gray-700 focus:ring-blue-500 text-white placeholder-gray-400"
                      : "bg-gray-50 border-gray-300 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
                  } transition-all`}
              />
              <button
                type="submit"
                className={`absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full
                  ${
                    isDark
                      ? "text-gray-400 hover:text-white"
                      : "text-gray-500 hover:text-gray-700"
                  } transition-colors`}
              >
                <FaSearch className="w-4 h-4" />
              </button>
            </form>

            {/* Cart Icon and Count */}
            {/* Display cart only if there are items, and link to /cartlist */}
            {cartItems.length > 0 && (
              <Link to="/cartlist">
                <button
                  type="button"
                  className="relative inline-flex items-center p-3 text-lg cursor-pointer"
                >
                  <FaCartArrowDown className="text-2xl" />
                  <span className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 rounded-full -top-0 -right-2">
                    {cartItems.length}
                  </span>
                </button>
              </Link>
            )}

            {/* Theme Toggle */}
            <button
              onClick={handleClick}
              className="px-2 py-2 text-2xl transition-transform hover:scale-110"
            >
              {isDark ? (
                <CiLight className="text-white" />
              ) : (
                <MdLightMode className="text-gray-900" />
              )}
            </button>

            {/* Login/Logout based on Redux user state and localStorage token */}
            {user?.length === 0 &&
            (localStorage.getItem("token") === "" ||
              localStorage.getItem("token") === null ||
              localStorage.getItem("token") === undefined) ? (
              <Link
                to="/signup"
                className="text-2xl transition-transform hover:scale-110"
              >
                <LuLogIn size={20} />
              </Link>
            ) : (
              <span
                onClick={handleLogout}
                className="text-xl transition-transform hover:scale-110 cursor-pointer text-red-600"
              >
                Logout
              </span>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;