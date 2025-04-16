import api from './api';

export const cartService = {
  getUserCart: async (userId) => {
    try {
      const response = await api.get(`/carts/user/${userId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  addToCart: async (cartData) => {
    try {
      const response = await api.post('/carts', cartData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  updateCart: async (cartId, cartData) => {
    try {
      const response = await api.put(`/carts/${cartId}`, cartData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  deleteCart: async (cartId) => {
    try {
      const response = await api.delete(`/carts/${cartId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};