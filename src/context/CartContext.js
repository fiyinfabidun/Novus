/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { cartService } from '@/services/cart';
import { useAuth } from './AuthContext';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState({ products: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  
  useEffect(() => {
    if (user) {
      fetchUserCart();
    }
  }, [user]);

  const fetchUserCart = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const carts = await cartService.getUserCart(user.id);
      // Get the most recent cart or create an empty one
      const userCart = carts.length > 0 
        ? carts[carts.length - 1] 
        : { userId: user.id, products: [] };
      
      setCart(userCart);
    } catch (err) {
      setError('Failed to fetch cart');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    setLoading(true);
    try {
      // Check if product is already in cart
      const existingProductIndex = cart.products.findIndex(
        item => item.productId === productId
      );
      
      let updatedProducts = [...cart.products];
      
      if (existingProductIndex >= 0) {
        // Update quantity if product exists
        updatedProducts[existingProductIndex] = {
          ...updatedProducts[existingProductIndex],
          quantity: updatedProducts[existingProductIndex].quantity + quantity
        };
      } else {
        // Add new product if it doesn't exist
        updatedProducts.push({ productId, quantity });
      }
      
      const updatedCart = { ...cart, products: updatedProducts };
      
      // If cart has an ID, update it; otherwise create a new one
      if (cart.id) {
        await cartService.updateCart(cart.id, updatedCart);
      } else {
        const newCart = await cartService.addToCart({
          userId: user.id,
          products: updatedProducts
        });
        setCart(newCart);
        return;
      }
      
      setCart(updatedCart);
    } catch (err) {
      setError('Failed to update cart');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (productId) => {
    if (!cart.id) return;
    
    setLoading(true);
    try {
      const updatedProducts = cart.products.filter(
        item => item.productId !== productId
      );
      
      const updatedCart = { ...cart, products: updatedProducts };
      
      await cartService.updateCart(cart.id, updatedCart);
      setCart(updatedCart);
    } catch (err) {
      setError('Failed to remove item from cart');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (!cart.id) return;
    
    setLoading(true);
    try {
      const updatedProducts = cart.products.map(item => 
        item.productId === productId ? { ...item, quantity } : item
      );
      
      const updatedCart = { ...cart, products: updatedProducts };
      
      await cartService.updateCart(cart.id, updatedCart);
      setCart(updatedCart);
    } catch (err) {
      setError('Failed to update quantity');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    if (!cart.id) return;
    
    setLoading(true);
    try {
      // Create an empty cart update
      const updatedCart = { ...cart, products: [] };
      
      // Update the cart in one operation
      await cartService.updateCart(cart.id, updatedCart);
      setCart(updatedCart);
    } catch (err) {
      setError('Failed to clear cart');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CartContext.Provider value={{ 
      cart, 
      loading, 
      error,
      addToCart, 
      removeFromCart, 
      updateQuantity,
      clearCart,
      refreshCart: fetchUserCart
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};