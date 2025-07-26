
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from '@/Components/ui/button';
import toast from 'react-hot-toast';

const Contact = () => {
  const apiUrl = import.meta.env.VITE_REACT_API_URL
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});

    const validateForm = () => {
    const newErrors = {};
    
    // Name validation
    if (!formData.fullname?.trim()) {
      newErrors.fullname = 'Name is required';
    } else if (formData.fullname.length < 3) {
      newErrors.fullname = 'Name must be at least 3 characters';
    }
  
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
  
    // Phone validation
    const phoneRegex = /^[0-9]{10}$/;
    if (!formData.phone?.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }
  
    // Subject validation
    if (!formData.subject?.trim()) {
      newErrors.subject = 'Subject is required';
    } else if (formData.subject.length < 5) {
      newErrors.subject = 'Subject must be at least 5 characters';
    }
  
    // Message validation
    if (!formData.message?.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
  
    return newErrors;
  };
  
  // Update handleSubmit to show a specific error message for invalid fields
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!localStorage.getItem("token")) {
      toast.error("Please login to send message");
      navigate("/login");
      return;
    }

    const newErrors = validateForm();
  
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // Show specific error message based on which fields are invalid
      const errorFields = Object.keys(newErrors).join(', ');
      toast.error(`Please check the following fields: ${errorFields}`);
      return;
    }
  
    try {
      const response = await fetch(
        `${apiUrl}/api/contact/contactsubmit`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify(formData),
        }
      );
  
      const data = await response.json();
      
      if (data) {
        toast.success("Message sent successfully!");
        setFormData({
          fullname: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
        setErrors({});
      }
       else {
        toast.error( "Failed to send message");
      }
      
       } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };


 

  // Contact information array remains the same
  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email Us',
      details: 'support@ecofriend.com',
      description: 'We will get back to you within 24 hours',
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Call Us',
      details: '+977 (980) 123-4567',
      description: '24hrs response',
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Location',
      details: '123 ECOFRIEND STORE, Kathmandu, Nepal',
      description: 'Come visit our store',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a2e] to-[#16213e] pt-24 pb-16">
      <div className="container mx-auto max-w-7xl">
        {/* Contact Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <span className="inline-block px-4 py-1 mb-4 text-sm font-medium text-blue-400 rounded-full bg-blue-900/30">
            Get In Touch
          </span>
          <h1 className="mb-6 text-4xl font-bold text-white">Contact Us</h1>
          <p className="text-lg text-gray-400">
            Have questions? We'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          {/* Contact Information Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-8 lg:col-span-1"
          >
           {contactInfo.map((item, index) => (
              <div
                key={index}
                className="p-6 bg-[#1e2746] border border-gray-700 shadow-lg rounded-xl hover:bg-[#232d52] transition-all duration-300 hover:shadow-2xl group"
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg transition-all duration-300 transform group-hover:scale-110 ${
                    index === 0 
                      ? "bg-blue-900/30 text-blue-400 group-hover:bg-gradient-to-r from-blue-600 to-blue-400 group-hover:text-white" 
                      : index === 1 
                      ? "bg-purple-900/30 text-purple-400 group-hover:bg-gradient-to-r from-purple-600 to-purple-400 group-hover:text-white"
                      : "bg-emerald-900/30 text-emerald-400 group-hover:bg-gradient-to-r from-emerald-600 to-emerald-400 group-hover:text-white"
                  } shadow-lg group-hover:shadow-xl`}>
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="mb-1 text-lg font-medium text-white">
                      {item.title}
                    </h3>
                    <p className={`mb-1 font-medium transition-colors duration-300 ${
                      index === 0 
                        ? "text-blue-400 group-hover:text-blue-300" 
                        : index === 1 
                        ? "text-purple-400 group-hover:text-purple-300"
                        : "text-emerald-400 group-hover:text-emerald-300"
                    }`}>
                      {item.details}
                    </p>
                    <p className="text-sm text-gray-500 group-hover:text-gray-400">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="p-8 bg-[#1e2746] border border-gray-700 shadow-lg lg:col-span-2 rounded-xl"
          >
            <h2 className="mb-6 text-2xl font-semibold text-white">
              Send Us a Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-300">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullname"
                    value={formData.fullname}
                    onChange={handleChange}
                    className={`w-full p-2 bg-[#141b2d] border rounded-md text-white placeholder-gray-400 
                    ${errors.fullname ? "border-red-500" : "border-gray-600"} 
                    focus:border-blue-500 focus:ring-1 focus:ring-blue-500`}
                    placeholder="Your name"
                  />
                  {errors.fullname && (
                    <p className="mt-1 text-sm text-red-400">{errors.fullname}</p>
                  )}
                </div>

                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-300">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full p-2 bg-[#141b2d] border rounded-md text-white placeholder-gray-400 
                    ${errors.email ? "border-red-500" : "border-gray-600"} 
                    focus:border-blue-500 focus:ring-1 focus:ring-blue-500`}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-300">
                    Phone Number
                  </label>
                  <input
                    type="number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full p-2 bg-[#141b2d] border rounded-md text-white placeholder-gray-400 
                    ${errors.phone ? "border-red-500" : "border-gray-600"} 
                    focus:border-blue-500 focus:ring-1 focus:ring-blue-500`}
                    placeholder="(+977) 9812345678"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-300">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full p-2 bg-[#141b2d] border rounded-md text-white placeholder-gray-400 
                    ${errors.subject ? "border-red-500" : "border-gray-600"} 
                    focus:border-blue-500 focus:ring-1 focus:ring-blue-500`}
                    placeholder="How can we help you?"
                  />
                  {errors.subject && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.subject}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-300">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className={`w-full p-2 bg-[#141b2d] border rounded-md text-white placeholder-gray-400 
                    ${errors.message ? "border-red-500" : "border-gray-600"} 
                    focus:border-blue-500 focus:ring-1 focus:ring-blue-500`}
                  placeholder="Tell us more about your inquiry..."
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                )}
              </div>

              <Button type="submit" className="w-full cursor-pointer md:w-auto">
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;