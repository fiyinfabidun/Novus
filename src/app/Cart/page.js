/* eslint-disable @next/next/no-img-element */
'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { productService } from '@/services/productService';
import BreadcrumbTrail from '@/components/layout/BreadCrumbTrail';
import PageHeader from '@/components/layout/PageHeader';
import LoadingSpinner from '@/components/layout/LoadingSpinner';
import ErrorMessage from '@/components/layout/ErrorMessage';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

// Checkout Modal Component
const CheckoutModal = ({ isOpen, onClose, onGoHome }) => {
  useEffect(() => {
    if (isOpen) {
      // Disable body scroll when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      // Re-enable scroll when modal closes
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          {/* Background overlay */}
          <motion.div 
            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />

      {/* Modal container */}
      <div className="flex items-center justify-center min-h-screen p-4">
        <motion.div 
          className="bg-white rounded-lg shadow-xl overflow-hidden max-w-md w-full mx-auto"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', bounce: 0.3, duration: 0.6 }}
        >
          <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-14 w-14 rounded-full bg-green-100 mb-4">
                <svg className="h-8 w-8 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl leading-6 font-medium text-gray-900" id="modal-title">
                Order Received
              </h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  Thank you for your order! We&apos;ve received your purchase request and will process it shortly.
                </p>
                <p className="mt-2 text-sm text-gray-500">
                  Your order confirmation has been sent to your email.
                </p>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-4 sm:px-6">
            <motion.button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none sm:w-auto sm:text-sm"
              onClick={onGoHome}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Back to Home
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
      )}
    </AnimatePresence>
  );
};

export default function CartPage() {
  return (
    <ProtectedRoute>
      <CartPageContent />
    </ProtectedRoute>
  );
}

function CartPageContent() {
  const router = useRouter();
  const { 
    cart, 
    loading: cartLoading, 
    error: cartError,
    updateQuantity,
    removeFromCart,
    clearCart,
    refreshCart
  } = useCart();
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isProcessingOrder, setIsProcessingOrder] = useState(false);
  
  useEffect(() => {
    async function fetchProductDetails() {
      if (!cart || !cart.products || cart.products.length === 0) {
        setLoading(false);
        return;
      }
      
      try {
        const productIds = cart.products.map(item => item.productId);
        const productDetails = {};
        
        for (const id of productIds) {
          const product = await productService.getProduct(id);
          productDetails[id] = product;
        }
        
        setProducts(productDetails);
      } catch (err) {
        setError('Failed to fetch product details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    
    if (!cartLoading && cart) {
      fetchProductDetails();
    }
  }, [cart, cartLoading]);
  
  const calculateTotal = () => {
    if (!cart || !cart.products) return 0;
    
    return cart.products.reduce((total, item) => {
      const product = products[item.productId];
      if (product) {
        return total + (product.price * item.quantity);
      }
      return total;
    }, 0);
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    updateQuantity(productId, newQuantity);
  };

  const handleRemoveItem = (productId) => {
    removeFromCart(productId);
  };
  
  const handleCheckout = async () => {
    setIsProcessingOrder(true);
    
    try {
      // Simulate API call to process order
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Use the clearCart method to empty the cart in one operation
      await clearCart();
      
      // Show success modal
      setIsCheckoutModalOpen(true);
    } catch (err) {
      console.error('Error processing order:', err);
      setError('Failed to process your order. Please try again.');
    } finally {
      setIsProcessingOrder(false);
    }
  };

  const handleGoHome = () => {
    // First close the modal
    setIsCheckoutModalOpen(false);
    
    // Then navigate after a short delay to allow animation to complete
    setTimeout(() => {
      router.push('/');
    }, 300);
  };
  
  if (cartLoading || loading) {
    return (
      <div>
        <BreadcrumbTrail />
        <PageHeader title="Shopping Cart" />
        <div className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <LoadingSpinner />
          </div>
        </div>
      </div>
    );
  }
  
  if (cartError || error) {
    return (
      <div>
        <BreadcrumbTrail />
        <PageHeader title="Shopping Cart" />
        <div className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ErrorMessage message={cartError || error} />
          </div>
        </div>
      </div>
    );
  }
  
  if (!cart || !cart.products || cart.products.length === 0) {
    return (
      <div>
        <BreadcrumbTrail />
        <PageHeader title="Shopping Cart" />
        <div className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <p className="mt-4 text-lg text-gray-600">Your cart is empty</p>
              <a href="/products" className="mt-6 inline-block px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                Continue Shopping
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div>
      <BreadcrumbTrail />
      <PageHeader title="Shopping Cart" />
      <div className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <ul className="divide-y divide-gray-200">
              {cart.products.map((item) => {
                const product = products[item.productId];
                if (!product) return null;
                
                return (
                  <motion.li 
                    key={item.productId}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="px-4 py-4 sm:px-6"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0 w-16 h-16">
                        <img
                          src={product.image} 
                          alt={product.title} 
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {product.title}
                        </p>
                        <p className="text-sm text-gray-500">
                          ${product.price.toFixed(2)} per item
                        </p>
                      </div>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center border rounded-md">
                        <motion.button 
                          onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                          className="px-2 py-1 text-gray-600 hover:text-gray-800"
                          whileTap={{ scale: 0.9 }}
                          disabled={item.quantity <= 1}
                          aria-label="Decrease quantity"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                          </svg>
                        </motion.button>
                        <span className="px-2 py-1 text-gray-700">{item.quantity}</span>
                        <motion.button 
                          onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                          className="px-2 py-1 text-gray-600 hover:text-gray-800"
                          whileTap={{ scale: 0.9 }}
                          aria-label="Increase quantity"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                        </motion.button>
                      </div>
                      
                      <div className="flex-shrink-0 text-right">
                        <p className="text-sm font-medium text-gray-900">
                          ${(product.price * item.quantity).toFixed(2)}
                        </p>
                        <motion.button
                          onClick={() => handleRemoveItem(item.productId)}
                          className="mt-1 text-xs text-red-500 hover:text-red-700"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          aria-label={`Remove ${product.title} from cart`}
                        >
                          Remove
                        </motion.button>
                      </div>
                    </div>
                  </motion.li>
                );
              })}
            </ul>
            <div className="px-4 py-5 bg-gray-50 sm:px-6">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Total</p>
                <p>${calculateTotal().toFixed(2)}</p>
              </div>
              <div className="mt-6">
                <motion.button
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                  onClick={handleCheckout}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isProcessingOrder}
                  aria-label="Proceed to checkout"
                >
                  {isProcessingOrder ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    'Checkout'
                  )}
                </motion.button>
              </div>
              <div className="mt-6 flex justify-center text-sm text-center text-gray-500">
                <p>
                  or{' '}
                  <a href="/products" className="text-indigo-600 font-medium hover:text-indigo-500">
                    Continue Shopping<span aria-hidden="true"> &rarr;</span>
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Checkout Modal */}
      <CheckoutModal 
        isOpen={isCheckoutModalOpen} 
        onClose={() => setIsCheckoutModalOpen(false)} 
        onGoHome={handleGoHome}
      />
    </div>
  );
}