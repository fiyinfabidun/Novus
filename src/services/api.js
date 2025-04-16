import axios from 'axios';

const baseURL = 'https://fakestoreapi.com';

const api = axios.create({
  baseURL,
});

// Request interceptor for adding auth token
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default api;
