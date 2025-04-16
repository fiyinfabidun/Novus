'use client';

import { motion } from 'framer-motion';

export default function ViewToggle({ viewMode, onToggle }) {
  return (
    <div className="inline-flex rounded-md shadow-sm">
      <motion.button
        type="button"
        className={`relative inline-flex items-center px-3 py-2 rounded-l-md border border-gray-300 text-sm font-medium ${
          viewMode === 'grid'
            ? 'bg-indigo-50 text-indigo-700 z-10'
            : 'bg-white text-gray-700 hover:bg-gray-50'
        }`}
        onClick={() => onToggle('grid')}
        whileTap={{ scale: 0.95 }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
        <span className="ml-2 hidden sm:inline">Grid</span>
      </motion.button>
      <motion.button
        type="button"
        className={`relative inline-flex items-center px-3 py-2 rounded-r-md border border-gray-300 text-sm font-medium ${
          viewMode === 'list'
            ? 'bg-indigo-50 text-indigo-700 z-10'
            : 'bg-white text-gray-700 hover:bg-gray-50'
        }`}
        onClick={() => onToggle('list')}
        whileTap={{ scale: 0.95 }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
        </svg>
        <span className="ml-2 hidden sm:inline">List</span>
      </motion.button>
    </div>
  );
}