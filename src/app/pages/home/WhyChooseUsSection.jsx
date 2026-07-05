"use client";
import React from 'react';
import { motion } from 'framer-motion'; 

const reasons = [
  {
    title: "Chef-Curated",
    description: "Every recipe is tested by professional chefs to ensure perfect results in your kitchen."
  },
  {
    title: "Easy to Follow",
    description: "Our step-by-step guides are designed for cooks of all levels, from beginners to pros."
  },
  {
    title: "Healthy Choices",
    description: "We prioritize fresh, wholesome ingredients to keep your meals nutritious and delicious."
  }
];

export const WhyChooseUsSection = () => {
  return (
    <section className="w-full py-16 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-12">Why Choose RecipeHub?</h2>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {reasons.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-6 text-2xl font-bold border border-green-100">
                {index + 1}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed max-w-xs">
                {item.description}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};