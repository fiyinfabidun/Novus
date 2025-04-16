'use client';

import { motion } from 'framer-motion';

export default function PageHeader({ title, description }) {
  return (
    <motion.div 
      className="bg-white py-8 border-b border-gray-200"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
        {description && (
          <p className="mt-2 text-lg text-gray-600">{description}</p>
        )}
      </div>
    </motion.div>
  );
}