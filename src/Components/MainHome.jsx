

import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/Components/ui/button";
import homepic from '../assets/homepage.jpg'

const MainHome = () => {
  return (
    <section className="relative pb-20 overflow-hidden pt-26 bg-gray-50 md:pt-36">
      <div className="container mx-auto max-w-7xl">
        <div className="grid items-center grid-cols-1 gap-8 md:grid-cols-2">
          <div className="animate-slide-in">
            <span className="inline-block px-3 py-1 mb-6 text-xs font-medium text-white bg-black rounded-full">
              Premium Quality Products
            </span>
            <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight md:text-5xl xl:text-6xl">
              Discover Exceptional Quality & Style
            </h1>
            <p className="max-w-md mb-8 text-lg text-gray-600">
              Explore our curated collection of premium products designed to
              enhance your lifestyle with elegance and innovation.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="px-8 rounded-full">
                <Link to="/profile">
                  Shop Now <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="px-8 rounded-full"
              >
                <Link to="/services">Our Services</Link>
              </Button>
            </div>
          </div>

          <div className="relative animate-blur-in">
            <div className="relative z-10 aspect-[4/3]">
              <img
                src={homepic}
                alt="Premium Products"
                className="object-cover w-full h-full rounded-2xl"
              />
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[90%] max-h-[90%] rounded-2xl border border-white/10 bg-gradient-to-br from-gray-100/20 to-white/5 backdrop-blur-lg -z-10 animate-fade-in" />
            <div className="absolute bg-black rounded-full -bottom-6 -right-6 w-36 h-36 opacity-10 -z-20" />
          </div>
        </div>
      </div>

      <div className="absolute hidden w-64 h-64 bg-gray-200 rounded-full opacity-50 md:block -bottom-24 -left-24" />
      <div className="absolute hidden w-10 h-10 bg-gray-200 rounded-full md:block top-20 right-10" />
    </section>
  );
};

export default MainHome;





