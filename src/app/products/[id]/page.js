'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import BreadcrumbTrail from '@/components/layout/BreadCrumbTrail';
import LoadingSpinner from '@/components/layout/LoadingSpinner';
import ErrorMessage from '@/components/layout/ErrorMessage';

// Updated ProductService for FakeStore API
const productService = {
  getAllProducts: async () => {
    const response = await fetch('https://fakestoreapi.com/products');
    if (!response.ok) throw new Error('Failed to fetch products');
    return await response.json();
  },
  
  getProductById: async (id) => {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    if (!response.ok) throw new Error('Failed to fetch product');
    return await response.json();
  },
  
  getAllCategories: async () => {
    const response = await fetch('https://fakestoreapi.com/products/categories');
    if (!response.ok) throw new Error('Failed to fetch categories');
    return await response.json();
  }
};

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart, loading: cartLoading } = useCart();
  
  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        const data = await productService.getProductById(id);
        setProduct(data);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to fetch product details');
      } finally {
        setLoading(false);
      }
    }
    
    if (id) {
      fetchProduct();
    }
  }, [id]);
  
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    setQuantity(value > 0 ? value : 1);
  };
  
  const handleAddToCart = () => {
    if (product) {
      addToCart(product.id, quantity);
    }
  };
  
  const handleGoBack = () => {
    router.back();
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
  
  if (error || !product) {
    return (
      <div className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ErrorMessage message={error || 'Product not found'} />
          <div className="mt-6">
            <button
              onClick={handleGoBack}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
            >
              Back to Products
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  // Construct breadcrumbs for navigation
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: product.title, href: `/products/${product.id}`, current: true },
  ];
  
  // Format price with proper decimal places
  const formattedPrice = typeof product.price === 'number' 
    ? product.price.toFixed(2) 
    : parseFloat(product.price).toFixed(2);
  
  // Handle FakeStore API's different rating structure
  const rating = product.rating || { rate: 0, count: 0 };
  const rateValue = typeof rating === 'object' ? rating.rate : 0;
  const rateCount = typeof rating === 'object' ? rating.count : 0;
  
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <BreadcrumbTrail pages={breadcrumbs} />
        
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start mt-6">
          {/* Product Image */}
          <motion.div 
            className="flex flex-col rounded-lg overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex-1 bg-white p-8 flex items-center justify-center border border-gray-200 rounded-lg overflow-hidden">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-96 object-contain object-center"
              />
            </div>
          </motion.div>

          {/* Product Details */}
          <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">{product.title}</h1>
              <div className="mt-3">
                <h2 className="sr-only">Product information</h2>
                <p className="text-3xl text-gray-900">${formattedPrice}</p>
              </div>
              
              {/* Rating */}
              <div className="mt-3">
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((star) => (
                      <svg
                        key={star}
                        className={`h-5 w-5 ${
                          rateValue > star ? 'text-yellow-400' : 'text-gray-200'
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
                    {typeof rateValue === 'number' ? rateValue.toFixed(1) : '0.0'} ({rateCount} reviews)
                  </p>
                </div>
              </div>
              
              {/* Category */}
              <div className="mt-4">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                  {product.category}
                </span>
              </div>
              
              {/* Description */}
              <div className="mt-6">
                <h3 className="sr-only">Description</h3>
                <div className="text-base text-gray-700 space-y-6">
                  <p>{product.description}</p>
                </div>
              </div>

              {/* Quantity and Add to Cart */}
              <div className="mt-8 border-t border-gray-200 pt-8">
                <div className="flex items-center">
                  <div className="mr-4">
                    <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                      Quantity
                    </label>
                    <select
                      id="quantity"
                      name="quantity"
                      value={quantity}
                      onChange={handleQuantityChange}
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                        <option key={num} value={num}>
                          {num}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <motion.button
                    type="button"
                    onClick={handleAddToCart}
                    disabled={cartLoading}
                    className="flex-1 bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {cartLoading ? 'Adding...' : 'Add to Cart'}
                  </motion.button>
                </div>
              </div>
              
              {/* Free Shipping Notice */}
              <div className="mt-6">
                <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-gray-800">Free shipping on orders over $50</h3>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Back Button */}
              <div className="mt-4">
                <button
                  type="button"
                  onClick={handleGoBack}
                  className="inline-flex items-center text-indigo-600 hover:text-indigo-500"
                >
                  <svg className="mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                  </svg>
                  Back to products
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}