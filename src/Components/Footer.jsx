
import React from "react";
import { Link } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#071e22] text-white">
      <div className=" animate-reveal">
        <div className="container mx-auto max-w-7xl py-16  md:py-20">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
            {/* Brand and description */}
            <div>
              <h2 className="mb-6 text-2xl font-semibold">ECOFRIEND</h2>
              <p className="mb-6 text-white">
                Premium shopping experience with curated products for the
                discerning customer. Quality, elegance and innovation in every
                product.
              </p>

              <div className="flex space-x-4">
                <a
                  href="#"
                  aria-label="Facebook"
                  className="text-white transition-all duration-300 ease-in-out transform hover:scale-125 hover:text-blue-600"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  aria-label="Instagram"
                  className="text-white transition-all duration-300 ease-in-out transform hover:scale-125 hover:text-rose-400"
                >
                  <Instagram className="w-5 h-5 " />
                </a>
                <a
                  href="#"
                  aria-label="Twitter"
                  className="text-white transition-all duration-300 ease-in-out transform hover:scale-125 hover:text-blue-400"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick links */}
            <div>
              <h3 className="mb-6 text-lg font-semibold">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/"
                    className="text-white transition-colors text-md  relative after:absolute after:bottom-0 after:left-0 after:h-0.5 
                  after:w-0 after:bg-white after:transition-all after:duration-300 after:ease-in-out hover:after:w-full"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/products"
                    className="text-white transition-colors text-md relative after:absolute after:bottom-0 after:left-0 after:h-0.5 
                  after:w-0 after:bg-white after:transition-all after:duration-300 after:ease-in-out hover:after:w-full"
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services"
                    className="text-white transition-colors text-md relative after:absolute after:bottom-0 after:left-0 after:h-0.5 
                  after:w-0 after:bg-white after:transition-all after:duration-300 after:ease-in-out hover:after:w-full"
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-white transition-colors text-md relative after:absolute after:bottom-0 after:left-0 after:h-0.5 
                  after:w-0 after:bg-white after:transition-all after:duration-300 after:ease-in-out hover:after:w-full"
                  >
                    My Account
                  </a>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-white transition-colors text-md relative after:absolute after:bottom-0 after:left-0 after:h-0.5 
                  after:w-0 after:bg-white after:transition-all after:duration-300 after:ease-in-out hover:after:w-full"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h3 className="mb-6 text-lg font-semibold">Categories</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-white transition-colors text-md relative after:absolute after:bottom-0 after:left-0 after:h-0.5 
                  after:w-0 after:bg-white after:transition-all after:duration-300 after:ease-in-out hover:after:w-full"
                  >
                    Electronics
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-white transition-colors text-md relative after:absolute after:bottom-0 after:left-0 after:h-0.5 
                  after:w-0 after:bg-white after:transition-all after:duration-300 after:ease-in-out hover:after:w-full"
                  >
                    Clothing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-white transition-colors text-md relative after:absolute after:bottom-0 after:left-0 after:h-0.5 
                  after:w-0 after:bg-white after:transition-all after:duration-300 after:ease-in-out hover:after:w-full"
                  >
                    Home & Kitchen
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-white transition-colors text-md relative after:absolute after:bottom-0 after:left-0 after:h-0.5 
                  after:w-0 after:bg-white after:transition-all after:duration-300 after:ease-in-out hover:after:w-full"
                  >
                    Beauty & Personal Care
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-white transition-colors text-md relative after:absolute after:bottom-0 after:left-0 after:h-0.5 
                  after:w-0 after:bg-white after:transition-all after:duration-300 after:ease-in-out hover:after:w-full"
                  >
                    Books & Stationery
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="mb-6 text-lg font-semibold">Contact Us</h3>
              <ul className="space-y-4">
                <li className="flex items-start group">
                  <div className="p-2 transition-all duration-300 rounded-lg group-hover:bg-white/10 group-hover:scale-110">
                    <MapPin className="w-5 h-5 text-white transition-colors duration-300 group-hover:text-blue-400" />
                  </div>
                  <span className="ml-2 text-white">Kathmandu, Nepal</span>
                </li>
                <li className="flex items-center group">
                  <div className="p-2 transition-all duration-300 rounded-lg group-hover:bg-white/10 group-hover:scale-110">
                    <Phone className="w-5 h-5 text-white transition-colors duration-300 group-hover:text-green-400" />
                  </div>
                  <span className="ml-2 text-white">+977 98XXXXXXXXX</span>
                </li>
                <li className="flex items-center group">
                  <div className="p-2 transition-all duration-300 rounded-lg group-hover:bg-white/10 group-hover:scale-110">
                    <Mail className="w-5 h-5 text-white transition-colors duration-300 group-hover:text-rose-400" />
                  </div>
                  <span className="ml-2 text-white">support@ecofriend.com</span>
                </li>
              </ul>
            </div>
            
          </div>

          <div className="pt-8 mt-12 border-t border-gray-200">
            <div className="flex flex-col items-center justify-between md:flex-row">
              <p className="mb-4 text-sm text-white md:mb-0">
                © {new Date().getFullYear()} ECOFRIEND. All rights reserved.
              </p>
              <div className="flex space-x-6">
                <a href="#" className="text-sm text-white ">
                  Privacy Policy
                </a>
                <a href="#" className="text-sm text-white">
                  Terms of Service
                </a>
                <a href="#" className="text-sm text-white">
                  Shipping Info
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
