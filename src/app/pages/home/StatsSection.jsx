"use client";

import React from 'react';

const StatsSection = () => {
  const stats = [
    { label: "Curated Recipes", value: "10K+" },
    { label: "Active Creators", value: "50K+" },
    { label: "Community Members", value: "100K+" },
  ];

  return (
    <section className="bg-white py-12 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {stats.map((stat, index) => (
          <div key={index} className="text-center md:text-left border-b md:border-b-0 md:border-r border-gray-100 last:border-r-0 pb-6 md:pb-0">
            <h3 className="text-4xl font-bold text-gray-900 mb-1">
              {stat.value}
            </h3>
            <p className="text-gray-500 font-medium">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;