import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Imports from your local HEAD (Redux related and specific components)
import store from "./store/store";
import { Provider } from "react-redux";
import Product from "./Components/UserProduct"; // Assuming userProduct is now Product
import SingleProduct from "./Components/SingleProduct";
import Cart from "./Components/Cart"; // Assuming cartlist is now Cart


// Common imports (or decided to keep from one side if they were duplicated)
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Contact from "./Components/Contact";
import Services from "./Components/Services";
import AddProduct from "./Components/AddProduct";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import UserProduct from "./Components/UserProduct";


const App = () => {
  return (

    <Provider store={store}>

            <BrowserRouter>
              <Navbar />
              <div className="pt-16">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/addproduct" element={<AddProduct />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<SignUp />} />

                  <Route path="/userProduct" element={<UserProduct />} /> {/* Your local route */}
                  <Route path="/singleProduct/:id" element={<SingleProduct />} /> {/* Your local route */}
                  <Route path="/cartlist" element={<Cart />} /> {/* Your local cart route */}

                </Routes>
              </div>
            </BrowserRouter>
    </Provider>
  );
};

export default App;