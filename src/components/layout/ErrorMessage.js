'use client';

import { motion } from 'framer-motion';

export default function ErrorMessage({ message }) {
  return (
    <motion.div
      className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
    >
      <span className="block sm:inline">{message || 'An error occurred'}</span>
    </motion.div>
  );
}