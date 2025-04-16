/* eslint-disable react/no-unescaped-entities */
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { productService } from '@/services/productService';
import LoadingSpinner from '@/components/layout/LoadingSpinner';
import ErrorMessage from '@/components/layout/ErrorMessage';
import ProductCard from '@/components/products/ProductCard';
import CategoryFilter from '@/components/products/Filter';
import SearchBar from '@/components/products/SearchBar';
import ViewToggle from '@/components/products/ViewToggle';

export default function ProductsPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  
  // Fetch all products
  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const data = await productService.getAllProducts();
        setProducts(data);
        setFilteredProducts(data);
      } catch (err) {
        setError('Failed to fetch products');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    
    fetchProducts();
  }, []);
  
  // Filter products by category and search term
  useEffect(() => {
    let result = products;
    
    // Apply category filter
    if (selectedCategory) {
      result = result.filter(product => product.category === selectedCategory);
    }
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        product => 
          product.title.toLowerCase().includes(term) || 
          product.description.toLowerCase().includes(term) ||
          product.category.toLowerCase().includes(term)
      );
    }
    
    setFilteredProducts(result);
  }, [selectedCategory, searchTerm, products]);
  
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };
  
  const handleSearch = (term) => {
    setSearchTerm(term);
  };
  
  const toggleViewMode = (mode) => {
    setViewMode(mode);
  };
  
  if (loading) {
    return (
      <div className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <LoadingSpinner />
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ErrorMessage message={error} />
        </div>
      </div>
    );
  }
  
  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row">
          {/* Sidebar/Filters */}
          <div className="md:w-64 md:pr-8 mb-6 md:mb-0">
            <CategoryFilter 
              selectedCategory={selectedCategory} 
              onChange={handleCategoryChange} 
            />
            
            <div className="border-t border-gray-200 my-6 md:block hidden"></div>
            
            <div className="hidden md:block">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Search</h3>
              <SearchBar onSearch={handleSearch} />
            </div>
          </div>
          
          {/* Main content */}
          <div className="flex-1">
            {/* Mobile search bar */}
            <div className="block md:hidden mb-6">
              <SearchBar onSearch={handleSearch} />
            </div>
            
            {/* Results header */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <span className="text-sm text-gray-700">
                  Showing <span className="font-medium">{filteredProducts.length}</span> results
                  {selectedCategory && (
                    <> in <span className="font-medium">{selectedCategory}</span></>
                  )}
                  {searchTerm && (
                    <> for <span className="font-medium">"{searchTerm}"</span></>
                  )}
                </span>
              </div>
              <ViewToggle viewMode={viewMode} onToggle={toggleViewMode} />
            </div>
            
            {/* Results */}
            <AnimatePresence mode="wait">
              {filteredProducts.length === 0 ? (
                <motion.div
                  key="no-results"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white p-6 rounded-lg border border-gray-200 text-center"
                >
                  <svg 
                    className="mx-auto h-12 w-12 text-gray-400" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                    />
                  </svg>
                  <h3 className="mt-2 text-lg font-medium text-gray-900">No products found</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Try adjusting your search or filters to find what you're looking for.
                  </p>
                  <div className="mt-6">
                    <button
                      onClick={() => {
                        setSelectedCategory(null);
                        setSearchTerm('');
                      }}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                      Reset filters
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key={viewMode}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className={
                    viewMode === 'grid'
                      ? "grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"
                      : "space-y-6"
                  }
                >
                  {filteredProducts.map((product) => (
                    <ProductCard 
                      key={product.id} 
                      product={product} 
                      viewMode={viewMode} 
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}