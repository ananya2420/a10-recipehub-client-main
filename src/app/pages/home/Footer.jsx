import React from 'react';
import { FaTwitter, FaInstagram, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 py-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* Brand Column */}
        <div className="col-span-1 md:col-span-1 space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-600 rounded-lg" />
            <span className="text-xl font-bold dark:text-white">RecipeHub</span>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
            A premier destination for culinary artists to gather, exchange, and celebrate the art of modern gastronomy.
          </p>
          <div className="flex gap-4 text-green-600 pt-2">
            <FaTwitter className="hover:text-green-700 cursor-pointer" />
            <FaInstagram className="hover:text-green-700 cursor-pointer" />
            <FaGithub className="hover:text-green-700 cursor-pointer" />
          </div>
        </div>

        {/* Links Column 1 */}
        <div>
          <h4 className="font-bold text-gray-900 dark:text-white mb-6">Platform</h4>
          <ul className="space-y-4 text-gray-500 dark:text-gray-400">
            {['Home', 'Browse Recipes', 'Access Account', 'Join Us', 'Member Area'].map((item) => (
              <li key={item} className="hover:text-green-600 cursor-pointer transition-colors">{item}</li>
            ))}
          </ul>
        </div>

        {/* Links Column 2 */}
        <div>
          <h4 className="font-bold text-gray-900 dark:text-white mb-6">Culinary Categories</h4>
          <ul className="space-y-4 text-gray-500 dark:text-gray-400">
            {['Morning Meals', 'Midday Dishes', 'Evening Entrees', 'Sweet Treats', 'Quick Bites'].map((item) => (
              <li key={item} className="hover:text-green-600 cursor-pointer transition-colors">{item}</li>
            ))}
          </ul>
        </div>

        {/* Contact Column */}
        <div>
          <h4 className="font-bold text-gray-900 dark:text-white mb-6">Get in Touch</h4>
          <ul className="space-y-4 text-gray-500 dark:text-gray-400 text-sm">
            <li>contact@recipehub.io</li>
            <li>+1 (800) 555-COOK</li>
            <li>Culinary District, San Francisco, CA</li>
          </ul>
        </div>

      </div>
    </footer>
  );
};

export default Footer;