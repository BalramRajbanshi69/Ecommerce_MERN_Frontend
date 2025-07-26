import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import LoginImage from "../../src/assets/login.jpg";
import { useDispatch } from "react-redux"; // Keep this
import { loginUser } from "@/store/authSlice"; // Keep this
import toast from "react-hot-toast";

const Login = () => {
  const apiUrl = import.meta.env.VITE_APP_API_URL;
  const dispatch = useDispatch(); 
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });

    // Clear errors when user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!credentials.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(credentials.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!credentials.password.trim()) {
      newErrors.password = "Password is required";
    } else if (credentials.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      try {
        const userData = {
          email: credentials.email,
          password: credentials.password,
        };
        await dispatch(loginUser(userData)); 
        toast.success("Login successful!"); 
        navigate("/");
      } catch (error) {
        console.error("Login Error:", error);
        toast.error(error.message || "An unexpected error occurred during login");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-xl overflow-hidden w-full max-w-4xl">
        <div className="md:flex">
          {/* Left side - Image */}
          <div className="md:w-1/2 relative h-64 md:h-auto">
            <div
              className="w-full h-full bg-cover bg-center bg-no-repeat relative overflow-hidden"
              style={{
                backgroundImage: `url(${LoginImage})`,
              }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
            <div className="absolute bottom-4 left-4 text-white">
              <h2 className="text-xl font-bold mb-2">Welcome Back!</h2>
              <p className="text-sm">Book your appointment with ease.</p>
            </div>
          </div>

          {/* Right side - Form */}
          <div className="md:w-1/2 p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-1">Login</h2>
              <div className="h-1 w-16 bg-[#1F2B6C] rounded-full"></div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Input */}
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={credentials.email}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F2B6C] transition-all ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F2B6C] transition-all ${
                      errors.password ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#1F2B6C] text-white py-2 px-4 rounded-lg hover:bg-[#1F2B6C]/90 transition-colors duration-200 font-medium disabled:opacity-50"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            <p className="mt-6 text-center text-gray-600 text-sm">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-[#1F2B6C] hover:text-[#1F2B6C]/80 font-medium"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;