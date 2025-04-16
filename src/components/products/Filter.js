'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { productService } from '@/services/productService';

export default function CategoryFilter({ selectedCategory, onChange }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  
  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await productService.getAllCategories();
        setCategories(['all', ...data]);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchCategories();
  }, []);
  
  const handleCategoryClick = (category) => {
    onChange(category === 'all' ? null : category);
    setMobileOpen(false);
  };
  
  return (
    <div className="mb-6">
      {/* Desktop view */}
      <div className="hidden md:block">
        <h3 className="text-lg font-medium text-gray-900 mb-3">Categories</h3>
        <div className="space-y-2">
          {loading ? (
            <div className="animate-pulse space-y-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-8 bg-gray-200 rounded w-32"></div>
              ))}
            </div>
          ) : (
            categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`block px-3 py-2 rounded-md text-sm font-medium w-full text-left ${
                  (selectedCategory === category) || (!selectedCategory && category === 'all')
                    ? 'bg-indigo-100 text-indigo-800'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </motion.button>
            ))
          )}
        </div>
      </div>
      
      {/* Mobile view */}
      <div className="md:hidden">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex items-center justify-between w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          <span>Category: {selectedCategory ? selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1) : 'All'}</span>
          <svg className={`h-5 w-5 text-gray-500 transition-transform ${mobileOpen ? 'transform rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
        
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              className="mt-2 bg-white border border-gray-300 rounded-md shadow-sm overflow-hidden z-10 relative"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              {loading ? (
                <div className="animate-pulse space-y-2 p-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="h-8 bg-gray-200 rounded"></div>
                  ))}
                </div>
              ) : (
                categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryClick(category)}
                    className={`block px-4 py-2 text-sm w-full text-left ${
                      (selectedCategory === category) || (!selectedCategory && category === 'all')
                        ? 'bg-indigo-100 text-indigo-800'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}