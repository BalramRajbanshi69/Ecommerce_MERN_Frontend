

import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/Components/ui/button";
import {
  TruckIcon,
  ShieldCheck,
  RefreshCw,
  HeadphonesIcon,
  Gift,
  Clock,
  UserPlus,
  Wrench,
} from "lucide-react";

const Services = () => {
  // Service categories with their specific services

  const serviceCategories = [
    {
      title: "Shipping & Delivery",
      icon: <TruckIcon className="w-6 h-6" />,
      description: "Fast and reliable shipping options for your convenience",
      services: [
        {
          name: "Standard Shipping",
          description: "Free shipping on all orders over $50",
        },
        {
          name: "Express Delivery",
          description: "Get your items within 2 business days",
        },
        {
          name: "International Shipping",
          description: "We ship to over 50 countries worldwide",
        },
        {
          name: "Same-Day Delivery",
          description: "Available in select metropolitan areas",
        },
      ],
    },
    {
      title: "Product Support",
      icon: <ShieldCheck className="w-6 h-6" />,
      description: "Comprehensive product support and warranty services",
      services: [
        {
          name: "Extended Warranty",
          description: "Additional protection for your purchases",
        },
        {
          name: "Product Tutorials",
          description: "Learn how to get the most from your products",
        },
        {
          name: "Technical Support",
          description: "Expert assistance for technical issues",
        },
        {
          name: "Product Registration",
          description: "Register your products for warranty coverage",
        },
      ],
    },
    {
      title: "Returns & Exchanges",
      icon: <RefreshCw className="w-6 h-6" />,
      description: "Hassle-free returns and exchanges process",
      services: [
        {
          name: "30-Day Returns",
          description: "Easy returns within 30 days of purchase",
        },
        {
          name: "Free Return Shipping",
          description: "We cover the cost of return shipping",
        },
        {
          name: "Instant Exchanges",
          description: "Quick replacement for defective items",
        },
        {
          name: "Price Adjustments",
          description: "Get refunded if prices drop after your purchase",
        },
      ],
    },
    {
      title: "Customer Experience",
      icon: <HeadphonesIcon className="w-6 h-6" />,
      description: "Dedicated support for an exceptional shopping experience",
      services: [
        {
          name: "24/7 Customer Service",
          description: "Support available around the clock",
        },
        {
          name: "Live Chat Support",
          description: "Get instant assistance through our website",
        },
        {
          name: "Product Recommendations",
          description: "Personalized suggestions based on your interests",
        },
        {
          name: "Feedback Program",
          description: "Share your experience and help us improve",
        },
      ],
    },
  ];


  // Additional premium services
  const premiumServices = [
    {
      icon: <Gift className="w-8 h-8" />,
      title: "Gift Services",
      description:
        "Premium gift wrapping, personalized messages, and special packaging options for the perfect presentation.",
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Priority Access",
      description:
        "Early access to new products and exclusive sales events before they're available to the general public.",
    },
    {
      icon: <UserPlus className="w-8 h-8" />,
      title: "Personal Shopping",
      description:
        "Work with a dedicated shopping assistant who can help you find exactly what you're looking for.",
    },
    {
      icon: <Wrench className="w-8 h-8" />,
      title: "Product Customization",
      description:
        "Custom modifications and personalization options to make your purchase uniquely yours.",
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 bg-[#780000]">
      <div className="container mx-auto max-w-7xl">
        {/* Services Header */}
        <div className="max-w-3xl mx-auto mb-16 text-center text-white animate-reveal">
          <span className="inline-block px-3 py-1 mb-4 text-xs font-medium text-white bg-black rounded-full">
            Our Services
          </span>
          <h1 className="mb-6 text-4xl font-bold">
            Enhancing Your Shopping Experience
          </h1>
          <p className="text-lg text-gray-300">
            Discover our comprehensive range of services designed to provide you
            with an exceptional shopping experience from browsing to delivery
            and beyond.
          </p>
        </div>

        {/* Service Categories */}
        <div className="grid grid-cols-1 gap-10 mb-20 md:grid-cols-2">
          {serviceCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="overflow-hidden bg-gradient-to-br from-white to-gray-50 shadow-lg rounded-xl transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
            >
              <div className="p-8 border-b border-gray-100 bg-opacity-90 backdrop-blur-sm">
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className={`flex items-center justify-center flex-shrink-0 w-14 h-14 rounded-xl transform transition-all duration-300 ${
                      index === 0
                        ? "bg-blue-100 text-blue-600 hover:bg-blue-200"
                        : index === 1
                        ? "bg-emerald-100 text-emerald-600 hover:bg-emerald-200"
                        : index === 2
                        ? "bg-purple-100 text-purple-600 hover:bg-purple-200"
                        : "bg-amber-100 text-amber-600 hover:bg-amber-200"
                    }`}
                  >
                    {category.icon}
                  </div>
                  <h2 className="text-2xl font-bold text-transparent bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text">
                    {category.title}
                  </h2>
                </div>
                <p className="text-gray-600">{category.description}</p>
              </div>

              <div className="divide-y divide-gray-100">
                {category.services.map((service, serviceIndex) => (
                  <div
                    key={serviceIndex}
                    className={`p-6 transition-all duration-300 hover:bg-gradient-to-r ${
                      index === 0
                        ? "hover:from-blue-50 hover:to-transparent"
                        : index === 1
                        ? "hover:from-emerald-50 hover:to-transparent"
                        : index === 2
                        ? "hover:from-purple-50 hover:to-transparent"
                        : "hover:from-amber-50 hover:to-transparent"
                    } group cursor-pointer`}
                  >
                    <h3 className="mb-2 text-lg font-semibold transition-transform duration-300 group-hover:translate-x-2">
                      {service.name}
                    </h3>
                    <p className="text-sm text-gray-600 transition-transform duration-300 group-hover:text-gray-700 group-hover:translate-x-2 ">
                      {service.description}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Premium Services */}
        <div className="mb-20">
          <div className="mb-12 text-center animate-reveal">
            <span className="inline-block px-3 py-1 mb-4 text-xs font-medium text-white bg-black rounded-full">
              Premium Offerings
            </span>
            <h2 className="mb-4 text-3xl font-bold text-white">
              Exclusive Services
            </h2>
            <p className="max-w-2xl mx-auto text-gray-300">
              Elevate your shopping experience with our premium services
              designed for customers who desire something extra.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {premiumServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`p-8 text-center transition-all duration-300 rounded-xl hover:shadow-xl transform hover:scale-105  ${
                  index === 0
                    ? "bg-rose-50 hover:bg-rose-100"
                    : index === 1
                    ? "bg-blue-50 hover:bg-blue-100"
                    : index === 2
                    ? "bg-emerald-50 hover:bg-emerald-100"
                    : "bg-amber-50 hover:bg-amber-100"
                }`}
              >
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full mx-auto ${
                    index === 0
                      ? "bg-rose-100 text-rose-600"
                      : index === 1
                      ? "bg-blue-100 text-blue-600"
                      : index === 2
                      ? "bg-emerald-100 text-emerald-600"
                      : "bg-amber-100 text-amber-600"
                  }`}
                >
                  {service.icon}
                </div>

                <h3 className="mb-3 text-xl font-semibold">{service.title}</h3>
                <p className="mb-6 text-gray-600">{service.description}</p>

                <Button
                  variant="outline"
                  size="sm"
                  className={`mx-auto cursor-pointer ${
                    index === 0
                      ? "hover:bg-rose-100 hover:text-rose-700"
                      : index === 1
                      ? "hover:bg-blue-100 hover:text-blue-700"
                      : index === 2
                      ? "hover:bg-emerald-100 hover:text-emerald-700"
                      : "hover:bg-amber-100 hover:text-amber-700"
                  }`}
                >
                  Learn More
                </Button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Service Membership Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="relative mb-20 overflow-hidden text-white bg-black rounded-2xl"
        >
          <div className="absolute inset-0 opacity-20">
            <div
              className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 animate-pulse"
              style={{ animationDuration: "3s" }}
            ></div>
          </div>

          <div className="relative z-10 flex flex-col items-center justify-between gap-8 p-10 md:p-16 md:flex-row">
            <div className="text-center md:text-left">
              <h2 className="mb-4 text-3xl font-bold">
                Premium Membership Program
              </h2>
              <p className="max-w-xl mb-6 text-gray-300">
                Join our membership program for exclusive benefits including
                priority service, dedicated support, advanced product access,
                and special member-only events.
              </p>
              <Button
                size="lg"
                className="text-black bg-white cursor-pointer hover:bg-gray-100"
              >
                Explore Membership
              </Button>
            </div>

            <div className="hidden w-40 h-40 rounded-full md:block bg-white/10 backdrop-blur-lg" />
          </div>
        </motion.div>

        {/* FAQs */}
        <div className="mb-16">
          <div className="mb-12 text-center text-white animate-reveal">
            <h2 className="mb-4 text-3xl font-bold">
              Frequently Asked Questions
            </h2>
            <p className="max-w-2xl mx-auto text-gray-300">
              Find answers to common questions about our services.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: "How long does standard shipping take?",
                answer:
                  "Standard shipping typically takes 3-7 business days, depending on your location. You can check estimated delivery times during checkout.",
              },
              {
                question: "What is your return policy?",
                answer:
                  "We offer a 30-day return policy for most items. Products must be in original condition with all packaging and tags. Some exclusions apply for hygiene products.",
              },
              {
                question: "How can I track my order?",
                answer:
                  "Once your order ships, you'll receive a tracking number via email. You can also track your order by logging into your account on our website.",
              },
              {
                question: "How do I redeem a gift card?",
                answer:
                  "Gift cards can be redeemed during checkout by entering the gift card code in the designated field. The balance will be applied to your order total.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-6 bg-white shadow-sm rounded-xl"
              >
                <h3 className="mb-2 text-lg font-semibold">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Contact Banner */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="relative mb-20 overflow-hidden text-white bg-black rounded-2xl"
        >
          <div className="absolute inset-0 opacity-20">
            <div
              className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 animate-pulse"
              style={{ animationDuration: "3s" }}
            ></div>
          </div>           

          <div className="relative z-10 p-10 text-center md:p-16">
            <h2 className="mb-4 text-2xl font-bold">Need More Information?</h2>
            <p className="max-w-xl mx-auto mb-8 text-gray-300">
              Our customer service team is ready to help you with any questions
              about our services.
            </p>
            <Button
              asChild
              size="lg"
              className="text-black bg-white hover:bg-gray-100"
            >
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Services;
