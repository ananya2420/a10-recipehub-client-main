'use client';

import React from 'react';

export const NewsletterSection = () => {
  return (
    <section className="w-full py-16 bg-green-50 my-10">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Never Miss a Recipe
        </h2>
        <p className="text-gray-600 mb-8 max-w-xl mx-auto">
          Join our community of over 10,000+ food lovers. Get fresh, chef-curated recipes delivered straight to your inbox every week.
        </p>
        
        <form className="flex flex-col md:flex-row gap-3 justify-center items-center" onSubmit={(e) => e.preventDefault()}>
          <input 
            type="email" 
            placeholder="Enter your email address" 
            className="w-full md:w-80 px-6 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm"
            required
          />
          <button 
            type="submit" 
            className="w-full md:w-auto bg-green-600 text-white px-8 py-3 rounded-full font-bold hover:bg-green-700 transition-colors shadow-lg shadow-green-200"
          >
            Subscribe
          </button>
        </form>
        
        <p className="text-[10px] text-gray-400 mt-4 uppercase tracking-widest">
          No spam, just delicious food.
        </p>
      </div>
    </section>
  );
};