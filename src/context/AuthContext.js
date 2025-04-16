'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '@/services/authServices';
import { userService } from '@/services/userServices';


const setCookie = (name, value, days = 7) => {
  if (typeof window === 'undefined') return;
  
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
};


const removeCookie = (name) => {
  if (typeof window === 'undefined') return;
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
};

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // Check if user is logged in on initial load
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('auth_token');
      const userId = localStorage.getItem('user_id');
      if (token && userId) {
        fetchUserProfile(userId);
      } else {
        setLoading(false);
      }
    }
  }, []);

  const login = async (username, password) => {
    setLoading(true);
    setError(null);
    try {
      const data = await authService.login(username, password);
      if (data.token) {
        localStorage.setItem('auth_token', data.token);
        setCookie('auth_token', data.token);
        
    
        localStorage.setItem('user_id', '1');
        
        await fetchUserProfile('1');
        return true;
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to login');
      setLoading(false);
      return false;
    }
  };

  const logout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_id');
      removeCookie('auth_token');
    }
    setUser(null);
  };

  const fetchUserProfile = async (userId) => {
    try {
      const userData = await userService.getCurrentUser(userId);
      setUser(userData);
    } catch (err) {
      setError('Failed to fetch user profile');
      logout(); // Clear any invalid session
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      error,
      login, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};