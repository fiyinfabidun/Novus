'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function AuthButton() {
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  if (!user) {
    return (
      <Link 
        href="/Login"
        className="px-4 py-2 text-sm text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors"
      >
        Login
      </Link>
    );
  }

  return (
    <div className="relative">
      <motion.button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center space-x-2 focus:outline-none"
        whileTap={{ scale: 0.95 }}
      >
        <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white">
          {user.name?.firstname?.charAt(0).toUpperCase() || user.username?.charAt(0).toUpperCase() || 'U'}
        </div>
        <span className="hidden md:block text-sm font-medium text-white capitalize">
          {user.name?.firstname || user.username || 'User'}
        </span>
      </motion.button>

      <AnimatePresence>
        {showDropdown && (
          <motion.div
            className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <Link 
              href="/profile"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setShowDropdown(false)}
            >
              Profile
            </Link>
            <Link 
              href="/cart"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setShowDropdown(false)}
            >
              Cart
            </Link>
            <button 
              onClick={handleLogout} 
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Logout
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}