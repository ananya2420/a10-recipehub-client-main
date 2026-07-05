"use client";

import React from 'react';
import Image from 'next/image';

const Banner = () => {
  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
        
        {/* Introduction Text */}
        <div className="flex-1 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full text-sm font-semibold uppercase tracking-widest text-gray-700">
            <span className="w-2 h-2 rounded-full bg-green-600" />
            Leading the way in culinary sharing
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight">
            Prepare. Exchange. <br />
            <span className="text-green-600">Upgrade.</span>
          </h1>

          <p className="text-lg text-gray-600 max-w-md">
            RecipeHub serves as the ultimate destination for cooking enthusiasts to showcase their best culinary creations. Become part of a vibrant group of food lovers who are defining the next generation of online gastronomy.
          </p>
          
          <div className="flex flex-wrap gap-4 pt-4">
            <button className="px-8 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-all shadow-lg shadow-green-600/20">
              Begin Publishing
            </button>
            <button className="px-8 py-3 border border-gray-200 text-black font-semibold rounded-xl hover:bg-gray-50 transition-all">
              Browse the collection →
            </button>
          </div>
        </div>

        {/* Visual Element */}
        <div className="flex-1 w-full">
          <div className="relative w-full aspect-[4/3] md:aspect-square max-w-lg mx-auto overflow-hidden rounded-3xl shadow-2xl">
            <Image 
              src="/assets/header_img.png" 
              alt="Culinary preview" 
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default Banner;