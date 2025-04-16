/* eslint-disable @next/next/no-img-element */
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';

export default function ProductCard({ product, viewMode = 'grid' }) {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart, loading } = useCart();
  
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product.id, 1);
  };
  
  if (viewMode === 'list') {
    return (
      <motion.div
        className="bg-white rounded-lg shadow overflow-hidden border border-gray-200 flex flex-col sm:flex-row"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
        transition={{ duration: 0.2 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <div className="w-full sm:w-56 h-56 p-4 flex items-center justify-center">
          <img 
            src={product.image} 
            alt={product.title} 
            className="max-h-full max-w-full object-contain"
          />
        </div>
        <div className="flex-1 p-4 flex flex-col justify-between">
          <div>
            <Link href={`/products/${product.id}`}>
              <h3 className="text-lg font-medium text-gray-900 hover:text-indigo-600">
                {product.title}
              </h3>
            </Link>
            <p className="mt-1 text-gray-500 line-clamp-2">{product.description}</p>
            <div className="mt-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                {product.category}
              </span>
            </div>
          </div>
          <div className="mt-4 flex items-end justify-between">
            <p className="text-xl font-semibold text-gray-900">${product.price.toFixed(2)}</p>
            <motion.button
              onClick={handleAddToCart}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
              whileTap={{ scale: 0.95 }}
              disabled={loading}
            >
              {loading ? 'Adding...' : 'Add to Cart'}
            </motion.button>
          </div>
          <div className="mt-2 flex items-center">
            <div className="flex items-center">
              {[0, 1, 2, 3, 4].map((rating) => (
                <svg
                  key={rating}
                  className={`h-5 w-5 ${
                    product.rating.rate > rating ? 'text-yellow-400' : 'text-gray-200'
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="ml-2 text-sm text-gray-500">
              {product.rating.rate.toFixed(1)} ({product.rating.count} reviews)
            </p>
          </div>
        </div>
      </motion.div>
    );
  }
  
  return (
    <motion.div
      className="bg-white rounded-lg shadow overflow-hidden border border-gray-200 flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
      transition={{ duration: 0.2 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Link href={`/products/${product.id}`} className="relative">
        <div className="aspect-w-1 aspect-h-1 w-full bg-gray-50 overflow-hidden p-4 flex items-center justify-center">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-56 object-contain object-center transition-opacity"
          />
        </div>
        {isHovered && (
          <motion.div
            className="absolute inset-0  bg-opacity-10 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.span
              className="bg-white text-black py-2 px-4 rounded-full text-sm font-medium"
              whileTap={{ scale: 0.95 }}
            >
              View Details
            </motion.span>
          </motion.div>
        )}
      </Link>
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-sm text-gray-700 font-medium truncate">
          {product.title}
        </h3>
        <div className="mt-1 flex items-center">
          <div className="flex items-center">
            {[0, 1, 2, 3, 4].map((rating) => (
              <svg
                key={rating}
                className={`h-4 w-4 ${
                  product.rating.rate > rating ? 'text-yellow-400' : 'text-gray-200'
                }`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <p className="ml-1 text-xs text-gray-500">({product.rating.count})</p>
        </div>
        <div className="mt-1">
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-800">
            {product.category}
          </span>
        </div>
        <div className="mt-auto pt-4 flex items-center justify-between">
          <p className="text-lg font-medium text-gray-900">${product.price.toFixed(2)}</p>
          <motion.button
            onClick={handleAddToCart}
            className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
            whileTap={{ scale: 0.9 }}
            disabled={loading}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}